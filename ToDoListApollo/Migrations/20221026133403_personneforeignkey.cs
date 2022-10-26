using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListApollo.Migrations
{
    public partial class personneforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tache_Personne_Personneid_p",
                table: "Tache");

            migrationBuilder.DropIndex(
                name: "IX_Tache_Personneid_p",
                table: "Tache");

            migrationBuilder.DropColumn(
                name: "Personneid_p",
                table: "Tache");

            migrationBuilder.AddColumn<int>(
                name: "PersonneId",
                table: "Tache",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tache_PersonneId",
                table: "Tache",
                column: "PersonneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tache_Personne_PersonneId",
                table: "Tache",
                column: "PersonneId",
                principalTable: "Personne",
                principalColumn: "id_p",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tache_Personne_PersonneId",
                table: "Tache");

            migrationBuilder.DropIndex(
                name: "IX_Tache_PersonneId",
                table: "Tache");

            migrationBuilder.DropColumn(
                name: "PersonneId",
                table: "Tache");

            migrationBuilder.AddColumn<int>(
                name: "Personneid_p",
                table: "Tache",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tache_Personneid_p",
                table: "Tache",
                column: "Personneid_p");

            migrationBuilder.AddForeignKey(
                name: "FK_Tache_Personne_Personneid_p",
                table: "Tache",
                column: "Personneid_p",
                principalTable: "Personne",
                principalColumn: "id_p");
        }
    }
}
