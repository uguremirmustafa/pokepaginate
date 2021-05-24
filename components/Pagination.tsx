import React, { ChangeEvent, FC } from 'react';

interface Props {
  limit: number;
  page: number;
  setLimit: (p: number) => void;
  setPage: (p: number) => void;
  pageCount: number;
}

const Pagination: FC<Props> = ({ limit, page, setLimit, pageCount, setPage }) => {
  return (
    <div className="pagination">
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        previous
      </button>

      <div className="pagesContainer">
        <label htmlFor="pages">page</label>
        <select
          name="pages"
          id="pages"
          value={page}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPage(parseInt(e.target.value))}
        >
          {Array.from(Array(pageCount).keys()).map((item) => (
            <option value={item + 1}>{item + 1}</option>
          ))}
        </select>
      </div>

      <div className="selectContainer">
        <label htmlFor="limit">per page</label>
        <select
          className="select"
          name="limit"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
        </select>
      </div>
      <button
        disabled={page === pageCount}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
