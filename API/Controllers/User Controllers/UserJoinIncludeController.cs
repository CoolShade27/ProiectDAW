using System.Linq;
using API.Authorization;
using API.Services;
using Database;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.User_Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserJoinIncludeController : ControllerBase
    {
        private IUserService _userService;
        private DataContext _context;

        public UserJoinIncludeController(IUserService userService, DataContext context)
        {
            _userService = userService;
            _context = context;
        }
        
        [Authorize(Role.Admin)]
        [HttpGet]
        public IActionResult JoinAddresses()
        {
            var addresses = _context.Addresses;
            var users = _context.Users;
            var query = addresses.Join(
                users,
                address => address,
                user => user.Address,
                (address, user) =>
                new {AddressId = address.Id, UserId = user.Id}
            );

            return Ok(query);
        }

        [Authorize(Role.Admin)]
        [HttpGet("{id:int}")]
        public IActionResult IncludeOrders(int id)
        {
            var user = _context.Users.Include("Orders")
            .SingleOrDefault(user => user.Id == id);

            return Ok(user);
        }
    }
}