import { useLocation } from "react-router-dom";
import React from "react";
import Header from "./HeaderComponent";
import { Table } from "reactstrap";
import {
  FormControl,
  InputGroup,
  Card,
  CardImg,
  Button,
  Pagination,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ManageBookings(props) {
  const location = useLocation();
  console.log(location.state);
  const [bookingList, setBookingsList] = new useState([]);
  const getBookings = () => {
    const ownerEmail = location.state.owneremail;
    const url = `http://localhost:8081/booking/getbookingsowner/${ownerEmail}`;

    axios.get(url).then((response) => {
      if (response.data != null) {
        console.log(response);
        setBookingsList(response.data);
      }
    });
  };

  useEffect(() => {
    getBookings();
  }, []);
  const handleBooking = (id) => {
    const book = bookingList.filter((data) => data.id === id)[0];
    console.log(book);
    if (book.status === "UNAPPROVED") book.status = "APPROVED";
    else book.status = "UNAPPROVED";
    const url = 'http://localhost:8081/booking/updatebookings';
    axios.post(url, book).then((response) => {
      if (response.data != null) {
        alert("Updated SuccessFully");
        console.log('after alert')
        setBookingsList(
          bookingList.map((data, indes) => {
            console.log('set booking')
            if (data.id === id) {
              return book;
            }
            return data;
          })
        );
      }
    });
  };
  const status = (bookingnStatus, id) => {
    if (bookingnStatus === "APPROVED")
      return (
        <td>
          <Button
            size="sm"
            type="button"
            variant="success"
            onClick={() => {
              handleBooking(id);
            }}
          >
            &nbsp;&nbsp;&nbsp;APPROVED&nbsp;&nbsp;&nbsp;
          </Button>
        </td>
      );
    else
      return (
        <td>
          <Button
            size="sm"
            type="button"
            variant="danger"
            onClick={() => {
              handleBooking(id);
            }}
          >
            UNAPPROVED
          </Button>
        </td>
      );
  };
  const renderList = bookingList.map((data, index) => {
    // if(data.status==="UNAPPROVED")
    const date = new Date(data.bookedDate);
    const formattedDate =
      date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return (
      // <div key={index} >
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{formattedDate}</td>
        <td>{data.name}</td>
        <td>{data.userEmail}</td>
        <td>{data.phoneNumber}</td>
        {status(data.status, data.id)}
        {/* <td></td> */}
      </tr>
      // </div>
    );
  });
  return (
    <div>
      <Header
        navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"}
      />
      <div
        className="container-fluid row"
        style={{ marginTop: "5rem", marginBottom: "3rem" }}
      >
        <div className="col-sm-1 col-md-2 "> </div>
        <div className="col-sm-10 col-md-8 ">
          <Card className="p-2">
            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Booked State</th>
                  <th>User Name</th>
                  <th>User email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{renderList}</tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
