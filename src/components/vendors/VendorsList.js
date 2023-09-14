import axios from 'axios';
import React, { Component } from 'react';
import {Card,CardBody,CardImg} from 'reactstrap';
import Accordian from '../accordian/Accordian';
import Header from '../HeaderComponent';

export default class VendorsList extends Component{
  constructor(props){
    super(props);
    this.state={
      vendors:[]
    }
    this.RenderMenuItem = this.RenderMenuItem.bind(this);
  }
  handleCategory = (id,name)=> {
    console.log(id);
    this.props.history.push({ 
      pathname: `/vendors/${this.props.location.state.category}/${name}`,
      state: {id: id}
    });
  } 
  componentDidMount(){
    console.log('vk '+this.props.location.state.category);
    this.findAll();
  }
  findAll(){
    const url = 'http://localhost:8081/vendor/getvendors';
    axios.get(url)
    .then((response)=>{
        this.setState({vendors:response.data});
    })
    /* this.setState({stores:stores}) */

  }
  RenderMenuItem ({vendors}) {
    return (
      
        <Card className="p-2" onClick={() => this.handleCategory(vendors.id,vendors.name)}>
            <CardImg width="100%" src={vendors.imageUrl} alt={vendors.name} /> 
            <CardBody>
              <h5>{vendors.name} </h5>
              <div><span className="fa fa-map-marker"></span> {vendors.area}, {vendors.city}</div>
              <div>Category: {vendors.category}</div>
            </CardBody>
        </Card>
    );
  }
  
  render(){
    
    const menu = this.state.vendors.map((vendors) => {
      if(vendors.category === this.props.location.state.category){
        return (
          
            <div className="col-12 mb-3 col-md-4 d-flex align-items-stretch justify-content-stretch" key={vendors.id}>
                <this.RenderMenuItem vendors={vendors} />
            </div>
        );
      }
    });
    return (
      <div>
        <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
        <div className="container" style={{marginTop:'5rem'}}>
            <div className="row">
              <div className="col-md-10">
                <div className="row ">{menu} </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
