import axios from "axios";

const apiUrl = 'https://localhost:7274';

export async function getTodoItems() {
    try {
        const response = await axios.get(`${apiUrl}/api/todoitems`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteTodoItem(id) {
    try {
        await axios.delete(`${apiUrl}/api/todoitems/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function updateTodoItem(id, data) {
    try {
        await axios.put(`${apiUrl}/api/todoitems/${id}`, data);
    } catch (error) {
        throw error;
    }
}

export async function addTodoItem(item) {
    try {
        const response = await axios.post(`${apiUrl}/api/todoitems`, item);
        return response.data;
    } catch (error) {
        throw error;
    }
}