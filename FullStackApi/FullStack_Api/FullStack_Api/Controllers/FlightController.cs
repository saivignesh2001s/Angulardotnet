using FullStack_Api.Model;
using FullStack_Api.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullStack_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IFlightmethods _flightmethods;
        public FlightController( IFlightmethods flightmethods)
        {
            
            _flightmethods = flightmethods;
        }

        
        
        // GET: api/<FlightController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var flight= _flightmethods.findall();
            return Ok(flight);
        }

        // GET api/<FlightController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var flight= _flightmethods.find(id);
            if (flight == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(flight);
            }
        }

        // POST api/<FlightController>
        [HttpPost]
        public async Task<IActionResult> Postflight([FromBody]flightdetail p)
        {
            p.id=Guid.NewGuid().ToString();   
            var k = _flightmethods.insertdata(p);
            return Ok(k);
           
        }

        // PUT api/<FlightController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]flightdetail value)
        {
            var flight=_flightmethods.updatedata(id, value);
            if(flight == null)
            {
                return NotFound();
            }
            return Ok(flight);
        }

        // DELETE api/<FlightController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            bool k=_flightmethods.deletedata(id);
            return Ok(k);
           
        }
    }
}
