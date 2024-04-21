import React, { useRef, useEffect, useState } from "react";
import fetchApi from "../../../Utils/fetchApi";

import { Swiper, SwiperSlide } from "swiper/react";

import './style.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Slider() {
  const [result, setResult] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchApi("sliders?populate=*");
      setResult(res.data);
    })();
  }, []);
  

  
  const slideItems = result?.map((e, index) => (
    <SwiperSlide key={index}>
        <Link to={`/products/${e?.attributes?.title}`}>
        <img
          src={
            import.meta.env.VITE_BASE_URL +
            e?.attributes?.image?.data[0]?.attributes?.url
          }
          alt=""
        />
    </Link>
      </SwiperSlide>
  ));


  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper">
      {slideItems}
    </Swiper>
  );
}
