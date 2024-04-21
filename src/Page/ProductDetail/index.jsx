import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetchApi from "../../Utils/fetchApi";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItem, removeAll } from "../../Store/Slices/CartSlice";

function commafy(num) {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function ProductDetails() {
  const { id, name, categoryName } = useParams();
  const [product, setProduct] = useState();
  const [suggest, setSuggest] = useState();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.list)?.filter(
    (e) => e.id == id
  )[0]?.quantity;
  const { list } = useSelector((state) => state.cart);
  const [addToCart, setAddToCart] = useState(false);

  let array1 = [];
  let array2 = [];
  const handleRemove = () => {
    setAddToCart(false);
    dispatch(removeItem(product?.id));
  };

  const handleCart = () => {
    setAddToCart(true);
    dispatch(addItems(product));
  };

  useEffect(() => {
    (async () => {
      const res = await fetchApi(`products/${id}?populate=*`);
      setProduct(res.data);
      const res2 = await fetchApi(
        `products?populate=*&filters[category][$eqi]=${categoryName}`
      );
      setSuggest(res2.data);
    })();
  }, [id]);

  console.log()
  if (product) {
    // array1 =
    //   product[0]?.attributes?.categories?.data[0]?.attributes?.filter[0].name;
    // array2 = Object.entries(
    //   product?.attributes?.categories?.data[0]?.attributes?.filter[0]
    // );
    array1 = Object.entries(
      product?.attributes?.categories?.data[0]?.attributes?.property[0]
    );
    array2 = Object.entries(product?.attributes);

  }
  console.log(
    array1?.map((e, index) => e[0]),
    array2?.map((e, index) => e[0])
  );
  
  const res2 =

    array1?.map((e, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}>
          {array2
            ?.filter((e, index) => e[0] === e[0])
            .map(
              (e2) =>
                e2[0] === e[0] && (
                  <>
                    <span>{e[1]} :</span> <span style={{paddingRight:'0.5rem'}}>{e2[1]} </span>
                  </>
                )
            )}
      </div>
    ));
    

  const suggestItem = suggest?.map((e, index) => (
    <SwiperSlide key={index}>
      <div className="card-wrapper3">
        <div className="image-card2">
          <Link
            to={`/${e?.attributes?.category}/product-detail/${
              e?.id
            }/${e?.attributes?.title.split(" ").join("-")}`}>
            <img
              onClick={topFunction}
              src={
                import.meta.env.VITE_BASE_URL +
                e?.attributes?.image?.data[0]?.attributes?.url
              }
              alt=""
            />
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#ececec",
              width: "fit-content",
              padding: "0.1rem 0.2rem",
              borderRadius: "1.5rem",
              marginBottom: "0.5rem",
            }}>
            <img
              style={{ width: "18px", height: "fit-content", padding: "0" }}
              src="../../../public/image/banner/footer/post.svg"
              alt=""
            />
            <span style={{ fontSize: "10px" }}>ارسال رایگان</span>
          </div>
        </div>

        <div className="detail-wrapper2">
          <div className="product-name2">
            <Link
              onClick={topFunction}
              to={`/${e?.attributes?.category}/product-detail/${
                e?.id
              }/${e?.attributes?.title.split(" ").join("-")}`}>
              <h6>{e?.attributes?.title.split(" ").slice(0, 7).join(" ")}</h6>
            </Link>
          </div>

          <div className="product-detail2">
            <div className="post-tag">
              <img
                src="../../../public/image/banner/footer/day-post.svg"
                style={{ width: "19px", height: "19px" }}
                alt=""
              />
              <span>ارسال امروز</span>
            </div>

            {e?.attributes?.discount ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    width: "100%",
                  }}>
                  <div>
                    <span className="percent">{e?.attributes?.discount}%</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      className="discount"
                      style={{ color: "#ff1a34", fontSize: "17px" }}>
                      {suggest &&
                        commafy(
                          e?.attributes?.price *
                            (1 - e?.attributes?.discount / 100)
                        )}
                    </span>
                    <img
                      src="../../../../public/image/banner/svgexport-13.svg"
                      style={{ width: "19px", height: "19px" }}
                    />
                  </div>
                </div>
                <div className="card-price2">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}>
                    {suggest && commafy(e?.attributes?.price)}
                  </span>
                  <img
                    style={{ width: "19px", height: "19px" }}
                    src="../../../public/image/banner/svgexport-13.svg"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="card-price2">
                <span>{suggest && commafy(e?.attributes?.price)}</span>
                <img
                  style={{ width: "19px", height: "19px" }}
                  src="../../../public/image/banner/svgexport-13.svg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="product-detail-wrapper">
      <div className="main-description">
        <div className="right-wrapper">
          <div className="product-detail">
            <div className="product-title">
              <div
                style={{
                  gap: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}>
                <h3>{product?.attributes?.title}</h3>
                <span
                  style={{
                    borderBottom: "1px solid #388ce7",
                    width: "fit-content",
                    padding: "0.5rem 0",
                  }}>
                  نظرات کاربران
                </span>
                <div className="product-point2">
                  <span>-</span>
                  <img
                    src="../../../public/image/banner/footer/star.svg"
                    alt=""
                  />
                </div>
              </div>
              <div
                style={{
                  gap: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid #388ce7",
                  padding: "1rem 0",
                }}>
                <span>رنگ : مشکی</span>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.1rem 0.2rem",
                    border: "1px solid #378ce7",
                    borderRadius: "0.3rem",
                  }}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "0.3rem",
                      background: "#000",
                    }}></div>
                  <span>مشکی</span>
                </button>
              </div>
            </div>

            <div className="main-features">
              <div style={{ margin: "1rem 0" }}>
                <span>ویژگی های اصلی</span>
              </div>
              <div className="features-wrapper">
                {res2}

              </div>
            </div>
          </div>
          <div className="product-image">
            <img
              style={{}}
              src={
                import.meta.env.VITE_BASE_URL +
                product?.attributes?.image?.data[0]?.attributes?.url
              }
              alt=""
            />
          </div>
        </div>

        <div className="left-wrapper">
          <div className="cart-button-wrapper">
            <div style={{ width: "100%" }}>
              <div className="top-btn-wrapper">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    borderBottom: "1px solid #fff",
                  }}>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    فروشنده
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: " 0.5rem 0",
                    }}>
                    <img
                      src="../../../public/image/banner/footer/shop.svg"
                      alt=""
                      style={{ width: "22px" }}
                    />
                    <span>فروشگاه دیجی شاپ</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: " 0.5rem 0",
                  }}>
                  <img
                    src="../../../public/image/banner/footer/garanty.svg"
                    alt=""
                    style={{ width: "22px" }}
                  />
                  <span>18ماه گارانتی شرکتی</span>
                </div>
              </div>

              <div className="bottom-btn-wrapper">
                <div className="price-wrapper">
                  {product && product?.attributes?.discount ? (
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.5rem",
                          width: "100%",
                        }}>
                        <div>
                          <span className="percent">
                            {product && product?.attributes?.discount}%
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className="discount"
                            style={{ color: "#ff1a34", fontSize: "22px" }}>
                            {product &&
                              commafy(
                                product?.attributes?.price *
                                  (1 - product?.attributes?.discount / 100)
                              )}
                          </span>
                          <img
                            src="../../../../public/image/banner/svgexport-13.svg"
                            style={{ width: "19px", height: "19px" }}
                          />
                        </div>
                      </div>
                      <div
                        className="card-price"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          float: "left",
                        }}>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}>
                          {product && commafy(product?.attributes?.price)}
                        </span>
                        <img
                          style={{ width: "19px", height: "19px" }}
                          src="../../../public/image/banner/svgexport-13.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="card-price"
                      style={{
                        float: "left",
                        gap: "0.3rem",
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <span>
                        {product && commafy(product?.attributes?.price)}
                      </span>
                      <img
                        style={{ width: "19px", height: "19px" }}
                        src="../../../public/image/banner/svgexport-13.svg"
                        alt=""
                      />
                    </div>
                  )}
                </div>

                {/* <div></div> */}
                {list?.filter((e) => e.id == product?.id)[0]?.id ? (
                  <div className="next-btn-cart">
                    <div className="remove-btn">
                      <button onClick={handleRemove}>حذف</button>
                    </div>

                    <div className="go-to-cart">
                      <Link to={"/cart"}>
                        <button className="cart-btn">
                          <div>
                            <span>مشاهده سبد خرید</span>
                            <KeyboardArrowLeftIcon sx={{ color: "#388ce7" }} />
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="prev-btn-cart">
                    <button onClick={handleCart}>
                      <div>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}>
                          افزودن به سبد خرید
                        </span>
                        <AddShoppingCartIcon
                          sx={{ color: "white !important" }}
                        />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="free-post-wrapper">
            <span>ارسال رایگان برای این کالا</span>
            <img
              src="../../../public/image/banner/footer/free post.svg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="other-description">
        <div className="note-wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              width: "100%",
              justifyContent: "center",
            }}>
            <hr style={{ width: "40%" }} />
            <div className="note-title">
              <span>نکات تکمیلی</span>
            </div>
            <hr style={{ width: "40%" }} />
          </div>
          <div className="note-content">
            <img src="../../../public/image/banner/footer/descrip.svg" alt="" />
            <p>
              امکان برگشت کالا در گروه موبایل با دلیل "انصراف از خرید" تنها در
              صورتی مورد قبول است که پلمب کالا باز نشده باشد. تمام گوشی‌های
              دیجی‌شاپ ضمانت رجیستری دارند. در صورت وجود مشکل رجیستری، می‌توانید
              بعد از مهلت قانونی ۳۰ روزه، گوشی خریداری‌شده را مرجوع کنید.
            </p>
          </div>
        </div>
      </div>

      <div className="suggestion-slider">
        <div className="slider-wrapper2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "1rem 0",
              gap: "1rem",
            }}>
            <hr style={{ width: "40%" }} />
            <span className="slider2-title">محصولات مشابه</span>
            <hr style={{ width: "40%" }} />
          </div>
          <Swiper
            // slidesPerView={3}
            // spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="suggestion-slider">
            {suggestItem}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
