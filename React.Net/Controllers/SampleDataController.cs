using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace React.Net.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Store> GetStore()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index =>
            {
                var rand = rng.Next(0, 100);
                return new Store
                {
                    StoreID = index,
                    ActiveVTs = rand,
                    AllocatedVTs = rand + rng.Next(0, 20)
                };
            }
            );
        }

        [HttpGet("[action]")]
        public IEnumerable<VT> GetVT()
        {
            var rng = new Random();
            return Enumerable.Range(1, 100).Select(index =>
            {
                var rand = rng.Next(100000000, 999999999);
                return new VT
                {
                    VTID = index,
                    CardNum = rand,
                    TTL = rng.Next(0, 200)
                };
            }
            );
        }

        [HttpGet("[action]")]
        public JsonResult GetTime()
        {
            return Json(DateTime.Now.ToLocalTime().ToString());
        }

        public class Store
        {
            public int StoreID { get; set; }
            public int ActiveVTs { get; set; }
            public int AllocatedVTs { get; set; }
        }

        public class VT
        {
            public int VTID { get; set; }
            public int CardNum { get; set; }
            public int TTL { get; set; }
        }
    }
}
