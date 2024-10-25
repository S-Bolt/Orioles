import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';



function BlogPost(){
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [comments, setComments ] = useState([])
    const [newComment, setNewComment ] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ title: '', content: '' });
    const [imageFile, setImageFile] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPostandComments = async () => {
        try {
          const postResponse = await fetch(`http://localhost:3000/api/blogPosts/${id}`);
          const commentsResponse = await fetch(`http://localhost:3000/api/comments/${id}`);

          if (!postResponse.ok) throw new Error('Blog post not found')
          if (!commentsResponse.ok) throw new Error('Comments not found')
          
          const postData = await postResponse.json();
          const commentsData = await commentsResponse.json();

          setPost(postData);
          setComments(commentsData);
          setEditedPost({ title: postData.title, content: postData.content });
          setLoading(false);
          console.log(postData); // Debug: Check the available fields in postData

        }catch (error) {
          setError(error.message);
          setLoading(false)
        }
      };

      fetchPostandComments();
    }, [id])

    //Handle adding a comment
    const handleAddComment = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment })
        });

        if(response.ok) {
          const newCommentData = await response.json();
          setComments([...comments, newCommentData])
          setNewComment('');
        }

      } catch (error){
       setError(error.message)
      }
    }

    //Handle the save of an editing post
    const handleSave = async () => {
      const token = localStorage.getItem('token');

      const formData = new FormData();
        formData.append('title', editedPost.title);
        formData.append('content', editedPost.content);
        
        if (imageFile) {
          formData.append('image', imageFile); 
        }

        if (removeImage) {
          formData.append('removeImage', true); 
        }
        
     try {

        const response = await fetch(`http://localhost:3000/api/blogPosts/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
    
        if (response.ok) {
          const updatedPost = await response.json();
          console.log('Updated Post:', updatedPost); // Debugging to see the response
          setPost(updatedPost);
          setIsEditing(false);
          setImageFile(null);
          setRemoveImage(false);
          alert('Post updated successfully!');
          navigate(`/blog/${id}`, {replace: true})
        } else {
          alert('Failed to update post.');
        }
    } catch (error){
        console.error('Error updating post', error.message)
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
          {/* Display for administrative capabilities */}
          {isEditing? (
            <>
            {/*Title input*/}
              <input
                type='text'
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
            {/*Content input*/}
              <textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg h-48 mb-4">       
              </textarea>
            {/*Remove Image input*/}
            {post.imageUrl && (
              <div className='mb-4'>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={removeImage}
                    onChange={(e) => setRemoveImage(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-oriolesOrange"
                  />
                  <span className="ml-2 text-gray-700">Remove Existing Image</span>
              </label>
              </div>
            )}
            {/*New Image input*/}
              <div className="mb-4">
                <label className="block text-gray-700">Upload New Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        setRemoveImage(false); 
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-oriolesOrange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setImageFile(null);
                  setRemoveImage(false);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
            <h1 className="text-4xl font-bold text-oriolesOrange mb-4">{post.title}</h1>
              <p className="text-gray-500 mb-4">
                Posted by <span className='font-semibold'>{post.author?.username || "A Ghost"}</span>
                {' '} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.imageUrl && (
                <img
                  src={`http://localhost:3000/${post.imageUrl}`}
                  alt={post.title}
                  className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mb-6 rounded-lg shadow-md object-cover"
                />
              )}
            <div className="text-gray-800">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
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

              {/* Comment Display */}

              <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>

              {comments.length > 0 ? (
                <ul className="space-y-4">
                  {comments.map((comment) => (
                    <li key={comment.id} className="bg-white flex items-center space-x-3">
                      {comment.author?.profilePicture ? (
                         <img
                         src={`http://localhost:3000/${comment.author?.profilePicture}`}
                         alt='User Avatar'
                         className='w-10 h-10 rounded-full'
                       />
                       ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {comment.author?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                       )
                      }
                     
                      <div className='flex flex-col'>
                        <p className="text-gray-800 mb-1">{comment.content}</p>
                        <p className="text-gray-500 text-sm">
                          Posted by  {comment.author.username || 'A Ghost'}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}

              {user && (
                 <form onSubmit={handleAddComment} className="mt-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Add a comment..."
                  />
                  <button
                    type='submit'
                    className="bg-oriolesOrange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                  >
                    Add Comment
                  </button>
                  </form>
              )}
            </>
          )}
      
    </div> 
    )

}

export default BlogPost;