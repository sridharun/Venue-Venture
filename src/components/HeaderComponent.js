import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,Modal, ModalHeader, ModalBody} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from './logo.jpg'
import Login from './user/Login';
import { logoutUser,keepUserLoggedin } from './user/auth/userActions';
import { connect } from 'react-redux'

import authToken from "./authToken.js";
  
class Header extends Component {
  constructor(props) {
      super(props);
      this.toggleModal = this.toggleModal.bind(this);
      this.toggleNav = this.toggleNav.bind(this);
      this.state = {
        navBackground:this.props.navbg,
        isNavOpen: false,
        isModalOpen: false
      };
    }
    //`url(${navimage})`
    componentDidMount() {
      console.log(this.props.auth.userEmail);
      console.log(this.props.auth.isLoggedIn);
      if(localStorage.jwtToken){
        function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
        }
        var decodedToken=parseJwt(localStorage.jwtToken);
        var dateNow = new Date();
        if(decodedToken.exp < dateNow.getTime()/1000){
          
          localStorage.removeItem("jwtToken"); 
        }
        else{
          if(!this.props.auth.isLoggedIn){
            this.props.keepUserLoggedin(decodedToken.sub);
          }
        }
        console.log(decodedToken);
        console.log(decodedToken.exp,dateNow.getTime());
        authToken(localStorage.jwtToken);
      }
      document.addEventListener("scroll", () => {
        const backgroundcolor = window.scrollY < 200 ? this.props.navbg :'linear-gradient(rgba(0, 0, 0,1.0),rgba(0, 0, 0, 1.0))' ;
        this.setState({ navBackground: backgroundcolor });
      });
    }
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
    toggleNav() {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }
    logout=() => {
      this.props.logoutUser();
    }
    
  render() {
    const guestLinks=(<>
      <NavItem>
        <NavLink className="nav-link" to='/register'><i class="fa fa-user-plus"></i> Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to='/login'><i class="fa fa-sign-in" aria-hidden="true"></i> Login</NavLink>
      </NavItem>
    </>);
    const userLinks=(
      <>
      
      <NavItem>
        <NavLink className="nav-link" to='/profile'><i class="fa fa-user-circle"></i> Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to='/logout' onClick={this.logout}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</NavLink>
      </NavItem>
    </>
    );
    
    return(
      <React.Fragment>
        <Navbar dark expand="md" className="fixed-top" style={{backgroundImage:this.state.navBackground}}>
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand  className="color" href="/">Venue Venture</NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar style={{justifyContent:'space-between'}}>
              <Nav className="mr-auto" navbar>
                <NavItem >
                  <NavLink className="nav-link" to='/home'> Home</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink className="nav-link" to='/venues'>Venues</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/vendors'> Vendors</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink className="nav-link" to='/stores'> Stores</NavLink>
                </NavItem> */}
              </Nav>
              <Nav navbar className="justify-content-end">
                {this.props.auth.isLoggedIn?userLinks:guestLinks}     
              </Nav>   
            </Collapse>
          </div>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
          <Login />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps= state =>{
  return {
      auth:state.auth
  }
};
const mapDispatchToProps = dispatch =>{
  return {
      logoutUser: () => dispatch(logoutUser()),keepUserLoggedin: (email) => dispatch(keepUserLoggedin(email))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
