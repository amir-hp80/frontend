import React, { useEffect, useState } from "react";
import "./style.css";
import fetchApi from "../../../Utils/fetchApi";


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

import "./style.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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

export default function DiscountProduct() {
  const [saleProduct, setSaleProduct] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchApi(
        "products?populate=*&filters[discount][$gt]=0"
      );
      setSaleProduct(res.data);
    })();
  }, []);

  console.log(saleProduct);
  const cardItems = saleProduct?.map((e, index) => (
    <SwiperSlide key={index}>
      <div>
        <Link
          to={`/${e?.attributes?.category}/product-detail/${
            e?.id
          }/${e?.attributes?.title.split(" ").join("-")}`}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                import.meta.env.VITE_BASE_URL +
                e?.attributes?.image?.data[0]?.attributes?.url
              }
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem",
                gap: "0.5rem",
              }}>
              <div>
                <span className="percent">{e?.attributes?.discount}%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="discount">
                  {commafy(
                    e?.attributes?.price * (1 - e?.attributes?.discount / 100)
                  )}
                </span>
                <img
                  src="../../../../public/image/banner/svgexport-13.svg"
                  style={{ width: "16px", height: "16px" }}
                />
              </div>
            </div>

            <div style={{ padding: "0.5rem" }}>
              <span className="price" style={{ float: "left", color: "gray" }}>
                {commafy(e?.attributes?.price)}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </SwiperSlide>
  ));

  return (
    <>
      <div className="slider-wrapper">
        <Swiper
          freeMode={true}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[FreeMode, Pagination]}
          slidesPerView={1}
          spaceBetween={5}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="discount-slider">
          <SwiperSlide
            className="first-slide"
            sx={{ background: "none !important" }}>
            <div className="image-discount">
              <span>
                پیشنهاد
                <br />
                شگفت
                <br />
                انگیز
                <br />
              </span>
              <img src="../../../../public/image/banner/box.png" />
            </div>
          </SwiperSlide>
          {cardItems}
          <Link>
            <SwiperSlide>
              <span className="more-product">مشاهده همه</span>
              <ArrowBackIosNewIcon />
            </SwiperSlide>
          </Link>
        </Swiper>
      </div>
    </>
  );
}
