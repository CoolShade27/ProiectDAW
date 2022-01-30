using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Domain;

namespace Database
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "Telefon SAMSUNG Galaxy A52s",
                        Price = 1699,
                        Description = "5G, 128GB, 6GB RAM, Dual SIM, Black",
                        Category = "Telefoane"
                    },
                    new Product
                    {
                        Name = "Laptop Gaming ACER Nitro 5 AN515-43-R18S",
                        Price = 3799,
                        Description = "AMD Ryzen 5 3550H pana la 3.7GHz, 15.6 Full HD, 16GB, SSD 256GB, NVIDIA GeForce GTX 1650 4GB, Free DOS, negru",
                        Category = "Laptop-uri & Desktop"
                    },
                    new Product
                    {
                        Name = "Combina frigorifica BEKO RCNA406E40ZXBN",
                        Price = 2399,
                        Description = "NeoFrost, 362 l, H 202.5 cm, Clasa E, argintiu",
                        Category = "Electrocasnice"
                    }
                };

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            if (!context.Orders.Any())
            {
                var order = new Order
                {
                    Products = new Collection<Product>()
                };
                context.Orders.Add(order);
                context.SaveChanges();
            }
        }
    }
}
