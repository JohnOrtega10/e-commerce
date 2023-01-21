import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Offcanvas,
  Row,
} from "react-bootstrap";
import {
  getProductsListThunk,
  setAllFilters,
  setCategoryFilters,
  setSearchFilter,
  setOrderFilters,
} from "../store/slices/products.slice";
import { AccordionFilters, ProductCard } from "../components/index";

const Shop = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.products.productsList);
  const categoriesList = useSelector((state) => state.categories);
  const searchValue = useSelector((state) => state.products.searchFilters);
  const filters = useSelector((state) => state.products.stringFilters);
  const orderValue = useSelector((state) => state.products.orderFilters);

  useEffect(() => {
    dispatch(getProductsListThunk(filters));
    setShow(false);
  }, [filters, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setCategoryFiltersBtn = (id) => {
    dispatch(setCategoryFilters(id));
    dispatch(setAllFilters());
  };

  const changeOptionOrder = (e) => {
    dispatch(setOrderFilters(e.target.value));
    dispatch(setAllFilters());
  };

  const searchProduct = (value) => {
    dispatch(setSearchFilter(value));
    dispatch(setAllFilters());
  };

  return (
    <Container className="py-5">
      {/* FILTER BY CATEGORY */}
      <Row className="justify-content-md-center mb-5" xs={2} md={4} lg={6}>
        {categoriesList.map((category) => (
          <Col key={category.id}>
            <Card
              style={{ width: "8rem", height: "100%", cursor: "pointer" }}
              className="text-center border-0 mx-auto card"
              onClick={() => setCategoryFiltersBtn(category.id)}
            >
              <Card.Img
                variant="top"
                src={category.thumbnailUrl}
                style={{ width: "80%" }}
                className="mx-auto "
              />
              <Card.Body className="p-0">
                <Card.Title as="h6" className="card-link">
                  {category.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        {/* LATERAL FILTERS DESKTOP*/}
        <Col lg="3" className="d-none d-lg-block">
          <div className="sticky">
            <AccordionFilters />
          </div>
        </Col>
        <Col>
          {/* FILTERS BY ORDER */}
          <Row className="mb-4 d-none d-lg-block">
            <Col lg={{ span: 4, offset: 8 }}>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Ordenar por:"
              >
                <Form.Select
                  value={orderValue}
                  onChange={changeOptionOrder}
                  className="border-0  select"
                >
                  <option value="" className="option">
                    Recomendados
                  </option>
                  <option value="ASC">Precio: menor a mayor</option>
                  <option value="DESC">Precio: mayor a menor</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          {/* QUERY FILTER */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar por producto"
              value={searchValue}
              onChange={(e) => searchProduct(e.target.value)}
              className="input"
            />
            <Button variant="primary" type="submit">
              <i className="uil uil-search" style={{ fontSize: "1rem" }}></i>
            </Button>
          </InputGroup>
          {/* FILTERS IN MOBILE */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              onClick={handleShow}
              className="bg-transparent border-0  d-lg-none"
            >
              <i className="uil uil-filter text-muted fs-4"></i>
            </Button>
          </div>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement={"end"}
            name={"end"}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtros</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <AccordionFilters showOrder={true} />
            </Offcanvas.Body>
          </Offcanvas>
          {/* PRODUCTS  lIST*/}
          {productsList.length ? (
            <Row xs={1} md={2} lg={3} className="gy-4 ">
              {productsList.map((product) => (
                <Col key={product.id} className="shop_card ">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="d-flex flex-column align-items-center gap-2 mx-auto text-center">
              <i className="uil uil-search fs-1"></i>
              <div>
                <h4>Lo sentimos, no encontramos ningún resultado.</h4>
                <p className="mb-0">
                  Verifique los filtros de busqueda e intentenlo de nuevo.
                </p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
