using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class receiving : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receivings_Shippings_ShippingId",
                table: "Receivings");

            migrationBuilder.DropIndex(
                name: "IX_Receivings_ShippingId",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "ShippingId",
                table: "Receivings");

            migrationBuilder.AddColumn<DateTime>(
                name: "ArrivalDate",
                table: "Receivings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LotNumber",
                table: "Receivings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PONumber",
                table: "Receivings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingNumber",
                table: "Receivings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Receivings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VenderNo",
                table: "Receivings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PONumber",
                table: "ReceivingItems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalDate",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "LotNumber",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "PONumber",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "ShippingNumber",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "VenderNo",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "PONumber",
                table: "ReceivingItems");

            migrationBuilder.AddColumn<int>(
                name: "ShippingId",
                table: "Receivings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Receivings_ShippingId",
                table: "Receivings",
                column: "ShippingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receivings_Shippings_ShippingId",
                table: "Receivings",
                column: "ShippingId",
                principalTable: "Shippings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
