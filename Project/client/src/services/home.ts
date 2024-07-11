import axios from 'axios';

export interface Post {
  id: number;
  username: string;
  image: string;
  caption: string;
  avartar:string;
  // Add other fields as necessary
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('http://localhost:5000/posts'); // Assuming db.json is served at this endpoint
  return response.data;
};

export interface User {
  id: number;
  username: string;
  fullName: string;
  avartar: string;
  loginstatus:boolean;
  follower:string;
  following:string;
}

export const fetchUser = async (): Promise<User[]> => {
  const response = await axios.get('http://localhost:5000/users'); // Update with the correct path to your db.json
  return response.data; // Assuming your db.json has an admin field
};


