import React from "react";
import { PostForm, Container } from "../Components/index";

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <Container className="max-w-5xl w-full bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
