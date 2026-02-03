<script setup>
import { computed } from 'vue'
import { paises, telefonica } from '@/helpers/paises_tlf'

const props = defineProps({
  alianza: {
    type: Object,
    required: true,
  },
})

const numeroTLF = computed(() => {
  return (
    props.alianza.codigo +
    ' (' +
    props.alianza.telefono.slice(0, 3) +
    ') ' +
    props.alianza.telefono.slice(3, 6) +
    '-' +
    props.alianza.telefono.slice(6)
  )
})

const pais = computed(() => {
  return paises.value.find((p) => p.value === props.alianza.codigo)?.label || ''
})

const operadora = computed(() => {
  return telefonica[props.alianza.telefono.slice(0, 3)] === undefined
    ? 'Desconocido'
    : telefonica[props.alianza.telefono.slice(0, 3)]
})

const servicioTelefonico = computed(() => {
  return operadora.value + ' - ' + pais.value
})
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl- pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ props.alianza.empresa }}</p>
      <p class="text-gray-500">{{ props.alianza.correoEmpresa }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm">
      <p class="text-gray-900">{{ props.alianza.rifEmpresa }}</p>
    </td>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ props.alianza.nombre }}</p>
      <p class="text-gray-500">{{ props.alianza.correo }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm">
      <p class="text-gray-900">{{ props.alianza.cedula }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="font-medium text-gray-900">{{ numeroTLF }}</p>
      <p class="text-gray-600">{{ servicioTelefonico }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-600 capitalize">{{ props.alianza.municipio }}</p>
    </td>
  </tr>
</template>
