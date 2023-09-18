import React from "react";

function PopupWithForm({
  openPopup,
  name,
  onClose,
  title,
  handleSubmit,
  buttonName,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${openPopup ? "popup_opened" : ""}`}
    >
      <div className="popup__content">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form "
          name={name}
          method="post"
          onSubmit={handleSubmit}
        >
          {children}

          <button className="popup__button" type="submit" >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
