using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.Entity;
using System.Net;


namespace ToDoListApollo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        
        private readonly ILogger<HomeController> _logger;
        private AppDbContext _context;
        public HomeController(ILogger<HomeController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        /*[HttpGet]
        public ienumerable<tache> get()
        {
            return enumerable.range(1, 1).select(index => new tache
            {
                name = "gzre",
                id = 2,
                description = "é&",
                id_l = 2
            })
            .toarray();
        }*/
        [HttpPost]
        public IActionResult AjouterToDoList( ToDoListe todoliste)
        {
            try
            {
                var status = _context.ToDoListe.Add(todoliste);
                _context.SaveChanges();
                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        [HttpPost]
        [Route("update/{id}")]
        public IActionResult ModifierToDoList(long id)
        {
            try
            {
                var todo = _context.ToDoListe.Where(t => t.id_l == id).SingleOrDefault();
                if(todo == null)
                {
                    return NotFound();
                }
                todo.Active_l = 0;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("list")]

        public IEnumerable<ToDoListe> GetToDoListes() {
            return AfficherToDoListes();
        }

        [HttpGet]
        [Route("list2")]

        public Task<List<ToDoListe>> GetToDoListesAsync()
        {
            return AfficherToDoListesAsync();
        }

        [HttpGet]

        public string Get()
        {
            return "test";
        }

        public List<ToDoListe> AfficherToDoListes()
        {
            //var all = from p in _context.ToDoListe select p;
            return _context.ToDoListe
                .Include(t => t.Tache)
                .Where(t => t.Active_l == 1).ToList();
        }

        public Task<List<ToDoListe>> AfficherToDoListesAsync()
        {
            //var all = from p in _context.ToDoListe select p;
            return _context.ToDoListe.ToListAsync();
        }
    }
}