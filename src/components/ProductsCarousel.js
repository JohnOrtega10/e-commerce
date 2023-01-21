import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductsCarousel = ({ productsList }) => {
  const [quantityCards, setQuantityCards] = useState(1);
  const [translationValue, setTranslationValue] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    const changeWidth = () => {
      if (window.innerWidth >= 992) {
        setQuantityCards(3);
        setTranslationValue(0);
        setSelectedButton(0);
      } else if (window.innerWidth >= 768) {
        setQuantityCards(2);
        setTranslationValue(0);
        setSelectedButton(0);
      } else {
        setQuantityCards(1);
        setTranslationValue(0);
        setSelectedButton(0);
      }
    };
    changeWidth();
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, [productsList]);

  const nextSlide = () => {
    if (
      selectedButton + 1 <=
      Math.ceil(productsList.length / quantityCards) - 1
    ) {
      setTranslationValue(translationValue - 100);
      setSelectedButton(selectedButton + 1);
    }
  };

  const backSlide = () => {
    if (selectedButton - 1 >= 0) {
      setTranslationValue(translationValue + 100);
      setSelectedButton(selectedButton - 1);
    }
  };

  const selectButton = (id) => {
    const value = id * 100;
    setTranslationValue(-value);
    setSelectedButton(id);
  };

  return (
    <>
      <div className="carousel-related__container mb-3 px-0 ">
        <div className="carousel-related w-75-xs">
          <div
            className="carousel-related__slide "
            style={{ transform: `translateX(${translationValue}%)` }}
          >
            {productsList.map((product) => (
              <div
                key={product.id}
                className="position-relative px-2"
                style={{
                  minWidth: `calc(100% / ${quantityCards})`,
                  maxWidth: `calc(100% / ${quantityCards})`,
                }}
              >
                <div className="w-100 h-100 position-relative">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={backSlide} className="btn-back">
          <i className="uil uil-angle-left fs-4"></i>
        </Button>
        <Button onClick={nextSlide} className="btn-next">
          <i className="uil uil-angle-right-b fs-4"></i>
        </Button>
      </div>
      <div className="carousel-related__circles-btns">
        {Array(Math.ceil(productsList.length / quantityCards))
          .fill(0)
          .map((el, id) => (
            <div
              key={id}
              className={`carousel-related__circles-btn  ${
                selectedButton === id ? "bg-primary" : "bg-secondary"
              }`}
              onClick={() => selectButton(id)}
            ></div>
          ))}
      </div>
    </>
  );
};

export default ProductsCarousel;
