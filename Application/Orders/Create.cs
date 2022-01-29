using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;

namespace Application.Orders
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public ICollection<Product> Products { get; set; }
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
                var order = new Order
                {
                    Id = request.Id,
                    Products = request.Products
                };
                _context.Orders.Add(order);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}