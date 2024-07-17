using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace msa_project.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangingEmailFieldHabit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Habits_AspNetUsers_UserId",
                table: "Habits");

            migrationBuilder.DropIndex(
                name: "IX_Habits_UserId",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Habits");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Habits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Habits");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Habits",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Habits_UserId",
                table: "Habits",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Habits_AspNetUsers_UserId",
                table: "Habits",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
