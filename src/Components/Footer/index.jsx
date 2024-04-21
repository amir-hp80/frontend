import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";


function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function Footer() {

    const mobileSize = useMediaQuery("(max-width:470px)");
  return (
    <>
      <footer>
        <div className="top-footer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <h4>
              <mark>دیجی</mark> شاپ
            </h4>
            <button className="arrow-up">
              <div onClick={() => topFunction()}>
                {!mobileSize && <span>بازگشت به بالا</span>}
                <img src="../../../public/image/banner/footer/arrowup.svg" />
              </div>
            </button>
          </div>

          <div
            className="phone-wrapper"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}>
            <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
            <span style={{ margin: "0 1rem" }}> | </span>
            <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
          </div>
        </div>

        <div className="map-footer"></div>

        <div
          className="main-footer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}>
          <div className="service-icon">
            <img src="../../../public/image/banner/footer/express-delivery.svg" />
            <span>امکان تحویل اکسپرس</span>
          </div>
          <div className="service-icon">
            <img src="../../../public/image/banner/footer/cash-on-delivery.svg" />
            <span>امکان پرداخت در محل</span>
          </div>
          <div className="service-icon">
            <img src="../../../public/image/banner/footer/support.svg" />
            <span>7 روز هفته ، 24 ساعته</span>
          </div>
          <div className="service-icon">
            <img src="../../../public/image/banner/footer/days-return.svg" />
            <span>هفت روز ضمانت بازگشت کالا</span>
          </div>
          <div className="service-icon">
            <img src="../../../public/image/banner/footer/original-products.svg" />
            <span>ضمانت اصل بودن کالا</span>
          </div>
        </div>

        <div className="bottom-footer">
          <div className="footer-link">
            <ul>
              <span>با دیجی شاپ</span>
              <li>
                <Link>اتاق خبر دیجی شاپ</Link>
              </li>
              <li>
                <Link>فروش در دیجی شاپ</Link>
              </li>
              <li>
                <Link>تماس با ما</Link>
              </li>
              <li>
                <Link>درباره ما</Link>
              </li>
              <li>
                <Link>دیجی شاپ در یک نگاه</Link>
              </li>
            </ul>
          </div>
          <div className="footer-link">
            <ul>
              <span>خدمات مشتریان</span>
              <li>
                <Link>پاسخ به پرسش های متداول</Link>
              </li>
              <li>
                <Link>رویه های بازگرداندن کالا</Link>
              </li>
              <li>
                <Link>شرایط استفاده</Link>
              </li>
              <li>
                <Link>حریم خصوصی</Link>
              </li>
            </ul>
          </div>
          <div className="footer-link">
            <ul>
              <span>پیش از خرید</span>
              <li>
                <Link>راهنمای خرید</Link>
              </li>
              <li>
                <Link>خرید اقساطی</Link>
              </li>
              <li>
                <Link>شیوه ها و هزینه های ارسال</Link>
              </li>
              <li>
                <Link>ضمانت هفت روزه دیجی شاپ</Link>
              </li>
            </ul>
          </div>
          <div className="social-network">
            <span>همراه دیجی شاپ</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "1rem 0",
              }}>
              <img
                src="../../../public/image/banner/footer/instagram.svg"
                alt=""
              />
              <img
                src="../../../public/image/banner/footer/linkedin.svg"
                alt=""
              />
              <img
                src="../../../public/image/banner/footer/twitter.svg"
                alt=""
              />
              <img
                src="../../../public/image/banner/footer/aparat.svg"
                alt=""
              />
            </div>

            <div className="email-input">
              <input type="email" />
              <button>ثبت</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
