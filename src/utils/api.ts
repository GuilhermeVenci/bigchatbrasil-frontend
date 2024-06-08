// src/utils/api.ts
const apiRequest = async (
  url: string,
  method: string = 'GET',
  body: any = null
) => {
  const options: RequestInit = {
    method,
    credentials: 'include', // Incluir cookies na requisição
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

  console.log(
    `Request to ${url} with method ${method} resulted in status ${response.status}`
  );

  if (!response.ok) {
    const errorText = await response.text(); // Capture o corpo da resposta em caso de erro
    console.error(
      `API request failed with status ${response.status}: ${errorText}`
    );
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};

export default apiRequest;
