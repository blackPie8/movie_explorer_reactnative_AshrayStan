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