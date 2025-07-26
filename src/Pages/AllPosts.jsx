import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components/index";
import appwriteService from "../appwrite/Config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((result) => {
      if (result) {
        setPosts(result.documents || []);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-indigo-100 py-10">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Posts
        </h1>

        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} user={post.user} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No posts found.</div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
