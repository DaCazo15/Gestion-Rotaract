<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { FormKit } from '@formkit/vue'
import { useToken } from '@/composables/useToken'
import { useSupabase } from '@/composables/useSupa'
import { useRouter } from 'vue-router'

const cambioRuta = useRouter()
const error = ref(false)
const usuarios = ref([])
const { inspector } = useToken()
const { getSelectTable } = useSupabase()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    localStorage.removeItem('token');
  }
})
const handelenSubmit = async(data) => {
  usuarios.value = await getSelectTable('users', data.club )
  if (usuarios.value){
    const ok = await inspector(data, usuarios.value)
    if (ok) {
      error.value = false
      cambioRuta.push({
        name: 'home',
        replace: true,
        query: { club: data.club }
      })
    } else {
      setTimeout(() => {
        error.value = true
      }, 1000)
      error.value = false
    }
  }
}

defineProps({
  titulo: {
    type: String,
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 flex flex-col justify-center">
      <h2 class="text-2xl font-bold text-center text-[#d41367] mb-6">{{ titulo }}</h2>

      <FormKit type="form" :submit-label="titulo" form-class="space-y-6" @submit="handelenSubmit">
        <!-- Nombre del Club -->
        <FormKit
          type="text"
          name="club"
          label="Nombre del Club"
          placeholder="Ej: Rotaract"
          help="Ingresa el nombre de tu club"
          validation="required"
          :validation-messages="{
            required: '*Campo es obligatorio',
          }"
        />

        <!-- Correo Electrónico -->
        <FormKit
          type="email"
          name="datoInicio"
          label="Correo Electrónico o Numero de Teléfono"
          placeholder="ejemplo@correo.com"
          help="Usa un correo válido"
          validation="required"
          :validation-messages="{
            required: '*Campo es obligatorio',
          }"
        />

        <!-- Contraseña -->
        <FormKit
          type="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          help="Debe tener al menos 8 caracteres"
          validation="required"
          :validation-messages="{
            required: '*Campo es obligatorio',
          }"
        />
        <p class="text-red-500 text-center mt-4" v-if="error">Credenciales Invalidas</p>
      </FormKit>
      <p class="text-gray-500 text-center mt-4">¿Aun no tienes una cuenta?</p>
      <router-link :to="{ name: 'sign-up' }" class="text-blue-600 text-center hover:underline">
        Ir a Sign Up
      </router-link>
    </div>
  </div>
</template>
