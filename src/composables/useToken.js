import { ref, reactive, computed } from 'vue'
import bcrypt from 'bcryptjs';

export function useToken() {
  const token = ref(null)
  const users = ref([])
  const userLogin = reactive({
    club: '',
    datoInicio: '',
    password: '',
  })

  const generateToken = () => {
    return Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
  }


  const verificador = computed(() => {
    return users.value.find((user) => {
      return (
        user.club === userLogin.club &&
        comparePassword(userLogin.password, user.password) &&
        (user.email === userLogin.datoInicio || user.telefono === userLogin.datoInicio)
      )
    })
  })

  const logout = () => {
    userLogin.club = ''
    userLogin.datoInicio = ''
    userLogin.password = ''
    removeToken()
  }


  const setToken = (value) => {
    localStorage.setItem('token', value)
  }

  const getToken = () => {
    token.value = localStorage.getItem('token')
  }

  const removeToken = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  const inspector = (v1, v2) => {
    Object.assign(userLogin, v1)
    users.value = v2
    verificador.value ? (token.value = generateToken()) : (token.value = null)
    setToken(token.value)
    return token.value ? true : false
  }

  return {
    inspector,
    getToken,
    logout,
  }
}
