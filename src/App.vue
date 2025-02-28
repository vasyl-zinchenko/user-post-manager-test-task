<template>
  <BaseModal v-if="modalStore.isOpen" />
  <Header />
  <RouterView />
</template>

<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue';
import { useModalStore } from '@/store/modalStore';
import Header from '@/components/layouts/Header.vue';

const modalStore = useModalStore();
</script>

<style scoped></style>
