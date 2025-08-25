export function getUserFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const base64 = token.split(".")[1];
    const payload = JSON.parse(atob(base64));
    if (payload?.exp && Date.now() >= payload.exp * 1000) {
      localStorage.removeItem("token");
      return null;
    }
    return payload; // { id, rol, iat, exp }
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
