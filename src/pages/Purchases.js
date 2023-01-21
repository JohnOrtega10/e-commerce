import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { addProductToCartThunk } from "../store/slices/cart.slice";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { formatterPeso, formatterDate } from "../utils/formatterData";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  const addProductToCart = (id) => {
    const data = {
      productId: id,
      quantity: 1,
    };

    dispatch(addProductToCartThunk(data));
  };

  const getTotalProducts = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.productInCart.quantity;
    });
    return total;
  };

  return (
    <Container className="py-5">
      <small className="d-block mb-5">
        <Link to="/">Inicio</Link>/ Mis compras
      </small>
      <h4 className="mb-5">Mis compras</h4>
      <Row>
        <Col lg={8} className="mx-auto">
          {purchases.map((purchase) => (
            <Card className="mb-4 w-lg-75" key={purchase.id}>
              <Card.Header>
                <Row xs={1} md={3} className="g-3">
                  <Col>
                    <small className="text-muted d-block">
                      Fecha de la compra
                    </small>
                    {formatterDate(purchase.createdAt)}
                  </Col>
                  <Col>
                    <small className="text-muted d-block">
                      Valor de la compra
                    </small>
                    {formatterPeso.format(purchase.totalPrice)}
                  </Col>
                  <Col>
                    <small className="text-muted d-block">
                      Estado de la compra
                    </small>
                    Exitoso
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <h6>Productos ({getTotalProducts(purchase.cart.products)})</h6>
                <ListGroup variant="flush">
                  {purchase.cart.products.map((product) => (
                    <ListGroup.Item
                      className="d-flex flex-column gap-3 flex-md-row  justify-content-md-between align-items-md-end pt-3 pb-3"
                      key={product.id}
                    >
                      <div className="d-flex align-items-center gap-4">
                        <img
                          src={product.productImgs[0].imgUrl}
                          alt=""
                          style={{ width: "6rem", height: "6rem" }}
                        />
                        <div>
                          <h6 className="mb-1">{product.title}</h6>
                          <p>{formatterPeso.format(product.price)}</p>
                          <small className="text-muted d-block mb-0">
                            Cantidad
                          </small>
                          <p className="mb-0">
                            {product.productInCart.quantity}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        style={{ minWidth: 145.2 }}
                        onClick={() => dispatch(addProductToCart(product.id))}
                      >
                        Volver a comprar
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Purchases;
