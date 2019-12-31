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
        public IEnumerable<Store> GetStoreList()
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
        public IEnumerable<VT> GetVTList(int storeid)
        {
            var rng = new Random();
            return Enumerable.Range(1, 100).Select(index =>
            {
                var rand = rng.Next(100000, 999999);
                return new VT
                {
                    VTID = index,
                    CardNum = rand*1000+storeid,
                    TTL = storeid
                };
            }
            );
        }

        [HttpGet("[action]")]
        public IEnumerable<VTDetail> GetVT(int vtid)
        {
            var rng = new Random();
            return Enumerable.Range(1, 100).Select(index =>
            {
                var rand = rng.Next(8888, 9999);
                return new VTDetail
                {
                    Index = index,
                    Game = rand*1000 + vtid
                };
            }
            );
        }

        [HttpGet("[action]")]
        public JsonResult Reset()
        {
            return Json(new{ status = "success" });
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

        public class VTDetail
        {
            public int Index { get; set; }
            public int Game { get; set; }
        }

    }
}
