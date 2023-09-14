import axios from 'axios';
import React, { Component } from 'react';
import {Card,CardBody,CardImg} from 'react-bootstrap';
import Header from '../HeaderComponent';

export default class StoreDetails extends Component{
  constructor(props){
    super(props);
    this.state={
        store:''
    }
  }
  componentDidMount(){
    console.log('vk '+this.props.location.state.id);
    this.findStore(this.props.location.state.id);
  }
  findStore(id){
    const url = `http://localhost:8080/store/getstore/${id}`;
    axios.get(url)
    .then((response)=>{
        this.setState({store:response.data});
    })
    /* this.setState({stores:stores}) */

  }  
  render(){
    const {store} = this.state;
        
            return (
            <div>
                <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
                <div className="container" style={{marginTop:'5rem', marginBottom:'3rem'}}>
                    <Card className="p-2">
                          <Card.Body>
                          <CardImg width="100%" height="400px"  src={store.imageUrl} alt={store.name} />
                          </Card.Body>
                    </Card>
                    <div style={{color:'white'}}>
                      <h3>{store.name} </h3>
                      <p><span className="fa fa-map-marker"></span> {store.area}, {store.city}</p>
                      <h4>Occations </h4>
                      <p>{store.description}</p>
                    </div>
                </div>
            </div>
            );
        
  }
}
