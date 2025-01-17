﻿// <auto-generated />
using System;
using MeetingsApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MeetingsApp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250117122100_Meeting Attendee mig34")]
    partial class MeetingAttendeemig34
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("MeetingsApp.Models.Domain.Attendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Attendee");
                });

            modelBuilder.Entity("MeetingsApp.Models.Domain.Meeting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Attendees")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<TimeOnly>("EndTime")
                        .HasColumnType("TEXT");

                    b.Property<TimeOnly>("StartTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Meetings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Attendees = "john.doe@example.com",
                            Date = new DateOnly(2020, 1, 1),
                            Description = "This is meeting 1",
                            EndTime = new TimeOnly(13, 20, 0),
                            StartTime = new TimeOnly(10, 0, 0),
                            Title = "Meeting 1"
                        },
                        new
                        {
                            Id = 2,
                            Attendees = "jackie@mail.com",
                            Date = new DateOnly(2024, 1, 11),
                            Description = "daily sync of meet",
                            EndTime = new TimeOnly(16, 42, 0),
                            StartTime = new TimeOnly(14, 42, 0),
                            Title = "daily sync up"
                        },
                        new
                        {
                            Id = 3,
                            Attendees = "john.doe@example.com, jackie@mail.com",
                            Date = new DateOnly(2026, 1, 3),
                            Description = "daily sync of meet",
                            EndTime = new TimeOnly(16, 42, 0),
                            StartTime = new TimeOnly(14, 42, 0),
                            Title = "daily sync up"
                        });
                });

            modelBuilder.Entity("MeetingsApp.Models.Domain.MeetingAttendee", b =>
                {
                    b.Property<int>("MeetingId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AttendeeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("MeetingId", "AttendeeId");

                    b.HasIndex("AttendeeId");

                    b.ToTable("MeetingAttendee");
                });

            modelBuilder.Entity("MeetingsApp.Models.Domain.MeetingAttendee", b =>
                {
                    b.HasOne("MeetingsApp.Models.Domain.Attendee", "Attendee")
                        .WithMany("Meeting")
                        .HasForeignKey("AttendeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MeetingsApp.Models.Domain.Meeting", "Meeting")
                        .WithMany("MeetingAttendees")
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Attendee");

                    b.Navigation("Meeting");
                });

            modelBuilder.Entity("MeetingsApp.Models.Domain.Attendee", b =>
                {
                    b.Navigation("Meeting");
                });

            modelBuilder.Entity("MeetingsApp.Models.Domain.Meeting", b =>
                {
                    b.Navigation("MeetingAttendees");
                });
#pragma warning restore 612, 618
        }
    }
}
