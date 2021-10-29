export async function isAuthenticated(): Promise<boolean> {
  const token = localStorage.token;
  if (!token) {
    return false;
  }
  const decoded = parseJwt(token);
  if (decoded === false) {
    return false;
  }
  if (new Date() >= new Date((decoded as any).exp * 1000)) {
    localStorage.token = undefined;
    return false;
  }
  return true;
}

function parseJwt(token: string): Record<string, unknown> | boolean {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return false;
  }
}
