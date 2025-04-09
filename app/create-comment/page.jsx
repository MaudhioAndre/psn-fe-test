"use client";

import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { useRouter } from 'next/navigation'

export default function page() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState(""); // 'success' atau 'danger'

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const body = formData.get("body");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          body: body,
          postId: 1, // You might want to make this dynamic based on context
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setToastMessage("Comment created successfully! You will be redirected to dashboard page");
      setToastVariant("success");
      setShowToast(true);
      event.target.reset(); // Clear the form after successful submission
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error creating comment:", error);
      setToastMessage("Failed to create comment.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <NavigationBar />
      <section className="flex justify-center items-center h-screen">
        <div className="lg:min-w-1/2 min-w-3/4 relative">
          <h3 className="text-2xl text-center">Create Comment</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name..."
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email..."
                name="email"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control placeholder="Enter body..." required as="textarea" rows={3} name="body" />
            </Form.Group>
            <Button className="primary" type="submit">
              Submit
            </Button>
          </Form>

          <ToastContainer position="top-end" className="p-3">
            <Toast
              bg={toastVariant}
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Notification</strong>
              </Toast.Header>
              <Toast.Body className={`text-white`}>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </section>
    </>
  );
}