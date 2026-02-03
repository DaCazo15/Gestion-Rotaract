<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSupabase } from '@/composables/useSupa';
import RouterLink from '@/components/UI/RouterLink.vue';
import HeadingComponent from '@/components/UI/HeadingComponent.vue';

import JuntaActual from '../../components/JuntaActual.vue';
import NuevaJunta from '../../components/NuevaJunta.vue';

const route = useRoute();
const { getSelectTable, getSelectColumnTable } = useSupabase();
const editar = ref(false);
const socios = ref([]);
const juntaActual = ref([])
const fechaActual = new Date().toISOString().split('T')[0]
const pass = ref('');


const revolver = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const editarJunta = () => {
  pass.value = revolver(route.query.club.replace(/ /g, '').split('')).join('').toLowerCase();
  return editar.value = !editar.value;
}

onMounted(async () => {
  const clubId = route.query.club;
  if (!clubId) return;
  try {
    socios.value = await getSelectTable('socios', clubId) || [];

    const dataJunta = await getSelectColumnTable('junta', clubId, fechaActual);

    if (dataJunta.junta && dataJunta.junta.length > 0) {
      juntaActual.value = dataJunta.junta;
    }
  } catch (error) {
    console.error('Error cargando los datos del club:', error);
    juntaActual.value = [];
  }
})

const opcionesSocios = computed(() => {
  if (!socios.value || socios.value.length === 0) return [];
  return socios.value.map(socio => ({
    label: `${socio.nombre} ${socio.apellido}`,
    value: `${socio.nombre} ${socio.apellido}`
  }));
});
</script>

<template>
  <div class="pb-10">
    <div class="flex justify-end gap-8">
      <p
        v-show="juntaActual.length < 1"
        @click="editarJunta"
        class="block md:inline-block rounded bg-blue-600/25 py-2 px-3 font-bold uppercase text-white text-sm shadow hover:bg-blue-600 cursor-pointer"
      >Editar Junta</p>
      <RouterLink :to="{ name: 'home', query: { club: route.query.club } }">Volver</RouterLink>
    </div>
    <HeadingComponent class="mb-12 text-4xl tracking-tight">{{ route.query.titulo }}</HeadingComponent>
    <div v-if="editar">
      <NuevaJunta
        :socios="socios"
        :opciones-socios="opcionesSocios"
        @editarJunta="editarJunta"
        :pass="pass"
      />
    </div>
    <div v-if="!editar && juntaActual.length > 0">
      <JuntaActual :junta-actual="juntaActual" :editar="editar" />
    </div>

    <div v-else-if="!editar && juntaActual.length < 1" class="text-center py-5 text-gray-500/50 text-2xl font-bold">
      Vacio
    </div>
  </div>
</template>

