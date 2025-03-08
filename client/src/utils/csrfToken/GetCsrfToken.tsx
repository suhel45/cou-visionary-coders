export async function GetCsrfToken() {
  const response = await fetch('https://halalbondhon-server.vercel.app/csrf-token', {
    credentials: 'include', // Include cookies in the request
  });
  const data = await response.json();
  //return data.csrfToken;
}
