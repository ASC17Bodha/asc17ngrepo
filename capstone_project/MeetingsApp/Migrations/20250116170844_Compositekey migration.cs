using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeetingsApp.Migrations
{
    /// <inheritdoc />
    public partial class Compositekeymigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MeetingAttendee",
                columns: table => new
                {
                    MeetingId = table.Column<int>(type: "INTEGER", nullable: false),
                    AttendeeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeetingAttendee", x => new { x.MeetingId, x.AttendeeId });
                    table.ForeignKey(
                        name: "FK_MeetingAttendee_Attendee_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "Attendee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MeetingAttendee_Meetings_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meetings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeetingAttendee_AttendeeId",
                table: "MeetingAttendee",
                column: "AttendeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeetingAttendee");
        }
    }
}
