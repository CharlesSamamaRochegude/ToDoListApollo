using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.Entity;
using System.Net;


namespace ToDoListApollo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController1Controller : ControllerBase
    {
        private startup context;
        private readonly ILogger<HomeController1Controller> _logger;

        public HomeController1Controller(ILogger<HomeController1Controller> logger)
        {
            _logger = logger;
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
        public HttpResponseMessage AjouterToDoList( ToDoListe todoliste)
        {
            var status = context.ToDoListe.Add(todoliste);
            if (status != null)
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        [HttpGet]

        public IEnumerable<ToDoListe> GetToDoListes() {
            return new List<ToDoListe>();/*context.AfficherToDoListes();*/
        }
    }
}