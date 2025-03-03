async function getCsrfToken() {
    const response = await fetch('http://localhost:3000/api/csrf-token', {
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
    return data.csrfToken;
  }