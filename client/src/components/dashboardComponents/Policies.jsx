function Policies(){
    return (
             <div className="bg-gray-100 shadow-lg rounded-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-white shadow-md rounded-md p-6 mb-8">The Bird Bath&apos;s Policies</h1>
    
          {/* Privacy Policy */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p>
              At <strong>The Bird Bath</strong>, we value the privacy of our users. This policy outlines how we handle user information:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Information We Collect:</strong> We collect your username, email address, and any content you post. We may also use cookies for analytics.</li>
              <li><strong>How We Use Your Information:</strong> To personalize your experience, improve the site, and enable user interaction in forums and comments.</li>
              <li><strong>Data Protection:</strong> Passwords are encrypted. We do not sell or share your data without consent unless required by law.</li>
              <li><strong>Third-Party Services:</strong> We may use third-party analytics tools like Google Analytics.</li>
              <li><strong>Your Rights:</strong> You can request data access, updates, or deletion by contacting us at [email address].</li>
            </ul>
          </section>
    
          {/* Terms of Service */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p>By using <strong>The Bird Bath</strong>, you agree to the following terms:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>User Responsibilities:</strong> Provide accurate information and follow community guidelines.</li>
              <li><strong>Prohibited Actions:</strong> No spamming, harassment, or unauthorized account access.</li>
              <li><strong>Content Ownership:</strong> Users retain ownership of their content but grant us the right to display it on our site.</li>
              <li><strong>Limitation of Liability:</strong> We are not responsible for the accuracy of user-generated content or damages arising from using our site.</li>
            </ul>
          </section>
    
          {/* Community Guidelines */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
            <p>We aim to foster a respectful community. By participating, you agree to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Be Respectful:</strong> Treat others with respect and avoid personal attacks.</li>
              <li><strong>No Spamming:</strong> Do not post irrelevant content or advertisements.</li>
              <li><strong>Stay On-Topic:</strong> Keep discussions relevant to the Baltimore Orioles or related topics.</li>
              <li><strong>No Hate Speech:</strong> Any form of hate speech will result in removal and possible banning.</li>
              <li><strong>Constructive Contributions:</strong> Disagree respectfully and provide evidence where possible.</li>
            </ul>
          </section>
    
          {/* Content Submission Guidelines */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Content Submission Guidelines</h2>
            <p>By submitting content, you agree to the following:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Original Content:</strong> All submissions must be original and free from plagiarism.</li>
              <li><strong>Stay Relevant:</strong> Content must be related to the Orioles or MLB community.</li>
              <li><strong>Appropriate Language:</strong> Content must be free from offensive language.</li>
              <li><strong>Editorial Rights:</strong> We reserve the right to edit your submission for clarity and standards.</li>
              <li><strong>Copyright:</strong> You grant us permission to display and promote your content.</li>
            </ul>
          </section>
    
          {/* Moderation Policy */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Moderation Policy</h2>
            <p>To ensure a positive environment, we follow these moderation guidelines:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Warning System:</strong> Violations result in warnings, and repeated violations may result in suspension.</li>
              <li><strong>Content Removal:</strong> We reserve the right to remove content that violates our guidelines.</li>
              <li><strong>Account Suspension:</strong> Severe violations (e.g., hate speech) may result in immediate account suspension.</li>
              <li><strong>Appeals Process:</strong> You can appeal a suspension by contacting us at [email address].</li>
            </ul>
          </section>
    
          {/* User Conduct Policy */}
          <section className="bg-white shadow-md rounded-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">User Conduct Policy</h2>
            <p>By participating in the community, you agree to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Positive Engagement:</strong> Treat others with respect and avoid inflammatory language.</li>
              <li><strong>No Unauthorized Sharing:</strong> Do not share personal information without consent.</li>
              <li><strong>Reporting Violations:</strong> Report any content that violates guidelines to our moderation team.</li>
            </ul>
          </section>
        </div>
        
      );
}

export default Policies;