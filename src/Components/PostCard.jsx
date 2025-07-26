import React from 'react';
import appwriteService from '../appwrite/Config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, featuredImage, user }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage);
  const userData = useSelector((state) => state.auth.userData);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      const deleted = await appwriteService.deletePost($id);
      if (deleted) {
        window.location.reload(); // Refresh the list
      }
    }
  };

  return (
    <div className='w-full bg-gray-100 rounded-xl p-4 relative'>
      <Link to={`/post/${$id}`}>
        <div className='w-full justify-center mb-4'>
          {featuredImage ? (
            <img src={imageUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className='text-gray-500 italic'>No image available</div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </Link>

      {/* Show delete button only if the logged-in user created the post */}
      {userData?.$id === user && (
  <button
    onClick={handleDelete}
    className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
    title="Delete Post"
  >
    🗑️
  </button>
)}
    </div>
  );
}

export default PostCard;
