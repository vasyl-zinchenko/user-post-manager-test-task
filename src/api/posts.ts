import { useFetch } from '@/composables/useFetch';
import { API_BASE_URL } from '@/config/api';
import type { Post } from '@/types/models';

interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export function postApi() {
  const { fetchData, data, error, loading } = useFetch();

  const getPostsByUserId = async (
    userId: number
  ): Promise<{
    data: Post[] | null;
    error: string | null;
    loading: boolean;
  }> => {
    await fetchData(`${API_BASE_URL}/posts?postId=${userId}`);
    return {
      data: data.value as Post[] | null,
      error: error.value,
      loading: loading.value,
    };
  };

  const createPost = async (
    userId: number,
    payload: PostPayload
  ): Promise<{ data: Post | null; error: string | null }> => {
    await fetchData(`${API_BASE_URL}/posts?postId=${userId}`, 'POST', payload);
    return { data: data.value as Post | null, error: error.value };
  };
  return { getPostsByUserId, createPost };
}
