import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';


function BlogPost(){
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/blogPosts/${id}`);
          if (!response.ok){
            throw new Error('blog post not found')
          }
          const data = await response.json();
          setPost(data);
          setEditedPost({ title: data.title, content: data.content });
          setLoading(false);
        }catch (error) {
          setError(error.message);
          setLoading(false)
        }
      };

      fetchPost();
    }, [id])

    const handleSave = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/blogPosts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedPost),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        console.log('Updated Post:', updatedPost); // Debugging to see the response
        setPost(updatedPost);
        setIsEditing(false);
        alert('Post updated successfully!');
        navigate(`/blog/${id}`, {replace: true})
      } else {
        alert('Failed to update post.');
      }
    };

    const handleDelete = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/blogPosts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if(response.ok){
        alert('Post deleted successfully');
        navigate('/blog')
      } else {
        alert('Failed to delete post')
      }
    }

 // Check if user has edit/delete permissions
 const canEditOrDelete = user?.role === 'admin' || user?.id === post?.authorId;

    if (loading){
      return <p>Loading...</p>;
    }

    if (error){
      return <p>{error}</p>;
    }

    if (!post) {
      return <p>Post not found</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          {isEditing? (
            <>
              <input
                type='text'
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg h-48 mb-4"
          ></textarea>
              <button
                onClick={handleSave}
                className="bg-oriolesOrange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
            <h1 className="text-4xl font-bold text-oriolesOrange mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-4">Posted on {post.date}</p>
            <div className="text-gray-800">
              {post.content}
            </div>

            {canEditOrDelete && (
              <div className="mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-oriolesOrange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            )}
            </>
          )}
      
    </div> 
    )

}

export default BlogPost;