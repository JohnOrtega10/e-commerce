import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Badge, Form, ListGroup } from "react-bootstrap";
import { getBrandsListThunk } from "../store/slices/brands.slice";
import { getCategoriesListThunk } from "../store/slices/categories.slice";
import {
  setAllFilters,
  setBrandFilters,
  setCategoryFilters,
  setOrderFilters,
} from "../store/slices/products.slice";

const AccordionFilters = ({ showOrder }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesListThunk());
    dispatch(getBrandsListThunk());
  }, [dispatch]);

  const categoriesList = useSelector((state) => state.categories);
  const brandsList = useSelector((state) => state.brands);

  const categoryFilters = useSelector(
    (state) => state.products.categoryFilters
  );
  const brandFilters = useSelector((state) => state.products.brandFilters);
  const orderFilters = useSelector((state) => state.products.orderFilters);

  const setCategoryFiltersBtn = (id) => {
    dispatch(setCategoryFilters(id));
    dispatch(setAllFilters());
  };

  const setBrandFiltersBtn = (id) => {
    dispatch(setBrandFilters(id));
    dispatch(setAllFilters());
  };

  const setOrderFiltersBtn = (order) => {
    dispatch(setOrderFilters(order));
    dispatch(setAllFilters());
  };

  return (
    <Accordion alwaysOpen d-xs-none="true" defaultActiveKey={["0", "1", "2"]}>
      <Accordion.Item eventKey="0" className="border-0">
        <Accordion.Header className="a">Categorias</Accordion.Header>
        <Accordion.Body className="p-0">
          <ListGroup variant="flush ">
            {categoriesList.map((category) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center "
                key={category.id}
              >
                <div>
                  <Form.Check
                    type="checkbox"
                    id={`category-${category.id}`}
                    label={category.name}
                    checked={
                      categoryFilters.includes(category.id) ? true : false
                    }
                    onChange={() => setCategoryFiltersBtn(category.id)}
                  />
                </div>
                <Badge bg="primary">{category.products.length}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="border-0 ">
        <Accordion.Header>Marcas</Accordion.Header>
        <Accordion.Body className="p-0 remove-focus">
          <ListGroup variant="flush ">
            {brandsList.map((brand) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={brand.id}
              >
                <div>
                  <Form.Check
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    label={brand.name}
                    checked={brandFilters.includes(brand.id) ? true : false}
                    onChange={() => setBrandFiltersBtn(brand.id)}
                  />
                </div>
                <Badge bg="primary">{brand.products.length}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      {showOrder && (
        <Accordion.Item eventKey="2" className="border-0">
          <Accordion.Header>Ordenar por</Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush ">
              <ListGroup.Item>
                <Form.Check
                  type="checkbox"
                  id="1"
                  label="Recomendado"
                  checked={orderFilters === "" ? true : false}
                  onChange={() => setOrderFiltersBtn("")}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Check
                  type="checkbox"
                  id="2"
                  label="Precio menor a mayor"
                  checked={orderFilters === "ASC" ? true : false}
                  onChange={() => setOrderFiltersBtn("ASC")}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Check
                  type="checkbox"
                  id="3"
                  label="Precio mayor a menor"
                  checked={orderFilters === "DESC" ? true : false}
                  onChange={() => setOrderFiltersBtn("DESC")}
                />
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default AccordionFilters;
