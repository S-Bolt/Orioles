import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';


function Blog(){
    const [blogPosts, setBlogPosts] = useState([])

    //Fetch blogPosts from server
    useEffect(() => {
        const fetchBlogPosts = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/blogPosts`); 
            const data = await response.json();
            setBlogPosts(data);
            console.log('Fetched blog posts:', data);
          } catch (error) {
            console.error('Error fetching blog posts:', error);
          }
        };
    
        fetchBlogPosts();
      }, []);
        
return (
  <div className="max-w-4xl mx-auto px-4">
    <h1 className='text-4xl font-bold mb-6 text-center'>Bird Blog</h1>
    <div className='flex justify-center'>
      <div className='space-y-6 w-full max-w-3xl'>
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className='flex flex-col md:flex-row bg-gray-100 p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            {/* Image Section */}
            {post.imageUrl ? (
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={`http://localhost:3000/${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-contain rounded"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="md:w-1/3 flex-shrink-0 bg-gray-200 flex items-center justify-center rounded">
                <img
                  src="/images/placeholder.jpg"
                  alt="No Image Available"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Content Section */}
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
              <h2 className='text-2xl font-semibold text-oriolesOrange mb-2'>{post.title}</h2>
              <p className='text-gray-700 mb-2'>{post.summary}</p>
              <p className='text-gray-500 text-sm mb-4'>{post.date}</p>
              <Link to={`/blog/${post.id}`} className='text-blue-500 hover:underline'>
                Read more...
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
);
}

export default Blog;