import React, { useState,useEffect } from 'react'
import appwriteService from '../appwrite/Config' 
import {Link} from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage) // should return a valid string URL

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {featuredImage ? (
            <img
              src={imageUrl}
              alt={title}
              className='rounded-xl'
            />
          ) : (
            <div className='text-gray-500 italic'>No image available</div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}




export default PostCard
