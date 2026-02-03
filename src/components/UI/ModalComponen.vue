<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const toggleScroll = (isFixed) => {
  document.body.style.overflow = isFixed ? 'hidden' : 'auto';
};

onMounted(() => { if (props.show) toggleScroll(true); });
onUnmounted(() => toggleScroll(false));
</script>
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="emit('close')"
        ></div>

        <div class="
          relative bg-white text-gray-800
          w-full max-w-lg
          rounded-3xl shadow-2xl
          overflow-hidden
          transform transition-all
        ">
          <div class="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 class="text-xl font-bold text-[#d41367]">
              <slot name="header">Título del Modal</slot>
            </h3>
            <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <div class="p-6">
            <slot>Contenido principal</slot>
          </div>

          <div class="p-4 bg-gray-50 flex justify-end gap-3">
            <slot name="footer">

            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
