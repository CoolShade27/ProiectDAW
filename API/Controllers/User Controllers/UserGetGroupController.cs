using System.Linq;
using API.Authorization;
using API.Services;
using Database;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.User_Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserGetGroupController : ControllerBase
    {
        private IUserService _userService;
        private DataContext _context;

        public UserGetGroupController(IUserService userService, DataContext context)
        {
            _userService = userService;
            _context = context;
        }

        [Authorize(Role.Admin)]
        [HttpGet("{id:int}")]
        public IActionResult GetByIdWhere(int id)
        {
            var user = _context.Users.Where(user => user.Id == id);

            return Ok(user);
        }

        [Authorize(Role.Admin)]
        [HttpGet]
        public IActionResult GroupByRole()
        {
            var users = _context.Users.GroupBy(user => user.Role, user => user.FullName);

            return Ok(users);
        }
    }
}