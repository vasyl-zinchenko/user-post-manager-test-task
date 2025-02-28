import { useFetch } from '@/composables/useFetch';
import { API_BASE_URL } from '@/config/api';
import type { User } from '@/types/models';

export function userApi() {
  const { fetchData, data, error, loading } = useFetch();

  const getUsers = async (): Promise<{
    data: User[] | null;
    error: string | null;
    loading: boolean;
  }> => {
    await fetchData(API_BASE_URL + '/users');
    return {
      data: data.value as User[] | null,
      error: error.value,
      loading: loading.value,
    };
  };
  return { getUsers };
}
