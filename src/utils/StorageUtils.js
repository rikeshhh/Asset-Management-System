
export function setTokenToLocalStorage(token) {
  return localStorage.setItem("Token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("Token");
}

export function clearTokenFromLocalStorage() {
  return localStorage.removeItem("Token");
}


