<template>
  <div class="container">
    <el-container>
      <el-table :data="filterUsers" row-key="id" v-loading="isLoading">
        <el-table-column prop="id" label="Id" width="70" />
        <el-table-column prop="name" label="Name" sortable />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="address.city" label="City" />
        <el-table-column align="center" width="250">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search by name"
            />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleViewButton(scope.row)">
              View
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, markRaw, defineAsyncComponent } from 'vue';
import { showNotification } from '@/helpers/notifications';
import { useUserStore } from '@/store/userStore';
import { useModalStore } from '@/store/modalStore';
import { userApi } from '@/api/users';
import type { User } from '@/types/models';

const { getUsers } = userApi();
const userStore = useUserStore();
const modalStore = useModalStore();

const users = ref<User[] | null>([]);
const search = ref('');
const selectedUserId = ref(0);
const isLoading = ref(true);

const handleViewButton = (user: { id: number }) => {
  modalStore.openModal(
    markRaw(defineAsyncComponent(() => import('@/components/UserPosts.vue'))),
    {
      user,
    }
  );
  selectedUserId.value = user.id;
};

const loadUsers = async () => {
  const { data, error, loading } = await getUsers();
  isLoading.value = loading;

  if (error) {
    showNotification('error', 'Users cannot be loaded');
    return;
  }
  if (data) {
    userStore.setUsers(data);
    users.value = data;
  }
};

const filterUsers = computed(() => {
  if (users.value) {
    return users.value.filter(
      (data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return [];
});

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.container {
  margin: auto;
}

.el-container {
  margin: 20px;
  border: 1px solid #e2e2e3;
  border-radius: 10px;
  padding: 10px;
}

div,
p,
span {
  font-size: 12px;
}

@media (min-width: 768px) {
  div,
  p,
  span {
    font-size: 14px;
  }
}
</style>
