import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { login } from "../../data/fetch";
import { Link, useSearchParams } from "react-router-dom";


const Home = props => {
  let [searchParams, setSearchParams]=useSearchParams()
  useEffect(()=>{
    console.log(searchParams.get('token'))
    if(searchParams.get('token')){
      localStorage.setItem('token',searchParams.get('token'))
      setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
    }
  },[])
  const {token, setToken} = useContext(AuthorContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({email:"", password:""})

  
  const handleChange = (event) =>{
    setFormValue({
      ...formValue, 
      [event.target.name] : event.target.value
    })
  }

  const handleLogin = async () => {
    try {
      const tokenObj = await login(formValue) //così abbiamo il token da mettere nel localstorage
      if(tokenObj && tokenObj.token){ // ctrollo se tokenObj e token sono definiti
      localStorage.setItem('token', tokenObj.token) //ls setitem accetta 2 parametri: la chiave con cui vuoi salvare e poi il valore
      setToken(tokenObj.token) //dentro token obj c'è la risposta completa dell'end point che è un oggetto e noi dobbiamo prendere solo la propiretà token
      handleClose()
      alert('Login effettuato')
      }else {
      alert("Credenziali errate")
      }
    } catch (error) {
      console.log(error)
      alert(error + 'Errore, riporva più tardi')
    }
    
  }

  // console.log(posts)
  return (
    <Container className="pt-5 mt-5">
      <h1 className="fw-bold mb-5 text-center mt-5">Benvenuto sullo Strive Blog!</h1>
      {!token && <div className="text-center d-flex justify-content-center my-5 mx-5 ">
        
        <Form className=" px-5 py-5 rounded bg-dark">
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className="fw-semibold text-light">Email address</Form.Label>
        <Form.Control className="border border-dark" type="email" name="email" placeholder="Enter email" onChange={handleChange} />
        
      </Form.Group>

      <Form.Group className="mb-5" controlId="formBasicPassword">
        <Form.Label className="fw-semibold text-light">Password</Form.Label>
        <Form.Control className="border border-dark" type="password" name="password" placeholder="Password" onChange={handleChange} />
      </Form.Group>
      
      <Button variant="primary" onClick={handleLogin}>
      Sign in
      </Button>
      <Button variant="primary"className="ms-3 px-3" as={Link} to={'http://localhost:5000/auth/login-google'}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>
  &nbsp; Login with Google
      </Button>
    </Form>
        {/* <Button variant="primary" className="me-3" onClick={handleShow}>
        Login
      </Button> or */}
      
    
      </div>}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} placeholder="your password" />
      </Form.Group>
      </Form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login now
          </Button>
        </Modal.Footer>
      </Modal> */}
     {token && <BlogList />}
    </Container>
  );
};

export default Home;