import React from "react";

function ImagePopup({ card, openPopup, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${openPopup ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h3 className="popup__subtitle">{card?.name}</h3>
        <button
          className="popup__close"
          id="popup-close-image"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
