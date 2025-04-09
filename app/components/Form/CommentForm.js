import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CommentForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter name..." name="name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Enter email..." name="email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control placeholder="Enter body..." required as="textarea" rows={8} name="body" />
      </Form.Group>
      <Button className="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;