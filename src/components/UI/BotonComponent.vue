<template>
  <div
    class="
      /* Layout y Dimensiones */
      px-6 py-4
      flex flex-col items-center justify-center

      /* Tipografía */
      text-[1rem] font-medium tracking-wide uppercase
      text-gray-400 hover:text-gray-900

      /* Estética de la Card */
      bg-white border border-gray-100
      rounded-2xl shadow-sm

      /* Interacción y Animación */
      cursor-pointer
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50
      active:scale-95
    "
  >
    <slot></slot>
  </div>
</template>
