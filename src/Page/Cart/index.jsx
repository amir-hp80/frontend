import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  addItems,
  removeAll,
  removeProduct,
} from "../../Store/Slices/CartSlice";
import "./style.css";
import Delete from "@mui/icons-material/DeleteSweepOutlined";
import { useMediaQuery } from "@mui/material";

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

export default function Cart() {
  const { list } = useSelector((state) => state.cart);
  // const quantity = useSelector((state) => state.cart.list)?.filter(
  //   (e) => e.id == product.id
  // )[0]?.quantity;
  const size1 = useMediaQuery("(max-width:670px)");
  const size2 = useMediaQuery("(max-width:568px)");
  const dispatch = useDispatch();
  let totalPrice = 0;
  let totalDiscount = 0;
  let total = 0;
  const item = list?.map((e, index) => {
    totalPrice += e.quantity * e?.attributes?.price;

    total +=
      e.quantity * (e?.attributes?.price * (1 - e?.attributes?.discount / 100));

    totalDiscount = totalPrice - total;

    return (
      <div className="card-product-wrapper">
        <div className="top-card">
          <img
            onClick={() => dispatch(removeProduct(e.id))}
            src="../../../public/image/banner/footer/delete-product.svg"
            style={{
              width: "30px",
              border: "1px solid #b9b9b9",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            alt=""
          />
          {e?.attributes?.discount && (
            <img
              src="../../../public/image/banner/offer.png"
              style={{ width: "100px" }}
              alt=""
            />
          )}
        </div>

        <div className="main-card">
          <div className="right-card-wrapper">
            <h4 style={{ marginBottom: "1rem" }}>{e?.attributes?.title}</h4>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img
                style={{ width: "18px" }}
                src="../../../public/image/banner/footer/garanty.svg"
                alt=""
              />
              <span>ضمانت 7 روز دیجی شاپ+ضمانت اصالت کالا</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img
                style={{ width: "18px" }}
                src="../../../public/image/banner/footer/shop.svg"
                alt=""
              />
              <span>دیجی شاپ</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img
                style={{ width: "18px" }}
                src="../../../public/image/banner/footer/available.svg"
                alt=""
              />
              <span>موجود در انبار</span>
            </div>

            {size1 && (
              <div className="handle-btn-wrapper">
                <button onClick={() => dispatch(addItems(e))}>
                  <img
                    style={{ width: "25px", cursor: "pointer" }}
                    src="../../../public/image/banner/footer/plus.svg"
                    alt=""
                  />
                </button>
                <span>{e.quantity}</span>
                <button onClick={() => dispatch(removeItem(e.id))}>
                  {e.quantity > 1 ? (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="../../../public/image/banner/footer/mines.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="../../../public/image/banner/footer/remove.svg"
                      alt=""
                    />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="left-card-wrapper">
            <img
              src={
                import.meta.env.VITE_BASE_URL +
                e?.attributes?.image?.data[0]?.attributes?.url
              }
              alt=""
            />
            {size2 && (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid #b4b4b4",
                    padding: "0.1rem 0.2rem",
                    borderRadius: "0.4rem",
                    width:'fit-content',
                    marginTop:'0.5rem'
                  }}>
                  <div
                    style={{
                      padding: "0.4rem",
                      background: "#000",
                      borderRadius: "0.1rem",
                    }}></div>
                  <span style={{fontSize:'14px'}}>مشکی</span>
                </div>
                <div className="product-price2">
                  {e?.attributes?.discount ? (
                    <>
                      <div
                        style={{
                          padding: " 0rem 0.3rem",
                          borderRadius: "0.3rem",
                          background: "#ff1a34",
                        }}>
                        <span style={{ color: "#fff", fontSize: "16px" }}>
                          {e?.attributes?.discount}%
                        </span>
                      </div>

                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}>
                        {commafy(e?.attributes?.price)}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}>
                        <span style={{ color: "#ff1a34" }}>
                          {commafy(
                            e?.attributes?.price *
                              (1 - e?.attributes?.discount / 100)
                          )}
                        </span>
                        <img
                          src="../../../public/image/banner/footer/toman.svg"
                          style={{ width: "20px" }}
                          alt=""
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}>
                      <span>{commafy(e?.attributes?.price)}</span>

                      <img
                        src="../../../public/image/banner/svgexport-13.svg"
                        style={{ width: "20px" }}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {!size2 && (
          <div className="bottom-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #b4b4b4",
                padding: "0.1rem 0.2rem",
                borderRadius: "0.4rem",
              }}>
              <div
                style={{
                  padding: "0.5rem",
                  background: "#000",
                  borderRadius: "0.3rem",
                }}></div>
              <span>مشکی</span>
            </div>

            <div className="product-price2">
              {e?.attributes?.discount ? (
                <>
                  <div
                    style={{
                      padding: " 0rem 0.3rem",
                      borderRadius: "0.3rem",
                      background: "#ff1a34",
                    }}>
                    <span style={{ color: "#fff", fontSize: "16px" }}>
                      {e?.attributes?.discount}%
                    </span>
                  </div>

                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}>
                    {commafy(e?.attributes?.price)}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                    <span style={{ color: "#ff1a34" }}>
                      {commafy(
                        e?.attributes?.price *
                          (1 - e?.attributes?.discount / 100)
                      )}
                    </span>
                    <img
                      src="../../../public/image/banner/footer/toman.svg"
                      style={{ width: "20px" }}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                  <span>{commafy(e?.attributes?.price)}</span>

                  <img
                    src="../../../public/image/banner/svgexport-13.svg"
                    style={{ width: "20px" }}
                    alt=""
                  />
                </div>
              )}
            </div>

            {!size1 && (
              <div className="handle-btn-wrapper">
                <button onClick={() => dispatch(addItems(e))}>
                  <img
                    style={{ width: "25px", cursor: "pointer" }}
                    src="../../../public/image/banner/footer/plus.svg"
                    alt=""
                  />
                </button>
                <span>{e.quantity}</span>
                <button onClick={() => dispatch(removeItem(e.id))}>
                  {e.quantity > 1 ? (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="../../../public/image/banner/footer/mines.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="../../../public/image/banner/footer/remove.svg"
                      alt=""
                    />
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  console.log(list);
  return (
    <div className="cart-page-wrapper">
      {list.length > 0 ? (
        <div className="cart-wrapper">
          <div className="show-product">
            <div className="title-cart">
              <div>
                <h4>سبد خرید شما</h4>
                <span>{list.length} عدد کالا </span>
              </div>
              <button className="remove-all-btn">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(removeAll())}>
                  <span>حذف کل سبد خرید</span>
                  <img
                    src="../../../public/image/banner/footer/delete.svg"
                    style={{ width: "22px" }}
                  />
                </div>
              </button>
            </div>
            {item}
          </div>
          <div className="show-factor">
            <div className="factor-title">
              <h4>صورتحساب</h4>
            </div>
            <div className="factor">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px" }}>قیمت محصولات</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}>
                  <span>{commafy(totalPrice)}</span>
                  <img
                    src="../../../public/image/banner/svgexport-13.svg"
                    alt=""
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px" }}>تخفیف محصولات</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}>
                  <span style={{ color: "#ff1a34" }}>
                    {commafy(totalDiscount)}
                  </span>
                  <img
                    src="../../../public/image/banner/footer/toman.svg"
                    alt=""
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px" }}>جمع کل</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}>
                  <span>{commafy(total)}</span>
                  <img
                    src="../../../public/image/banner/svgexport-13.svg"
                    alt=""
                  />
                </div>
              </div>

              <button className="continue-btn">ادامه خرید</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-wrapper">
          <img
            src="../../../public/image/banner/footer/empty-cart.svg"
            alt=""
          />
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            سبد خرید شما خالی است!
          </span>
        </div>
      )}
    </div>
  );
}
