import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { addProductToCartThunk } from "../store/slices/cart.slice";
import { setLoginAlert } from "../store/slices/user.slice";
import { formatterPeso } from "../utils/formatterData";

const ProductCard = ({ product }) => {
  const isLogged = useSelector((state) => state.user.isLogged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToCart = (id) => {
    if (isLogged) {
      const data = {
        productId: id,
        quantity: 1,
      };

      dispatch(addProductToCartThunk(data));
      return;
    }

    dispatch(
      setLoginAlert("warning-Inicia sesión para agregar productos al carrito.")
    );
    navigate("/login");
  };

  return (
    <>
      <Card
        className="h-100 link border-0 card "
        as={Link}
        to={`/product/${product.id}`}
        border="light"
      >
        <Card.Img
          variant="top"
          src={product.productImgs[0].imgUrl}
          className="image "
        />
        <Card.Img
          variant="top"
          src={product.productImgs[1].imgUrl}
          className="image image--transition"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="d-flex flex-column align-items-start">
            <small
              className=" text-uppercase border border-primary rounded py-1 px-2 d-inline-block mb-2 "
              style={{ fontSize: ".8rem" }}
            >
              {product.brand.name}
            </small>
            {product.title}
          </Card.Title>
          <div className="d-flex justify-content-between align-items-center pt-3 pb-3">
            <div>
              <small className="text-muted d-block">Precio</small>
              <span className="mb-0 fs-5">
                {formatterPeso.format(product.price)}
              </span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer
          border="light"
          className="text-center border-0 card-footer card-link"
        >
          Ver detalles
        </Card.Footer>
      </Card>
      <Button
        variant="primary"
        onClick={() => addProductToCart(product.id)}
        className="shop__button"
      >
        <i className="uil uil-shopping-cart" style={{ fontSize: "1.3rem" }}></i>
      </Button>
    </>
  );
};

export default ProductCard;
