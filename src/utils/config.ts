export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (
  method: string,
  data: any,
  token: any | null = null,
  image: any = null
) => {
  let config: Record<string, any> = {};

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};
