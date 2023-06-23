using FullStack_Api.Model;
using System.Data.SqlClient;

namespace FullStack_Api.Repository
{
    public interface IFlightmethods
    {
        flightdetail find(string id);
        flightdetail insertdata(flightdetail d);
        List<flightdetail> findall();
        bool deletedata(string id);
        flightdetail updatedata(string id,flightdetail d);
    }
    public class flightmethods : IFlightmethods
    {
        SqlConnection conn=null;
            public flightmethods()
        {
            conn=new SqlConnection("Data Source = LTPCHE032529213\\SQLEXPRESS; Initial Catalog = flights; Integrated Security = True");
        }
        public flightdetail updatedata(string id,flightdetail k)
        {
            SqlCommand cmd = new SqlCommand("[dbo].[Procedure]",conn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id",k.id);
            cmd.Parameters.AddWithValue("@flightid", k.flightid);
            cmd.Parameters.AddWithValue("@dep_dest", k.dep_dest);
            cmd.Parameters.AddWithValue("@dep_date", k.dep_date);
            cmd.Parameters.AddWithValue("@arr_dest", k.arr_dest);
            cmd.Parameters.AddWithValue("@arr_time", k.arr_date);
            cmd.Parameters.AddWithValue("@id1", id);
            conn.Open();
            int km=cmd.ExecuteNonQuery();
           
            if (km == 1)
            {
                conn.Close();
                return k;
            }
            else
            {
                conn.Close();
                return null;
            }

        }
       public bool deletedata(string id)
        {
            
                SqlCommand cmd = new SqlCommand("[dbo].[deleteProcedure]", conn);
                cmd.CommandType=System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@param1",id);
                conn.Open();
                int k=cmd.ExecuteNonQuery();
                conn.Close();
                if (k == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            
        }
        
        public List<flightdetail> findall()
        {
            SqlCommand cmd = new SqlCommand("Select * from flight", conn);
            conn.Open();
            SqlDataReader dr=cmd.ExecuteReader();
            List<flightdetail> ds=new List<flightdetail>();
            if(dr.HasRows)
            {
                while(dr.Read())
                {
                    flightdetail fs=new flightdetail();
                     fs.id =dr["id"].ToString();
                    fs.flightid = dr["flightid"].ToString();
                    fs.dep_dest = dr["dep_dest"].ToString();
                    fs.arr_dest = dr["arr_dest"].ToString();
                    fs.dep_date = Convert.ToDateTime(dr["dep_date"]);
                    fs.arr_date = Convert.ToDateTime(dr["arr_time"]);
                    ds.Add(fs);

                }
            }
            else
            {
                ds = null;
            }
            return ds;
            
        }
        public flightdetail find(string k)
        {
            
            SqlCommand cmd = new SqlCommand($"Select * from flight where id='{k}'", conn);
            
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            flightdetail fs = new flightdetail();
            if (dr.HasRows)
            {

                while (dr.Read())
                {
                    fs.id = dr["id"].ToString();
                    fs.flightid = dr["flightid"].ToString();
                    fs.dep_dest = dr["dep_dest"].ToString();
                    fs.arr_dest = dr["arr_dest"].ToString();
                    fs.dep_date = Convert.ToDateTime(dr["dep_date"]);
                    fs.arr_date = Convert.ToDateTime(dr["arr_time"]);
                }
                return fs;

                
            }
            else
            {
                return null;
            }
            


        }

        public flightdetail insertdata(flightdetail k)
        {
           
            SqlCommand cmdinsert = new SqlCommand("insert into flight values (@id,@flightid,@dep_dest,@dep_date,@arr_dest,@arr_time)", conn);
            cmdinsert.Parameters.AddWithValue("@id", k.id);
            cmdinsert.Parameters.AddWithValue("@flightid",k.flightid);
            cmdinsert.Parameters.AddWithValue("@dep_dest",k.dep_dest);
            cmdinsert.Parameters.AddWithValue("@dep_date",k.dep_date);
            cmdinsert.Parameters.AddWithValue("@arr_dest",k.arr_dest);
            cmdinsert.Parameters.AddWithValue("@arr_time", k.arr_date);

            conn.Open();
            int k1=cmdinsert.ExecuteNonQuery();
            conn.Close();
            if (k1 == 1)
            {
                return k;
            }
            else
            {
                return null;
            }



        }
    }
}
