using CsvHelper;
using FullStack_Api.Model;
using System.Globalization;

namespace FullStack_Api.Repository
{
  

        public interface ICsvMethods  //interface for csv methods
        {
            bool IsCsv(string k);
            bool writecsvtosql(string k);

            string extractdata();
        }
        public class Csvmethods : ICsvMethods
        {
           private readonly IFlightmethods _methods;
        public Csvmethods(IFlightmethods _methods)
        {
            this._methods = _methods;
        }
            public bool IsCsv(string k)   //checking for csv
            {
                string[] p = k.Split('.');
                bool k1 = false;
                foreach (var p1 in p)
                {
                    if (p1 == "csv")
                    {
                        k1 = true;
                        break;
                    }
                }
                return k1;
            }

            public bool writecsvtosql(string fname) //writing to the sql
            {
            
                try
                {
                    using (var reader = new StreamReader(fname))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Read();
                            csv.ReadHeader();
                            while (csv.Read())
                            {
                            var pk = csv.GetRecord<Addflight>();
                            var k1= new flightdetail()
                            {
                                id = Guid.NewGuid().ToString(),
                                dep_date = Convert.ToDateTime(pk.dep_date),
                                arr_date=Convert.ToDateTime(pk.arr_date),
                                dep_dest=pk.dep_dest.ToString(),
                                arr_dest=pk.arr_dest.ToString(),
                                flightid=pk.flightid
                            };
                            _methods.insertdata(k1);
                            }
                        }

                    }
                    return true;
                }
                catch
                {
                    return false;
                }

            }

            public string extractdata() //extracting data from the sql
            {
                var p = _methods.findall();
                string[] columns = new string[] { "flightid", "dep_dest", "arr_dest", "dep_date",  "arr_date" };
                string csv = string.Empty;
                int i = 0;
                foreach (var ps in columns)
                {
                    if (i < columns.Length - 1)
                    {

                        csv += ps + ',';
                        i++;
                    }
                    else
                        csv += ps + "\r\n";


                }

            if (p.Count>0)
            {
                foreach (var pd in p)
                {
                    csv += pd.flightid.Replace(',', ';') + ',';
                    csv += pd.dep_dest.Replace(',', ';') + ',';
                    csv += pd.arr_dest.Replace(',', ';') + ',';
                    csv += Convert.ToString(pd.dep_date).Replace(',', ';').Replace('-', '/') + ',';
                    csv += pd.arr_date.ToString().Replace(',', ';').Replace('-', '/')+"\r\n";


                }
                return csv;
            }
            else
            {
                return null;
            }

            }


        }
    
}
