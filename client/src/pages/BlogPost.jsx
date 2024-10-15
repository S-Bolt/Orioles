import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function BlogPost(){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/blogPosts/${id}`);
          if (!response.ok){
            throw new Error('blog post not found')
          }
          const data = await response.json();
          setPost(data);
          setLoading(false);
        }catch (error) {
          setError(error.message);
          setLoading(false)
        }
      };

      fetchPost();
    }, [id])

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
      <h1 className="text-4xl font-bold text-oriolesOrange mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">Posted on {post.date}</p>
      <div className="text-gray-800">
        {post.content}
      </div>
    </div> 
    )

}

export default BlogPost;