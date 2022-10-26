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

        //Ajout d'une nouvelle ToDoList
        [HttpPost("posttodo")]
        public IActionResult AjouterToDoList([FromBody] ToDoListe todoliste)
        {
            try
            {
                /*todoliste.Personne.Add(GetPersonneById(id));*/
                _context.ToDoListe.Add(todoliste);
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

        //Modification d'une ToDoList
        [HttpPost]
        [Route("update")]
        public IActionResult ToDoListTerminé(long id)
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

        //Suppression d'une ToDoList
        [HttpPost("postdeltodo/")]
        public IActionResult SupprimerToDoList(int id)
        {
            try
            {
                _context.ToDoListe.Remove(_context.ToDoListe.Find(id));
                _context.SaveChanges();
                _logger.LogTrace("supprimer de la bdd");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //Suppression d'une tache
        [HttpPost("postdeltache/")]
        public IActionResult SupprimerTache(int id)
        {
            try
            {
                _context.Tache.Remove(_context.Tache.Find(id));
                _context.SaveChanges();
                _logger.LogTrace("supprimer de la bdd");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //Affichage de l'ensemble des ToDoListes
        [HttpGet("list")]
        public IEnumerable<ToDoListe> GetToDoListes() {
            return AfficherToDoListes();
        }

        //Affichage des ToDoListes qui m'appartiennent
        [HttpGet("listByUserId")]
        public IEnumerable<ToDoListe> GetToDoListesByUserID(int id)
        {
            Personne _user = GetPersonneById(id);
            return _context.ToDoListe.Where(t => t.Personne == _user).ToList();
        }

        //Affichage des taches qui appartiennent à une todoliste
        [HttpGet("listTache")]
        public IEnumerable<Tache> GetTaches(int id)
        {
            return _context.Tache.Where(t => t.TodoListId == id).ToList();
        }



        //Affichage de l'ensemble des ToDoListes en asynchrone
        [HttpGet]
        [Route("listasync")]

        public Task<List<ToDoListe>> GetToDoListesAsync()
        {
            return AfficherToDoListesAsync();
        }
        [HttpGet("listpersonne")]

        //Renvoie la liste des utilisateurs
        public IEnumerable<Personne> GetPersonne()
        {
            return Afficher_personnes();
        }
        [HttpGet]

        public string Get()
        {
            return "test";
        }
        public List<Personne> Afficher_personnes()
        {
            //var all = from p in _context.ToDoListe select p;
            return _context.Personne.ToList();
        }
        public List<ToDoListe> AfficherToDoListes()
        {
            return _context.ToDoListe.ToList();
        }

        public Task<List<ToDoListe>> AfficherToDoListesAsync()
        {
            return _context.ToDoListe.ToListAsync();
        }

        public ToDoListe GetToDoListeById(int id)
        {
            var result = _context.ToDoListe.Find(id);
            return result;
        }

        public Tache GetTacheById(int id)
        {
            var result = _context.Tache.Find(id);
            return result;
        }
        public Personne GetPersonneById(int id)
        {
            var result = _context.Personne.Find(id);
            return result;
        }

    }
}