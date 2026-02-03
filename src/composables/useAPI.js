
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default function useApiDolar() {
    const moneda = ref(null);

    const fetchDolar = async () => {
        try {
            const url = 'https://ve.dolarapi.com/v1/dolares/paralelo';
            const response = await axios.get(url);
            moneda.value = response.data.promedio;
        } catch (error) {
            console.error('Error al obtener el valor del dólar:', error);
        }
    };

    onMounted(fetchDolar);

    return {
        moneda
    };
}
