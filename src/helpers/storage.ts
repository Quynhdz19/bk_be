const accessToken = "admin_access_token";

export function hasStorageJwtToken() {
  return !!localStorage.getItem(accessToken);
}

export function removeStorageJwtToken() {
  localStorage.removeItem(accessToken);
}

export function setStorageJwtToken(token: string) {
  localStorage.setItem(accessToken, token);
}

export function getStorageJwtToken() {
  return localStorage.getItem(accessToken);
}


