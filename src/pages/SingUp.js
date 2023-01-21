import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../store/slices/user.slice";

const SingUp = () => {
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(signUpThunk(navigate, data));
  };

  return (
    <Container className="py-5">
      <small className="d-block mb-5">
        <Link to="/login">Iniciar sesión</Link>/ Registrarse
      </small>
      <Card className="w-100 mx-auto" style={{ maxWidth: "450px" }}>
        <Card.Body>
          <Card.Title as="h4">Regístrate</Card.Title>
          <Card.Text className="p-0">
            Ingresa tus datos personales para continuar.
          </Card.Text>
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group controlId="firstName" className="mb-2">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Ingresa tu nombre"
                required
                {...register("firstName")}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-2">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Ingresa tu apellido"
                required
                {...register("lastName")}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="phone">
              <Form.Label>Celular</Form.Label>
              <div className="d-flex gap-4 align-items-center">
                <span>+57</span>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Ingresa tu numero de celular"
                  required
                  {...register("phone")}
                />
              </div>
            </Form.Group>

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
                placeholder="Ingresa una contraseña"
                required
                {...register("password")}
              />
              <Form.Text className="text-muted">
                La contraseña debe ser minimo de 8 caracteres.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3 w-100">
              Registrarme
            </Button>
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingUp;
