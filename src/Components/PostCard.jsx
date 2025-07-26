import React from 'react';
import appwriteService from '../appwrite/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, featuredImage, user, author }) {
  const imageUrl = appwriteService.getFileView(featuredImage);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData?.$id === user;
  const navigate = useNavigate(); // ⬅️ Add this line
  console.log("PostCard :: imageUrl", imageUrl);
  console.log("PostCard :: featuredImage ID", featuredImage);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      const deleted = await appwriteService.deletePost($id);
      if (deleted) {
        
        navigate("/all-posts");
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105">
      <Link to={`/post/${$id}`}>
        <div className="h-60 w-full bg-gray-50 flex justify-center items-center overflow-hidden">
          {featuredImage ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-contain h-full max-w-full"
            />
          ) : (
            <div className="text-gray-500 italic">No image available</div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center line-clamp-2">{title}</h2>

        <p className="text-sm text-gray-600 text-center mb-4 italic">
          By: <span className="text-pink-600 font-medium">{author || "Unknown"}</span>
        </p>

        {isAuthor && (
          <div className="flex justify-center gap-4">
            <Link
              to={`/edit-post/${$id}`}
              className="px-8 py-4 text-sm bg-black text-white rounded-md hover:bg-gray-900 transition duration-200"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-4 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
