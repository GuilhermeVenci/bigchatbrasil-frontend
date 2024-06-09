const apiRequest = async (
  url: string,
  method: string = 'GET',
  body: any = null
) => {
  const options: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    options
  );

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      console.log('Unautorized');
    } else if (response.status === 500) {
      console.log('Not found');
    } else {
      console.error(
        `API request failed with status ${response.status}: ${errorText}`
      );
      console.error(`API request failed with status ${response.status}`);
    }
  }

  const responseText = await response.text();
  if (!responseText) {
    return null;
  }

  return JSON.parse(responseText);
};

export default apiRequest;
