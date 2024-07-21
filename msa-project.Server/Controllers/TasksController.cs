using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using msa_project.Server.Data;

namespace msa_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ApplicationDbContext context, ILogger<TasksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            _logger.LogInformation($"Retrieved Email from claims: {userEmail}");
            if (userEmail == null)
            {
                return Unauthorized();
            }
            var tasks = await _context.Tasks.Where(t => t.UserEmail == userEmail).ToListAsync();
            return Ok(tasks); // Ensure that you are returning the tasks as an array
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            _logger.LogInformation($"Retrieved Email from claims: {userEmail}");
            if (userEmail == null || task.UserEmail != userEmail)
            {
                return Unauthorized();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {

            if (string.IsNullOrEmpty(task.UserEmail))
            {
                return BadRequest();
            }

            _logger.LogInformation("Received task: " + Newtonsoft.Json.JsonConvert.SerializeObject(task));

            if (!ModelState.IsValid)
            {
                _logger.LogInformation("ModelState is invalid: " + ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).FirstOrDefault());
                return BadRequest(ModelState);
            }
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            _logger.LogInformation($"Retrieved Email from claims: {userEmail}");

            if (userEmail == null || task.UserEmail != userEmail)
            {
                return Unauthorized();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
