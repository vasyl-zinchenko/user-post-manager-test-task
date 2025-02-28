<template>
  <el-dialog v-model="modalStore.isOpen" modal-class="overide-animation">
    <component :is="component" />
  </el-dialog>
</template>

<script setup lang="ts">
import { markRaw, computed } from 'vue';

import { useModalStore } from '@/store/modalStore';

const modalStore = useModalStore();

const component = computed(() =>
  modalStore.component ? markRaw(modalStore.component) : null
);
</script>

<style>
.el-overlay-dialog {
  margin: auto;
  display: flex;
  justify-content: center;
  max-height: 800px;
}

.el-dialog {
  margin: 50px 50px;
  padding: 0;
  width: 90%;
}

.el-dialog__header {
  padding: 20px;
  background-color: rgb(232.8, 233.4, 234.6);
}

.el-dialog__headerbtn {
  height: 0;
  width: 0;
  right: 25px;
  top: 10px;
}

.el-dialog__headerbtn .el-dialog__close {
  color: rgb(232.8, 233.4, 234.6);
}

.el-dialog__close {
  background-color: rgb(115.2, 117.6, 122.4);
  border-radius: 10%;
}

.el-dialog__body {
  max-height: 90%;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .el-dialog {
    max-width: 700px;
    min-width: 300px;
  }
}
</style>
