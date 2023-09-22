import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditPopupProfile from "./EditPopupProfile";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth";
function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenPopupProfile, setOpenedPopupProfile] = useState(false);
  const [isOpenPopupAdd, setOpenedPopupAdd] = useState(false);
  const [isOpenPopupAvatar, setOpenedPopupAvatar] = useState(false);
  const [isOpenPopupDel, setOpenedPopupDel] = useState(false);
  const [isOpenPopupTooltip, setIsOpenPopupTooltip] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  function handleProfileClick() {
    setOpenedPopupProfile(true);
  }

  function handleAddCardClick() {
    setOpenedPopupAdd(true);
  }

  function handleAvatarClick() {
    setOpenedPopupAvatar(true);
  }

  function handleDelCardClick() {
    setOpenedPopupDel(true);
  }

  function closeAllPopups() {
    setOpenedPopupProfile(false);
    setOpenedPopupAdd(false);
    setOpenedPopupAvatar(false);
    setOpenedPopupDel(false);
    setSelectedCard(null);
    setIsOpenPopupTooltip(false);
  }

  const openPopup =
    isOpenPopupAvatar || isOpenPopupProfile || isOpenPopupAdd || selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (openPopup) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [openPopup]);

  function handleDeleteCard(card) {
    api
      .removeCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddNewCard(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(obj) {
    api
      .editUserInfo(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeToken() {
    auth
      .logout()
      .then()
      .catch((err) => console.log(err));
    setUserEmail("");
  }
  //проверка токена

  useEffect(() => {
    auth.checkToken().then((data) => {
      if (data) {
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setIsLoggedIn(false);
        navigate("/sign-up");
      }
    });
  }, [isLoggedIn]);

  const navigate = useNavigate();

  function userRegister(formValue) {
    auth
      .register(formValue)
      .then((data) => {
        navigate("/sign-in");
        setMessage("Вы успешно зарегистрировались!");

        setIsStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");

        setIsStatus(false);
      })
      .finally(() => {
        setIsOpenPopupTooltip(true);
      });
  }
  //авториз
  function userLogin(formValue) {
    auth
      .authorization(formValue)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(formValue.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsOpenPopupTooltip(true);
        setIsStatus(false);
        navigate("/sign-up");
      });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header removeToken={removeToken} userEmail={userEmail} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onCardDelete={handleDeleteCard}
                onCardClick={handleCardLike}
                setSelectedCard={setSelectedCard}
                cards={cards}
                isOpenProfile={handleProfileClick}
                isOpenAddCard={handleAddCardClick}
                isOpenAvatar={handleAvatarClick}
                isOpenCardDel={handleDelCardClick}
                component={Main}
              />
            }
          />

          <Route
            path="/sign-up"
            element={<Register userRegister={userRegister} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-up" replace />
              )
            }
          />
          <Route path="/sign-in" element={<Login userLogin={userLogin} />} />
        </Routes>

        <Footer />

        <InfoTooltip
          message={message}
          isStatus={isStatus}
          openPopup={isOpenPopupTooltip}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          openPopup={selectedCard}
          onClose={closeAllPopups}
        />

        <EditPopupProfile
          onUpdateUser={handleUpdateUser}
          openPopup={isOpenPopupProfile}
          onClose={closeAllPopups}
        ></EditPopupProfile>
        <AddPlacePopup
          onNewCard={handleAddNewCard}
          openPopup={isOpenPopupAdd}
          onClose={closeAllPopups}
        ></AddPlacePopup>
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          openPopup={isOpenPopupAvatar}
          onClose={closeAllPopups}
        ></EditAvatarPopup>
        <PopupWithForm
          name="del"
          title="Вы уверены?"
          buttonName="Да"
          openPopup={isOpenPopupDel}
          onClose={closeAllPopups}
        ></PopupWithForm>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
