import { useEffect, useState } from "react";
import {
    FingerPrintIcon,
    EnvelopeIcon,
    ChevronUpDownIcon,
    SignalIcon
   } from '@heroicons/react/24/outline'


function AdminActions() {
    const [users, setUsers ] = useState([]);
    const [error, setError ] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok){
                    throw new Error('failed to fetch users')
                }

                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error){
                setError(error.message)
            }
        }
        fetchUsers();
    },[])

    const handleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/users/assign-role/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole})
            });

            if (response.ok){
                alert(`Role has been upated to ${newRole}`)
                setUsers(users.map(user => user.id === userId ? {...user, role: newRole } : user))
            }
        } catch (error){
            setError(error.message)
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

return (
    <div className="w-screen min-h-screen bg-gray-300 flex flex-col items-center justify-start py-10 ">
        <div className="bg-orange-400 shadow-md  px-6 py-4 w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-bold  text-center">Admin Actions</h1>
        </div>
        <table className="table-auto w-full max-w-4xl border-separate border-spacing-3">
            <thead>
                <tr>
                <th className="px-4 py-2">
                    <div className="flex flex-col items-center">
                    <FingerPrintIcon className="h-6 w-6" />
                    <span>Username</span>
                    </div>
                </th>
                <th className="px-4 py-2">
                    <div className="flex flex-col items-center">
                    <EnvelopeIcon className="h-6 w-6" />
                    <span>Email</span>
                    </div>
                </th>
                <th className="px-4 py-2">
                    <div className="flex flex-col items-center">
                    <SignalIcon className="h-6 w-6" />
                    <span>Role</span>
                    </div>
                </th>
                <th className="px-4 py-2">
                    <div className="flex flex-col items-center">
                    <ChevronUpDownIcon className="h-6 w-6" />
                    <span>Role Select</span>
                    </div>
                </th>
                    
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="border px-4 py-2 bg-white shadow-md">{user.username}</td>
                        <td className="border px-4 py-2 bg-white shadow-md">{user.email}</td>
                        <td className="border px-4 py-2 bg-white shadow-md">{user.role}</td>
                        <td className="border px-4 py-2 bg-white shadow-md">
                            <select
                                value={user.role}
                                onChange={(e) => handleChange(user.id, e.target.value)}
                                className="border border-gray-300 rouned-md px-2 py-1"
                            >
                                <option value="user">User</option>
                                <option value="writer">Writer</option>
                                <option value="admin">Admin</option>

                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}

export default AdminActions;