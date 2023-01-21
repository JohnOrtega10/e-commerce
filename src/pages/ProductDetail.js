import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  getProductThunk,
  getRelatedProducts,
} from "../store/slices/products.slice";
import { addProductToCartThunk } from "../store/slices/cart.slice";
import { setLoginAlert } from "../store/slices/user.slice";
import { ProductDetailCarousel, ProductsCarousel } from "../components/index";
import { formatterPeso } from "../utils/formatterData";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.product);
  const productsList = useSelector((state) => state.products.productsList);
  const isLogged = useSelector((state) => state.user.isLogged);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    dispatch(getProductThunk(id));
    setSelectedImg(0);
    setCarouselImg(0);
  }, [id, dispatch]);

  useEffect(() => {
    if (product.id) {
      dispatch(getRelatedProducts(product.id));
    }
  }, [product, dispatch]);

  const addProductToCart = () => {
    if (isLogged) {
      const data = {
        productId: product.id,
        quantity: counter,
      };
      dispatch(addProductToCartThunk(data));
      return;
    }
    dispatch(
      setLoginAlert("warning-Inicia sesión para agregar productos al carrito.")
    );
    navigate("/login");
  };

  const [carouselImg, setCarouselImg] = useState(0);
  const [selectedImg, setSelectedImg] = useState(0);

  const translateCarouselImg = (value) => {
    setCarouselImg(value);
  };

  const changeSelectedImg = (value) => {
    setSelectedImg(value);
  };

  return (
    <Container className="py-5">
      <small className="d-block mb-5">
        <Link to="/">Tienda</Link>/ {product.title}
      </small>

      <Row xs={1} lg={2}>
        <Col className="px-md-5 mb-5 mb-lg-0">
          <ProductDetailCarousel
            product={product}
            carouselImg={carouselImg}
            selectedImg={selectedImg}
            setCarouselImg={translateCarouselImg}
            setSelectedImg={changeSelectedImg}
          />
        </Col>
        <Col className=" px-md-5  my-auto ">
          <small className=" text-uppercase border border-primary rounded py-1 px-3 d-inline-block mb-2">
            {product.brand?.name}
          </small>
          <h4 className="d-flex mb-4">{product.title}</h4>
          <small className="text-muted d-block">Detalles</small>
          <p className="d-flex mb-4 text-justify">{product.description}</p>
          <div className="d-flex flex-column flex-lg-row mb-4 gap-3 gap-lg-5">
            <div>
              <small className="text-muted d-block ">Precio</small>
              <span className="fs-5">
                {formatterPeso.format(product.price)}
              </span>
            </div>
            <div>
              <small className="text-muted d-block">Cantidad</small>
              <InputGroup className="mb-4" size="sm">
                <Button
                  variant="primary"
                  id="button-addon1"
                  disabled={counter === 1}
                  onClick={() => setCounter(+counter - 1)}
                >
                  <i className="uil uil-minus"></i>
                </Button>
                <Form.Control
                  style={{ maxWidth: "60px" }}
                  className="text-center"
                  disabled
                  value={counter}
                  onChange={(e) => setCounter(e.target.value)}
                />
                <Button
                  variant="primary"
                  id="button-addon1"
                  onClick={() => setCounter(+counter + 1)}
                >
                  <i className="uil uil-plus"></i>
                </Button>
              </InputGroup>
            </div>
          </div>
          <Button
            className="d-flex justify-content-center align-items-center gap-3 w-100"
            onClick={addProductToCart}
          >
            <span>Añadir al carrito</span>
            <i
              className="uil uil-shopping-cart"
              style={{ fontSize: "1.6rem" }}
            ></i>
          </Button>
        </Col>
      </Row>
      <h4 className="mb-3" style={{ marginTop: "100px" }}>
        Productos relacionados
      </h4>
      <ProductsCarousel productsList={productsList} />
    </Container>
  );
};

export default ProductDetail;
