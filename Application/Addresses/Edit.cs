using System;
using System.Threading;
using System.Threading.Tasks;
using Database;
using MediatR;

namespace Application.Addresses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Street { get; set; }
            public int? Number { get; set; }
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
                var address = await _context.Addresses.FindAsync(request.Id);

                if (address == null) 
                {
                    throw new Exception("Wrong address Id.");
                }

                address.Country = request.Country ?? address.Country;
                address.City = request.City ?? address.City;
                address.Street = request.Street ?? address.Street;
                address.Number = request.Number ?? address.Number;
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}