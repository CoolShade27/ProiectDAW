using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public Address Address { get; set; }
        public ICollection<Order> Orders { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
    }
}