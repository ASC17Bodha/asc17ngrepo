using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeetingsApp.Migrations
{
    /// <inheritdoc />
    public partial class MeetingAttendeemig34789 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MeetingAttendee",
                table: "MeetingAttendee");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "MeetingAttendee",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeetingAttendee",
                table: "MeetingAttendee",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_MeetingAttendee_MeetingId",
                table: "MeetingAttendee",
                column: "MeetingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MeetingAttendee",
                table: "MeetingAttendee");

            migrationBuilder.DropIndex(
                name: "IX_MeetingAttendee_MeetingId",
                table: "MeetingAttendee");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "MeetingAttendee",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeetingAttendee",
                table: "MeetingAttendee",
                columns: new[] { "MeetingId", "AttendeeId" });
        }
    }
}
