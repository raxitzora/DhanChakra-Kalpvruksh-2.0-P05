async function request(endpoint, options = {}, getToken) {
  const token = await getToken();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    }
  );

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();

    throw new Error(
      `Server returned a non-JSON response (${response.status}): ${text.slice(
        0,
        200
      )}`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

async function get(endpoint, getToken) {
  return request(
    endpoint,
    {
      method: "GET",
    },
    getToken
  );
}

async function post(endpoint, body, getToken) {
  return request(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    getToken
  );
}

async function put(endpoint, body, getToken) {
  return request(
    endpoint,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
    getToken
  );
}

async function remove(endpoint, getToken) {
  return request(
    endpoint,
    {
      method: "DELETE",
    },
    getToken
  );
}

export const api = {
  get,
  post,
  put,
  remove,
};