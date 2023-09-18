import pluse from "../images/pluse.png.png";
import React from "react";

import avatar from "../images/image.jpg";
import api from "../utils/api";
import { useState, useEffect } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__pencil" onClick={props.isOpenAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__title">
          <div className="profile__button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              onClick={props.isOpenProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          onClick={props.isOpenAddCard}
          type="button"
        >
          <img src={pluse} alt="Добавить" className="profile__image" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
            card={card}
            key={card._id}
            onCardImageClick={props.setSelectedCard}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
