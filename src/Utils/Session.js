export const __setAuthToken = (token) => {
    sessionStorage.setItem("token", token);
  };
  export const __getAuthToken = () => {
    return sessionStorage.getItem("token") || null;
  };
  export const __removeAuthToken = () => {
    return sessionStorage.removeItem("token");
  };
  export const __setUserDetails = (id, name, image) => {
      let user = {id, name, image}
      sessionStorage.setItem("user", JSON.stringify(user))
  };
  export const __getUserDetails = () => {
      let user = sessionStorage.getItem("user")
      return JSON.parse(user);
  };
  export const __removeUserDetails = () => {
      sessionStorage.removeItem("user")
  };