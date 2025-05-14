import axios from 'axios';
import { useMovies } from '../context/MoviesContext';

export const SignUpRequest = async (data) => {
  const res = await axios.post(
    'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/users',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }
  );
  return res;
};


export const LoginRequest = async (data) => {
  try {
    const res = await axios.post(
      'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/users/sign_in',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return res;
  } catch (err) {
    console.error("error", err.response);
    throw err;
  }
};

export const LogoutRequest = async (user_token) => {
  try {
  return await axios.delete(
    'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/users/sign_out',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${user_token}`
      },
    }
  );
} catch(err){
  console.log("Error in logout", err)
}
};

export const GetMoviesData = async( pageNum ) => {
  try{
  const res = await axios.get(`https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/movies?page=${pageNum}`)
    return res.data.movies
  }catch(error){
    console.log("Error fetching movies", error.response)
    return null;
  }
  };


  export const GetMoviesByGenre = async(genre) => {
    try{
      const res = await axios.get(`https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/movies?genre=${genre}`)
      return res.data.movies
    } catch (error) {
      console.log("Error fetching genre", error)
      return null;
    }
  };


export const GetMovieById = async (id) =>{
  try{
    const res = await axios.get(`https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/movies/${id}`)

        if (res.status === 403) {
      setFilById(null);
      setIsPremiumRestricted(true);
      return;
    }

    return res.data;
  } catch(err) {
    console.log("Error occured",err.response);
    return null;
  }
}


export const AddNewMovie = async(formData, token) => {
  try{
    const res = await axios.post('https://movie-explorer-app.onrender.com/api/v1/movies', 
      formData,
      {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
    );
    console.log(res.data)
    return res.data;
  } catch (err){
    console.log('AddNewMovie error', err.response?.data || err);
  }
}


export const addDeviceNotification = async (device_token, user_token) => {
  try {
    const res = await axios.patch(
      'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/users/update_device_token',
      { device_token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user_token}`,
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(
      'addDeviceNotification error:',
      error.response?.data || error.message || error
    );
    throw error;
  }
};


// export const enableNotification = async (user_token) => {
//   try {
//     const res = await axios.patch(
//       'https://movie-explorer-app.onrender.com/api/v1/toggle_notifications',
//       null,
//       {
//         headers: {
//           Authorization: `Bearer ${user_token}` ,
//         },
//       }
//     );
//     console.log(res.data);
//     return res;
//   } catch (error) {
//     console.error(
//       'enabling/disabling notification error:',
//       error.res?.data || error.message || error
//     );
//     throw error;
//   }
// };


export const UpdateMovieRequest = async (id, formData, token) => {
  try {
    const res = await axios.patch(
      `https://movie-explorer-app.onrender.com/api/v1/movies/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('UpdateMovieRequest error:', err.response?.data || err);
    throw err;
  }
};


export const createSubscription = async (planType,token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    const response = await axios.post(
      "https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/subscriptions",
      {plan_id: planType,
        // platform:"mobile"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` ,
        },
      },
    );

    console.log('API Response:', response);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const checkoutUrl =
      response.data.checkout_url;

    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from server.');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to initiate subscription');
  }
};


export const checkSubscriptionStatus = async(user_token)=>{
  try {
    const res = await axios.get("https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1/subscriptions/webhook",
     {
      headers : {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${user_token}`,
      }
     }
    )
    return res;
    
  } catch (error) {
    console.log("some error occured",err);
    return null;
  };
}
