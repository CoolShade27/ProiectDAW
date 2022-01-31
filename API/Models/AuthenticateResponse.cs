using System.Collections.Generic;
using Domain;

namespace API.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public Address Address { get; set; }
        public ICollection<Order> Orders { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FullName = user.FullName;
            Username = user.Username;
            Role = user.Role;
            Address = user.Address;
            Orders = user.Orders;
            Token = token;
        }
    }
}