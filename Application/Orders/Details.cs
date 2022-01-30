using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Orders
{
    public class Details
    {
        public class Query : IRequest<Order>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Order>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Order> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                return order;
            }
        }
    }
}