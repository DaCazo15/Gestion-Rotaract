<script setup>
const props = defineProps({
  dato: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0"> <!--Columa Nombre-->
      <p class="font-medium text-gray-900">{{ props.dato.socio }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm"> <!--Columa Fecha-->
      <p class="text-gray-900">{{ props.dato.fecha }}</p>
    </td>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0"> <!--Columa Descripcion-->
      <p class="font-medium text-gray-900">{{ props.dato.descripcion }}</p>
    </td>
    <td class="font-medium whitespace-nowrap px-3 py-4 text-sm"> <!--Columa Tipo-->
      <p class="font-medium text-gray-900">{{ props.dato.tipo }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> <!--Columa Monto-->
      <p class="text-gray-600 capitalize">${{ props.dato.monto }}</p>
    </td>
  </tr>
</template>
