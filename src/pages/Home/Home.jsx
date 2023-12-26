import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://localhost:7274/api/todoitems";

function Home() {
    const [todoItems, setTodoItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: "", isComplete: false });

    useEffect(() => {
        async function fetchTodoItems() {
            try {
                const response = await axios.get(apiUrl);
                setTodoItems(response.data);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            }
        }

        fetchTodoItems();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;
        setNewItem({ ...newItem, [name]: newValue });
    };

    const handleAddItem = async () => {
        if (!newItem.title.trim()) {
            return;
        }

        try {
            await axios.post(apiUrl, newItem);
            const response = await axios.get(apiUrl);
            setTodoItems(response.data);
            setNewItem({ title: "", isComplete: false });
        } catch (error) {
            console.error("Erro ao criar o item:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${apiUrl}/${itemId}`);
            const response = await axios.get(apiUrl);
            setTodoItems(response.data);
        } catch (error) {
            console.error("Erro ao excluir o item:", error);
        }
    };

    const handleToggleComplete = async (itemId) => {
        const itemToUpdate = todoItems.find((item) => item.id === itemId);
        if (!itemToUpdate) return;

        const updatedItem = { ...itemToUpdate, isComplete: !itemToUpdate.isComplete };

        try {
            await axios.put(`${apiUrl}/${itemId}`, updatedItem);
            const response = await axios.get(apiUrl);
            setTodoItems(response.data);
        } catch (error) {
            console.error("Erro ao atualizar o item:", error);
        }
    };

    return (
        <>
            <section>
                <div className="container">
                    <form className="form">
                        <p className="title">Cadastre uma Tarefa</p>
                        <label>
                            <input
                                type="text"
                                className="input"
                                id="title"
                                name="title"
                                value={newItem.title}
                                onChange={handleInputChange}
                                style={{ width: "100%" }}
                            />
                            <span>Nome da Tarefa</span>
                        </label>

                        <div style={{ marginBottom: "10px" }}>
                            <label htmlFor="isComplete" className="boolTitle">
                                Tarefa concluída?
                            </label>
                            <div className="btnBool">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    id="isComplete"
                                    name="isComplete"
                                    checked={newItem.isComplete}
                                    onChange={handleInputChange}
                                />
                                <label className="switch" htmlFor="isComplete">
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <button className="submit" type="button" onClick={handleAddItem}>
                            Cadastrar Tarefa
                        </button>
                    </form>

                    <div id="checklist">
                        <h1>Lista de Tarefas</h1>
                        {todoItems.map((item) => (
                            <div key={item.id} className="checklist-item">
                                <input
                                    type="checkbox"
                                    id={`item-${item.id}`}
                                    name={`item-${item.id}`}
                                    checked={item.isComplete}
                                    onChange={() => handleToggleComplete(item.id)}
                                />
                                <label htmlFor={`item-${item.id}`} onClick={() => handleToggleComplete(item.id)}>
                                    {item.title} - {item.isComplete ? "Concluída" : "Pendente"}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
