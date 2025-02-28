import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const component = ref<null | any>(null);
  const props = ref<Record<string, any>>({});
  const events = ref({});

  function openModal(
    newComponent: any,
    newProps: Record<string, any> = {},
    newEvents = {}
  ) {
    isOpen.value = true;
    component.value = newComponent;
    props.value = newProps;
    events.value = newEvents;
  }

  function closeModal() {
    isOpen.value = false;
    component.value = null;
    props.value = {};
    events.value = {};
  }

  return {
    isOpen,
    component,
    props,
    events,
    openModal,
    closeModal,
  };
});
