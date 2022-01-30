using System;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;

namespace Application.Addresses
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Street { get; set; }
            public int Number { get; set; }
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
                var address = new Address
                {
                    Id = request.Id,
                    Country = request.Country,
                    City = request.City,
                    Street = request.Street,
                    Number = request.Number
                };
                
                _context.Addresses.Add(address);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}