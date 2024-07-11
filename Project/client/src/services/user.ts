import { User } from './home'; // Ensure the User type is correctly imported

const API_URL = 'http://localhost:5000/users';

export const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching user');
    }
    const userData: User = await response.json();
    return userData;
};

export const updateUser = async (id: string, updatedUser: User): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
        throw new Error('Error updating user');
    }
    const userData: User = await response.json();
    return userData;
};