using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListApollo.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ToDoListe",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoListe", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Tache",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_l = table.Column<int>(type: "int", nullable: false),
                    ToDoListeid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tache", x => x.id);
                    table.ForeignKey(
                        name: "FK_Tache_ToDoListe_ToDoListeid",
                        column: x => x.ToDoListeid,
                        principalTable: "ToDoListe",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tache_ToDoListeid",
                table: "Tache",
                column: "ToDoListeid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tache");

            migrationBuilder.DropTable(
                name: "ToDoListe");
        }
    }
}
