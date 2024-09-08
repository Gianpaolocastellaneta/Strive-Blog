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

        {/* Toggle menu small */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />

        {/* Collapsible menu */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-lg-none">
          {token && (
            <div className="d-flex flex-column w-100">
              <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark mb-3 mt-4 d-lg-none">
                + Add New Post
              </Button>
              <Button className="d-lg-none w-25" variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
          {authorInfo && <Image src={authorInfo.avatar} className="authorAvatar mt-3 d-lg-none" />}
        </Navbar.Collapse>

        {/* Navigation medium large */}
        <div className="d-none d-lg-flex">
          {!token && (
            <Button className="ms-3" variant="dark" onClick={handleShowReg}>
              Register
            </Button>
          )}
          {token && (
            <>
              <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark mx-5">
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
              </Button>
              <Button className="ms-5 me-2" variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {authorInfo && <Image src={authorInfo.avatar} className="authorAvatar" />}
        </div>

       
        <Modal className="bg-secondary" show={showReg} onHide={handleCloseReg}>
          <Modal.Header closeButton className="bg-dark">
            <Modal.Title className="bg-dark text-light">REGISTER YOUR ACCOUNT</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Form className="px-5 py-5 rounded bg-dark">
             
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
      </Container>
    </Navbar>
  );
};

export default NavBar;