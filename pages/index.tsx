import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

interface Pokemon {
  name: string;
  url: string;
}

export interface Data {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export default function Component() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(4);
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon`);
  const [data, setData] = useState<Data>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState<number>();
  console.log(limit, page);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          params: {
            offset: (page - 1) * limit,
            limit,
          },
        });
        await setData(res.data);
        setPageCount(Math.ceil(res.data.count / limit));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [page, limit]);

  if (loading) return <div>loading...</div>;

  return (
    <>
      <div className="container">
        <div className="grid">
          {error && <div>error</div>}
          {data &&
            data.results.map((item) => (
              <div key={item.url} className="article">
                <h2>{item.name}</h2>
              </div>
            ))}
        </div>
        {data && (
          <Pagination
            limit={limit}
            setLimit={setLimit}
            setPage={setPage}
            page={page}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
}
