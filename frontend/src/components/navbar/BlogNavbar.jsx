import React from "react";
import { Button, Container, Navbar, Modal, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { useContext, useState } from "react";
import { register } from '../../data/fetch'

const NavBar = props => {
  const { token , setToken} = useContext(AuthorContext)
  const { authorInfo , setAuthorInfo} = useContext(AuthorContext)
  const navigate = useNavigate()
  console.log(authorInfo)
  const [showReg, setShowReg] = useState(false);
  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true)



  const initialRegistrationFormValue = {
    name: "",
    surname: "",
    avatar: "",
    password: "",
    email: "",
  }
  const [regFormValue, setRegFormValue] = useState(initialRegistrationFormValue)
  const [avatar, setAvatar] = useState("")

  const handleChangeRegistration = (event) => {
    setRegFormValue({
      ...regFormValue,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeImage = (event) => {
    // handleChangeRegistration(event)
    setAvatar(event.target.files[0])
  }

  const handleRegister = async () => {
    const res = await register(regFormValue, avatar)
    console.log(res)
    handleCloseReg()
    setRegFormValue(initialRegistrationFormValue)
    // alert('Registrazione effettuata')
  }

  const handleLogout = () =>{
    setToken(null)
    setAuthorInfo(null)
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Modal className="bg-secondary" show={showReg} onHide={handleCloseReg}>
          <Modal.Header closeButton className="bg-dark">
            <Modal.Title className="bg-dark text-light">REGISTER YOUR ACCOUNT</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Form className=" px-5 py-5 rounded bg-dark">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control type="email" name="email" value={regFormValue.email} onChange={handleChangeRegistration} placeholder="name@example.com" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control type="password" name="password" value={regFormValue.password} onChange={handleChangeRegistration} placeholder="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label className="text-light">Name</Form.Label>
                <Form.Control type="name" name="name" value={regFormValue.name} onChange={handleChangeRegistration} placeholder="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                <Form.Label className="text-light">Surname</Form.Label>
                <Form.Control type="surname" name="surname" value={regFormValue.surname} onChange={handleChangeRegistration} placeholder="surname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label className="text-light">Profile Photo</Form.Label>
                <Form.Control type="file" name="avatar" onChange={handleChangeImage} placeholder="your picture" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between bg-dark">
            <Button variant="danger" onClick={handleCloseReg}>
              Close
            </Button>
            <Button variant="success" onClick={handleRegister}>
              Register now
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex">
          {!token && <Button className="ms-3" variant="dark" onClick={handleShowReg}>
            Register
          </Button>}
          {/* {token && <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search post"
              className="me-2"
              aria-label="Search"
            // onChange={handleSearch}
            />
          </Form>} */}
          {token && <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark mx-5" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Add New Post
          </Button>}
          {token && <Button className="ms-5 me-2" variant="primary" onClick={handleLogout}>
            Logout
          </Button>}
          {authorInfo && <Image src={authorInfo.avatar} className="authorAvatar" />}
        </div>
      </Container>

    </Navbar>
  );
};

export default NavBar;