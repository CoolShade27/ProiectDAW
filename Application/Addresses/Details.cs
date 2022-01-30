using System;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;
using static Application.Products.Details;

namespace Application.Addresses
{
    public class Details
    {
        public class Query : IRequest<Address>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Address>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Address>
            Handle(Query request, CancellationToken cancellationToken)
            {
                var address = await _context.Addresses.FindAsync(request.Id);

                return address;
            }
        }
    }
}