export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('access_token');
  // Here you can add more sophisticated token validation if needed
  return !!token;
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};