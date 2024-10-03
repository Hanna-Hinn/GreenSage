/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { updateProductCategory } from "./../../redux/action/productFiltersAction";

SwiperCore.use([Navigation, Autoplay]);
const data = [
  {
    id: 1,
    title: "Cake & Milk",
    slug: "jeans",
    img: "assets/imgs/shop/cat-13.png",
    bg: "bg-9",
    itemsCount: 20,
  },
  {
    id: 2,
    title: "Oganic Kiwi",
    slug: "shoe",
    img: "assets/imgs/shop/cat-12.png",
    bg: "bg-10",
    itemsCount: 20,
  },
  {
    id: 3,
    title: "Peach",
    slug: "jacket",
    img: "assets/imgs/shop/cat-11.png",
    bg: "bg-11",
    itemsCount: 20,
  },
  {
    id: 4,
    title: "Red Apple",
    img: "assets/imgs/shop/cat-9.png",
    bg: "bg-12",
    itemsCount: 20,
  },
  {
    id: 5,
    title: "Snack",
    img: "assets/imgs/shop/cat-3.png",
    bg: "bg-13",
    itemsCount: 20,
  },
  {
    id: 6,
    title: "Vegetables",
    img: "assets/imgs/shop/cat-1.png",
    bg: "bg-14",
    itemsCount: 20,
  },
  {
    id: 7,
    title: "Strawberry",
    img: "assets/imgs/shop/cat-2.png",
    bg: "bg-15",
    itemsCount: 20,
  },
  {
    id: 8,
    title: "Black plum",
    img: "assets/imgs/shop/cat-4.png",
    bg: "bg-12",
    itemsCount: 15,
  },
  {
    id: 9,
    title: "Custard apple",
    img: "assets/imgs/shop/cat-5.png",
    bg: "bg-10",
    itemsCount: 10,
  },
  {
    id: 10,
    title: "Coffe & Tea",
    img: "assets/imgs/shop/cat-14.png",
    bg: "bg-12",
    itemsCount: 5,
  },
  {
    id: 11,
    title: "Headphone",
    img: "assets/imgs/shop/cat-15.png",
    bg: "bg-11",
    itemsCount: 20,
  },
];
const CategorySlider = () => {
  const navigate = useNavigate();

  const selectCategory = (e, category) => {
    e.preventDefault();
    updateProductCategory(category);
    navigate("/products", { search: { cat: category } });
  };

  return (
    <>
      <Swiper
        autoplay={true}
        navigation={{
          prevEl: ".custom_prev_ct1",
          nextEl: ".custom_next_ct1",
        }}
        className="custom-class"
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 8,
          },
          1200: {
            slidesPerView: 10,
          },
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`card-2 ${item.bg} wow animate__animated animate__fadeInUp`}
              onClick={(e) => selectCategory(e, item.slug)}
            >
              <figure className=" img-hover-scale overflow-hidden">
                <a>
                  <img src={`${item.img}`} alt={item.title} />
                </a>
              </figure>
              <h6>
                <a>{item.title}</a>
              </h6>
              <span>{item.itemsCount} items</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow" id="carausel-10-columns-arrows">
        <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
          <i className="fi-rs-arrow-small-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_ct1">
          <i className="fi-rs-arrow-small-right"></i>
        </span>
      </div>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategorySlider);
