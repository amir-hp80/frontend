import React, { useState } from "react";
import '../style.css'
import { useDispatch, useSelector } from "react-redux";
import useFormFields from "../../../Utils/useFormFields";
import { login } from "../../../Store/Slices/Auth";
import Toast from '../Toast'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";



export default function Login({handlePageType}) {

  const [fields, handleChange] = useFormFields();
  const dispatch = useDispatch();
  const [status, setStatus] = useState()

  const {token} = useSelector(state => state.auth)

  
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios
      .post("http://localhost:1337/api/auth/local", fields)
      .then((response) => {
        console.log(response);
        dispatch(
          login({
            user: response.data.user,
            token: response.data.jwt,
          })
        ),
        // const notify = () => toast("Wow so easy !");
        setStatus('success')
        // toast('ورود موفقیت آمیز بود !')
        // <Toast/>
        // {<Toast />}
      })
      .catch((err) => setStatus('error'));
      
  }

  console.log(token)

  return (
    <div className="background-login-page">
      <Toast/>
      <div className="login-page-wrapper">
        <div className="form-detail">
          <div className="logo-wrapper2">
            {/* <img src="../../../../public/image/logo-7.png" alt="" /> */}
            <span>دیجی شاپ</span>
          </div>
          <div className="form-name">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>
                <mark>ورود</mark> به حساب کاربری
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
                  placeholder="نام کاربری خود را وارد کنید"
                  className="input-field"
                  type="text"
                  onChange={handleChange}
                  id="identifier"
                  label="Username or Email"
                  name="identifier"
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

              <button>ورود</button>
            </form>
          </div>
          <div>
            <span style={{ cursor: "pointer" }} onClick={handlePageType}>
              هنوز ثبت نام نکرده اید؟
            </span>
          </div>
        </div>

        <div className="form-image">
          <img src="../../../../public/image/login.svg" alt="" />
        </div>
      </div>
    </div>
  );}
