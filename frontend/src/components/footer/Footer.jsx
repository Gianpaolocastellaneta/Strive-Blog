import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 40,
        marginBottom: 0,
      
        
      } }
    >
      <Container className="d-flex justify-content-center mt-5 ">{`${new Date().getFullYear()} - © Strive School | Developed for homework projects.`}</Container>
    </footer>
  );
};

export default Footer;
