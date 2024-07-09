import React, { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts</h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {posts.map(post => (
          <li key={post.id} className="border-b border-gray-200 last:border-b-0">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{post.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Author: {post.author}</p>
              </div>
              <p className="mt-1 text-sm text-gray-600">{post.content.substring(0, 150)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;