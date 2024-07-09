import React, { useEffect, useState } from 'react';
import { useUserContext } from '../components/UserContext';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  emailOrPhone: string;
  status: boolean;
  loginstatus: boolean;
}

const AdminPage: React.FC = () => {
  const { user, logout } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus; // Toggle the status (true -> false or false -> true)

      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // Only update the 'status' field
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newStatus ? 'block' : 'unblock'} user`);
      }

      // Update local state to reflect the change
      setUsers(prevUsers => prevUsers.map(user => (user.id === id ? { ...user, status: newStatus } : user)));

      // Show modal notification
      setModalMessage(`User ${newStatus ? 'blocked' : 'unblocked'} successfully`);
      setConfirmAction(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleBlockClick = (id: number, currentStatus: boolean) => {
    setModalMessage(`Are you sure you want to ${currentStatus ? 'block' : 'unblock'} this user?`);
    setConfirmAction(() => () => handleBlockUser(id, currentStatus));
  };

  const handleToggleLoginStatus = async (id: number, currentLoginStatus: boolean) => {
    try {
      const newLoginStatus = !currentLoginStatus; // Toggle the login status (true -> false or false -> true)

      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginstatus: newLoginStatus }), // Update only the 'loginstatus' field
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newLoginStatus ? 'activate' : 'deactivate'} user`);
      }

      // Update local state to reflect the change
      setUsers(users.map(user => (user.id === id ? { ...user, loginstatus: newLoginStatus } : user)));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/loginadmin');
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
      <p>Welcome, {user?.username}. Here you can manage users.</p>

      {error && <p className="text-red-500">{error}</p>}
      {modalMessage && confirmAction && (
        <Modal
          message={modalMessage}
          onConfirm={confirmAction}
          onCancel={() => setModalMessage(null)}
        />
      )}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Username</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Email or Phone</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Login Status</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.emailOrPhone}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.status ? 'Active' : 'Blocked'}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.loginstatus ? 'Active' : 'Inactive'}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.status ? (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleBlockClick(user.id, user.status)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded"
                      onClick={() => handleBlockClick(user.id, user.status)}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
