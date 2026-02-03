<script setup>
import { onMounted, ref, computed } from 'vue'
import RouterLink from '@/components/UI/RouterLink.vue'
import HeadingComponent from '@/components/UI/HeadingComponent.vue'
import Datoslist from '../../components/DatosList.vue'
import { useRoute } from 'vue-router'
import { useSupabase } from '@/composables/useSupa'

const props = defineProps({
  titulo: { type: String },
  point: { type: String },
})

const { getSelectTable } = useSupabase()

const route = useRoute()
const aspirante = ref([])
const existenAspirantes = computed(() => aspirante.value.length > 0)

onMounted( async() => {
  const clubId = route.query.club;
  if (!clubId) return;
  try{
    aspirante.value = await getSelectTable('aspirantes', clubId)
  } catch (error) {
    console.error('Error cargando los datos del club:', error)
  }
})


const filtro = ref('')

const listado = computed(() => {
  return filtro.value === ''
    ? aspirante.value
    : aspirante.value.filter((alianza) => {
        return alianza.empresa.toLowerCase().includes(filtro.value.toLowerCase())
      })
})
</script>

<template>
  <div class="pb-10">
    <div class="flex justify-end gap-8">
      <RouterLink :to="{ name: 'home', query: { club: route.query.club } }">Volver</RouterLink>
      <RouterLink :to="{
        name: 'agregar',
        query: { club: route.query.club,
        titulo: 'Agregar Aspirante',
        tipo: 'aspirante'
      }}">Agregar</RouterLink>
    </div>

    <HeadingComponent>{{ props.titulo }}</HeadingComponent>
    <input
      type="text"
      placeholder="Buscar..."
      v-model="filtro"
      class="px-4 py-2 w-full rounded-4xl border-solid border-2 border-gray-400 mt-8 hover:border-[#d41367] focus:border-[#d41367] focus:outline-none"
    />

    <div v-if="existenAspirantes" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Aspirante
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Cédula
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Teléfono
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Correo
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">Municipio</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <Datoslist
                :aspirante="aspirante"
                v-for="dato in listado"
                :key="dato.id"
                :dato="dato"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-center mt-12 text-gray-300 font-bold text-2xl" v-else>
      <p>Vacio</p>
    </div>
  </div>
</template>
