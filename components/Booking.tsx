"use client";
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

interface RoomDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const BookingForm: React.FC<{ room: RoomDetails }> = ({ room }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        formData.phoneNumber
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/hotelAPi/booking", {
          method: "POST",
          body: JSON.stringify({ ...formData, room: room.id }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log("Unexpected error occured in booking");
        }
      } catch (err) {
        console.log("Booking error", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container className="my-5 background-body neutral-1000 m-2">
      <Row className="shadow-lg rounded overflow-hidden">
        {/* Room Details Column */}
        <Col md={6} className="p-0">
          <div className="h-100">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="img-fluid w-100 h-100 object-fit-cover"
              style={{ minHeight: "300px" }}
            />
          </div>
        </Col>

        {/* Booking Form Column */}
        <Col md={6} className="p-4">
          <h2 className="mb-4">Book {room.name}</h2>

          <div className="mb-4">
            <h5 className="text-primary">
              ${room.price} <small className="text-muted">per night</small>
            </h5>
            <p className="text-muted mb-2">
              <i className="bi bi-people me-2"></i>
              Capacity: {room.capacity} {room.capacity > 1 ? "guests" : "guest"}
            </p>
            <p>{room.description}</p>
            <div className="mt-3">
              <h6>Amenities:</h6>
              <ul className="list-unstyled row">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="col-6">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          {isSuccess ? (
            <Alert
              variant="success"
              onClose={() => setIsSuccess(false)}
              dismissible
            >
              <Alert.Heading>Booking Successful!</Alert.Heading>
              <p>
                Thank you for your booking. We've sent a confirmation to{" "}
                {formData.email}. Our team will contact you shortly.
              </p>
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
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
                      placeholder="Enter your first name"
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
                      placeholder="Enter your last name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your phone number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Book Now"}
              </Button>

              <p className="text-muted small mt-3">
                * Required fields. By booking, you agree to our terms and
                conditions.
              </p>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
