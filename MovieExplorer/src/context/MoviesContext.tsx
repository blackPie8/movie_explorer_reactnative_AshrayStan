import React, { useState, useEffect, useContext, createContext} from 'react'
import { GetMoviesByGenre, GetMoviesData } from '../axiosQuery/axiosRequest';

const MoviesContext = createContext();

export const MoviesProvider = ({children}) => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)
const [apiGenre, setApiGenre] = useState('');
const [filteredMovies, setFilteredMovies] = useState([])

    const fetchMovies = async () => {
      try{
        setLoading(true)
      const data = await GetMoviesData();
      setMovies(data);
      // console.log(data)
      } catch(error){
        console.log("Error fetching movies API", error)
      } finally{
        setLoading(false)
      }
    };

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
  
    useEffect(() => {
      fetchMovies();
    }, []);

    useEffect(()=> {
        fetchMoviesByGenre();
    },[apiGenre])

  return (
    <MoviesContext.Provider value={{ movies,filteredMovies, loading, setApiGenre }}>
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  return useContext(MoviesContext)
}