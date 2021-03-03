using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class shippingmethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingMethod",
                table: "Shippings",
                newName: "ShippingNumber");

            migrationBuilder.RenameColumn(
                name: "LotDetail",
                table: "ShippingLots",
                newName: "LotNumber");

            migrationBuilder.AddColumn<int>(
                name: "ShippingMethodId",
                table: "Shippings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_ShippingMethodId",
                table: "Shippings",
                column: "ShippingMethodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_ShippingMethods_ShippingMethodId",
                table: "Shippings",
                column: "ShippingMethodId",
                principalTable: "ShippingMethods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_ShippingMethods_ShippingMethodId",
                table: "Shippings");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_ShippingMethodId",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "ShippingMethodId",
                table: "Shippings");

            migrationBuilder.RenameColumn(
                name: "ShippingNumber",
                table: "Shippings",
                newName: "ShippingMethod");

            migrationBuilder.RenameColumn(
                name: "LotNumber",
                table: "ShippingLots",
                newName: "LotDetail");
        }
    }
}
