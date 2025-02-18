import styles from "./FruitsList.module.css";
import { useEffect, useState } from "react";
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";

export default function FruitsList() {
    const [fruits, setFruits] = useState(()=>{
        return JSON.parse(localStorage.getItem('fruits')) || []
    });
    const [fruitsName, setFruitsName] = useState("");
    const [editFruitId, setEditFruitId] = useState(null);

    useEffect(()=>{
        localStorage.setItem('fruits', JSON.stringify(fruits))
    },[fruits])

    const addOrUpdateFruit = () => {
        if (fruitsName.trim()) {
            if (editFruitId !== null) {
                setFruits(fruits.map(fruit =>
                    fruit.id === editFruitId ? { ...fruit, name: fruitsName } : fruit
                ));
                setEditFruitId(null);
            } else {
                setFruits([...fruits, { id: Date.now(), name: fruitsName }]);
            }
            setFruitsName("");
        }
    };

    const removeFruit = (id) => {
        setFruits(fruits.filter(fruit => fruit.id !== id));
    };

    const moveUp = (index) => {
        if (index > 0) {
            const updatedFruits = [...fruits];
            [updatedFruits[index], updatedFruits[index - 1]] = [updatedFruits[index - 1], updatedFruits[index]];
            setFruits(updatedFruits);
        }
    };

    const moveDown = (index) => {
        if (index < fruits.length - 1) {
            const updatedFruits = [...fruits];
            [updatedFruits[index], updatedFruits[index + 1]] = [updatedFruits[index + 1], updatedFruits[index]];
            setFruits(updatedFruits);
        }
    };

    const handleEditFruit = (fruit) => {
        setFruitsName(fruit.name);
        setEditFruitId(fruit.id);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Fruit List</h2>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.inputField}
                    value={fruitsName}
                    onChange={(e) => setFruitsName(e.target.value)}
                    placeholder="Add a fruit..."
                />
                <button onClick={addOrUpdateFruit} className={styles.button}>
                    {editFruitId ? "Update" : "Add"}
                </button>
            </div>
            <ul className={styles.list}>
                {fruits.map((fruit, index) => (
                    <li key={fruit.id} className={styles.listItem}>
                        <span className={styles.text}>{fruit.name}</span>
                        <div className={styles.actions}>
                            <button onClick={() => handleEditFruit(fruit)} className={styles.edit}>
                                <FaEdit />
                            </button>
                            <button onClick={() => removeFruit(fruit.id)} className={styles.delete}>
                                <FaTrash />
                            </button>
                            <button onClick={() => moveUp(index)} className={styles.move}>
                                <FaArrowUp />
                            </button>
                            <button onClick={() => moveDown(index)} className={styles.move}>
                                <FaArrowDown />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
