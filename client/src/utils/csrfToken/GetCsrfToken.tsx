export async function GetCsrfToken() {
  const response = await fetch('http://localhost:3000/csrf-token', {
    credentials: 'include', // Include cookies in the request
  });
  const data = await response.json();
  return data.csrfToken;
}
