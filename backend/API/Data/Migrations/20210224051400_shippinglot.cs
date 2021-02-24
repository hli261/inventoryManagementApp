using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class shippinglot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShippingLotId",
                table: "Shippings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShippingLots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LotDetail = table.Column<string>(type: "TEXT", nullable: true),
                    CreateTime = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingLots", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_ShippingLotId",
                table: "Shippings",
                column: "ShippingLotId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_ShippingLots_ShippingLotId",
                table: "Shippings",
                column: "ShippingLotId",
                principalTable: "ShippingLots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_ShippingLots_ShippingLotId",
                table: "Shippings");

            migrationBuilder.DropTable(
                name: "ShippingLots");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_ShippingLotId",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "ShippingLotId",
                table: "Shippings");
        }
    }
}
