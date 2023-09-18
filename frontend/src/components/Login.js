import { useState } from "react";
import React from "react";

function Login(props) {
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
    props.userLogin(formValue);
  };

  return (
    <section className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
