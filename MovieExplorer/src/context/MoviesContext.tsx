import React, { useState, useEffect, useContext, createContext} from 'react'
import { GetMovieById, GetMoviesByGenre, GetMoviesData } from '../axiosQuery/axiosRequest';

const MoviesContext = createContext();

export const MoviesProvider = ({children}) => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)
const [filteredMovies, setFilteredMovies] = useState([])
const [filById, setFilById] = useState([])
const [apiGenre, setApiGenre] = useState('');
const [role, setRole] = useState('user')
const [token, setToken] = useState('')
const [page, setPage] = useState(1)
const [allMovies, setAllMovies] = useState(movies)
const [deviceToken, setDeviceToken] = useState('')
const [isPremiumRestricted, setIsPremiumRestricted] = useState(true);
const [username, setUsername] = useState('')

    const fetchMovies = async () => {
      try{
        setLoading(true)
      const data = await GetMoviesData(page);
      setMovies(data);
      console.log(data)
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
        // console.log(filteredGenre);
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
        setIsPremiumRestricted(false)
        console.log(filById)
        setLoading(false);
      } catch (error) {
        console.log("Error Occured", error);
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchMovies();
    }, []);

    useEffect(()=> {
        fetchMoviesByGenre();
    },[apiGenre])

  return (
    <MoviesContext.Provider value={{ movies,filteredMovies, loading, setApiGenre, filById, fetchMoviesById, role, setRole, token,  setToken, page, setPage, allMovies, setAllMovies, deviceToken, setDeviceToken, setIsPremiumRestricted, isPremiumRestricted, username, setUsername }}>
      {children}
    </MoviesContext.Provider>
  )
}
export const useMovies = () => {
  return useContext(MoviesContext)
}