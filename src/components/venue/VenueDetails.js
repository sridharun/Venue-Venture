import axios from "axios";
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  Carousel,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import Header from "../HeaderComponent";
import { venuecomments, venueimages } from "./VenueCommentDatas";
import { venueterms } from "./VenueTerms";
import { venueamenities } from "./VenueAmenities";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  NavbarText,
} from "reactstrap";
import CustomDay from "./CustomDay";
import ImageUpload from "../user/add/ImageUpload";

class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      imgmodel: false,
      venue: "",
      venuecomment: [],
      amentites: [],
      occations: [],
      images: [],
      index: 0,
      description: "",
      rating: "",
      review: "",
      userName: "",
      imageUrl: "",
      occation: "",
      amenity: "",
      terms: "",
      edit: false,
      editTerms: false,
      bookedDates: [],
      email: "",
      phoneNumber: "",
      bookingDate: "",
      ownerEmail: "",
      bookingName:""
    };
    this.imgtoggleModal = this.imgtoggleModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.bookingclick = this.bookingclick.bind(this);
  }

  addimageClick = () => {
    const image = {
      venueid: this.props.location.state.id,
      imageurl: this.state.imageUrl,
    };
    console.log(image);
    const url = "http://localhost:8081/venueimages/addimages";
    axios.post(url, image).then((Response) => {
      if (Response.data != null) {
        this.setState({
          imageurl: "",
        });
        alert("Image Added Successfully");
      }
    });
  };
  imgtoggleModal = () => {
    this.setState({
      imgmodel: !this.state.imgmodel,
    });
    this.addimageClick();
    console.log(this.state.imageUrl, "vk");
  };
  imgclick = () => {
    this.imgtoggleModal();
  };
  componentDidMount() {
    console.log("vk " + this.props.location.state.id);
    console.log(
      new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(3.25)
    );
    this.findVenue(this.props.location.state.id);
  }

  DatePickers = () => () => {
    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        flexWrap: "wrap",
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));

    const classes = useStyles();

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  };

  findVenue(id) {
    const url = `http://localhost:8081/venue/getvenue/${id}`;
    axios.get(url).then((response) => {
      this.setState({
        venue: response.data[0],
        venuecomment: response.data[1],
        amentites: response.data[2],
        images: response.data[3],
        occations: response.data[4],
        description: response.data[0].description,
        terms: response.data[0].terms,
        ownerEmail: response.data[0].owneremail,
      });
      console.log(response);
    });
    const venueId = this.props.location.state.id;
    const url1 = `http://localhost:8081/booking/getbookings/${venueId}`;

    axios.get(url1).then((response) => {
      console.log(response);
      if (response.data != null) {
        this.setState({
          bookedDates: response.data,
        });
      }
    });
    /* this.setState({stores:stores}) */
  }
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  bookingclick = () => {
    this.toggleModal();
    const date = new Date(this.state.bookingDate);
    const formattedDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    const object = {
      venueid: this.props.location.state.id,
      bookedDate: formattedDate,
      bookingDate: new Date().getTime(),
      userEmail: this.props.auth.userEmail,
      phoneNumber: this.state.phoneNumber,
      owneremail: this.state.ownerEmail,
      name:this.state.bookingName,
      status: "UNAPPROVED",
    };
    console.log(object);
    const url = "http://localhost:8081/booking/addbookings";
    axios.post(url, object).then((response) => {
      if (response.data != null) {
        alert(
          "Your request received Succesfully, We will contact you sooner!..."
        );
      }
    });
  };

  handleChangeValue = (val) => {
    this.setState({ imageUrl: val });
    console.log(val, "vk");
  };
  render() {
    const DatePickers = this.DatePickers();
    const { venue, amentites, venuecomment, terms, images, occations } =
      this.state;
    const amentitesiterate = amentites.map((amenities) => {
      return (
        <div key={amenities.id} className="col-sm-6 mb-2">
          <i class="fa fa-check"></i> {amenities.amenity}
        </div>
      );
    });

    const occationsiterate = occations.map((occation) => {
      return (
        <div key={occation.id} className="col-sm-4 mb-2">
          <i class="fa fa-check"></i> {occation.occation}
        </div>
      );
    });
    const termsiterate = venueterms.map(function (name, index) {
      return (
        <div key={index}>
          {name}
          <br />
        </div>
      );
    });
    const handleEdit = () => {
      this.setState({
        ...this.state,
        edit: !this.state.edit,
      });
    };
    const handleEditTerms = () => {
      this.setState({
        ...this.state,
        editTerms: !this.state.editTerms,
      });
    };

    const commentiterate = venuecomment.map((comment) => {
      return (
        <div className="col-12 mb-4">
          {/* {console.log(new Date().getTime())} */}
          <h4 style={{ display: "inline" }}>{comment.name}</h4>
          <h5>
            Commented On{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(comment.dated))}
          </h5>
          {comment.comments}
          <br />
          <h5 style={{ display: "inline" }}> Ratings:</h5>
          <Rating
            name="simple-controlled"
            value={comment.rating}
            readOnly
            style={{ color: "yellow" }}
            precision={0.1}
          />
        </div>
      );
    });
    const imageiterate = images.map(function (image) {
      return (
        <Carousel.Item>
          <img
            style={{ height: "85vh" }}
            className="d-block w-100"
            src={image.imageurl}
            alt={image.id}
          />
        </Carousel.Item>
      );
    });
    const handleSelect = (selectedIndex, e) => {
      this.setState({ index: selectedIndex });
    };
    const saveDescription = (event) => {
      event.preventDefault();
      const wenew = this.state.venue;
      wenew.description = this.state.description;
      console.log(wenew);
      const url = "1/venue/updatevenue";
      axios.post(url, wenew).then((Response) => {
        if (Response.data != null) {
          alert("Description updated Successfully");
        }
      });
    };
    const saveTerms = (event) => {
      event.preventDefault();
      const wenew = this.state.venue;
      wenew.terms = this.state.terms;
      console.log(wenew);
      const url = "http://localhost:8081/venue/updatevenue";
      axios.post(url, wenew).then((Response) => {
        if (Response.data != null) {
          alert("Terms updated Successfully");
        }
      });
    };
    const addoccationClick = (event) => {
      event.preventDefault();
      const occation = {
        venueid: this.props.location.state.id,
        occation: this.state.occation,
      };
      console.log(occation);
      const url = "http://localhost:8081/venueoccation/addoccation";
      axios.post(url, occation).then((Response) => {
        if (Response.data != null) {
          this.setState({
            occation: "",
          });
          alert("Occation Added Successfully");
        }
      });
    };
    const addamenityClick = (event) => {
      event.preventDefault();
      const amenity = {
        venueid: this.props.location.state.id,
        amenity: this.state.amenity,
      };
      console.log(amenity);
      const url = "0/venueamenities/addamenities";
      axios.post(url, amenity).then((Response) => {
        if (Response.data != null) {
          this.setState({
            amenity: "",
          });
          alert("Amenity Added Successfully");
        }
      });
    };

    const addReviewClick = (event) => {
      event.preventDefault();
      const comment = {
        rating: this.state.rating,
        dated: new Date().getTime(),
        venueid: this.props.location.state.id,
        name: this.state.userName,
        comments: this.state.review,
        email: this.props.auth.userEmail,
      };
      console.log(comment);
      const url = "http://localhost:8081/venuecomment/addcomment";
      axios.post(url, comment).then((Response) => {
        if (Response.data != null) {
          this.setState({
            rating: "",
            userName: "",
            review: "",
          });
          alert("Comment Added Successfully");
        }
      });
    };
    const handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    return (
      <div>
        <Header
          navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"}
        />
        <Modal isOpen={this.state.imgmodel} toggle={this.imgtoggleModal}>
          <ModalHeader toggle={this.imgtoggleModal}>Modal</ModalHeader>
          <ModalBody>
            <ImageUpload
              closeModel={this.imgtoggleModal}
              onChangeValue={this.handleChangeValue}
            />
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Book Venue</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="Name" className="mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="Name"
                  name="bookingName"
                  placeholder="Name"
                  value={this.state.bookingName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label htmlFor="phone" className="mb-2">
                  Mobile Number
                </Label>
                <Input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  value={this.state.phoneNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label htmlFor="date" className="mb-2">
                  Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="bookingDate"
                  placeholder="Date"
                  value={this.state.bookingDate}
                  onChange={handleChange}
                />
              </FormGroup>
              <br />
              <Button className="bg-danger" onClick={this.bookingclick}>
                Request Booking
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <div
          className="container"
          style={{ marginTop: "5rem", marginBottom: "3rem" }}
        >
          <div className="row">
            <div style={{ color: "white" }} className="col-md-6">
              <h3>
                {venue.name}{" "}
                {this.props.auth.isLoggedIn &&
                  venue.owneremail != this.props.auth.userEmail && (
                    <Button variant="danger" onClick={this.toggleModal}>
                      Book Venue
                    </Button>
                  )}{" "}
              </h3>
              <p>
                <span className="fa fa-map-marker"></span> {venue.street},{" "}
                {venue.location}, {venue.city}
              </p>
              <p>
                <i class="fa fa-star" style={{ color: "yellow" }}></i>Ratings{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 1,
                }).format(venue.rating)}{" "}
                &nbsp;&nbsp;&nbsp; <i class="fa fa-users"></i> Upto{" "}
                {venue.capacitymax} Guests
              </p>
            </div>
            {/* <div className="col-sm-6">
                <CustomDay/>
              </div> */}
          </div>
          <Card className="p-2 mb-5">
            <Card.Body>
              <Carousel activeIndex={this.state.index} onSelect={handleSelect}>
                {imageiterate}
              </Carousel>
            </Card.Body>
            <Card.Footer>
              {venue.owneremail === this.props.auth.userEmail && (
                <Form.Group controlId="venueImageUrl">
                  <Form.Label>Image Url</Form.Label>
                  <Button onClick={this.imgtoggleModal}>Upload</Button>
                </Form.Group>
              )}
            </Card.Footer>
          </Card>
          <div style={{ color: "white" }}>
            <h3>Occations </h3>
            <div className="row">{occationsiterate}</div>
            <div className="mb-3">
              {venue.owneremail === this.props.auth.userEmail && (
                <Form.Group as={Col} controlId="venueOccation">
                  <InputGroup>
                    <InputGroup.Text>Occation</InputGroup.Text>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      name="occation"
                      value={this.state.occation}
                      onChange={handleChange}
                      placeholder="Enter New Occation"
                    />
                    <InputGroup.Text>
                      <Button onClick={addoccationClick}>Add Occation</Button>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              )}
            </div>
            <h3>
              Description{" "}
              {venue.owneremail === this.props.auth.userEmail && (
                <Button variant="light" onClick={handleEdit}>
                  <i class="fa fa-edit"></i>
                </Button>
              )}
            </h3>
            <p style={{ whiteSpace: "pre-line" }}>{venue.description}</p>
            <br />
            <Form.Group
              className={this.state.edit ? "" : "d-none"}
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={6}
                name="description"
                onChange={handleChange}
                value={this.state.description}
              />
              <Button className="pull-right" onClick={saveDescription}>
                Save Changes
              </Button>
            </Form.Group>
            <div className="">
              <h3>Amentites</h3>
              <div className="row">{amentitesiterate}</div>
              {venue.owneremail === this.props.auth.userEmail && (
                <div className="mb-3">
                  <Form.Group as={Col} controlId="venueAmenity">
                    <InputGroup>
                      <InputGroup.Text>Amenity</InputGroup.Text>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        name="amenity"
                        value={this.state.amenity}
                        onChange={handleChange}
                        placeholder="Enter New Amenity"
                      />
                      <InputGroup.Text>
                        <Button onClick={addamenityClick}>Add Amenity</Button>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </div>
              )}
            </div>
            <br />
            <h3>Rating And Reviews</h3>
            <div className="row border">{commentiterate}</div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <h5>Have you been to the venue?</h5>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="review"
                value={this.state.review}
                placeholder="Write a Review"
              />
            </Form.Group>
            <Row
              className={
                this.props.auth.isLoggedIn &&
                venue.owneremail != this.props.auth.userEmail
                  ? ""
                  : "d-none"
              }
            >
              <Col sm="6">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label column sm="2">
                    <h5>Name</h5>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="userName"
                      value={this.state.userName}
                      placeholder="Your Name"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label column sm="3">
                    <h5>Your Rating</h5>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control
                      column
                      sm="6"
                      type="number"
                      onChange={handleChange}
                      name="rating"
                      value={this.state.rating}
                      placeholder="Rating"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Button className="pull-right" onClick={addReviewClick}>
                  Add Review
                </Button>
              </Col>
            </Row>

            <h3>
              Terms & Conditions{" "}
              {venue.owneremail === this.props.auth.userEmail && (
                <Button variant="light" onClick={handleEditTerms}>
                  <i class="fa fa-edit"></i>
                </Button>
              )}
            </h3>
            <p style={{ whiteSpace: "pre-line" }}>{terms}</p>
            <Form.Group
              className={this.state.editTerms ? "d-block" : "d-none"}
              controlId="TermsTextarea"
            >
              <Form.Control
                as="textarea"
                rows={6}
                name="terms"
                onChange={handleChange}
                value={this.state.terms}
              />
              <Button className="pull-right" onClick={saveTerms}>
                Save Changes
              </Button>
            </Form.Group>
            <div className="col-sm-12" /* style={{pointerEvents:"none"}} */>
              {" "}
              <h4>Booking Status</h4>
              <CustomDay bookedDates={this.state.bookedDates} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(VenueDetails);
