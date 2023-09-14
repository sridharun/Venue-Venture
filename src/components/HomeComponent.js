import React from 'react';
import { Button, Container, Form, Input } from 'reactstrap';
import Header from './HeaderComponent';
import { keepUserLoggedin } from './user/auth/userActions';
import { connect } from 'react-redux'
function Home(props) {    
    return(
      <div>
      <div className="sampleimage"  >
        <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.0))"} />
        <div className="row wrapper">
          <div className="col-sm-1 col-md-2 "> </div>
          <div className="col-sm-10 col-md-8 ">
          <h1 style={{backgroundImage:"./logo.jpg"}}>Find a <span></span></h1>
          <p> All in one platform. Find venue that best matches your Occation in no time and by free of cost. Easily contact with the venue and book your date fast. </p>
          {/* { <Form className="col-md-6 p-0 m-0">
              <div className="d-flex justify-content-center">
                  <Input type="search" placeholder="Search City..." className="form-control w-100"/>
                    <Button
                      type="submit" 
                       >SEARCH
                    </Button>
                 </div>
          </Form> } */}
          </div>
          <div className="col-sm-1 col-md-2"></div>
        </div>
      </div>
     
      <Container className=" mt-5 mb-5 p-3 text-white" >
        
        <h3 style={{fontWeight:"bold"}}>About Us</h3>
        <h6>As the trend for different functions are too far changed from that of old days and everyone have different innovative thoughts on setting a function or party. As the case is this, all functions and parties are held or celebrated with a venue booking component. The venue booking can give you and your team a single place to stay organized and track bookings, billings, and communications. The advantages of such a system itself give you a fresh approach to event planning, enjoying amenities, team collaboration, and participant engagement.</h6>
        <br/>
        <div className="row">
          <h3 style={{textAlign: "center" ,marginBottom:"20px", fontWeight:"bold"}}>How It Works?</h3>
        </div>
        <div className="row" style={{textAlign: "center"}}>
          <div className="col-sm-4" >
            <img style={{background: "white",width:"120px",height:"120px"}} className="rounded-circle" src="https://cdn.venuemonk.com/new/venue/discover.svg" alr="hit"/>
            <h4 style={{margin:"15px 0px"}}>Discover</h4>
            <p>Browse Venues to create your shortlist</p>
          </div>
          <div className="col-sm-4">
            <img style={{background: "white",width:"120px",height:"120px"}} className="rounded-circle" src="https://cdn.venuemonk.com/new/venue/shortlist.svg" alr="hit"/>
            <h4 style={{margin:"15px 0px"}}>Shortlist</h4>
            <p>Get negotiated rates for your shortlisted venues</p>
          </div>
          <div className="col-sm-4">
            <img style={{background: "white",width:"120px",height:"120px"}} className="rounded-circle" src="https://cdn.venuemonk.com/new/venue/book.svg" alr="hit"/>
            <h4 style={{margin:"15px 0px"}}>Book</h4>
            <p>Book online at our guaranteed lowest price (Upto 30% off)</p>
          </div>
          
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-6">
            <div className="row" style={{textAlign: "center"}}>
              <div className="col-md-4">
                <img height="52" width="52" className="stats lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/location.png" alt="Venue"/>
                <h4 style={{marginTop:"1px",marginBottom:"0px"}}>30000+</h4>
                <p>Venue Spaces Listed</p>
              </div>
              <div className="col-md-4">
                <img height="52" width="70" className="stats-1 lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/user.png" alt="Happy Users"/>
                <h4 style={{marginTop:"1px",marginBottom:"0px"}}>4 Lac+</h4>
                <p>Happy Users</p>
              </div>
              <div className="col-md-4">
                <img height="52" width="52" className="stats lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/home.png" alt="Cities"/>
                <h4 style={{marginTop:"1px",marginBottom:"0px"}}>20+</h4>
                <p >States</p>
              </div>
              </div>
          </div>
          <div className="col-md-6">
          <h4 style={{fontWeight:"bold"}}>Fastest Growing Venue Booking MarketPlace</h4>
            <h6>Since our launch in 2021, we have built a wonderful ecosystem of venues for people who love throwing parties and hosting memorable events. We have had an exciting journey for a trusted platform for good ethics, business and experience. Our mission is Making Happy Occasions Happier!</h6>
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-6">
            <h4 style={{fontWeight:"bold"}}>Easy, Secure and Reliable Platform</h4>
            <h6>The platform has been designed to make your event planning process very easy. We recommend venues  as per your preferences in shortest time possible and facilitate clear communication, packages and services to ensure a safe, reliable, happy experience.</h6>
          </div>
          <div className="col-md-6">
            <div className="row" style={{textAlign: "center"}}>
              <div className="col-md-4">
                <img height="52" width="52" className="stats lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/varified.png" alt="Venue"/>
                <h5 style={{marginTop:"1px",marginBottom:"0px"}}>VeneW Locale</h5>
                <p>Verified</p>
              </div>
              <div className="col-md-4">
                <img height="52" width="70" className="stats-1 lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/cs.png" alt="Happy Users"/>
                <h5 style={{marginTop:"2px",marginBottom:"0px"}}>24/7</h5>
                <p>Support</p>
              </div>
              <div className="col-md-4">
                <img height="52" width="52" className="stats lazyloaded" src="https://cdn.venuelook.com/images/new-home-images/stright.png" alt="Cities"/>
                <h5 style={{marginTop:"1px",marginBottom:"0px"}}>Stringent</h5>
                <p>Quality control</p>
              </div>
              </div>
          </div>
        </div>
        </Container>
    </div>
    );
}

const mapDispatchToProps = dispatch =>{
  return {
    keepUserLoggedin: (email) => dispatch(keepUserLoggedin(email))
  };
};
export default connect(null, mapDispatchToProps)(Home);