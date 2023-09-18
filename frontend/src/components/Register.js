import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.userRegister(formValue);
  };

  return (
    <section className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input
          className="auth__input"
          placeholder="Email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={formValue.email}
        ></input>
        <input
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={formValue.password}
        ></input>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <h3 className="auth__subtitle">
          Уже зарегистрированы?&nbsp;
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </h3>
      </form>
    </section>
  );
}

export default Register;
