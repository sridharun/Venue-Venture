/* http://localhost:8081/venue/getvenuesbyemail/19eucs171@skcet.ac.in */
/* http://localhost:8081/user/getuser/19eucs171@skcet.ac.in */
/* http://localhost:8081/user/updateuser */
import React, { Component } from 'react'
import AddVenue from './user/add/AddVenue'
import AddStore from './user/add/AddStore'
import AddVendor from './user/add/AddVendor'
import Header from './HeaderComponent';
import axios from 'axios';
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
  faUserEdit,
  faEdit,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { registerUser } from './user/auth/userActions';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      user:this.initialState,
      error:"",
      venues:[],
      enableRegister:false,
      enableVendorRegister:false,
      enableStoreRegister:false,
      ownsvenue:false,
    };
  }
  initialState = {
    name: "",
    email: "",
    password: "",
    mobile: "",
  }; 
  componentDidMount(){
    let url = `http://localhost:8081/user/getuser/${this.props.auth.userEmail}`;
    axios.get(url)
    .then((response)=>{
        this.setState({
          user:response.data,
          
        });
        console.log(this.state.user,"vk",response.data,this.props.auth.userEmail,url);
    })
    url = `http://localhost:8081/venue/getvenuesbyemail/${this.props.auth.userEmail}`;
    axios.get(url)
    .then((response)=>{
        this.setState({
          venues:response.data,
          
        });
        if (typeof this.state.venues !== 'undefined' && this.state.venues.length > 0) {
          this.setState({
            ownsvenue:true
          });
        }
        else{
          this.setState({
            ownsvenue:false,
          });
        }
        console.log(this.state.venues,this.props.auth.userEmail,url);
    })
  } 
  render() {
    const {name,password,mobile,email} =this.state.user;
    const registerenable = ()=>{
        this.setState({
            enableRegister: !this.state.enableRegister,
          });
    }
    const registerVendorEnable = ()=>{
      this.setState({
        enableVendorRegister: !this.state.enableVendorRegister,
        });
    }
    const registerStoreEnable = ()=>{
      this.setState({
        enableStoreRegister: !this.state.enableStoreRegister,
        });
    }
    const userChange = event => {
      const { name, value } = event.target;
      const user = this.state.user;
      user[name]=value;
      this.setState({
        user: user,
      });
    };
    const resetRegisterForm = () => {
      /* this.setState(()=>this.initialState); */
    };
    const saveUser = (event) => {
      console.log(this.state.user);
      const url = 'http://localhost:8081/user/updateuser';
      axios.post(url,this.state.user)
            .then(Response =>{
                if(Response.data != null){
                    
                    alert("User Updated Successfully");
                }
            });
      /* http://localhost:8081/user/updateuser */
    };
    const handlePush = (id,name)=> {
      console.log(id);
      this.props.history.push({ 
        pathname: `/venues/${name}`,
        state: {id: id}
      });
    }
    const handleManageBookings=()=>{
      this.props.history.push({
        pathname:"/manage-bookings",
        state:{owneremail:this.props.auth.userEmail}
      })
    }
    const venuenames = this.state.venues.map((venue)=>{
      return (
        <div key={ venue.id } onClick={() => handlePush(venue.id,venue.name)} >
          <li>{venue.name}</li>
        </div>
      );
    });
    return (
      <div style={{marginTop:'5rem'}}>
        <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
        <div className="p-3">
          {/* <div style={{ display: show ? "block" : "none" }}>
            <MyToast show={show} message={message} type={"success"} />
          </div> */}
          <Row className="justify-content-md-center">
            <Col xs={5}>
              {this.state.error && <Alert variant="success">{this.state.error}</Alert>}
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faUserEdit} /> Update
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
                          readOnly 
                        />
                      </InputGroup>
                    </Form.Group>
                  
                    {/* <Form.Group as={Col} className="mb-3">
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
                    </Form.Group> */}
                  
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
                  <FontAwesomeIcon icon={faUserEdit} /> Update
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
                <h5 className={!this.state.ownsvenue ? "border p-3":"d-none"}>Have a venue? <Button
                    size="sm"
                    type="button"
                    variant="danger"
                    onClick={registerenable}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Register
                  </Button>
                </h5>
                {/* <h5 className={!this.state.ownsvenue ? "border p-3":"d-none"}>Have a Store? <Button
                    size="sm"
                    type="button"
                    variant="danger"
                    onClick={registerStoreEnable}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Register
                  </Button>
                </h5> */}
                <h5 className={!this.state.ownsvenue ? "border p-3":"d-none"}>Are you a Vendor? <Button
                    size="sm"
                    type="button"
                    variant="danger"
                    onClick={registerVendorEnable}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Register
                  </Button>
                </h5>
                <div className={this.state.ownsvenue ? "border p-3":"d-none"} >
                <h5>Your Venues <Button
                            size="sm"
                            type="button"
                            variant="success"
                            onClick={handleManageBookings}
                        >
                      Manage Bookings
                      </Button>
                    </h5>
                    
                    <div>{venuenames}</div>
                    <h5>Have Another Venue? <Button
                            size="sm"
                            type="button"
                            variant="danger"
                            onClick={registerenable}
                        >
                          
                        <FontAwesomeIcon icon={faPlusSquare} /> AddVenue
                      </Button>
                    </h5>
                    {/* <h5>Or Store? <Button
                            size="sm"
                            type="button"
                            variant="danger"
                            onClick={registerStoreEnable}
                        >
                      <FontAwesomeIcon icon={faPlusSquare} /> AddStore
                      </Button>
                    </h5> */}
                    <h5>Are You a Vendor? <Button
                            size="sm"
                            type="button"
                            variant="danger"
                            onClick={registerVendorEnable}
                        >
                          <FontAwesomeIcon icon={faPlusSquare} /> AddVendor
                      </Button>
                    </h5>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className={this.state.enableRegister ? "":"d-none"}>
            <AddVenue/>
        </div>
        <div className={this.state.enableStoreRegister ? "":"d-none"}>
            <AddStore/>
        </div>
        <div className={this.state.enableVendorRegister ? "":"d-none"}>
            <AddVendor/>
        </div>
        
      </div>
    )
  }
}
const mapStateToProps= state =>{
    return {
        auth:state.auth
    }
  };

export default  connect(mapStateToProps)(Profile);