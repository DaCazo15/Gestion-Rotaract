<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: [String, Object],
    required: true
  },
})
</script>

<template>
  <div>
    <router-link
      :to="to"
      class="block md:inline-block rounded bg-[#d41367] py-2 px-3 font-bold uppercase text-white text-sm shadow hover:bg-[#e5146f]"
    >
      <slot></slot>
    </router-link>
  </div>
</template>
