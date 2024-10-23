import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function Blog(){
    const [blogPosts, setBlogPosts] = useState([])

    //Fetch blogPosts from server
    useEffect(() => {
        const fetchBlogPosts = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/blogPosts'); 
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
        <div className='space-y-4 w-full max-w-3xl'>
            {blogPosts.map((post) => (
                <div key={post.id} className=' bg-gray-100 p-4 rounded shadow-md'>
                    <h2 className='text-2xl font-semibold text-oriolesOrange'>{post.title}</h2>
                    <p className='text-gray-700'>{post.summary}</p>
                    <p className='text-gray-500 text-sm'>{post.date}</p>
                    <Link to={`/blog/${post.id}`} className='text-blue-500 hover:underline'>
                        Read more...
                    </Link>
                </div>
            ))}

        </div>
        </div>

    </div>
)
}

export default Blog;