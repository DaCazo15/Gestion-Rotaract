<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { menu } from '@/helpers/menu';
import { RouterLink, useRoute } from 'vue-router'
import HeadingComponent from '@/components/UI/HeadingComponent.vue'
import { useSupabase } from '@/composables/useSupa';

defineProps({
  titulo: { type: String },
});
const club = reactive({
  socios: 0,
  alianzas: 0,
  aspirantes: 0
})
const { getLengthTable, getBalance } = useSupabase()
const route = useRoute();
const balance = ref(0)

onMounted(async () => {
  const clubId = route.query.club;
  if (!clubId) return;

  try {
    balance.value = await getBalance('tesoreria', clubId);
    const [socios, alianzas, aspirantes] = await Promise.all([
      getLengthTable('socios', clubId),
      getLengthTable('alianzas', clubId),
      getLengthTable('aspirantes', clubId)
    ]);
    club.socios = socios
    club.aspirantes = aspirantes
    club.alianzas = alianzas
  } catch (error) { console.error('Error cargando los datos del club:', error) }
});

const cards = computed(() => [
  { ...menu.socios, ruta: 'socios', icon: 'socio.png', extra: `: ${club.socios}`  },
  { ...menu.alianzas, ruta: 'alianza', icon: 'alianza.png', extra: `: ${club.alianzas}`  },
  { ...menu.aspirante, ruta: 'aspirantes', icon: 'aspirante.png', extra: `: ${club.aspirantes}`  },
  { ...menu.junta, ruta: 'junta', icon: 'junta.png', extra: `: 0`  }
]);

const cards2 = computed(() => [
  { ...menu.notas, ruta: 'notas', icon: 'notas.png'  },
  { ...menu.tesoreria, ruta: 'tesoreria', icon: 'tesoreria.png', extra: `: ${balance.value.toLocaleString()}`  }
]);

const getImageUrl = (name) => new URL(`../assets/img/options/${name}`, import.meta.url).href;
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <HeadingComponent class="mb-12 text-center text-4xl tracking-tight">{{ titulo }}</HeadingComponent>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      <div
        v-for="(item, index) in cards"
        :key="index"
        :class="[
          'group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2',
          'flex flex-col items-center w-full bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100',
        ]"
      >
        <RouterLink :to="{
          name: item.ruta,
          query: { club: route.query.club, titulo: item.titulo }

        }" class="w-full">
          <div class="py-6 px-4 text-center">
            <p class="text-[1rem] font-black text-gray-300 uppercase tracking-wide group-hover:text-[#d41367] transition-colors">
              {{ item.titulo }}{{ item.extra || '' }}
            </p>
          </div>

          <div class="relative w-full aspect-square flex items-center justify-center bg-linear-to-br from-[#d41367] to-[#f41676] group-hover:from-[#b01055] group-hover:to-[#d41367] transition-all duration-500">
            <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <div class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
              <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white"></div>
            </div>

            <img
            :src="getImageUrl(item.icon)"
            :alt="item.titulo"
            class="w-40 h-40 object-contain invert drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            >
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
      <div
        v-for="(item, index) in cards2"
        :key="index"
        :class="[
          'mt-5 group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2',
          'flex flex-col items-center w-full bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100',
        ]"
      >
        <RouterLink :to="{
            name: item.ruta,
            query: { club: route.query.club, titulo: item.titulo }
          }" class="w-full"
        >
          <div
            class="group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center w-full bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100"
          >
            <div class="py-6 px-4 text-center">
              <p class="text-xl font-black text-gray-300 uppercase tracking-wide group-hover:text-[#d41367] transition-colors">
                {{ item.titulo }} {{ item.extra || '' }}
              </p>
            </div>

            <div class="relative w-full h-32 flex items-center justify-center bg-linear-to-br from-[#d41367] to-[#f41676] group-hover:from-[#b01055] group-hover:to-[#d41367] transition-all duration-500">

              <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <div class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
                <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white"></div>
              </div>

              <img
                :src="getImageUrl(item.icon)"
                alt="tesoreria"
                class="h-20 object-contain invert drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              >
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
