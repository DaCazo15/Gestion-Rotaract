<script setup>
defineProps({
  juntaActual: {
    type: Array,
    required: true
  },
  editar: {
    type: Boolean,
    required: true
  }
});

</script>

<template>
  <div v-if="!editar && juntaActual.length > 0" class="p-5 flex flex-row items-center justify-center gap-20">
    <div class="mb-16">
      <div class="bg-white w-80 h-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center pt-5 transition-all transform scale-110 hover:scale-105">
        <div class="bg-gray-200 rounded-lg p-5 mb-6">
          <img
            src="../assets/img/options/socio.png"
            :alt="juntaActual[0]?.nombre || 'Presidente'"
            class="w-32 h-32 object-contain opacity-90"
          >
        </div>

        <div class="w-full py-5 text-center text-white text-2xl font-bold shadow-inner bg-linear-to-br from-[#303952] to-gray-500 nombre">
          {{ juntaActual[0]?.nombre || 'Cargando...' }}
        </div>

        <div class="py-8 text-center space-y-2">
          <p class="text-gray-500 text-lg font-bold uppercase tracking-widest">
            Presidente
          </p>
          <p class="text-gray-300 text-md">
            {{ juntaActual[0]?.correo || '' }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl">
      <div v-for="n in 4" :key="n"
        class="bg-white w-64 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center pt-5 transition-transform hover:scale-105"
      >
        <div class="bg-gray-200 rounded-lg p-4 mb-5">
          <img
            src="../assets/img/options/socio.png"
            :alt="juntaActual[n].nombre"
            class="w-20 h-20 object-contain opacity-70"
          >
        </div>

        <div :class="[
          'w-full py-4 text-center text-white text-xl font-medium shadow-inner',
          {'bg-linear-to-br from-blue-600/80 to-gray-800 nombre' : juntaActual[n].rol === 'Viceprecidente'},
          {'bg-linear-to-br from-emerald-600/80 to-gray-800 nombre' : juntaActual[n].rol === 'Secretario'},
          {'bg-linear-to-br from-orange-600/80 to-gray-800 nombre' : juntaActual[n].rol === 'Tesorero'},
          {'bg-linear-to-br from-[#d41367] to-gray-800 nombre' : juntaActual[n].rol === 'Membrecia'}
        ]">
          {{ juntaActual[n].nombre }}
        </div>

        <div class="py-6 text-center space-y-1">
          <p class="text-gray-500 text-sm font-semibold uppercase tracking-tighter">
            {{ juntaActual[n].rol }}
          </p>
          <p class="text-gray-400 text-sm">
            {{ juntaActual[n].correo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .nombre {
    box-shadow: 0px -31px 25px -20px rgba(0,0,0,0.1);
    border-radius: 1rem 1rem 0 0
  }
</style>
