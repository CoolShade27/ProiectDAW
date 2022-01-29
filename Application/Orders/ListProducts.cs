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
    public class ListProducts
    {
        public class Query : IRequest<ICollection<Product>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ICollection<Product>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ICollection<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                return order.Products;
            }
        }
    }
}