import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fetchMovies from 'services/moviesApi';
import isLoading from 'utils/Loading';

const Home = () => {
  const [trends, setTrends] = useState(null);
  const trendsQuery = '/trending/movie/week';
  const location = useLocation();

  useEffect(() => {
    const fetchTrends = async () => {
      const response = await fetchMovies(trendsQuery);
      setTrends(response.data.results);
      isLoading(false);
    };

    fetchTrends();
  }, []);

  return (
    <div>
      {trends ? (
        <>
          <h1>The most popular movies this week:</h1>
          <ul>
            {trends.map(({ id, title }) => (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        isLoading(true)
      )}
    </div>
  );
};

export default Home;
