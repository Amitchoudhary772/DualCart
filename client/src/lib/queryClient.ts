import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const fullUrl = baseUrl + url;
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    
    // If no API base URL, use mock data for static deployment
    if (!baseUrl) {
      const { mockProducts, mockAffiliateDeals, mockUser } = await import('../data/mockData');
      const endpoint = queryKey.join("/");
      
      if (endpoint.includes('/api/products/featured')) {
        return mockProducts.filter(p => p.featured);
      }
      if (endpoint.includes('/api/products')) {
        return mockProducts;
      }
      if (endpoint.includes('/api/affiliate-deals')) {
        return mockAffiliateDeals;
      }
      if (endpoint.includes('/api/auth/user')) {
        return mockUser;
      }
      if (endpoint.includes('/api/cart')) {
        return [];
      }
      
      return null;
    }
    
    const url = baseUrl + queryKey.join("/");
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
