import { useEffect, useState } from "react";
import { cardsApi } from "../api/cards-api";

// ✅ Принимаем колбэки уведомлений
function useCards({ onSuccess, onError }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    cardsApi
      .getAll()
      .then((data) => setCards(data))
      .catch((err) => {
        console.error("Ошибка загрузки карточек:", err);
        setError("Не удалось загрузить карточки");
        onError("Не удалось загрузить карточки"); // ✅ Уведомление об ошибке
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleAdd = (formData) => {
    return cardsApi
      .create(formData)
      .then((createdCard) => {
        setCards((prev) => [createdCard, ...prev]);
        onSuccess("Карточка успешно добавлена! 🎉"); // ✅
      })
      .catch((err) => {
        console.error("Ошибка добавления:", err);
        onError("Не удалось добавить карточку"); // ✅
        throw err;
      });
  };

  const handleEdit = (id, formData) => {
    return cardsApi
      .update(id, formData)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((card) =>
            card._id === updatedCard._id ? updatedCard : card
          )
        );
        onSuccess("Карточка успешно обновлена! ✏️"); // ✅
      })
      .catch((err) => {
        console.error("Ошибка редактирования:", err);
        onError("Не удалось обновить карточку"); // ✅
        throw err;
      });
  };

  const handleDelete = (id) => {
    return cardsApi
      .remove(id)
      .then(() => {
        setCards((prev) => prev.filter((card) => card._id !== id));
        onSuccess("Карточка удалена 🗑️"); // ✅
      })
      .catch((err) => {
        console.error("Ошибка удаления:", err);
        onError("Не удалось удалить карточку"); // ✅
        throw err;
      });
  };

  return {
    cards,
    isLoading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
  };
}

export default useCards;
