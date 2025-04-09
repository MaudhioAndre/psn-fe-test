"use client";

import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import CommentForm from "../components/Form/CommentForm";
import NotificationToast from "../components/Form/NotificationToast";
import { useRouter } from "next/navigation";

export default function page() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const body = formData.get("body");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        body: JSON.stringify({ name, email, body, postId: 1 }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      await response.json();

      runToast("Comment created successfully! You will be redirected to dashboard page", "success");
      event.target.reset();
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error("Error creating comment:", error);
      runToast("Failed to create comment.", "danger");
    }
  };
  
  const runToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  }

  return (
    <>
      <NavigationBar />
      <section className="flex justify-center items-center h-screen">
        <div className="lg:min-w-1/2 min-w-3/4 relative">
          <h3 className="text-2xl text-center">Create Comment</h3>
          <CommentForm onSubmit={handleSubmit} />
          <NotificationToast
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage}
            variant={toastVariant}
          />
        </div>
      </section>
    </>
  );
}