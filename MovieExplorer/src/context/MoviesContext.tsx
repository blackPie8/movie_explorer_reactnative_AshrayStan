import React, { useState, useEffect, useContext, createContext} from 'react'
import { checkSubscriptionStatus, GetMovieById, GetMoviesByGenre, GetMoviesData, showProfilePicture } from '../axiosQuery/axiosRequest';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
// const [isPremiumRestricted, setIsPremiumRestricted] = useState(true);
const [username, setUsername] = useState('')
const [currentPlan, setCurrentPlan] = useState(null);
const [status, setStatus] = useState(null);
const [planDuration, setPlanDuration] = useState(null);
const [profileImage, setProfileImage] = useState(null);
const [loadingProfileImage, setLoadingProfileImage] = useState(true);
  const navigation = useNavigation();

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
        const filteredById = await GetMovieById(movieId, token);
        setFilById(filteredById)
        console.log(filById)
        setLoading(false);
      } catch (error) {
        console.log("Error Occured", error);
        setLoading(false);
      }
    }

    const fetchCurrentPlan = async () => {
    if (!token) return;
    try {
      const subscription = await checkSubscriptionStatus(token);
      setCurrentPlan(subscription?.data.plan || null);
      setStatus(subscription?.data.status || null);
      setPlanDuration(subscription?.data.current_period_end || null);
    } catch (error) {
      console.log('Error fetching current plan:', error);
      setCurrentPlan(null);
    }
  };

  const handleMoviePress = async (item) => {
      console.log(currentPlan)
      if (currentPlan === 'free') {
  
        console.log(item.id)
        try {
          if (item.premium) {
            Alert.alert(
              'Restricted Content',
              'Please subscribe to a Basic or Premium plan to watch this movie.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'View Plans', onPress: () => navigation.navigate('Plans') },
              ]
            );
            return;
          }
          // Non-premium movie, allow navigation
          navigation.navigate('MovieDetails', { item });
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
        return;
  
      } else {
  
      if (currentPlan === 'basic' || currentPlan === 'premium') {
         navigation.navigate('MovieDetails', { item });
      }
  
     }
    }

   const fetchProfileImage = async () => {
  try {
    setLoadingProfileImage(true);
    const url = await showProfilePicture(token);
    setProfileImage(url);
  } catch (err) {
    console.error("Failed to fetch profile image:", err);
  } finally {
    setLoadingProfileImage(false);
  }
};

    useEffect(() => {
      fetchMovies();
    }, []);

    useEffect(()=> {
        fetchMoviesByGenre();
    },[apiGenre])

    useEffect(() => {
    fetchCurrentPlan();
  }, [token, ]);

  return (
    <MoviesContext.Provider value={{ movies,filteredMovies, fetchMovies, loading, apiGenre, setApiGenre, filById, fetchMoviesById, role, setRole, token,  setToken, page, setPage, allMovies, setAllMovies, deviceToken, setDeviceToken, username, setUsername, currentPlan, setCurrentPlan, fetchCurrentPlan, handleMoviePress, status, setStatus, planDuration, profileImage, setProfileImage,  loadingProfileImage, fetchProfileImage}}>
      {children}
    </MoviesContext.Provider>
  )
}
export const useMovies = () => {
  return useContext(MoviesContext)
}