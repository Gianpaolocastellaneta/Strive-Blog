// 
import React, { useCallback, useState , useContext} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import {convertToRaw} from "draft-js"
import draftToHtml from "draftjs-to-html"
import { newPost } from "../../data/fetch";
import Alert from 'react-bootstrap/Alert';
import { AuthorContext } from "../../context/AuthorContextProvider";
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom";



const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false); // Stato per gestire il caricamento
  const { token } = useContext(AuthorContext);
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate(); // Hook per la navigazione

  const initialFormValue = {
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 0,
      unit: ""
    },
    author: decodedToken.authorId,
    content: ""
  };

  const [formValue, setFormValue] = useState(initialFormValue);

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeImage = (event) => {
    setCover(event.target.files[0]);
  };

  const handleChange = useCallback(value => {
  
    setText(draftToHtml(value));
    console.log(text)
    // console.log(convertToRaw(value.getCurrentContent()))
    setFormValue({
      ...formValue,
      content:draftToHtml(value) //questo drafToHtml(value) prende il valore della text area e lo converte in html
    })
  });

  const handleSubmit = async () => {
    setLoading(true); // Imposta lo stato di caricamento a true all'inizio
    try {
      const result = await newPost(formValue, cover);
      if (result) {
        navigate("/"); // Naviga alla home
      } else {
        console.error("Errore durante la creazione del post.");
      }
    } catch (error) {
      console.error("Errore durante l'invio del post:", error);
    } finally {
      setLoading(false); // Imposta lo stato di caricamento a false quando l'operazione è completata
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" name="title" onChange={handleChangeFormValue} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category" onChange={handleChangeFormValue}>
            <option value="">Seleziona una categoria</option>
            <option value="Puglia">Puglia</option>
            <option value="Calabria">Calabria</option>
            <option value="Sicilia">Sicilia</option>
            <option value="Sardegna">Sardegna</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3 mb-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control type="file" name="cover" onChange={handleChangeImage} />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
            onClick={handleSubmit}
            disabled={loading} // Disabilita il bottone mentre è in caricamento
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Caricamento...
              </>
            ) : (
              "Invia"
            )}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;