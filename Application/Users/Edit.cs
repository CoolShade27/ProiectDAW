using System;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;

namespace Application.Users
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Username { get; set; }
            public Address Address { get; set; }
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
                var user = await _context.Users.FindAsync(request.Id);

                if (user == null)
                {
                    throw new Exception("wrong user Id.");
                }

                user.FullName = request.FullName ?? user.FullName;
                user.Username = request.Username ?? user.Username;
                user.Address = request.Address ?? user.Address;
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}