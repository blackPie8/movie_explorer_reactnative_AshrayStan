export const getMessaging = jest.fn(() => ({
  requestPermission: jest.fn(),
  getToken: jest.fn(() => Promise.resolve('mock-token')),
}));
export const onMessage = jest.fn(() => jest.fn());
export const getToken = jest.fn(() => Promise.resolve('mock-token'));
export default {
  getMessaging,
  onMessage,
  getToken,
};
