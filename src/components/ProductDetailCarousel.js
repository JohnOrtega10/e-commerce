import React from "react";
import { Button } from "react-bootstrap";

const ProductDetailCarousel = ({
  product,
  carouselImg,
  selectedImg,
  setCarouselImg,
  setSelectedImg,
}) => {
  const nextImg = () => {
    if (selectedImg + 1 <= product.productImgs.length - 1) {
      const changeImg = carouselImg - 100 / product.productImgs.length;
      setCarouselImg(changeImg);
      setSelectedImg(selectedImg + 1);
    }
  };

  const backtImg = () => {
    if (selectedImg - 1 >= 0) {
      const changeImg = carouselImg + 100 / product.productImgs.length;
      setCarouselImg(changeImg);
      setSelectedImg(selectedImg - 1);
    }
  };

  const selectImg = (id) => {
    const changeImg = id * (100 / product.productImgs.length);
    setSelectedImg(id);
    setCarouselImg(-changeImg);
  };

  return (
    <>
      <div className="carousel">
        <ul
          className="carousel__gallery"
          style={{ transform: `translateX(${carouselImg}%)` }}
        >
          {product.productImgs?.map((img) => (
            <li className="carousel__item" key={img.id}>
              <img src={img.imgUrl} alt="" className="carousel__img" />
            </li>
          ))}
        </ul>
        <Button onClick={backtImg} className="btn-back">
          <i className="uil uil-angle-left fs-4"></i>
        </Button>
        <Button onClick={nextImg} className="btn-next">
          <i className="uil uil-angle-right-b fs-4"></i>
        </Button>
      </div>
      <ul className="preview">
        {product.productImgs?.map((img, id) => (
          <li
            className="preview-item"
            onClick={() => selectImg(id)}
            key={img.id}
          >
            <img
              src={img.imgUrl}
              alt=""
              className={`preview-img ${
                selectedImg === id && "border border-primary rounded"
              }`}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductDetailCarousel;
