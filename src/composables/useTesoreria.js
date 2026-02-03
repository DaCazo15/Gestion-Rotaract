import useApiDolar from '@/composables/useAPI';
import useFormatCadena from '@/composables/useFormatoMoneda';

export default function useTesoreria() {
  const { moneda } = useApiDolar();
  const { formatearCadena } = useFormatCadena();

  return {
    moneda,
    formatearCadena
  }
}
