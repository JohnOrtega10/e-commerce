import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Offcanvas,
} from "react-bootstrap";
import {
  getProductsCartThunk,
  handleShowCart,
  purchaseCartThunk,
  removeProductCartThunk,
  setProductsCart,
  setTotalPrice,
  setTotalProducts,
  updateQuantityProductCartThunk,
} from "../store/slices/cart.slice";
import { formatterPeso } from "../utils/formatterData";

const CartSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsCart = useSelector((state) => state.cart.cart);
  const isLogged = useSelector((state) => state.user.isLogged);
  const showCart = useSelector((state) => state.cart.showCart);

  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalProducts = useSelector((state) => state.cart.totalProducts);

  useEffect(() => {
    if (isLogged) {
      dispatch(getProductsCartThunk());
    } else {
      dispatch(setProductsCart([]));
    }
  }, [isLogged, dispatch]);

  useEffect(() => {
    let products = 0;
    let price = 0;
    productsCart.forEach((product) => {
      products += product.productInCart.quantity;
      price += product.price * product.productInCart.quantity;
    });

    dispatch(setTotalPrice(price));
    dispatch(setTotalProducts(products));
  }, [productsCart, dispatch]);

  const changeQuantityProduct = (productId, currentQty) => {
    const data = {
      productId,
      newQuantity: currentQty,
    };

    dispatch(updateQuantityProductCartThunk(data));
  };

  const removeProduct = (productId) => {
    dispatch(removeProductCartThunk(productId));
  };

  const purchaseCart = () => {
    dispatch(purchaseCartThunk(navigate));
  };

  return (
    <Offcanvas
      show={showCart}
      onHide={() => dispatch(handleShowCart(false))}
      placement={"end"}
      name={"end"}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
      </Offcanvas.Header>
      {productsCart.length ? (
        <>
          <Offcanvas.Body>
            <h6 className="mb-4">Productos ({totalProducts})</h6>

            {productsCart.map((product) => (
              <Card className="mb-3 border-0 card" key={product.id}>
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.productImgs[0].imgUrl}
                      alt=""
                      style={{ width: "85px", height: "85px" }}
                    />
                    <div>
                      <h6>{product.title}</h6>
                      <small className="text-muted d-block ">Precio und.</small>
                      <small className=" d-block mb-3">
                        {formatterPeso.format(product.price)}
                      </small>

                      <div className="d-flex justify-content-between align-items-start ">
                        <InputGroup size="sm">
                          <Button
                            variant="primary"
                            onClick={() =>
                              changeQuantityProduct(
                                product.id,
                                product.productInCart.quantity - 1
                              )
                            }
                          >
                            <i
                              className="uil uil-minus"
                              style={{ fontSize: ".8rem" }}
                            ></i>
                          </Button>
                          <Form.Control
                            style={{ maxWidth: "40px" }}
                            className="text-center"
                            disabled
                            value={product.productInCart.quantity}
                          />
                          <Button
                            variant="primary"
                            onClick={() =>
                              changeQuantityProduct(
                                product.id,
                                product.productInCart.quantity + 1
                              )
                            }
                          >
                            <i
                              className="uil uil-plus"
                              style={{ fontSize: ".8rem" }}
                            ></i>
                          </Button>
                        </InputGroup>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                        >
                          <i
                            className="uil uil-trash-alt"
                            style={{ fontSize: ".9rem" }}
                          ></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="border-0">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">Total</h6>
                    <span>
                      {formatterPeso.format(
                        product.price * product.productInCart.quantity
                      )}
                    </span>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </Offcanvas.Body>
          <Card className="cart__total-price rounded-0">
            <Card.Body>
              <Card.Title className="mb-3 ">Mi carrito</Card.Title>
              <Card.Text></Card.Text>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between">
                  <small className="text-muted">Subtotal</small>
                  <small className="text-muted">
                    {formatterPeso.format(totalPrice)}
                  </small>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <small className="text-muted">Descuentos</small>
                  <small className="text-muted">$ 0</small>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Total</span>
                  <b>{formatterPeso.format(totalPrice)}</b>
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="primary"
                className="w-100"
                onClick={purchaseCart}
              >
                Comprar
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Offcanvas.Body>
          <h6 className="mb-4">Productos (0)</h6>
          <h4>Tu carrito de compras está vacío.</h4>
          <p className="mb-4">
            Puedes seleccionar un producto para seguir comprando.
          </p>
          <Button
            className="w-100"
            onClick={() => {
              navigate("/");
              dispatch(handleShowCart(false));
            }}
          >
            Seguir comprando
          </Button>
        </Offcanvas.Body>
      )}
    </Offcanvas>
  );
};

export default CartSidebar;
