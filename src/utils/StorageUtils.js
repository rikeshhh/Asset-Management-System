export function getTokenFromLocalStorage() {
  return localStorage.getItem("Token");
}

export function setTokenToLocalStorage(token) {
  return localStorage.setItem("Token", token);
}
