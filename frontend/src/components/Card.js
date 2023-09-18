import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  const handleImageClick = () => {
    props.onCardImageClick(props.card);
  };
  function handleLikeClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="elements__card">
      {isOwn && (
        <button className="elements__delete" onClick={handleDeleteClick} />
      )}

      <img
        className="elements__image"
        onClick={handleImageClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="elements__title">
        <h2 className="elements__name">{props.card.name}</h2>
        <button
          type="button"
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
        ></button>
      </div>
      <p className="elements__number">{props.card.likes.length}</p>
    </div>
  );
}

export default Card;
