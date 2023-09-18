import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditPopupProfile({openPopup, onUpdateUser, onClose, handleSubmit}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, openPopup]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    
      <PopupWithForm
        buttonName="Сохранить"
        name="profile"
        title="Редактировать профиль"
        onClose={onClose}
        openPopup={openPopup}
        handleSubmit={handleSubmit}
      >
        <input
          value={name || ""}
          onChange={handleChangeName}
          type="text"
          id="name"
          placeholder="Имя"
          name="name"
          className="popup__name"
          required
          maxLength="40"
          minLength="2"
        />
        <span className="popup__error name-error"></span>
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          type="text"
          id="about"
          placeholder="О себе"
          name="about"
          className="popup__name"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error about-error"></span>

        
      </PopupWithForm>
    
  );
}

export default EditPopupProfile;
