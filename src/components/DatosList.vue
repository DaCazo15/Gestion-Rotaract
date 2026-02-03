<script setup>
import { computed } from 'vue'
import { paises, telefonica } from '@/helpers/paises_tlf'

const props = defineProps({
  dato: {
    type: Object,
    required: true,
  },
})
const numeroTLF = computed(() => {
  return (
    props.dato.codigo +
    ' (' +
    props.dato.telefono.slice(0, 3) +
    ') ' +
    props.dato.telefono.slice(3, 6) +
    '-' +
    props.dato.telefono.slice(6)
  )
})

const nombreCompleto = computed(() => {
  return props.dato.nombre + ' ' + props.dato.apellido
})

const pais = computed(() => {
  return paises.value.find((p) => p.value === props.dato.codigo)?.label || ''
})

const operadora = computed(() => {
  return telefonica[props.dato.telefono.slice(0, 3)] === undefined
    ? 'Desconocido'
    : telefonica[props.dato.telefono.slice(0, 3)]
})

const servicioTelefonico = computed(() => {
  return operadora.value + ' - ' + pais.value
})
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0"> <!--Columa Nombre-->
      <p class="font-medium text-gray-900">{{ nombreCompleto }}</p>
      <p class="text-gray-500">{{ props.dato.correo }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm">
      <p class="text-gray-900">{{ props.dato.cedula }}</p>
    </td>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ numeroTLF }}</p>
      <p class="text-gray-600">{{ servicioTelefonico }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm">
      <a
        :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${props.dato.correo}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-500 hover:text-[#d41367] transition-colors"
      >
        {{ props.dato.correo }}
      </a>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-600 capitalize">{{ props.dato.municipio }}</p>
    </td>
  </tr>
</template>
