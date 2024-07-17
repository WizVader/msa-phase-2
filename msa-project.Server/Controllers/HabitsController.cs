using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using msa_project.Server.Data;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace msa_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ILogger<HabitsController> _logger;

        public HabitsController(ApplicationDbContext context, IHttpContextAccessor contextAccessor, ILogger<HabitsController> logger)
        {
            _context = context;
            _contextAccessor = contextAccessor;
            _logger = logger;
        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habit>>> GetHabits()
        {
            var userEmail = _contextAccessor.HttpContext.Session.GetString("UserEmail");
            _logger.LogInformation($"Retrieved Email from session: {userEmail}");
            if (userEmail == null)
            {
                return Unauthorized();
            }

            return await _context.Habits.Where(h => h.UserEmail == userEmail).ToListAsync();
        }

        // GET: api/Habits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habit>> GetHabit(int id)
        {
            var habit = await _context.Habits.FindAsync(id);

            if (habit == null)
            {
                return NotFound();
            }

            return habit;
        }

        // PUT: api/Habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabit(int id, Habit habit)
        {
            if (id != habit.Id)
            {
                return BadRequest();
            }

            var userEmail = _contextAccessor.HttpContext.Session.GetString("UserEmail");
            _logger.LogInformation($"Retrieved Email from session: {userEmail}");
            if (userEmail == null || habit.UserEmail != userEmail)
            {
                return Unauthorized();
            }

            _context.Entry(habit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Habits
        [HttpPost]
        public async Task<ActionResult<Habit>> PostHabit(Habit habit)
        {
            var userEmail = _contextAccessor.HttpContext.Session.GetString("UserEmail");
            _logger.LogInformation($"Retrieved Email from session: {userEmail}");
            if (userEmail == null)
            {
                return Unauthorized();
            }

            // Set the UserEmail
            habit.UserEmail = userEmail;

            // Set default values for the new habit
            habit.LastCheckInDate = DateTime.UtcNow;
            habit.IsCompletedToday = false;
            habit.MonthlyCheckIns = 0;
            habit.TotalCheckIns = 0;
            habit.CurrentStreak = 0;

            // Clear ModelState errors for UserEmail
            if (ModelState.ContainsKey("UserEmail"))
            {
                ModelState["UserEmail"].Errors.Clear();
            }

            _logger.LogInformation("ModelState is valid: " + ModelState.IsValid); // Log ModelState validity

            if (!ModelState.IsValid)
            {
                _logger.LogInformation("ModelState is invalid: " + ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).FirstOrDefault());
                return BadRequest(ModelState);
            }

            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHabit", new { id = habit.Id }, habit);
        }

        // DELETE: api/Habits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(int id)
        {
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }

            var userEmail = _contextAccessor.HttpContext.Session.GetString("UserEmail");
            _logger.LogInformation($"Retrieved Email from session: {userEmail}");
            if (userEmail == null || habit.UserEmail != userEmail)
            {
                return Unauthorized();
            }

            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Custom method to handle check-ins
        [HttpPost("{id}/checkin")]
        public async Task<IActionResult> CheckInHabit(int id)
        {
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }

            var userEmail = _contextAccessor.HttpContext.Session.GetString("UserEmail");
            _logger.LogInformation($"Retrieved Email from session: {userEmail}");
            if (userEmail == null || habit.UserEmail != userEmail)
            {
                return Unauthorized();
            }

            var today = DateTime.UtcNow.Date;
            if (habit.LastCheckInDate.Date != today)
            {
                habit.LastCheckInDate = today;
                habit.IsCompletedToday = true;
                habit.TotalCheckIns++;
                habit.CurrentStreak++;

                // Update MonthlyCheckIns
                if (today.Month == DateTime.UtcNow.Month)
                {
                    habit.MonthlyCheckIns++;
                }
                else
                {
                    habit.MonthlyCheckIns = 1;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(habit);
        }

        private bool HabitExists(int id)
        {
            return _context.Habits.Any(e => e.Id == id);
        }
    }
}
