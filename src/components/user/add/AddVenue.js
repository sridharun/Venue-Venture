import React, { Component } from "react";
import { Card, Form,Button,Row,Col,Modal} from 'react-bootstrap';
import axios from 'axios';
import { connect } from "react-redux";
import {Navbar, NavbarBrand,Jumbotron,Nav,NavbarToggler,Collapse,NavItem,
    ModalBody,ModalHeader,FormGroup,Label,Input,NavbarText} from "reactstrap";
import ImageUpload from "./ImageUpload";

class AddVenue extends Component{
    constructor(props){
        super(props);
        this.state= this.initialState;
        this.addVenue = this.addVenue.bind(this);
        this.venueChange = this.venueChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    initialState={
        name:'',imageUrl:'',street:'',location:'',city:'',state:'',landmark:'',minCapacity:'',maxCapacity:'',occation:'',discription:'',pincode:0,isModalOpen:false
    }
    toggleModal = ()=>{
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
        console.log(this.state.imageUrl,"vk");
      }
    bookingclick = ()=>{
    this.toggleModal();
    
    }
    resetForm = () =>{
        this.setState(()=>this.initialState);
    }
    addVenue = (event) => {
        
        event.preventDefault();
        const venue = {
            name:this.state.name,
            image:this.state.imageUrl,
            street:this.state.street,
            location:this.state.location,
            city:this.state.city,
            state:this.state.state,
            landmark:this.state.landmark,
            capacitymin:this.state.minCapacity,
            capacitymax:this.state.maxCapacity,
            occations:this.state.occation,
            rating:'0',
            description:this.state.discription,
            pincode:this.state.pincode,
            owneremail:this.props.auth.userEmail
        };
        console.log(venue);
        const url = 'http://localhost:8081/venue/addvenue';
        axios.post(url,venue)
            .then(Response =>{
                if(Response.data != null){
                    this.setState(this.initialState);
                    alert("Venue Added Successfully");
                }
            });
        

    }
    venueChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
        
    }
    handleChangeValue = (val) => {this.setState({imageUrl: val});console.log(val,"vk"); }

    render(){
        const {name,imageUrl,street,location,city,state,landmark,minCapacity,maxCapacity,occation,discription,pincode} = this.state;
        return(
            <div className="container">
                <Modal show={this.state.isModalOpen} onHide={this.toggleModal} dialogClassName="modal-80w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ImageUpload closeModel={this.toggleModal} onChangeValue={this.handleChangeValue}/></Modal.Body>
                </Modal>
                {/* <Modal fullscreen={true} isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Book Venue</ModalHeader>
                    <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
                    </ModalBody>
                </Modal> */}
                <Card className="border ">
                    <Card.Header>Add Venue</Card.Header>
                    <Form onReset={this.resetForm} onSubmit={this.addVenue}  id="addVenueForm">
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venuename">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="name"
                                        value={name}
                                        onChange={this.venueChange}
                                        placeholder="Enter Name"
                                        />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueImageUrl">
                                <Form.Label>Image Url</Form.Label><br/>
                                <Button variant="danger" onClick={this.toggleModal}>Upload</Button>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venuestreet">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="street"
                                    value={street}
                                    onChange={this.venueChange}
                                    placeholder="Enter Street"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueLocation">
                                <Form.Label>Area</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="location"
                                    value={location}
                                    onChange={this.venueChange}
                                    placeholder="Enter Location"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="city"
                                    value={city}
                                    onChange={this.venueChange}
                                    placeholder="Enter City"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venuePincode">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="number" name="pincode"
                                    value={pincode}
                                    onChange={this.venueChange}
                                    placeholder="Enter Pincode"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venueState">
                                <Form.Label>State</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="state"
                                    value={state}
                                    onChange={this.venueChange}
                                    placeholder="Enter State"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueLandMark">
                                <Form.Label>LandMark</Form.Label>
                                <Form.Control autoComplete="off"
                                    type="text" name="landmark"
                                    value={landmark}
                                    onChange={this.venueChange}
                                    placeholder="Enter LandMark"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venueMinCapacity">
                                <Form.Label>Minimum Capacity</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="minCapacity"
                                    value={minCapacity}
                                    onChange={this.venueChange}
                                    placeholder="Enter Minimum Capacity"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueMaxCapacity">
                                <Form.Label>Maximum Capacity</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="maxCapacity"
                                    value={maxCapacity}
                                    onChange={this.venueChange}
                                    placeholder="Enter Maximum Capacity"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueoccation">
                                <Form.Label>Occasion</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="occation"
                                    value={occation}
                                    onChange={this.venueChange}
                                    placeholder="Enter Occasion"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venueDiscription">
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    as="textarea" name="discription"
                                    rows={3} 
                                    value={discription}
                                    onChange={this.venueChange} 
                                    placeholder="Enter Description"/>
                                </Form.Group>                
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="md" type="submit" variant="success">
                                Submit
                            </Button>{' '}
                            <Button size="md" type="reset" variant="info">
                                Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
    
}
const mapStateToProps= state =>{
    return {
        auth:state.auth
    }
  };

export default  connect(mapStateToProps)(AddVenue);