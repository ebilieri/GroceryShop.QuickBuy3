using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryShop.Repositorio.Migrations
{
    public partial class AddCampoPedidosUsuarios : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Documento",
                table: "Usuarios",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TipoPessoa",
                table: "Usuarios",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataAtualizacao",
                table: "Pedidos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "StatusPedido",
                table: "Pedidos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Documento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "TipoPessoa",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataAtualizacao",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "StatusPedido",
                table: "Pedidos");
        }
    }
}
