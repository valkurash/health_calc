using System.Web;
using System.Web.Optimization;

namespace Health_Calc
{
	public class BundleConfig
	{
		// For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
				"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
				"~/Scripts/i18n/ui-datepicker_ru.js",
				"~/Scripts/jquery-ui.js", //slider
				"~/Scripts/jquery.sticky.js",
				"~/Scripts/jquery.inputmask.js",
				"~/Scripts/jquery.inputmask.date.extensions.js",
				"~/Scripts/jquery.inputmask.regex.extensions.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
				"~/Scripts/jquery.unobtrusive*",
				"~/Scripts/jquery.validate*"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
				"~/Scripts/jquery.bootstrap-touchspin.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/angular").Include(
				"~/Scripts/angular.js",
				"~/Scripts/angular-resource.js",
				"~/Scripts/angular-sanitize.js",
				"~/Scripts/angular-route.js",
				"~/Scripts/angular-mock.js",
				"~/Scripts/ui-bootstrap.js", //dropdown
				"~/Scripts/i18n/angular-locale_ru-ru.js"));

			bundles.Add(new ScriptBundle("~/bundles/app").Include(
				"~/Scripts/app/app.js",
				"~/Scripts/app/services.js",
				"~/Scripts/app/directives.js",
				"~/Scripts/app/controllers.js",
				"~/Scripts/app/filters.js"
				));
			bundles.Add(new ScriptBundle("~/bundles/jasmine").Include(
				"~/Scripts/jasmine/jasmine.js",
				"~/Scripts/jasmine/jasmine-html.js",
				"~/Scripts/jasmine/jasmine-jquery.js",
				"~/Scripts/qUnit/qunit.js"
				));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
				"~/Scripts/modernizr-*"));

			bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
				"~/Content/bootstrap.css",
				"~/Content/bootstrap-responsive.css"
				));


			bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/health_calc.css"));


			bundles.Add(new StyleBundle("~/Content/existingCss").Include("~/Content/font.css",
				"~/Content/calculator.css",
				"~/Content/form.css",
				"~/Content/landing.css",
				"~/Content/style.css",
				"~/Content/header.css",
				"~/Content/control-panel.css",
				"~/Content/social.css"));

			bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
				//"~/Content/themes/base/jquery-ui.css",
				//"~/Content/themes/base/jquery-ui.structure.css",
				"~/Content/themes/base/jquery-ui-lightness-custom.css"
				));
		}
	}
}