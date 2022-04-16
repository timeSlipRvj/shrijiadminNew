export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  // return true;//testing
  return localStorage.getItem("token") || null;
};
export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};
export const setUser = (id) => {
  localStorage.setItem("userId", id);
};
export const getUser = () => {
  return localStorage.getItem("userId");
};
export const removeUser = () => {
  localStorage.removeItem("userId");
};
export const setUserDetails = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUserDetails = () => {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
export const removeUserDetails = () => {
  localStorage.removeItem("user");
};
