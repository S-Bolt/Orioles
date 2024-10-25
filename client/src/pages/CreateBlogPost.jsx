import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function CreateBlogPost() {
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [image, setImage] = useState(null)
const navigate = useNavigate(); 

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

     // Create FormData object
     const formData = new FormData();
     formData.append('title', title);
     formData.append('content', content);
     if (image) {
        formData.append('image', image); 
    }

    //Send Post requets to backend to crate new post
    const response = await fetch('http://localhost:3000/api/blogPosts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (response.ok) {
        alert('Blog post created successfully!')
        navigate('/blog')
    } else {
        alert('Error creating blog post', data.error)
    }
}

return(
    <div className='container mx-auto p-6 bg-gray-100 rounded-lg'>
        <h1 className='text-4xl font-bold text-center mb-6'>Write a New Blog Post</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
            <label className='block text-xl font-semibold text-gray-800'>Title</label>
            <input 
                type='text'
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="w-full p-2 border border-gray-300 rounded-lg"
                  required
            />
        </div>
        <div>
            <label className='block text-xl font-semibold text-gray-700'>Content</label>
            <textarea
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg h-48'
                required
            ></textarea>
        </div>
        <div>
            <label className='block text-xl font-semibold text-gray-700'>Upload Image</label>
            <input 
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                className='w-full p-2 border border-gray-300 rounded-lg'
            />
        </div>
        <button
            type='submit'
            className='bg-oriolesOrange hover:bg-orange-500 text-white font-bold py-2 px-4 rounded'
        >
            Sumbit Post
        </button>
        </form>
    </div>
)
}

export default CreateBlogPost;