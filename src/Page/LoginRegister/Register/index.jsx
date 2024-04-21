import React from 'react'
import useFormFields from '../../../Utils/useFormFields';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

export default function Register({ handlePageType }) {
  const [fields, handleChange] = useFormFields();
  const dispatch = useDispatch();
  const res = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local/register", fields)
      .then((response) => {
        alert("login successfully");
        handlePageType();
      })
      .catch((err) => {
        alert(err.response.data.error.message);
      });
  };
  console.log(res)
  return (
    <div className="background-login-page">
      <div className="login-page-wrapper">
        <div className="form-detail">
          <div className="logo-wrapper2">
            {/* <img src="../../../../public/image/logo-7.png" alt="" /> */}
            <span>دیجی شاپ</span>
          </div>
          <div className="form-name">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>
                <mark>ایجاد</mark>  حساب کاربری
              </span>
              {/* <hr />
              <span>ثبت نام</span> */}
            </div>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "shabnam",
                fontWeight: "bold",
              }}>
              خوش اومدی !
            </span>
          </div>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  placeholder="ایمیل خود را وارد کنید"
                  className="input-field"
                  type="email"
                  onChange={handleChange}
                  id="email"
                  label="Email"
                  name="email"
                />
                <label htmlFor="input-field" className="input-label">
                  ایمیل
                </label>
                <span className="input-highlight"></span>
              </div>
              <div className="input-container">
                <input
                  placeholder="نام کاربری خود را وارد کنید"
                  className="input-field"
                  type="text"
                  onChange={handleChange}
                  id="username"
                  label="Username"
                  name="username"
                />
                <label htmlFor="input-field" className="input-label">
                  نام کاربری
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <input
                  placeholder="رمز عبور خود را وارد کنید"
                  className="input-field"
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <label htmlFor="input-field" className="input-label">
                  رمز عبور
                </label>
                <span className="input-highlight"></span>
              </div>

              <button>ثبت نام</button>
            </form>
          </div>
          <div>
            <span style={{ cursor: "pointer" }} onClick={handlePageType}>
              قبلا ثبت نام کرده اید؟
            </span>
          </div>
        </div>

        <div className="form-image">
          <img src="../../../../public/image/sign-in.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
