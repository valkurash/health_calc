using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Health_Calc.Controllers
{
		public class HomeController : Controller
		{
				public ActionResult Index()
				{
						return View();
				}

				public ActionResult HealthCalc()
				{
						return View();
				}
		}
}
