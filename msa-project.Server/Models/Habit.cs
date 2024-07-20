public class Habit
{
    public int Id { get; set; }
    public string Icon { get; set; }
    public string Label { get; set; }
    public bool IsCompletedToday { get; set; }
    public int MonthlyCheckIns { get; set; }
    public int TotalCheckIns { get; set; }
    public int CurrentStreak { get; set; }
    public DateTime LastCheckInDate { get; set; }
    public string UserEmail { get; set; }
}
