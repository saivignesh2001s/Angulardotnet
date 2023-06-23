namespace FullStack_Api.Model
{
    public class Addflight
    {
        public string flightid { get; set; }
        public string dep_dest { get; set; }

        public string arr_dest { get; set; }
        public DateTime dep_date { get; set; }
        public DateTime arr_date { get; set; }
    }
}
