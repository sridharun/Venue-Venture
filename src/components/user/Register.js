import React, { Component } from 'react'
import AddVenue from './add/AddVenue'
import Header from '../HeaderComponent';
import AddStore from './add/AddStore';
import AddVendor from './add/AddVendor';
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { registerUser } from './auth/userActions';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      user:this.initialState,
      error:""
    };
  }
  initialState = {
    name: "",
    email: "",
    password: "",
    mobile: "",
  };  
  render() {
    const {name,password,mobile,email} =this.state.user;
    const userChange = event => {
      const { name, value } = event.target;
      const user = this.state.user;
      user.[name]=value;
      this.setState({
        user: user,
      });
    };
    const resetRegisterForm = () => {
      this.setState(()=>this.initialState);
    };
    const saveUser = (event) => {
      console.log(this.state.user);
      this.props.registerUser(this.state.user)
      .then((response) => {
        console.log(response);
        this.setState({"error":response.message})
        resetRegisterForm();
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    return (
      <div style={{marginTop:'5rem'}}>
        <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
        <div>
          {/* <div style={{ display: show ? "block" : "none" }}>
            <MyToast show={show} message={message} type={"success"} />
          </div> */}
          <Row className="justify-content-md-center">
            <Col xs={5}>
              {this.state.error && <Alert variant="success">{this.state.error}</Alert>}
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group as={Col} className="mb-3">
                      <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                        <FormControl
                          autoComplete="off"
                          type="text"
                          name="name"
                          value={name}
                          onChange={userChange}
                          placeholder="Enter Name"
                        />
                      </InputGroup>
                    </Form.Group>
                  
                    <Form.Group as={Col} className="mb-3">
                      <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                        <FormControl
                          required
                          autoComplete="off"
                          type="text"
                          name="email"
                          value={email}
                          onChange={userChange}
                          placeholder="Enter Email Address"
                        />
                      </InputGroup>
                    </Form.Group>
                  
                    <Form.Group as={Col} className="mb-3">
                      <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                        <FormControl
                          required
                          autoComplete="off"
                          type="password"
                          name="password"
                          value={password}
                          onChange={userChange}
                          placeholder="Enter Password"
                        />
                      </InputGroup>
                    </Form.Group>
                  
                    <Form.Group as={Col} className="mb-3">
                      <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faPhone} />
                          </InputGroup.Text>
                        <FormControl
                          autoComplete="off"
                          type="text"
                          name="mobile"
                          value={mobile}
                          onChange={userChange}
                          placeholder="Enter Mobile Number"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Footer style={{ textAlign: "right" }}>
                  <Button
                    size="sm"
                    type="button"
                    variant="success"
                    onClick={saveUser}
                    disabled={email.length === 0 || password.length === 0}
                  >
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                  </Button>{" "}
                  <Button
                    size="sm"
                    type="button"
                    variant="info"
                    onClick={resetRegisterForm}
                  >
                    <FontAwesomeIcon icon={faUndo} /> Reset
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    registerUser:(userObject) => dispatch(registerUser(userObject))
  };
};
export default  connect(null,mapDispatchToProps)(Register);