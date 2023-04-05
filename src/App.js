import React, { useEffect } from 'react';
import { useState } from 'react';
import AddMovie from './components/AddMovie';

import MoviesList from './components/MoviesList';
import './App.css';
import { useCallback } from 'react';

function App() {

  const baseUrl = "https://swapi.dev/api/films/";
  const firebaseUrl = "https://react-http-922dd-default-rtdb.firebaseio.com/movies.json";
  const defaultMovies = [];
  const [movies, setMovies] = useState(defaultMovies);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(firebaseUrl).then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      return response.json();
    }).catch(err => { //use to catch any potential errors
      console.log(err)
      setError(err.message);
    })
      .then(data => {
        console.log(data)
        const loadedMovies = [];
        for (const key in data) {
          // console.log(data[key].title)
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate

          })
        }
        // const transformData = data.results.map(value => {
        //   return {
        //     id: value.episode_id,
        //     title: value.title,
        //     releaseDate: value.release_date,
        //     openingText: value.opening_crawl
        //   }
        // })
        setMovies(loadedMovies);
        setLoading(false);
      });
  }, []);// for dependency array

  //acts like ngOninit function
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // (async and await)
  // async function addMovieHandler(movie) {
  //   console.log(movie);
  //   const reponse = await await fetch(firebaseUrl, {
  //     method: 'POST',
  //     body: (JSON.stringify(movie)),
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   });
  //   const data = await reponse.json();
  //   console.log(data);
  // }
  function addMovieHandler(movie) {
    fetch(firebaseUrl, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    })
  }

  function deleteMovies() {
    fetch(firebaseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      return res.json();
    }).catch((err) => {
      console.log(err.message);
    })
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
        {movies.length > 0 ? <button onClick={deleteMovies}>Delete Movies</button>:''}
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
