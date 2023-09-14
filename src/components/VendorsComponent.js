import React, { Component, useState } from 'react';
import {Card,CardBody,CardImg} from 'reactstrap';
import Header from './HeaderComponent';
import VendorsList from './vendors/VendorsList';
import {category} from '../shared/categort'
import { useHistory } from "react-router-dom";

export default class Vendors extends Component {
  constructor(props){
    super(props)
    this.state={
      category:''
    };
    this.handleCategory = this.handleCategory.bind(this)
    this.RenderMenuItem = this.RenderMenuItem.bind(this)
  }
   
  handleCategory = ({category})=> {
    console.log(category);
    this.setState({category:category});
    this.props.history.push({ 
      pathname: `/vendors/${category}`,
      state: {category: category}
    });
  } 
  RenderMenuItem ({imageurl,category}) { 
    return (
      <div className="row">
        <div className="col-sm-1"></div>
          <Card className="p-2 mb-2 col-sm-10"  onClick={() => this.handleCategory({category})}>
              <CardImg src={imageurl} alt={category} style={{maxHeight :'250px'}}/> 
              <CardBody>
                <h4>{category} </h4>
              </CardBody>
          </Card>
          
        </div>
      
    );
  }
  render(){
    const menu = category.map((cat) => {
      return (
        <this.RenderMenuItem imageurl={'assets/images/'+cat.cat+'.jpeg'} category={cat.cat}/>
      );
    });
    return(
      <div className="container" style={{marginTop:'5rem'}}>
          <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
          <div className="row ">{menu} </div>
      </div>
    )
  }
}
