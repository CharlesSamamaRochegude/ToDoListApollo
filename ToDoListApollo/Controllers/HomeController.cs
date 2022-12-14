using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public IActionResult AjouterToDoList([FromBody] ToDoListeViewModel todolisteV)
        {
            try
            {
                var todoliste = ToDoListeViewModel.Transform(todolisteV);
                _context.ToDoListe.Add(todoliste);
                _context.SaveChanges();
                _logger.LogTrace("ajouter à la bdd");
                return Ok(todoliste.id_l);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }
        //Ajout d'une nouvelle Tache rattaché à une todoliste
        [HttpPost("posttache")]
        public IActionResult AjouterTache([FromBody] TacheViewModel tache)
        {
            try
            {
                var tachev = TacheViewModel.Transform(tache);
                _context.Tache.Add(tachev);
                _context.SaveChanges();
                _logger.LogTrace("ajouter à la bdd");
                return Ok(tachev.id_t);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }
        //Ajout d'une personne à une todolist
        [HttpPost("postajoutpersonne/{id}")]
        public IActionResult AjouterPersonne(int id, [FromBody] List<int> id_p)
        {
            try
            {
                ToDoListe todo = GetToDoListeById(id);
                if (todo.Personne == null)
                {
                    todo.Personne = new List<Personne>();
                }
                todo.Personne.Clear();
                foreach (var item in id_p)
                {
                    todo.Personne.Add(GetPersonneById(item));
                }
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //modification d'une todoliste
        [HttpPost("postmodiftodo/{id}")]
        public IActionResult ModifToDoList(int id, [FromBody] ToDoListeViewModel todo)
        {
            try
            {
                ToDoListe _todo = GetToDoListeById(id);
                _todo.Titre_l = todo.Titre_l;
                _todo.Description = todo.Description;
                _todo.Date_echeance_l = todo.Date_echeance_l;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //modification d'une tache
        [HttpPost("postmodiftache/{id}")]
        public IActionResult PostModifTache(int id, [FromBody] TacheViewModel tache)
        {
            try
            {
                Tache _tache = GetTacheById(id);
                _tache.Titre_t = tache.Titre_t;
                _tache.active_l = tache.active_l;
                _tache.Date_echeance_l = tache.Date_echeance_l;
                _tache.PersonneId = tache.PersonneId;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //Ajout d'une personne à une tache
        [HttpPost("postajoutpersonnetache/{id}")]
        public IActionResult AjouterPersonneTache(int id, [FromBody] int id_p)
        {
            try
            {
                Tache tache = GetTacheById(id);

                tache.PersonneId = id_p;
                
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }
        //ajout d'une todolist à une tache
        [HttpPost("postajoutlistetache/{id}")]
        public IActionResult AjouterTodoListTache(int id, [FromBody] int id_l)
        {
            try
            {
                Tache tache = GetTacheById(id);

                tache.TodoListId = id_l;

                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //activation d'une todoliste
        [HttpPost("postactivationtodo/{id}")]
        
        public IActionResult ActivationToDoListe([FromBody]int active,int id)
        {
            try
            {
                ToDoListe toDoListe = GetToDoListeById(id);
                toDoListe.Active_l= active;
                _context.SaveChanges();
                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //activation d'une tache
        [HttpPost("postactivationtache/{id}")]

        public IActionResult ActivationTache([FromBody]int active, int id)
        {
            try
            {
                Tache tache = GetTacheById(id);
                tache.active_l = active;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return NotFound();
            }
        }

        //Modification d'une ToDoList
        [HttpPost]
        [Route("update")]
        public IActionResult ToDoListTerminé(int id)
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
        [HttpPost("postdeltodo/{id}")]
        public IActionResult SupprimerToDoList(int id)
        {
            try
            {
                List<Tache> variable = _context.Tache.Where(p => p.TodoListId == id).ToList();
                foreach (var item in variable)
                {
                    _context.Tache.Remove(item);
                }
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
        [HttpPost("postdeltache/{id}")]
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
        public IEnumerable<ToDoListeViewModelPersonne> GetToDoListes() {
            List<ToDoListeViewModelPersonne> var = ToDoListeViewModelPersonne.Transform(_context.ToDoListe.Include(p => p.Personne).ToList());
            return var;
        }

        [HttpGet("getpersonnesimpliquees/{id}")]
        public HashSet<PersonneViewModel> GetPersonnesImpliquees(int id)
        {
            IEnumerable<Tache> listeTache = GetTaches(id);
            List<int> id_personnes = new List<int>();
            HashSet<Personne> listePersonne = new HashSet<Personne>();
            foreach (Tache tache in listeTache)
            {
                id_personnes.Add(tache.PersonneId);
            }
            foreach (var item in id_personnes)
            {
                listePersonne.Add(GetPersonneById(item));
            }
            

            //var bl = _context.Personne.Include(t => t.Tache).Include(t => t.ToDoListes).Distinct().ToList();
            return PersonneViewModel.Transform(listePersonne);
        }

        //Affichage de l'ensemble des ToDoListes en asynchrone
        [HttpGet]
        [Route("listasync")]

        public Task<List<ToDoListe>> GetToDoListesAsync()
        {
            return AfficherToDoListesAsync();
        }

        //Affichage des ToDoListes qui m'appartiennent
        [HttpGet("listByUserId")]
        public IEnumerable<ToDoListe> GetToDoListesByUserID(int id)
        {
            Personne _user = GetPersonneById(id);
            return _context.ToDoListe.Where(t => t.Personne == _user).ToList();
        }

        //Affichage des taches qui appartiennent à une todoliste
        [HttpGet("listTache/{id}")]
        public IEnumerable<Tache> GetTaches(int id)
        {
            return _context.Tache.Where(t => t.TodoListId == id).ToList();
        }

        [HttpGet("listpersonne")]

        //Renvoie la liste des utilisateurs
        public IEnumerable<Personne> GetPersonne()
        {
            return Afficher_personnes();
        }

        [HttpGet("listpersonneviewmodel")]

        //Renvoie la liste des utilisateurs
        public IEnumerable<PersonneViewModel> GetPersonneviewmodel()
        {
           
            return PersonneViewModel.Transform(_context.Personne.ToHashSet());
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
        public IEnumerable<ToDoListe> AfficherToDoListes()
        {
            return _context.ToDoListe.Include(p=>p.Personne).ToList();
        }

        public Task<List<ToDoListe>> AfficherToDoListesAsync()
        {
            return _context.ToDoListe.ToListAsync();
        }

        public ToDoListe GetToDoListeById(int id)
        {
            ToDoListe result = _context.ToDoListe.Include(p=>p.Personne).Where(l=>l.id_l ==id).SingleOrDefault();
            return result;
        }

        [HttpGet("gettachebyid/{id}")]
        public Tache GetTacheById(int id)
        {
            var result = _context.Tache.Find(id);
            return result;
        }
        [HttpGet("GetPersonneByid/{id}")]
        public Personne GetPersonneById(int id)
        {
            var result = _context.Personne.Find(id);
            return result;
        }
    }
}