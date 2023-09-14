import React from 'react';
import { Button } from 'react-bootstrap';
function Footer(props) {
    return(
    <div className="footer" style={{marginTop:"40px"}}>
        <div className="container">
            <div className="row justify-content-center text-white">             
                <div className="col-4 offset-1 col-sm-5">
                    <h5 style={{fontWeight:"600"}}>More</h5>
                    <h6>Company Overview | Why List With VenueVenture | Terms & Conditions | Privacy Policy | Contact Us</h6>
                    <br/>
                    <h5 style={{fontWeight:"600"}}>Contact Info</h5>
                    <h6> <i className="fa fa-phone"></i> +91-1234567890 &nbsp; <i className="fa fa-envelope"></i> events@wenewlocale.com</h6>
                
                </div>
                <div className="col-4 offset-1 col-sm-5">
                    {/* <h5 style={{fontWeight:"600",marginBottom:"25x"}}>Subscribe For Party Ideas and Offers</h5>
                    <input type="text" id="subscribeEmail" placeholder="Your E-mail" style={{height: "40px"}}/><Button variant="danger" onClick={()=>{alert("Subscribed Successfully....");document.getElementById("subscribeEmail").value= "";}}>Subscribe</Button> */}
                    <br/>
                    <br/>
                    <h5 style={{fontWeight:"600"}}>Connect With us</h5>
                    <img  width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/fb.png" alt="facebook"/> 
                    &nbsp;<img class="social-icon lazyloaded" width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/insta.png" alt="instagram"/>
                    &nbsp;<img class="social-icon lazyloaded" width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/twitter.png" alt="twitter"/>
                    &nbsp;<img class="social-icon lazyloaded" width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/linkedin.png" alt="linkedin"/>
                    &nbsp;<img class="social-icon lazyloaded" width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/pin.png" alt="pinterest"/>
                    &nbsp;<img class="social-icon lazyloaded" width="29" height="29" src="https://cdn.venuelook.com/images/new-home-images/youtube2.png" alt="pinterest"/>
                    &nbsp;
                </div>
                
            </div>
            <div className="text-white row justify-content-center">             
                <div className="col-auto">
                    <br/>
                    <h6>© Copyright 2023 VenueVenture | All rights reserved</h6>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;