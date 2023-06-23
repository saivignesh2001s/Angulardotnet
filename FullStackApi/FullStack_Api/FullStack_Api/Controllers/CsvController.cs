using FullStack_Api.Model;
using FullStack_Api.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullStack_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvController : ControllerBase
    {
        private readonly ICsvMethods csvMethods;
        private readonly IWebHostEnvironment Environment;
        public CsvController(ICsvMethods csvMethods, IWebHostEnvironment environment)
        {
            this.csvMethods = csvMethods;
            Environment = environment;
        }
 
        [HttpPost]
        public async Task<IActionResult> Post([FromForm]IFormFile file)
        {   
            if (file == null || file.Length == 0)
            {
                return Ok("Notsuccess") ;
                    }
                if (csvMethods.IsCsv(file.FileName))
                {

                    string p = Path.GetFileName(file.FileName);
                    string k = Path.Combine(this.Environment.ContentRootPath, "Uploads");
                    string path = Path.Combine(k, p);
                    using (var fs = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(fs);
                        fs.Dispose();
                    }
                    bool k1 = csvMethods.writecsvtosql(path);
                    if (k1)
                    {
                        return Ok("success");
                    }
                    else
                    {
                        return Ok("failure");
                    }

                }
                else
                {
                    return Ok("Upload");
                }
            

        }



        [HttpGet]
        public async Task<IActionResult> extractdata()
        {
            string p= csvMethods.extractdata();
            return Ok(p);
        }

       
    }
}
