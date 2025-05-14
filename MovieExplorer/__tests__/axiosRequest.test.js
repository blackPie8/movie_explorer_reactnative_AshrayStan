import axios from 'axios';
jest.mock('axios');

import {
  SignUpRequest,
  LoginRequest,
  LogoutRequest,
  GetMoviesData,
  GetMoviesByGenre,
  GetMovieById,
  AddNewMovie,
  addDeviceNotification,
  UpdateMovieRequest,
  createSubscription,
  checkSubscriptionStatus
} from '../src/axiosQuery/axiosRequest';

describe('API Request Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up user', async () => {
    const mockData = { email: 'test@example.com', password: '123456' };
    axios.post.mockResolvedValue({ data: { success: true } });

    const response = await SignUpRequest(mockData);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      mockData,
      expect.any(Object)
    );
    expect(response.data.success).toBe(true);
  });

  it('should log in user', async () => {
    const mockData = { email: 'test@example.com', password: '123456' };
    axios.post.mockResolvedValue({ data: { token: 'abc123' } });

    const response = await LoginRequest(mockData);
    expect(response.data.token).toBe('abc123');
  });

  it('should log out user', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'Logged out' } });

    const response = await LogoutRequest('token123');
    expect(axios.delete).toHaveBeenCalled();
    expect(response.data.message).toBe('Logged out');
  });

  it('should fetch movies data', async () => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }];
    axios.get.mockResolvedValue({ data: { movies: mockMovies } });

    const movies = await GetMoviesData(1);
    expect(movies).toEqual(mockMovies);
  });

  it('should fetch movies by genre', async () => {
    const mockMovies = [{ id: 2, genre: 'Action' }];
    axios.get.mockResolvedValue({ data: { movies: mockMovies } });

    const result = await GetMoviesByGenre('Action');
    expect(result).toEqual(mockMovies);
  });

  it('should fetch movie by ID', async () => {
    const mockMovie = { id: 3, title: 'Single Movie' };
    axios.get.mockResolvedValue({ status: 200, data: mockMovie });

    const result = await GetMovieById(3);
    expect(result).toEqual(mockMovie);
  });

  it('should add a new movie', async () => {
    const mockResponse = { success: true };
    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await AddNewMovie({}, 'token123');
    expect(result).toEqual(mockResponse);
  });

  it('should update device notification', async () => {
    const mockResponse = { updated: true };
    axios.patch.mockResolvedValue({ data: mockResponse });

    const result = await addDeviceNotification('device_token', 'user_token');
    expect(result).toEqual(mockResponse);
  });

  it('should update movie', async () => {
    const updated = { id: 5, title: 'Updated' };
    axios.patch.mockResolvedValue({ data: updated });

    const result = await UpdateMovieRequest(5, {}, 'token123');
    expect(result).toEqual(updated);
  });

  it('should create subscription', async () => {
    const mockResponse = { checkout_url: 'https://checkout.url' };
    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await createSubscription('premium', 'token123');
    expect(result.checkout_url).toBe('https://checkout.url');
  });

  it('should check subscription status', async () => {
    const mockResponse = { data: { active: true } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await checkSubscriptionStatus('token123');
    expect(result).toEqual(mockResponse);
  });
});
