<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { FormKit } from '@formkit/vue'
import { paises } from '@/helpers/paises_tlf'
import { useSupabase } from '@/composables/useSupa'
import HeadingComponent from '@/components/UI/HeadingComponent.vue'
import RouterLink from '@/components/UI/RouterLink.vue'

const cambioRuta = useRouter()
const route = useRoute()
const { setTable } = useSupabase()
const esExtranjero = ref(false)

const errorMessage = reactive({
  required: '*campo obligarotio',
  number: 'Este campo solo acepta numeros',
  email: 'Correo invalido',
  url: 'Link invalido',
})

const handleSubmit = (data) => {
  const tabla = `${route.query.tipo}s`
  const dataServer = {
    club: route.query.club,
    ...data,
    rol: route.query.tipo
  }
  setTable(tabla, dataServer)
  .then(() => cambioRuta.push({
    name: tabla,
    query: { club: route.query.club }
  }))
}
</script>

<template>
  <div class="pb-10">

    <div class="flex justify-end">
      <RouterLink :to="{ name: `${route.query.tipo}s`, query: { club: route.query.club } }">Volver</RouterLink>
    </div>

    <HeadingComponent>{{ route.query.titulo }}</HeadingComponent>

    <div class="mt-10 shadow bg-slate-100 mx-auto rounded-2xl">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Agregar"
          incomplete-message="No se pudo enviar, campos incompletos"
          @submit="handleSubmit"
        >
          <FormKit
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del Aspirante"
            validation="required"
            :validation-messages="{ required: errorMessage.required }"
            validation-visibility="live"
          />
          <FormKit
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del Aspirante"
            validation="required"
            :validation-messages="{ required: errorMessage.required }"
            validation-visibility="live"
          />
          <FormKit type="checkbox" label="C.I.E" name="extranjero" v-model="esExtranjero" />
          <FormKit
            type="text"
            label="Cédula o RIF"
            name="cedula"
            placeholder="Documento de Identidad"
            validation="required|length:7,9"
            :validation-messages="{
              required: errorMessage.required,
              length: 'El documento no es valido',
            }"
            validation-visibility="live"
          />
          <div class="flex justify-items-start gap-8 contenido">
            <FormKit
              type="select"
              label="País"
              name="codigo"
              :options="paises"
              validation="required"
              :validation-messages="{ required: errorMessage.required }"
              validation-visibility="live"
            />
            <FormKit
              type="tel"
              label="Teléfono"
              name="telefono"
              placeholder="Telefono: XXX-XXX-XXXX"
              validation="required|number|matches:/^[0-9]{10}$/"
              :validation-messages="{
                required: errorMessage.required,
                number: errorMessage.number,
                matches: 'El Teléfono debe tener 10 dígitos',
              }"
              validation-visibility="live"
            />
          </div>
          <FormKit
            type="email"
            label="Correo Electronico"
            name="correo"
            placeholder="Correo del Aspirante"
            validation="required|email"
            :validation-messages="{
              required: errorMessage.required,
              email: errorMessage.email,
            }"
            validation-visibility="live"
          />
          <FormKit
            type="text"
            label="Municipio en que recide"
            name="municipio"
            placeholder="Municipio"
            validation="required"
            :validation-messages="{ required: errorMessage.required }"
            validation-visibility="live"
          />
          <div class="my-5">
            <div class="g-recaptcha" data-sitekey="6Lebd18sAAAAAC4tq7u5zHL4dBQqFlnsGoKgioYI"></div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
.contenido {
  align-items: center;
}
.check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: flex-end;
  width: 40%;
  height: 25%;
}
</style>
