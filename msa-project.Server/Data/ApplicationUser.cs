using Microsoft.AspNetCore.Identity;
using OrganisEasy.Server.Models;
using System.Collections.Generic;

namespace msa_project.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        // Add a collection of Habits
        public ICollection<Habit> Habits { get; set; }
    }
}
