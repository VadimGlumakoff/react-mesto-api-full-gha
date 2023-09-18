import logo from "../images/Vector.svg";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";

function Header(props) {
  console.log(props)
  return (
    <header className="header">
      <a className="header__link" href="#">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>

      <Routes>
        <Route
          path="/"
          element={
            <div className="header__container">
             <p className="header__email">{props.userEmail}</p>
            <Link to="/sign-in" className="header__nav" onClick={props.removeToken}>
              Выйти
            </Link>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__nav">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__nav">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
