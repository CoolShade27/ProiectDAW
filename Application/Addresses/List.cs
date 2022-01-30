using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Addresses
{
    public class List
    {
        public class Query : IRequest<List<Address>> { }

        public class Handler : IRequestHandler<Query, List<Address>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Address>> Handle(Query request, CancellationToken cancellationToken)
            {
                var addresses = await _context.Addresses.ToListAsync();

                return addresses;
            }
        }
    }
}