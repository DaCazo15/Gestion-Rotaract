<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useToken } from './composables/useToken'
import { useSupabase } from './composables/useSupa'

const { logout } = useToken()
const { supabase } = useSupabase()
if(supabase){ console.log('exito') }


const route = useRoute()
const router = useRouter()
const sesionOn = ref(false)

const verificarSesion = () => {
  const token = localStorage.getItem('token')
  if (token) {
    sesionOn.value = true
  } else {
    sesionOn.value = false
    if (route.name !== 'login' && route.name !== 'sign-up') {
      router.push({ name: 'login' })
    }
  }
}

watch(() => route.path, verificarSesion)

const cerrarSesion = () => {
  logout()
  sesionOn.value = false
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen">
    <header v-if="sesionOn" class="bg-[#d41367] shadow-lg sticky top-0 z-50 transition-all duration-500 ">
      <div class="mx-auto max-w-6xl px-6 py-6 flex justify-between items-center">

        <div class="flex flex-col">
          <h1 class="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            {{ route.query.club || 'Panel de Control' }}
          </h1>
          <span class="text-pink-200 text-xs font-bold uppercase tracking-widest">Gestión del Club</span>
        </div>

        <nav class="flex items-center gap-4">
          <button
            @click="cerrarSesion"
            class="group flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all duration-300 border border-white/20"
            title="Cerrar Sesión"
          >
            <span class="text-white text-sm font-bold hidden md:block group-hover:pr-1 transition-all">Salir</span>
            <img
              src="./assets/img/salida.png"
              alt="Cerrar"
              class="w-5 h-5 brightness-0 invert transition-transform group-hover:translate-x-1"
            />
          </button>
        </nav>
      </div>

      <div class="h-1 w-full bg-black/10"></div>
    </header>

    <main class="mx-auto max-w-6xl p-6 mb-20">
      <RouterView v-slot="{ Component }">
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
/* Filtro personalizado para la imagen si no usas Tailwind 3+ */
.invert-100 {
  filter: invert(1);
}
</style>
