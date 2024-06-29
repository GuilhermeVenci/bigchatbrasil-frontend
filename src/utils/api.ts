import axios, { AxiosRequestConfig } from 'axios';

const apiRequest = async (
  url: string,
  method: string = 'GET',
  body: any = null
) => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          console.log('Unauthorized');
        } else if (status === 404) {
          console.log('Not found');
          return null;
        } else if (status === 500) {
          console.log('Database not found');
        } else {
          console.log(`API request failed with status ${status}: ${data}`);
        }
        throw new Error(`API request failed with status ${status}: ${data}`);
      } else if (error.request) {
        console.log('No response received');
        throw new Error('No response received');
      } else {
        console.log('Error setting up request:', error.message);
        throw new Error(`Error setting up request: ${error.message}`);
      }
    } else {
      console.log('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};

export default apiRequest;
