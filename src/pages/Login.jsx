import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertError from "../components/AlertError";
import { FaUserCircle } from 'react-icons/fa';
import { VscMail } from 'react-icons/vsc';
import { VscLock } from 'react-icons/vsc';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    axios
      .post("https://e-commerce-backend-uunu.onrender.com/users/login", data)
      .then((resp) => {
        localStorage.setItem("token", resp.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setAlert(true);
      });
  };

  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
  const logout = () => {
    localStorage.clear
    setIsLogged(false)
  }

  return (
    <>
    {
      isLogged ?
      <div className="card-user-logout">
        <FaUserCircle className="icon-user" size={70} />
        <Card  style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem" }}>
        <Button onClick={logout}>Log out</Button>
      </Card>
      </div>
      :
      <Card style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem" }}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <h3>Welcome! Enter your email and data password to continue</h3>
          <div className="testData">
          <h5>Test Data</h5>
          <h6><VscMail size={25} style={{margin: 10}}/> john@gmail.com</h6>
          <h6><VscLock size={25} style={{margin: 10}}/> john1234</h6>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    }
      <AlertError isVisible={alert} dismiss={() => setAlert(false)} />
    </>
  );
};

export default Login;
