namespace Application.Core
{
    public class PaginationParams<TCursor>
    {
        private const int MaxPageSize = 50;
        public TCursor? Cursor { get; set; }
        private int _pageSize = 3;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }  //this is the return type for the Query eg List of Activities. Keys required to perform the query will be listed below as properties.
}