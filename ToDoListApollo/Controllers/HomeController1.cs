using Microsoft.AspNetCore.Mvc;
using System;

namespace ToDoListApollo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController1Controller : ControllerBase
    {
        
        private readonly ILogger<HomeController1Controller> _logger;

        public HomeController1Controller(ILogger<HomeController1Controller> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Tache> Get()
        {
            return Enumerable.Range(1, 1).Select(index => new Tache
            {
                name = "gzre",
                id = 2,
                description = "é&",
                id_l = 2
            })
            .ToArray();
        }
    }
}