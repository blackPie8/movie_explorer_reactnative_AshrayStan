import React, { useState, useEffect, useContext, createContext} from 'react'
<<<<<<< Updated upstream
import { GetMoviesData } from '../axiosQuery/axiosRequest';
=======
import { GetMovieById, GetMoviesByGenre, GetMoviesData } from '../axiosQuery/axiosRequest';
>>>>>>> Stashed changes

const MoviesContext = createContext();

export const MoviesProvider = ({children}) => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)
<<<<<<< Updated upstream

=======
const [apiGenre, setApiGenre] = useState('');
const [filteredMovies, setFilteredMovies] = useState([])
const [filById, setFilById] = useState([])
>>>>>>> Stashed changes

    const fetchMovies = async () => {
      try{
        setLoading(true)
      const data = await GetMoviesData();
      setMovies(data);
      } catch(error){
        console.log("Error fetching movies API", error)
      } finally{
        setLoading(false)
      }
    };
<<<<<<< Updated upstream
  
=======

    const fetchMoviesByGenre = async () => {
      try{
        setLoading(true);
        const filteredGenre = await GetMoviesByGenre(apiGenre);
        setFilteredMovies(filteredGenre);
        console.log(filteredGenre);
      } catch(error) {
        console.log("Error fetching genre", error)
      } finally {
        setLoading(false)
      }
    };

    const fetchMoviesById = async (movieId) => {
      try{
        const filteredById = await GetMovieById(movieId);
        setFilById(filteredById)
        console.log(filById)
        setLoading(false);
      } catch (error) {
        console.log("Error Occured", error);
        setLoading(false);
      }
    }

>>>>>>> Stashed changes
    useEffect(() => {
      fetchMovies();
    }, []);

  return (
<<<<<<< Updated upstream
    <MoviesContext.Provider value={{ movies, loading, fetchMovies }}>
=======
    <MoviesContext.Provider value={{ movies,filteredMovies, loading, setApiGenre, filById, fetchMoviesById }}>
>>>>>>> Stashed changes
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  return useContext(MoviesContext)
}