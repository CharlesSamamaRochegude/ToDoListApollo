﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListApollo.Migrations
{
    public partial class InitialCreatee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personne",
                columns: table => new
                {
                    id_p = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personne", x => x.id_p);
                });

            migrationBuilder.CreateTable(
                name: "ToDoListe",
                columns: table => new
                {
                    id_l = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre_l = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Date_echeance_l = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Active_l = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoListe", x => x.id_l);
                });

            migrationBuilder.CreateTable(
                name: "PersonneToDoListe",
                columns: table => new
                {
                    Personneid_p = table.Column<int>(type: "int", nullable: false),
                    ToDoListesid_l = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonneToDoListe", x => new { x.Personneid_p, x.ToDoListesid_l });
                    table.ForeignKey(
                        name: "FK_PersonneToDoListe_Personne_Personneid_p",
                        column: x => x.Personneid_p,
                        principalTable: "Personne",
                        principalColumn: "id_p",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonneToDoListe_ToDoListe_ToDoListesid_l",
                        column: x => x.ToDoListesid_l,
                        principalTable: "ToDoListe",
                        principalColumn: "id_l",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tache",
                columns: table => new
                {
                    id_t = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre_t = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    active_l = table.Column<int>(type: "int", nullable: false),
                    Date_echeance_l = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Personneid_p = table.Column<int>(type: "int", nullable: true),
                    ToDoListeid_l = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tache", x => x.id_t);
                    table.ForeignKey(
                        name: "FK_Tache_Personne_Personneid_p",
                        column: x => x.Personneid_p,
                        principalTable: "Personne",
                        principalColumn: "id_p");
                    table.ForeignKey(
                        name: "FK_Tache_ToDoListe_ToDoListeid_l",
                        column: x => x.ToDoListeid_l,
                        principalTable: "ToDoListe",
                        principalColumn: "id_l");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonneToDoListe_ToDoListesid_l",
                table: "PersonneToDoListe",
                column: "ToDoListesid_l");

            migrationBuilder.CreateIndex(
                name: "IX_Tache_Personneid_p",
                table: "Tache",
                column: "Personneid_p");

            migrationBuilder.CreateIndex(
                name: "IX_Tache_ToDoListeid_l",
                table: "Tache",
                column: "ToDoListeid_l");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonneToDoListe");

            migrationBuilder.DropTable(
                name: "Tache");

            migrationBuilder.DropTable(
                name: "Personne");

            migrationBuilder.DropTable(
                name: "ToDoListe");
        }
    }
}