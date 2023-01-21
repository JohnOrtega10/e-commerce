import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { loginThunk } from "../store/slices/user.slice";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginAlert = useSelector((state) => state.user.loginAlert);

  const submit = (data) => {
    dispatch(loginThunk(navigate, data));
  };

  return (
    <Container className="py-5">
      <small className="d-block mb-5">
        <Link to="/">Inicio</Link>/ Iniciar sesión
      </small>
      <Card className="w-100 mx-auto" style={{ maxWidth: 450 }}>
        <Card.Body>
          <Card.Title as="h4">Inicia sesión</Card.Title>
          <Card.Text className="p-0">
            Bienvenido, ingresa tu email y contraseña para continuar.
          </Card.Text>
          <Alert key="info" variant="info" className="py-2 px-3">
            <div className="d-flex align-items-center gap-3 ">
              <i className="uil uil-info-circle fs-4"></i>
              <p className="mb-0">Datos de prueba: john@gmail.com, pass1234.</p>
            </div>
          </Alert>
          {loginAlert && (
            <Alert
              key={loginAlert.split("-")[0]}
              variant={loginAlert.split("-")[0]}
              className="py-2 px-3"
            >
              <div className="d-flex align-items-center gap-3 ">
                <i className="uil uil-exclamation-circle fs-4"></i>
                <p className="mb-0">{loginAlert.split("-")[1]}</p>
              </div>
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                required
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="input"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
                {...register("password")}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3 w-100 ">
              Ingresar
            </Button>
            <p>
              ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
