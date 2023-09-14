import React, { Component, StrictMode } from "react";
import { Card, Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';

export default class AddStore extends Component{
    constructor(props){
        super(props);
        this.state= this.initialState;
        this.addStore = this.addStore.bind(this);
        this.storeChange = this.storeChange.bind(this);
    }
    initialState={
        name:'',imageUrl:'',address:'',area:'',city:'',state:'',pincode:'',landmark:'',description:'',category:''
    }
    resetForm = () =>{
        this.setState(()=>this.initialState);
    }
    addStore = (event) => {
        
        event.preventDefault();
        const store = {
            name:this.state.name,
            imageUrl:this.state.imageUrl,
            address:this.state.address,
            area:this.state.area,
            city:this.state.city,
            state:this.state.state,
            pincode:this.state.pincode,
            landmark:this.state.landmark,
            description:this.state.description,
            category:this.state.category
        };
        console.log(store);
        const url = 'http://localhost:8081/store/addstore';
        axios.post(url,store)
            .then(Response =>{
                if(Response.data != null){
                    this.setState(this.initialState);
                    alert("Store Added Successfully");
                }
            });
    }
    storeChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
        
    }

    render(){
        const {name,imageUrl,address,area,city,state,pincode,landmark,description,category} = this.state;
        return(
            <div className="container">
                <Card className="border ">
                    <Card.Header>Add Store</Card.Header>
                    <Form onReset={this.resetForm} onSubmit={this.addStore}  id="addStoreForm">
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venuename">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="name"
                                        value={name}
                                        onChange={this.storeChange}
                                        placeholder="Enter Name"
                                        />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueImageUrl">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="imageUrl"
                                    value={imageUrl}
                                    onChange={this.storeChange}
                                    placeholder="Enter URL"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venuestreet">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="address"
                                    value={address}
                                    onChange={this.storeChange}
                                    placeholder="Enter Street"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueLocation">
                                <Form.Label>Area</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="area"
                                    value={area}
                                    onChange={this.storeChange}
                                    placeholder="Enter Location"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="city"
                                    value={city}
                                    onChange={this.storeChange}
                                    placeholder="Enter City"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venueState">
                                <Form.Label>State</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="state"
                                    value={state}
                                    onChange={this.storeChange}
                                    placeholder="Enter State"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueState">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="pincode"
                                    value={pincode}
                                    onChange={this.storeChange}
                                    placeholder="Enter Pincode"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="venueLandMark">
                                <Form.Label>LandMark</Form.Label>
                                <Form.Control autoComplete="off"
                                    type="text" name="landmark"
                                    value={landmark}
                                    onChange={this.storeChange}
                                    placeholder="Enter LandMark"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="venueoccation">
                                <Form.Label>Category</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="category"
                                    value={category}
                                    onChange={this.storeChange}
                                    placeholder="Enter Occasion"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="storeDescription">
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="description"
                                    value={description}
                                    onChange={this.storeChange}
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