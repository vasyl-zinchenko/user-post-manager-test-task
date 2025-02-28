import { ref } from 'vue';

export function useFetch<T>() {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchData = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' = 'GET',
    body: any = null
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const options: RequestInit = {
        method: method,
        headers: {
          'content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    fetchData,
  };
}
