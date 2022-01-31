using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;

namespace Application.Users
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Username { get; set; }
            public Role Role { get; set; }
            public Address Address { get; set; }
            public ICollection<Order> Orders { get; set; }
            public string PasswordHash { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = new User 
                {
                    Id = request.Id,
                    FullName = request.FullName,
                    Username = request.Username,
                    Role = Role.User,
                    Address = request.Address,
                    PasswordHash = request.PasswordHash
                };

                _context.Users.Add(user);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}