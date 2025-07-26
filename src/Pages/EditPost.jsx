import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../appwrite/Config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <span className="text-xl text-gray-500">Loading post...</span>
      </div>
    );
  }

  return post ? (
    <section className="py-10 px-4 min-h-screen bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Edit Post</h1>
          <PostForm post={post} />
        </div>
      </Container>
    </section>
  ) : (
    <div className="flex items-center justify-center h-[70vh]">
      <span className="text-lg text-red-500">Post not found.</span>
    </div>
  );
}

export default EditPost;
