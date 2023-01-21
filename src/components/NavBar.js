import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { setIsLogged, setLoginAlert } from "../store/slices/user.slice";
import { handleShowCart } from "../store/slices/cart.slice";
import CartSidebar from "./CartSidebar";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const totalProducts = useSelector((state) => state.cart.totalProducts);

  useEffect(() => {
    const condition = localStorage.getItem("token") ? true : false;
    dispatch(setIsLogged(condition));
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setIsLogged(false));
  };

  const showCart = () => {
    if (isLogged) {
      dispatch(handleShowCart(true));
      return;
    }
    dispatch(
      setLoginAlert(
        "warning-Inicia sesión para acceder a tu carrito de compras."
      )
    );
    navigate("/login");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            E-COMMERCE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ">
              <Nav.Link as={Link} to="/">
                Tienda
              </Nav.Link>
              <NavDropdown title="Mi cuenta" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/account">
                  Mi perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/purchases">
                  Compras anteriores
                </NavDropdown.Item>
                <NavDropdown.Divider />

                {isLogged ? (
                  <NavDropdown.Item onClick={logout} as={Link} to="/login">
                    <i className="uil uil-sign-in-alt me-1"></i>
                    Cerrar sesion
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/login">
                    <i className="uil uil-sign-out-alt me-1"></i>
                    Iniciar sesion
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              <Nav.Link onClick={showCart}>
                Carrito
                <Badge bg="success" className="ms-1">
                  {totalProducts}
                </Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSidebar />
    </>
  );
};

export default NavBar;
