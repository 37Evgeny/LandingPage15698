import { useEffect, useState } from "react";
import { cardsApi } from "../api/cards-api";

function useCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка карточек при монтировании
  useEffect(() => {
    setIsLoading(true);
    cardsApi
      .getAll()
      .then((data) => setCards(data))
      .catch((err) => {
        console.error("Ошибка загрузки карточек:", err);
        setError("Не удалось загрузить карточки");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Добавление карточки
  const handleAdd = (formData) => {
    return cardsApi
      .create(formData)
      .then((createdCard) => {
        setCards((prev) => [createdCard, ...prev]);
      })
      .catch((err) => {
        console.error("Ошибка добавления:", err);
        throw err; // пробрасываем ошибку выше для обработки в компоненте
      });
  };

  // Редактирование карточки
  const handleEdit = (id, formData) => {
    return cardsApi
      .update(id, formData)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((card) => (card._id === updatedCard._id ? updatedCard : card))
        );
      })
      .catch((err) => {
        console.error("Ошибка редактирования:", err);
        throw err;
      });
  };

  // Удаление карточки
  const handleDelete = (id) => {
    return cardsApi
      .remove(id)
      .then(() => {
        setCards((prev) => prev.filter((card) => card._id !== id));
      })
      .catch((err) => {
        console.error("Ошибка удаления:", err);
        throw err;
      });
  };

  return {
    cards,       // массив карточек
    isLoading,   // флаг загрузки
    error,       // ошибка загрузки
    handleAdd,   // добавить карточку
    handleEdit,  // редактировать карточку
    handleDelete // удалить карточку
  };
}

export default useCards;
