import { onMounted, ref } from 'vue';
import { getTodo } from './api.js'

export default {
    setup() {
        const todos = ref([]);

        onMounted(async () => {
            try {
                const data = await getTodo();
                todos.value = data;
            } catch (error) {
                console.error('Erro ao buscar itens da lista:', error);
            }
        });

        return {
            todos
        };
    }
};
