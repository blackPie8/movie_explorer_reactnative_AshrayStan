import React, { useState, useEffect, useContext, createContext} from 'react'
import { GetMoviesData } from '../axiosQuery/axiosRequest';

const MoviesContext = createContext();

export const MoviesProvider = ({children}) => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)


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
  
    useEffect(() => {
      fetchMovies();
    }, []);

  return (
    <MoviesContext.Provider value={{ movies, loading, fetchMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  return useContext(MoviesContext)
}