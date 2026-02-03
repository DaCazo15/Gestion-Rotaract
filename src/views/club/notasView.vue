<script setup>
import { useRoute } from 'vue-router';

import HeadingComponent from '@/components/UI/HeadingComponent.vue';
import RouterLink from '@/components/UI/RouterLink.vue';


const route = useRoute();
const props = defineProps({
  titulo: { type: String },
  point: { type: String },
})

</script>

<template>
  <div class="pb-10">
    <div class="w-full flex flex-row items-center justify-between">
      <HeadingComponent class="m-6 text-4xl tracking-tight">{{ props.titulo }}</HeadingComponent>
      <RouterLink :to="{ name: 'home', query: { club: route.query.club } }">Volver</RouterLink>

    </div>
    <p class=" mt-10 text-center uppercase text-gray-400/70 text-2xl font-bold">Proximamente...</p>
  </div>
</template>
