import axios from 'axios';

export const SignUpRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/signup',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const LoginRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/login',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const GetMoviesData = async() => {
  try{
  const res = await axios.get('https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies')
    return res.data.movies
  }catch(error){
    console.log("Error fetching movies", error)
    return null;
  }
  };

  export const GetMoviesByGenre = async(genre) => {
    try{
      const res = await axios.get(`https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies?genre=${genre}`)
      return res.data.movies
    } catch (error) {
      console.log("Error fetching genre", error)
      return null;
    }
  };

export const GetMovieById = async (id) =>{
  try{
    const res = await axios.get(`https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies/${id}`)
    return res.data;
  } catch(err) {
    console.log("Error occured",err);
    return null;
  }
};