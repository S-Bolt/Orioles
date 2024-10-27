import { useEffect, useState } from "react";
import { useContext } from 'react';
import AuthContext from "../../utils/AuthContext";
import { Link } from 'react-router-dom';
import { API_BASE_URL, IMAGE_BASE_URL } from '../../config';


function UserRecentActivity() {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const fetchComments = async () => {
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE_URL}/users/${user.id}/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                }
            });

                if(!response.ok) throw new Error('Failed to fetch comments');

                const data = await response.json();
                setComments(data);
                console.log('comments:', comments)
                console.log(user)
                setLoading(false)
            } catch (error){
                setError(error.message)
                setLoading(false)
            }
        };
        fetchComments();
    }, [user])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

return(
<div className="bg-white shadow-lg rounded-md mb-8 p-6">
    <h1 className=" text-2xl font-bold mb-4">Your Recent Activity</h1>
    {comments.length > 0 ? (
        <ul className="space-y-4">
            {comments.map((comment) => (
                <li key={comment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md shadow-sm">
                    {user?.profilePicture ? (
                        <img
                         src={`${IMAGE_BASE_URL}${user.profilePicture}`}
                         alt="User Avatar"
                         className="w-10 h-10 rounded-full"
                       />
                    ): (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        )}
                         <div className="flex flex-col">
                        <p className="text-gray-800 mb-1">{comment?.content}</p>
                    <Link 
                        to={`/blog/${comment.post?.id}`}
                        className="text-sm text-gray-500"
                    >
                        on post: <span className=" text-sm font-semibold bg-gradient-to-r from-orange-400 to-oriolesOrange bg-clip-text text-transparent transition-all duration-300 ease-in-out hover:from-oriolesOrange hover:to-orange-400">
                            {comment.post?.title || 'Ghost Post'}</span>
                    </Link>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <p>No recent activity</p>
    )}
</div>
);
};

export default UserRecentActivity;