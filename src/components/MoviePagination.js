import { Pagination } from "react-bootstrap";

//utility function to generate an inclusive range of numbers
const rangeInclusive = (start, end) => new Array(end - start + 1).fill().map((_, i) => i + start);

const MoviePagination = ({ activePage, setPage, totalPage }) => {
  //determine the maximum number of pages to display  
  const pageCount = Math.min(totalPage, 10);

  //generate an array of page numbers
  const pages = rangeInclusive(1, pageCount);

  //if there's only one page or less, don't render pagination
  if (pageCount < 2) {
    return null;
  }

  return (
    <div>
      <Pagination>
        <Pagination.First disabled={activePage === 1} onClick={() => setPage(1)} />
        <Pagination.Prev disabled={activePage === 1} onClick={() => setPage(activePage - 1)} />
        {pages.map(page => (
          <Pagination.Item onClick={() => setPage(page)} key={page} active={page === activePage}>
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={activePage === pageCount} onClick={() => setPage(activePage + 1) } />
        <Pagination.Last disabled={activePage === pageCount} onClick={() => setPage(pageCount)} />
      </Pagination>
    </div>
  );
}

export default MoviePagination;