import React, { Component, StrictMode } from "react";
import { Card, Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';

export default class AddVendor extends Component{
    constructor(props){
        super(props);
        this.state= this.initialState;
        this.addVendor = this.addVendor.bind(this);
        this.vendorChange = this.vendorChange.bind(this);
    }
    initialState={
        name:'',imageUrl:'',address:'',area:'',city:'',state:'',pincode:'',landmark:'',description:'',category:''
    }
    resetForm = () =>{
        this.setState(()=>this.initialState);
    }
    addVendor = (event) => {
        
        event.preventDefault();
        const vendor = {
            name:this.state.name,
            imageUrl:this.state.imageUrl,
            address:this.state.address,
            area:this.state.area,
            city:this.state.city,
            state:this.state.state,
            pincode:this.state.pincode,
            rating:'0',
            landmark:this.state.landmark,
            description:this.state.description,
            category:this.state.category
        };
        console.log(vendor);
        const url = 'http://localhost:8081/vendor/addvendor';
        axios.post(url,vendor)
            .then(Response =>{
                if(Response.data != null){
                    this.setState(this.initialState);
                    alert("Vendor Added Successfully");
                }
            });
    }
    vendorChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
        
    }

    render(){
        const {name,imageUrl,address,area,city,state,pincode,landmark,description,category} = this.state;
        return(
            <div className="container">
                <Card className="border">
                    <Card.Header>Add Vendor</Card.Header>
                    <Form onReset={this.resetForm} onSubmit={this.addVendor}  id="addVendorForm">
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="vendorname">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="name"
                                        value={name}
                                        onChange={this.vendorChange}
                                        placeholder="Enter Name"
                                        />
                                </Form.Group>
                                <Form.Group as={Col} controlId="vendorImageUrl">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="imageUrl"
                                    value={imageUrl}
                                    onChange={this.vendorChange}
                                    placeholder="Enter URL"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="vendorstreet">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="address"
                                    value={address}
                                    onChange={this.vendorChange}
                                    placeholder="Enter Street"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="vendorLocation">
                                <Form.Label>Area</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="area"
                                    value={area}
                                    onChange={this.vendorChange}
                                    placeholder="Enter Location"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="vendorCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="city"
                                    value={city}
                                    onChange={this.vendorChange}
                                    placeholder="Enter City"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="vendorState">
                                <Form.Label>State</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="state"
                                    value={state}
                                    onChange={this.vendorChange}
                                    placeholder="Enter State"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="vendorState">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="pincode"
                                    value={pincode}
                                    onChange={this.vendorChange}
                                    placeholder="Enter Pincode"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="vendorLandMark">
                                <Form.Label>LandMark</Form.Label>
                                <Form.Control autoComplete="off"
                                    type="text" name="landmark"
                                    value={landmark}
                                    onChange={this.vendorChange}
                                    placeholder="Enter LandMark"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="vendorCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="category"
                                    value={category}
                                    onChange={this.vendorChange}
                                    placeholder="Enter Category"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="vendorDescription">
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="description"
                                    value={description}
                                    onChange={this.vendorChange}
                                    placeholder="Enter Description"
                                    />
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