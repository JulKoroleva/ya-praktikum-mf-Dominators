export function setCustomCookieWithMaxAge(
  name: string,
  value: string | boolean,
  maxAgeInSeconds: number,
) {
  document.cookie = `${name}=${value}; max-age=${maxAgeInSeconds}; path=/;`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
