import React, { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({openPopup, onUpdateAvatar, onClose, handleSubmit}) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    
      <PopupWithForm
        buttonName="Обновить"
        name="avatar"
        title="Обновить аватар"
        onClose={onClose}
        openPopup={openPopup}
        handleSubmit={handleSubmit}
      >
        <input
          ref={avatarRef}
          type="url"
          id="link-avatar"
          placeholder="Ссылка на фотографию"
          name="name"
          className="popup__name"
          required
          maxLength="200"
          minLength="2"
        />
        <span className="popup__error link-avatar-error"></span>
      </PopupWithForm>
    
  );
}

export default EditAvatarPopup;
