using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class redoReceiving : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceivingItems_Items_ItemId",
                table: "ReceivingItems");

            migrationBuilder.DropIndex(
                name: "IX_ReceivingItems_ItemId",
                table: "ReceivingItems");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "ReceivingItems");

            migrationBuilder.RenameColumn(
                name: "ROnumber",
                table: "Receivings",
                newName: "RONumber");

            migrationBuilder.RenameColumn(
                name: "ArrivalDate",
                table: "Receivings",
                newName: "OrderDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Receivings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ItemDescription",
                table: "ReceivingItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemNumber",
                table: "ReceivingItems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Receivings");

            migrationBuilder.DropColumn(
                name: "ItemDescription",
                table: "ReceivingItems");

            migrationBuilder.DropColumn(
                name: "ItemNumber",
                table: "ReceivingItems");

            migrationBuilder.RenameColumn(
                name: "RONumber",
                table: "Receivings",
                newName: "ROnumber");

            migrationBuilder.RenameColumn(
                name: "OrderDate",
                table: "Receivings",
                newName: "ArrivalDate");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "ReceivingItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReceivingItems_ItemId",
                table: "ReceivingItems",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceivingItems_Items_ItemId",
                table: "ReceivingItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
