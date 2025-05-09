"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container, Row, Col, Alert, ListGroup } from "react-bootstrap";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const BookingForm: React.FC<{ room: any }> = ({ room }) => {
  // console.log("Rooms in booking,  ", rooms);
  const moveRouter = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const { user } = useDynamicContext();

  // const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const validateForm = (): boolean => {
  //   const newErrors: Partial<BookingFormData> = {};

  //   if (!formData.firstName.trim())
  //     newErrors.firstName = "First name is required";
  //   if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email";
  //   }
  //   if (!formData.phoneNumber.trim()) {
  //     newErrors.phoneNumber = "Phone number is required";
  //   } else if (
  //     !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
  //       formData.phoneNumber
  //     )
  //   ) {
  //     newErrors.phoneNumber = "Please enter a valid phone number";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Checking for user logged in or not:
    if (!user) {
      alert("Please login to book the property.");
      return;
    }

    console.log("Room to be booked: ", room);

    const jsonUser: any = localStorage.getItem("dbuser") || {};
    const dbUser = JSON.parse(jsonUser);
    const userId = dbUser.id;
    const userEmail = dbUser.email;
    const userName = dbUser.username || userEmail.split("@")[0];

    const userFormData = {
      firstName: userName,
      lastName: userName,
      email: userEmail,
    };

    try {
      setIsSubmitting(true);
      const keyRate = room.rateKey;
      // Keys to book the rooms....
      // console.log(keys);
      const response = await fetch("/api/hotelAPi/booking", {
        method: "POST",
        body: JSON.stringify({ ...userFormData, rateKey: keyRate, userId }),
      });
      console.log("here is the response");
      console.log(response);
      const data = await response.json();
      console.log("Booking response...", data);
      if (response.ok) {
        setIsSuccess(true);
        setFormData((data) => ({ ...data, email: userEmail }));

        moveRouter.push(`/showbookings`);
      } else {
        alert("An error occured while saving the booking");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // function handleSubmit() {
  //   try {
  //     alert("Doing booking.");
  //   } catch (err) {
  //     console.log("Error while booking...");
  //   }
  // }

  return (
    <Container className="my-5 background-body neutral-1000">
      <Row className="shadow-lg rounded overflow-hidden">
        {/* Rooms List Column - Display Only */}
        <Col md={12} className="p-4">
          <h3 className="mb-4">Room Details</h3>
          <ListGroup>
            {room && (
              <ListGroup.Item key={room.id} className="mb-2 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{room.name}</h5>
                    <div className="text-muted small">
                      Adults: {room.adults} | Children: {room.children}
                    </div>
                  </div>
                  <div className="text-primary fw-bold">
                    {formatStays(usdToStays(room.price))}
                  </div>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>

          {isSuccess ? (
            <Alert
              variant="success"
              onClose={() => setIsSuccess(false)}
              dismissible
            >
              <Alert.Heading>Booking Successful!</Alert.Heading>
              <p>
                Thank you for your booking. We've sent a confirmation to{" "}
                {formData.email}.
              </p>
            </Alert>
          ) : (
            <div className="box-button-book w-25">
              {" "}
              <button
                className="btn btn-book"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          )}
        </Col>

        {/* Booking Form Column */}
        {/* <Col md={12} className="p-4">
          <h2 className="mb-4">Booking Form</h2>

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            
          </Form>
        </Col> */}
      </Row>
    </Container>
  );
};

export default BookingForm;

const usdToStays = (usdAmount: string) => {
  const usd = parseFloat(usdAmount);
  const stays = usd / 0.2;
  return Math.round(stays * 100) / 100; // Round to 2 decimal places
};

const formatStays = (stays: number) => {
  return `${stays} Stay`;
};
