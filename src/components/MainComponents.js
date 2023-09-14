import React,{Component,useRef} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { useLocation ,useHistory,Switch, Route, Redirect } from 'react-router-dom';
import Venues from './VenueComponent';
import Stores from './StoresComponent';
import Vendors from './VendorsComponent';
import Register from './user/Register';
import Login from './user/Login';
import VendorsList from './vendors/VendorsList'
import VenueDetails from './venue/VenueDetails';
import StoreDetails from './stores/StoreDetails';
import VendorDetails from './vendors/VendorsDetails';
import ScrollToTop from '../shared/ScrollToTop';
import TestComponent from './TestComponent';
import Profile from './profile';

import ImageUpload from './user/add/ImageUpload';
import ManageBookings from './ManageBookings';
function Main(){
  const history = useHistory();
  const location = useLocation();
    const HomePage = () => {
      return(
        <Home />
      );
    }
    const VenuePage = () => {
      return(
        <Venues history={history}/>
      );
    }
    const VenueDetailsPage = () => {
      return(
        <VenueDetails location={location} />
      );
    }
    const StoresPage = () => {
      return(
        <Stores history={history}/>
      );
    }
    const StoreDetailsPage = () => {
      return(
        <StoreDetails location={location}/>
      );
    }
    const VendorsPage = () => {
      return(
        <Vendors history={history}/>
      );
    }
    const VendorslistPage = () => {
      return(
        <VendorsList location={location} history={history}/>
      );
    }
    const VendorDetailsPage = () => {
      return(
        <VendorDetails location={location}/>
      );
    }
    const TestComp = () => {
      return(
        <TestComponent />
      );
    }
    const RegisterPage =()=>{
      return(
        <Register history={history}/>
      );
    }
    const ProfilePage =()=>{
      return(
        <Profile history={history}/>
      );
    }
    return (
      <div>
        <ScrollToTop>
          <Switch>
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/venues' component={VenuePage} />
            <Route path='/venues/' component={VenueDetailsPage} />
            <Route exact path='/vendors' component={VendorsPage} />
            <Route exact path='/vendors/:category' component={VendorslistPage} />
            <Route path='/vendors/:category/' component={VendorDetailsPage} />
            <Route exact path='/stores' component={StoresPage} />
            <Route path='/stores/' component={StoreDetailsPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/manage-bookings' component={ManageBookings} />
            <Route exact path='/logout' component={Login} />
            <Redirect to="/home" />
          </Switch>
        </ScrollToTop>
        <Footer/>
      </div>
    );
}

export default Main;
