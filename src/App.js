import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const baseUrl = "https://swapi.dev/api/films/";
  const defaultMovies = [];
  const [movies, setMovies] = useState(defaultMovies);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = () => {
    setLoading(true);
    setError(null);
    fetch(baseUrl).then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      return response.json();
    }).catch(err => { //use to catch any potential errors
      console.log(err)
      setError(err.message);
    })
      .then(data => {
        console.log(data.results)
        const transformData = data.results.map(value => {
          return {
            id: value.episode_id,
            title: value.title,
            releaseDate: value.release_date,
            openingText: value.opening_crawl
          }
        })
        setMovies(transformData);
        setLoading(false);
      });
  }

  //using try n catch (async and await)
  // async function fetchMovies() {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(baseUrl);
  //     if (!response.ok) {
  //       throw new Error('Something went wrong');
  //     }
  //     const data = await response.json();


  //     console.log(data.results)
  //     const transformData = data.results.map(value => {
  //       return {
  //         id: value.episode_id,
  //         title: value.title,
  //         releaseDate: value.release_date,
  //         openingText: value.opening_crawl
  //       }
  //     })
  //     setMovies(transformData);
  //   } catch (error) {
  //     console.log(error)
  //     setError(error.message);
  //   }
  //   setLoading(false);
  // }

  //this is a great example where should use let and const
  let content = <p> Found no movies...</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
 content = <p>Loading..</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 ? <MoviesList movies={movies} /> : ''}
        {!isLoading && movies.length == 0 ? < p > Found no movies...</p> : ''}
        {isLoading && !error ? <p>Loading...</p> : ''}
        {!isLoading && error ? '' : <p>{error}</p>} */}
        {/* alternate */}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length == 0 && !error && <p>Found no movies...</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment >
  );
}

export default App;
