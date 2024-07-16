using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using msa_project.Server.Data;

namespace OrganisEasy.Server.Models
{
    public class Habit
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Icon { get; set; }

        [Required]
        public string Label { get; set; }

        public bool IsCompletedToday { get; set; }

        public int MonthlyCheckIns { get; set; }

        public int TotalCheckIns { get; set; }

        public int Streak { get; set; }

        public DateTime? LastCheckInDate { get; set; }  // New property to store the date of last check-in

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
    }
}
