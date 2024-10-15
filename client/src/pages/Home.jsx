import birdBathCool from '../assets/birdBathCool.png';

    const Home = () => {
        return (
          <div className="home-page">
          
            {/* Hero Section */}
            <section className="h-screen bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${birdBathCool})`}}>
              <div className="container mx-auto px-4 py-20 text-center">
               <div className="w-full md:w-1/2 text-center md:text-left">
                      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white">
                          Experience the excitement of Baltimore baseball.
                      </p> 
               </div>
              </div>
            </section>
      
            {/* Featured Blog Posts Section */}
            <section className="featured-posts py-16 bg-gray-100">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Featured Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Blog Post 1 */}
                  <div className="post-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">The Rise of the Baltimore Orioles</h3>
                    <p className="text-gray-600 mb-4">
                      A deep dive into the Orioles&apos;s recent performance and future potential.
                    </p>
                    <a href="#" className="text-orange-500 hover:underline">Read More</a>
                  </div>
                  
                  {/* Blog Post 2 */}
                  <div className="post-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">Top 5 Moments in Orioles History</h3>
                    <p className="text-gray-600 mb-4">
                      A look at some of the most iconic moments in the Orioles&apos;s storied history.
                    </p>
                    <a href="#" className="text-orange-500 hover:underline">Read More</a>
                  </div>
      
                  {/* Blog Post 3 */}
                  <div className="post-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">Orioles 2024 Season Predictions</h3>
                    <p className="text-gray-600 mb-4">
                      What can we expect from the Orioles in the upcoming season? Here&apos;s a look.
                    </p>
                    <a href="#" className="text-orange-500 hover:underline">Read More</a>
                  </div>
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
                <a href="#" className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                  Sign Up Now
                </a>
              </div>
            </section>
          </div>
        );
      };
  

export default Home;
