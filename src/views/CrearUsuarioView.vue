<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FormKit } from '@formkit/vue'
import { paises } from '@/helpers/paises_tlf'
import { useRouter } from 'vue-router'
import { useSupabase } from '@/composables/useSupa'

import bcrypt from 'bcryptjs';
import validator from 'validator'

defineProps({
  titulo: {
    type: String,
  }
})
const cambioRuta = useRouter()
const error = ref(false)
const messageError = ref('')
const { setTable, existeItemEnTabla } = useSupabase()

const errorMessage = reactive({
  required: '*campo obligarotio',
  number: 'Este campo solo acepta numeros',
  min: 'La contraseña debe tener al menos 8 caracteres',
  email: 'Correo invalido',
  url: 'Link invalido',
})
const handleSubmit = async (data) => {
  if (data.password.length < 8) {
    messageError.value = 'La contraseña debe tener al menos 8 caracteres'
    error.value = true
    return
  }

  if (!validator.isStrongPassword(data.password)) {
    messageError.value = 'La contraseña debe tener A-Za-z0-9!@#$%^&*'
    error.value = true
    return
  }
  data.password = bcrypt.hashSync(data.password, 10)

  if (await existeItemEnTabla('users', 'club', data.club)) {
    messageError.value = 'El club ya está registrado'
    error.value = true
    return
  }

  setTable('users', data)
  cambioRuta.push({ name: 'login' })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 flex flex-col justify-center">
      <h2 class="text-2xl font-bold text-center text-[#d41367] mb-6">{{ titulo }}</h2>

      <FormKit type="form" :submit-label="titulo" form-class="space-y-6" @submit="handleSubmit">
        <FormKit
          type="text"
          name="club"
          label="Nombre del Club"
          placeholder="Ej: Rotaract"
          help="Ingresa el nombre de tu club"
          validation="required"
          :validation-messages="{ required: errorMessage.required }"
        />

        <div class="flex justify-items-start gap-8 contenido">
          <FormKit
            type="select"
            label="País"
            name="codigo"
            :options="paises"
            validation="required"
            :validation-messages="{ required: errorMessage.required }"
          />
          <FormKit
            type="tel"
            label="Telefono"
            name="telefono"
            placeholder="Telefono: XXX-XXX-XXXX"
            validation="required|number|matches:/^[0-9]{10}$/"
            :validation-messages="{
              required: errorMessage.required,
              number: errorMessage.number,
              matches: 'El Teléfono debe tener 10 dígitos',
            }"
          />
        </div>

        <FormKit
          type="email"
          name="email"
          label="Correo Electrónico"
          placeholder="ejemplo@correo.com"
          help="Usa un correo válido"
          validation="required"
          :validation-messages="{ required: errorMessage.required }"
        />

        <FormKit
          type="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          help="Debe tener al menos 8 caracteres"
        />
        <p class="text-red-500 text-center mt-4" v-if="error">{{messageError}}</p>
      </FormKit>
      <p class="text-gray-500 text-center mt-4">¿Ya tienes una cuenta?</p>
      <router-link :to="{ name: 'login' }" class="text-blue-600 text-center hover:underline">
        Ir a Login
      </router-link>
    </div>
  </div>
</template>
