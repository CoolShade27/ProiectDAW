using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database;
using Domain;
using MediatR;

namespace Application.Orders
{
    public class Edit
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
                var order = await _context.Orders.FindAsync(request.Id);

                if (order == null)
                {
                    throw new Exception("Wrong order Id.");
                }

                order.Products = request.Products ?? order.Products;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}