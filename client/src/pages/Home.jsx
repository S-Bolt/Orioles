import { useState, useEffect } from 'react'
import birdBathCool from '../assets/birdBathCool.png';
import { Link } from 'react-router-dom';
import { API_BASE_URL, IMAGE_BASE_URL } from '../config';

    const Home = () => {
      const [recentPosts, setRecentPost] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null)

      //fetching recent blog post when component mounts
      useEffect(() => {
        const fetchRecentPosts = async () => {
          try {
            const recentPostsResponse = await fetch(`${API_BASE_URL}/blogPosts/recent`);

            if(!recentPostsResponse.ok) throw new Error('Recent posts not found');

            const recentPostsData = await recentPostsResponse.json();

            setRecentPost(recentPostsData);
            setLoading(false);
          } catch (error){
            setError(error.message)
            setLoading(false)
          }
        };
        fetchRecentPosts();
      }, [])

        return (
          <div className="home-page">
          
            {/* Hero Section */}
            <section className="hero-section bg-white py-16">
              <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="w-full md:w-1/2 px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to the BirdBath
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Experience the excitement of Baltimore baseball.
                  </p>
                  <Link
                    to="/blog"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    Read Our Blog
                  </Link>
                </div>
                {/* Image */}
                <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
                  <img
                    src={birdBathCool}
                    alt="Bird Bath Cool"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </section>
      
            {/* Latest Blog Posts Section */}
            <section className="featured-posts py-16 bg-gray-100">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Latest Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {loading ? (
                  <p className='text-center col-span-3'>Loading</p>
                 ) : error ? (
                  <p className='text-center col-span-3 text-red-500'>{error}</p>
                 ) : recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className='post-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'
                    >
                       {post.imageUrl && (
                          <img
                            src={`${IMAGE_BASE_URL}${post.imageUrl}`} 
                            alt={post.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                      <p 
                      className='text-gray-600 mb-4'>
                        {post.content.slice(0, 100)}...
                      </p>
                      <Link to={`/blog/${post.id}`} className="text-orange-500 hover:underline">
                        Read More
                      </Link>
                    </div>
                  ))
                 ) : (
                  <p className='text-center col-span-2'>No recent post available</p>
                 )}
                </div>
              </div>
            </section>
      
            {/* Call-to-Action Section */}
            <section className="cta bg-orange-500 text-white py-16 text-center">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-lg mb-8">
                  Be the first to know about the latest Orioles news and blog updates. Join our community now!
                </p>
                <a href="/signup" className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                  Sign Up Now
                </a>
              </div>
            </section>
          </div>
        );
      };
  

export default Home;
