<script setup>
import { useRoute } from 'vue-router';
import { useSupabase } from '@/composables/useSupa';
import { FormKit } from '@formkit/vue';

const { setTable } = useSupabase();
const fechaActual = new Date().toISOString().split('T')[0]
const route = useRoute();
const junta = ['Precidente','Viceprecidente', 'Secretario', 'Tesorero', 'Membrecia']
let estructuraData = []

const props = defineProps({
  socios: {
    type: Array,
    required: true
  },
  opcionesSocios: {
    type: Array,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['editarJunta']);

const fechaFin = (fechaISO) => {
  const fecha = new Date(fechaISO);
  let año = fecha.getFullYear();
  if (fecha.getMonth() >= 6) año++;
  return `${año}-06-30`;
};

const handleSubmit = async (formData) => {
  estructuraData = []
  for(let i = 1; i <= 5; i++) {
    const nombreSeleccionado = formData[`socio_${i}`];
    const socioEncontrado = props.socios.find(s =>
      `${s.nombre} ${s.apellido}` === nombreSeleccionado
    );
    if (!socioEncontrado) {
      throw new Error(`No se encontró la información del socio: ${nombreSeleccionado}`);
    }
    estructuraData.push({
      club: route.query.club,
      nombre: nombreSeleccionado,
      rol: formData[`rol_${i}`],
      correo: socioEncontrado.correo,
      pass: formData[`pass_${i}`]
    })
  }
  formData.value = {
    club: route.query.club,
    fechaInicio: fechaActual,
    fechaFin: fechaFin(fechaActual),
    presidente: estructuraData[0].nombre,
    junta: estructuraData
  }
  await setTable('junta', formData.value);
  emit('editarJunta');
};

</script>

<template>
  <FormKit
    type="form"
    submit-label="Guardar Junta"
    @submit="handleSubmit"
  >
    <div v-for="n in 5" :key="n" class="border-b mb-6 pb-6">
      <h3 class="font-bold mb-2">Miembro {{ n }}</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormKit
          type="select"
          :name="`socio_${n}`"
          :label="`Nombre del ${junta[n - 1]}`"
          placeholder="Seleccionar Socio"
          validation="required"
          :options="opcionesSocios"
        />

        <FormKit
          type="text"
          :name="`rol_${n}`"
          label="Cargo"
          placeholder="Cargo"
          :value="junta[n - 1]"
          validation="required"
        />

        <FormKit
          type="text"
          :name="`pass_${n}`"
          label="Nueva Contraseña"
          placeholder="Contraseña"
          :value="`${pass}${n}`"
          validation="required"
        />
      </div>
    </div>
  </FormKit>
</template>

