﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ToDoListApollo;

#nullable disable

namespace ToDoListApollo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20221026132203_test")]
    partial class test
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("PersonneToDoListe", b =>
                {
                    b.Property<int>("Personneid_p")
                        .HasColumnType("int");

                    b.Property<long>("ToDoListesid_l")
                        .HasColumnType("bigint");

                    b.HasKey("Personneid_p", "ToDoListesid_l");

                    b.HasIndex("ToDoListesid_l");

                    b.ToTable("PersonneToDoListe");
                });

            modelBuilder.Entity("ToDoListApollo.Personne", b =>
                {
                    b.Property<int>("id_p")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id_p"), 1L, 1);

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("id_p");

                    b.ToTable("Personne");

                    b.HasData(
                        new
                        {
                            id_p = 1,
                            Nom = "",
                            Prenom = "Julien"
                        },
                        new
                        {
                            id_p = 2,
                            Nom = "",
                            Prenom = "Julien2"
                        });
                });

            modelBuilder.Entity("ToDoListApollo.Tache", b =>
                {
                    b.Property<int>("id_t")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id_t"), 1L, 1);

                    b.Property<DateTime>("Date_echeance_l")
                        .HasColumnType("datetime2");

                    b.Property<int?>("Personneid_p")
                        .HasColumnType("int");

                    b.Property<string>("Titre_t")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<long>("TodoListId")
                        .HasColumnType("bigint");

                    b.Property<int>("active_l")
                        .HasColumnType("int");

                    b.HasKey("id_t");

                    b.HasIndex("Personneid_p");

                    b.HasIndex("TodoListId");

                    b.ToTable("Tache");
                });

            modelBuilder.Entity("ToDoListApollo.ToDoListe", b =>
                {
                    b.Property<long>("id_l")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("id_l"), 1L, 1);

                    b.Property<int>("Active_l")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset?>("Date_echeance_l")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Description")
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("Titre_l")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("id_l");

                    b.ToTable("ToDoListe");

                    b.HasData(
                        new
                        {
                            id_l = 1L,
                            Active_l = 0,
                            Titre_l = "Titre"
                        });
                });

            modelBuilder.Entity("PersonneToDoListe", b =>
                {
                    b.HasOne("ToDoListApollo.Personne", null)
                        .WithMany()
                        .HasForeignKey("Personneid_p")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ToDoListApollo.ToDoListe", null)
                        .WithMany()
                        .HasForeignKey("ToDoListesid_l")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ToDoListApollo.Tache", b =>
                {
                    b.HasOne("ToDoListApollo.Personne", null)
                        .WithMany("Tache")
                        .HasForeignKey("Personneid_p");

                    b.HasOne("ToDoListApollo.ToDoListe", "ToDoListe")
                        .WithMany("Tache")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ToDoListe");
                });

            modelBuilder.Entity("ToDoListApollo.Personne", b =>
                {
                    b.Navigation("Tache");
                });

            modelBuilder.Entity("ToDoListApollo.ToDoListe", b =>
                {
                    b.Navigation("Tache");
                });
#pragma warning restore 612, 618
        }
    }
}
