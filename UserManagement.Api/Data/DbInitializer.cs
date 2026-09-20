using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using UserManagement.Api.Models;

namespace UserManagement.Api.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Users.AnyAsync())
        {
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Name = "Administrator",
                Email = "admin@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                Role = "Administrator"
            },
            new User
            {
                Name = "Operator",
                Email = "operator@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Operator123!"),
                Role = "Operator"
            },
            new User
            {
                Name = "Client",
                Email = "client@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Client123!"),
                Role = "Client"
            }
        };

        context.Users.AddRange(users);

        await context.SaveChangesAsync();
    }
}