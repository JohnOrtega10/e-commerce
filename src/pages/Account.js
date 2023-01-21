import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { getUserProfileThunk } from "../store/slices/user.slice";
import { setIsLoading } from "../store/slices/isLoading.slice";
import getConfig from "../utils/getConfig";
import api from "../utils/axios";

const Account = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, [dispatch]);

  const [showUpdateInputs, setShowUpdateInputs] = useState({
    nameInput: false,
    passwordInput: false,
    phoneInput: false,
  });

  const toggleShowInput = (key) => {
    const newState = {};
    newState[key] = !showUpdateInputs[key];

    setShowUpdateInputs({ ...showUpdateInputs, ...newState });

    if (key === "passwordInput") {
      setPasswordError("");
    }
  };

  const [passwordError, setPasswordError] = useState("");

  const submit = (data, key) => {
    const filterData = {};
    let resetValues = {};

    if (key === "nameInput") {
      filterData.firstName = data.firstName;
      filterData.lastName = data.lastName;
      resetValues = { firstName: "", lastName: "" };
    } else if (key === "passwordInput") {
      filterData.currentPassword = data.currentPassword;
      filterData.newPassword = data.newPassword;
      resetValues = { currentPassword: "", newPassword: "" };
    } else if (key === "phoneInput") {
      filterData.phone = data.phone;
      resetValues = { phone: "" };
    }

    dispatch(setIsLoading(true));
    api
      .patch(
        "https://ecommerce-api-production.up.railway.app/api/v1/users/profile",
        filterData,
        getConfig()
      )
      .then(() => {
        dispatch(getUserProfileThunk());
        toggleShowInput(key);
        reset(resetValues);
        setPasswordError("");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setPasswordError("La contraseña es incorrecta. Vuelve a intentarlo.");
        } else {
          console.log(err.response.data);
        }
      })
      .finally(dispatch(setIsLoading(false)));
  };

  return (
    <Container className="pt-5 pb-5">
      <small className="d-block mb-5">
        <Link to="/">Inicio</Link>/ Mi perfil
      </small>
      <h4 className="mb-5">Mi perfil</h4>
      <Row>
        <Col lg={8} className="mx-auto">
          <h5 className="mb-3">Informacion personal</h5>
          {showUpdateInputs.nameInput ? (
            <Card className="mb-3">
              <Card.Body>
                <Form
                  onSubmit={handleSubmit((data) => submit(data, "nameInput"))}
                >
                  <Row>
                    <Col md>
                      <FloatingLabel
                        controlId="firstName"
                        label="Nombres"
                        className="mb-3"
                      >
                        <Form.Control
                          className="input"
                          type="text"
                          placeholder="John"
                          required
                          {...register("firstName")}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="lastName"
                        label="Apellidos"
                        className="mb-3"
                      >
                        <Form.Control
                          className="input"
                          type="text"
                          placeholder="Doe"
                          required
                          {...register("lastName")}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end gap-3">
                    <Button
                      variant="primary"
                      onClick={() => {
                        reset();
                        toggleShowInput("nameInput");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                      Guardar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className="mb-3">
              <Card.Body className="d-flex justify-content-between align-items-end">
                <div>
                  <Card.Title as="h6" className="text-muted">
                    Nombre
                  </Card.Title>
                  <Card.Text>{`${userProfile.firstName} ${userProfile.lastName}`}</Card.Text>
                </div>
                <Button
                  variant="primary"
                  onClick={() => toggleShowInput("nameInput")}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          )}

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-end">
              <div>
                <Card.Title as="h6" className="text-muted">
                  Email
                </Card.Title>
                <Card.Text>{userProfile.email}</Card.Text>
              </div>
            </Card.Body>
          </Card>

          {showUpdateInputs.passwordInput ? (
            <Card className="mb-3">
              <Card.Body>
                <Form
                  onSubmit={handleSubmit((data) =>
                    submit(data, "passwordInput")
                  )}
                >
                  <Row>
                    <Col md>
                      <FloatingLabel
                        controlId="currentPassword"
                        label="Contraseña Actual"
                        className="mb-3"
                      >
                        <Form.Control
                          className="input"
                          type="password"
                          placeholder="*******"
                          required
                          isInvalid={passwordError ? true : false}
                          {...register("currentPassword")}
                        />
                        <Form.Text className="text-danger">
                          {passwordError}
                        </Form.Text>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="newPassword"
                        label="Nueva Contraseña"
                        className="mb-3"
                      >
                        <Form.Control
                          className="input"
                          type="password"
                          placeholder="*******"
                          required
                          {...register("newPassword")}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end gap-3">
                    <Button
                      variant="primary"
                      onClick={() => {
                        reset();
                        toggleShowInput("passwordInput");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      Guardar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className="mb-3">
              <Card.Body className="d-flex justify-content-between align-items-end">
                <div>
                  <Card.Title as="h6" className="text-muted">
                    Contraseña
                  </Card.Title>
                  <Card.Text>********</Card.Text>
                </div>
                <Button
                  variant="primary"
                  onClick={() => toggleShowInput("passwordInput")}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          )}
          <h5 className="mt-5 mb-3">Informacion de contacto</h5>
          {showUpdateInputs.phoneInput ? (
            <Card className="mb-3">
              <Card.Body>
                <Form
                  onSubmit={handleSubmit((data) => submit(data, "phoneInput"))}
                >
                  <Row>
                    <div className="d-flex align-items-center gap-4 mb-3 ">
                      <span>+57</span>
                      <FloatingLabel
                        controlId="phone"
                        label="Telefono celular"
                        className="w-100"
                      >
                        <Form.Control
                          className="input"
                          type="text"
                          placeholder="31010101010"
                          required
                          {...register("phone")}
                        />
                      </FloatingLabel>
                    </div>
                  </Row>
                  <div className="d-flex justify-content-end gap-3 ">
                    <Button
                      variant="primary"
                      onClick={() => {
                        reset();
                        toggleShowInput("phoneInput");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      Guardar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className="mb-3">
              <Card.Body className="d-flex justify-content-between align-items-end">
                <div>
                  <Card.Title as="h6" className="text-muted">
                    Teléfono Celular
                  </Card.Title>
                  <Card.Text>+57 {userProfile.phone}</Card.Text>
                </div>
                <Button
                  variant="primary"
                  onClick={() => toggleShowInput("phoneInput")}
                >
                  Editar
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
