using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;


namespace ToDoListApollo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {

        private readonly ILogger<HomeController> _logger;
        private AppDbContext _context;
        private IQueryProvider _inner;
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
        [HttpPost("posttodo/")]
        public IActionResult AjouterToDoList( ToDoListe todoliste)
        {
            try
            {
                var status = _context.ToDoListe.Add(todoliste);
                _context.SaveChanges();
                _logger.LogTrace("ajouter à la bdd");
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

        [HttpGet("list")]
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
            return _context.ToDoListe.ToList();
        }

        public Task<List<ToDoListe>> AfficherToDoListesAsync()
        {
            //var all = from p in _context.ToDoListe select p;
            return _context.ToDoListe.ToListAsync();
        }

    }
}