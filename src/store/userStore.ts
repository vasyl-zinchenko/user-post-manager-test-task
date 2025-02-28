import { defineStore } from 'pinia';
import type { User } from '@/types/models';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([]);

  const setUsers = (data: User[]) => {
    users.value = data;
  };

  return { users, setUsers };
});
