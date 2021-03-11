using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ship_recChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PONumber",
                table: "ReceivingItems",
                newName: "LotNumber");

            migrationBuilder.AddColumn<string>(
                name: "PONumber",
                table: "Shippings",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PONumber",
                table: "Shippings");

            migrationBuilder.RenameColumn(
                name: "LotNumber",
                table: "ReceivingItems",
                newName: "PONumber");
        }
    }
}
