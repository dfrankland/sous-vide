export default async (url, body) => {
  const response = await fetch(
    url,
    ...(
      body ? [{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }] : []
    ),
  );

  if (response.status !== 200) {
    console.error(response);
    throw new Error('Fetch was not successful.');
  }

  return response.json();
};
