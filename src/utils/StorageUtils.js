export function setTokenToLocalStorage(token) {
  return localStorage.setItem("Token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("Token");
}

export function clearTokenFromLocalStorage() {
  return localStorage.removeItem("Token");
}

export function addUserIdToLocalStorage(userId) {
  return localStorage.setItem("userId", userId);
}
export function getUserIdFromLocalStorage() {
  return localStorage.getItem("userId");
}
export function removeUserIdToLocalStorage() {
  return localStorage.removeItem("userId");
}
