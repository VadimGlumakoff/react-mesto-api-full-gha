import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

function AddPlacePopup({openPopup, onNewCard, onClose, handleSubmit}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
      }
    
      function handleLinkChange(evt) {
        setLink(evt.target.value);
      }

      //Очистка инпутов

      React.useEffect(() => {
        setName('');
        setLink('');
    }, [openPopup]);

  function handleSubmit(e) {
    e.preventDefault();

    onNewCard({
      name,
      link,
    });
  }

  return (
    
      <PopupWithForm
        buttonName="Создать"
        name="add"
        title="Новое место"
        onClose={onClose}
        openPopup={openPopup}
        handleSubmit={handleSubmit}
      >
            <input
              type="text"
              placeholder="Название"
              name="name"
              className="popup__name"
              id="card-name"
              required
              minLength="2"
              maxLength="30"
              onChange={handleNameChange}
              value={name}
            />

            <span className="popup__error card-name-error"></span>
            <input
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              className="popup__name"
              id="card-link"
              required
              onChange={handleLinkChange}
              value={link}
            />
</PopupWithForm>
    
  );
}

export default AddPlacePopup;
