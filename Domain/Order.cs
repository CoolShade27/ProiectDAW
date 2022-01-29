using System;
using System.Collections.Generic;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}