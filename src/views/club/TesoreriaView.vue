<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { FormKit } from '@formkit/vue';

import DatosTesoreria from '../../components/DatosTesoreria.vue';
import useTesoreria from '@/composables/useTesoreria';
import { useSupabase } from '@/composables/useSupa'

import HeadingComponent from '@/components/UI/HeadingComponent.vue';
import BotonComponent from '@/components/UI/BotonComponent.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import ModalComponen from '@/components/UI/ModalComponen.vue';

const { moneda, formatearCadena } = useTesoreria();
const { getSelectTable, setTable } = useSupabase()

const route = useRoute();
const props = defineProps({
  titulo: { type: String },
  point: { type: String },
})

const indicadores = [
  'ingresos',
  'gastos',
  'saldo'
]
const club = reactive({
  socio: [],
  tesoreria: []
})

const conversionesActivas = reactive({
  ingresos: false,
  gastos: false,
  saldo: false
});

const modal = ref(false)
const existenDatos = computed(() => club.tesoreria.length > 0)
const tipoOperacion = ref('');

const cuentasCalculadas = computed(() => {
  let ingresos = 0;
  let gastos = 0;

  club.tesoreria.forEach(dato => {
    const monto = parseFloat(dato.monto) || 0;
    if (dato.tipo === 'Ingreso') ingresos += monto * moneda.value;
    if (dato.tipo === 'Gasto') gastos += monto * moneda.value;
  });

  const saldo = ingresos - gastos;
  const valores = { ingresos, gastos, saldo };

  const resultado = {};
  indicadores.forEach(tipo => {
    let valorFinal = valores[tipo];
    const enDolar = conversionesActivas[tipo];

    if (enDolar) {
      valorFinal = valorFinal / moneda.value;
    }

    resultado[tipo] = formatearCadena(valorFinal, enDolar);
  });

  return resultado;
});
const abrirModal = (tipo) => {
  tipoOperacion.value = tipo;
  modal.value = true;
};
const cargarData = async () => {
  const clubId = route.query.club;
  if (!clubId) return;

  try {
    const [socios, tesoreria] = await Promise.all([
      getSelectTable('socios', clubId),
      getSelectTable('tesoreria', clubId)
    ]);
    club.socio = socios;
    club.tesoreria = tesoreria;
  } catch (error) { console.error('Error cargando los datos del club:', error) }
}
onMounted(async () => {
  await cargarData();
});
const handleSubmit = async (formData) => {
  const clubId = route.query.club;
  if (!clubId) return;

  try {
    const dataToSend = { club: clubId, ...formData };
    await setTable('tesoreria', dataToSend);

    modal.value = false;
    await cargarData();
  } catch (error) {
    console.error('Error al guardar:', error);
  }
};
const filtro = ref('')
const listado = computed(() => {
  return filtro.value === ''
    ? club.tesoreria
    : club.tesoreria.filter((dato) => {
        return dato.socio.toLowerCase().includes(filtro.value.toLowerCase())
      })
})
</script>

<template>
  <div class="pb-10">
    <div class="w-full flex flex-row items-center justify-between">
      <HeadingComponent class="m-6 text-4xl tracking-tight">{{ props.titulo }}</HeadingComponent>
      <RouterLink :to="{ name: 'home', query: { club: route.query.club } }">Volver</RouterLink>
    </div>

    <div class="w-full flex flex-row gap-6 justify-around items-center p-0">

      <div
        v-for="tipo in indicadores"
        :key="tipo"
        class="flex-1 bg-gray-50/20 hover:bg-gray-100 text-[#d41367] font-medium text-2xl rounded-2xl shadow-2xs hover:shadow transition-all duration-300 ease-in-out"
      >
        <div class="flex flex-row justify-between px-4 pt-6">
          <p class="uppercase">{{ tipo }}</p>
          <FormKit
            type="checkbox"
            label="USD"
            v-model="conversionesActivas[tipo]"
            inner-class="mb-0"
          />
        </div>
        <div class="w-full text-white bg-[#d41367] border-4 border-[#d41367] rounded-b-2xl px-4 pt-6 pb-4 font-extrabold">

          <p>{{ cuentasCalculadas[tipo] }}</p>

        </div>
      </div>


    </div>

    <div class="w-full flex flex-row gap-2 items-center py-4">
      <BotonComponent
        @click="abrirModal('Ingreso')"
        class=" border-4 border-green-600 w-md"
      >
        <p>Registrar Ingreso</p>
      </BotonComponent>
      <input
        type="text"
        placeholder="Filtrar Socio..."
        v-model="filtro"
        class="
          h-full w-full
          px-4 py-4
          rounded-2xl
          border-4 border-gray-400 hover:border-[#d41367] focus:border-[#d41367] focus:outline-none
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50
          active:scale-95
        "
      />
    </div>

    <div v-if="existenDatos" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Socio
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Fecha
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Descripción
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Tipo
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-[#d41367]">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <DatosTesoreria
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

    <ModalComponen
      :show="modal"
      @close="modal = false"
    >
      <template #header>
        <div class="flex flex-col">
          <span class="text-xl font-bold text-[#d41367]">
            Registrar {{ tipoOperacion }}
          </span>
          <span class="text-[.7rem] text-gray-400 font-normal tracking-wider">
            {{ route.query.club }}
          </span>
        </div>
      </template>

      <FormKit
        type="form"
        submit-label="Guardar Movimiento"
        :submit-attrs="{
          inputClass: 'w-full bg-[#d41367] text-white font-bold py-3 rounded-xl hover:bg-[#b01056] transition-colors'
        }"
        @submit="handleSubmit"
      >
        <div class="space-y-4">
          <FormKit
            type="select"
            name="socio"
            label="Socio"
            placeholder="Seleccionar Socio"
            validation="required"
            :options="club.socio.map(socio => `${socio.nombre} ${socio.apellido}`)"
          />

          <FormKit
            type="text"
            name="descripcion"
            label="Descripción"
          />

          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="date"
              name="fecha"
              label="Fecha"
              validation="required"
            />

            <FormKit
              type="number"
              name="monto"
              label="Monto"
              placeholder="0.00"
              validation="required|min:1"
              step="0.01"
            />
          </div>

          <FormKit
            type="select"
            name="tipo"
            label="Tipo de Movimiento"
            v-model="tipoOperacion"
            :options="['Ingreso', 'Gasto']"
            validation="required"
          />
        </div>
      </FormKit>

      <template #footer>
        <button
          @click="modal = false"
          class="text-sm font-bold text-gray-400 hover:text-gray-600"
        >
          Cancelar
        </button>
      </template>
    </ModalComponen>
  </div>
</template>
