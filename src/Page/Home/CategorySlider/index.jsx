import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper/modules";
import fetchApi from "../../../Utils/fetchApi";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [category, setCategory] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchApi("categories?populate=*");
      setCategory(res.data);
    })();
  }, []);



  const categoryItem = category?.map((e, index) => (
    <SwiperSlide key={index}>
      <div className="card-wrapper">
        <Link to={`/products/${e?.attributes?.title}`}>
          <div className="category-card">
            <img
              src={
                import.meta.env.VITE_BASE_URL +
                e?.attributes?.image?.data[0]?.attributes?.url
              }
            />
            <span style={{ color: "black" }}>{e?.attributes?.name}</span>
          </div>
        </Link>
      </div>
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          500:{
            slidePerView:2
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="category-slider">
        {categoryItem}
      </Swiper>
    </>
  );
}
