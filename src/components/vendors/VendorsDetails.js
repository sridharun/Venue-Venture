import axios from 'axios';
import React, { Component } from 'react';
import {Card,CardBody,CardImg} from 'react-bootstrap';
import Header from '../HeaderComponent';

export default class VendorDetails extends Component{
  constructor(props){
    super(props);
    this.state={
        vendor:''
    }
  }
  componentDidMount(){
    console.log('vk '+this.props.location.state.id);
    this.findVendor(this.props.location.state.id);
  }
  findVendor(id){
    const url = `http://localhost:8081/vendor/getvendor/${id}`;
    axios.get(url)
    .then((response)=>{
        this.setState({vendor:response.data});
    })
    /* this.setState({stores:stores}) */

  }  
  render(){
    const {vendor} = this.state;
        
            return (
            <div>
                <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
                <div className="container" style={{marginTop:'5rem', marginBottom:'3rem'}}>
                    <Card className="p-2">
                          <Card.Body>
                          <CardImg width="100%" height="400px"  src={vendor.imageUrl} alt={vendor.name} />
                          </Card.Body>
                    </Card>
                    <div style={{color:'white'}}>
                      <h3>{vendor.name} </h3>
                      <p><span className="fa fa-map-marker"></span> {vendor.area}, {vendor.city}</p>
                      <p className="col-md-4"><i class="fa fa-star"></i>Ratings {vendor.rating}</p>
                      <h4>Category </h4>
                      <p>{vendor.category}</p>
                      <p>{vendor.description}</p>
                    </div>
                </div>
            </div>
            );
        
  }
}
