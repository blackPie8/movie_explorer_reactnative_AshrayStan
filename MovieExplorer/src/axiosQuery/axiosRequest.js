import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'https://movie-explorer-ror-vishal-kanojia.onrender.com/api/v1';

export const SignUpRequest = async (data) => {
  const res = await axios.post(
    `${BASE_URL}`,
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
      `${BASE_URL}/users/sign_in`,
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
    // console.error("error", err.response);
    throw err;
  }
};

export const LogoutRequest = async (user_token) => {
  try {
  return await axios.delete(
    `${BASE_URL}/users/sign_out`,
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
  const res = await axios.get(`${BASE_URL}/movies?page=${pageNum}`)
    return res.data.movies
  }catch(error){
    console.log("Error fetching movies", error.response)
    return null;
  }
  };


  export const GetMoviesByGenre = async(genre) => {
    try{
      const res = await axios.get(`${BASE_URL}/movies?genre=${genre}`)
      return res.data.movies
    } catch (error) {
      console.log("Error fetching genre", error)
      return null;
    }
  };


export const GetMovieById = async (id, token) =>{
  try{
    const res = await axios.get(`${BASE_URL}/movies/${id}`, 
      {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
    );
    //     if (res.status === 403) {
    //   setFilById(null);
    //   setIsPremiumRestricted(true);
    //   return;
    // }

    return res.data;
  } catch(err) {
    console.log("Error occured",err);
    return null;
  }
}

// Exlore Page

export const searchMovies = async (title) => {
  try {
    const res = await axios.get(`${BASE_URL}/movies`, {
      params: { title },
    });
    return res.data.movies || [];
  } catch (error) {
    console.error("Search error:", error?.response?.data || error.message);
    throw error;
  }
};

export const getSuggestions = async (title) => {
  try {
    const res = await axios.get(`${BASE_URL}/movies`, {
      params: { title },
    });
    return res.data.movies || [];
  } catch (error) {
    console.error("Suggestion fetch error:", error?.response?.data || error.message);
    throw error;
  }
};


export const AddNewMovie = async(formData, token) => {
  try{
    const res = await axios.post(`${BASE_URL}/movies`, 
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
      `${BASE_URL}/users/update_device_token`,
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


export const UpdateMovieRequest = async (id, formData, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/movies/${id}`,
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


export const createSubscription = async (planType, token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    const response = await axios.post(
      `${BASE_URL}/subscriptions`,
      { plan_id: planType },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const paymentIntentId = response.data.payment_intent_id;
    const clientSecret = response.data.client_secret;

    if (!paymentIntentId) {
      throw new Error('No payment intent ID returned from server.');
    }

    return { payment_intent_id: paymentIntentId, client_secret: clientSecret };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to initiate subscription');
  }
};


export const confirmSubscription = async (paymentIntentId, token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    const response = await axios.post(
      `${BASE_URL}/subscriptions/confirm`,
      { payment_intent_id: paymentIntentId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('confirmSubscription: Response:', response.data);
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response;
  } catch (error) {
    console.error('confirmSubscription: Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    throw new Error(error.message || 'Failed to confirm subscription');
  }
};



export const checkSubscriptionStatus = async (user_token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/subscriptions/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user_token}`,
        },
      }
    );

    console.log('Subscription Status Response:', res.data);
    return res;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return null;
  }
};


export const deleteExistingMovie = async (id, token) => {
  try {
    if (!token) {
      Alert.alert('You need to sign in first.');
      throw new Error('No authentication token found');
    }

    await axios.delete(
      `${BASE_URL}/movies/${id}`,
      {
      headers: {
        Authorization: `Bearer ${token}` ,
        Accept: 'application/json',
      },
    });

    // Alert.alert('Movie deleted successfully!');
    return true;
  } catch (error) {
    console.error('Error deleting movie:', error.message, error.response?.data);
    Alert.alert(error.response?.data?.error || 'Failed to delete movie');
    return false;
  }
};