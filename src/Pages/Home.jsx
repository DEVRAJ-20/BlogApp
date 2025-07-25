import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/Config';
import { Container, PostCard } from '../Components/index';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts()
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef2ff] to-[#f5e8ff] flex items-center justify-center px-4">
      <Container>
        {posts.length === 0 ? (
          <div className="w-full max-w-4xl mx-auto text-center bg-white p-14 rounded-3xl shadow-2xl">
            <h1 className="text-5xl font-extrabold text-indigo-900 mb-6">No Posts Yet</h1>
            <p className="text-lg text-pink-600 mb-8">Login to explore or create amazing content!</p>
            <Link to="/login">
              <button className="px-8 py-3 text-lg text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-full shadow-md hover:scale-105 transition-all">
                Login Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
