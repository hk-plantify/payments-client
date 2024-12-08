const fetchClient = async (url: string, options: RequestInit = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(
    `${BASE_URL}/v1/pay/payments${url}`,
    mergedOptions
  );
  // 통신 에러
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    const data = await response.json();
    return data;
  }
};

export default fetchClient;
