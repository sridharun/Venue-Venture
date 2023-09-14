// import axios from 'axios';
// import React, { Component } from 'react';
// import {Card,CardBody,CardImg} from 'reactstrap';
// import Header from './HeaderComponent';
// import Accordian from './accordian/Accordian';

// export default class Stores extends Component{
//   constructor(props){
//     super(props);
//     this.state={
//       stores:[]
//     }
//     this.RenderMenuItem = this.RenderMenuItem.bind(this);
//   }
//   componentDidMount(){
//     this.findAll();
//   }
//   findAll(){
//     const url = 'http://localhost:8081/store/getStores';
//     axios.get(url)
//     .then((response)=>{
//         this.setState({stores:response.data});
//     })
//     /* this.setState({stores:stores}) */

//   }
//   handleCategory = (id,name)=> {
//     console.log(id);
//     this.props.history.push({ 
//       pathname: `/stores/${name}`,
//       state: {id: id}
//     });
//   } 
//   RenderMenuItem ({store}) {
//     return (
//         <Card width="100%" className="p-2" onClick={() => this.handleCategory(store.id,store.name)}>
//             <CardImg width="100%" src={store.imageUrl} alt={store.name} /> 
//             <CardBody>
//               <h5>{store.name} </h5>
//               <div><span className="fa fa-map-marker"></span> {store.area}, {store.city}</div>
//               <div>Category: {store.category}</div>
//             </CardBody>
//         </Card>
//     );
//   }
  
//   render(){
//     const menu = this.state.stores.map((store) => {
//       return (
//           <div className="col-12 mb-3 col-md-4 d-flex align-items-stretch justify-content-stretch" key={store.id}>
//               <this.RenderMenuItem store={store} />
//           </div>
//       );
//     });
//     return (
//       <div>
//         <div className="container" style={{marginTop:'5rem'}}>
//           <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
//             <div className="row">
//               <div className="col-md-11">
//                 <div className="row ">{menu} </div>
//               </div>
//             </div>
//         </div>
//       </div>
//     );
//   }
// }
