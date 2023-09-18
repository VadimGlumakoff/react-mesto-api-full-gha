import React from "react";
import unionFalse from '../images/Union-false.svg';
import unionTrue from '../images/Union-true.svg'

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.openPopup ? "popup_opened" : ""}`}
    >
      <div className="popup__content popup__content_tooltip">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
        ></button>
       <img className="popup__status" src={props.isStatus ? unionTrue : unionFalse} alt={props.message}/>
        <h2 className="popup__title popup__title_tooltip">{props.message}</h2>
       
      </div>
    </div>
  );
}

export default InfoTooltip;