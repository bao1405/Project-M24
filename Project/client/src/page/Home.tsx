import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchUser, Post, User } from '../services/home';
import '../css/Home.css';
import Header from '../components/Header';

const InstagramHomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUser();
        // Filter users based on loginstatus as boolean true
        const filteredUsers = fetchedUsers.filter(user => user.loginstatus === true);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="home">
      <div className="layout">
        <aside className="header-container">
          <Header />
        </aside>
        <main className="main-content">
          <div className="container mx-auto my-4 flex" style={{marginTop:"-20px"}}>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-1">
                {posts.map((post) => (
                  <div key={post.id} className="post-card bg-white p-4 rounded shadow-md" style={{marginTop:"20px"}}>
                    <div className="post-header flex items-center mb-2">
                      <img src={post.avartar} alt="Post" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-bold">{post.username}</p>
                      </div>
                    </div>
                    <div className="post-image mb-2">
                      <img src={post.image} alt="Post" className="w-4/5 h-2/3 rounded" style={{marginLeft:"70px"}} />
                    </div>
                    <div className="post-caption" style={{marginLeft:"70px",marginTop:"30px"}}>
                      <p>{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {users.length > 0 && (
              <div className="w-1/4 flex flex-col ml-4" style={{marginTop:"20px"}}>
                {users.map((user) => (
                  <div key={user.id} className="flex w-full mb-4">
                    <div className="flex items-start w-full">
                      <div className="relative w-14 h-14 ">
                        <canvas className=" absolute -top-1 -left-1 h-4 w-4"></canvas>
                        <a
                          className="block h-11 w-11 "
                          href={`/${user.username}/`}
                          role="link"
                          tabIndex={0}
                        >
                          <img
                            alt={`${user.username}'s profile picture`}
                            className="rounded-full h-9 w-9" style={{marginTop:"8px"}}
                            src={user.avartar}
                          />
                        </a>
                        
                      </div>
                      <div className="flex flex-col items-start">
                        <a
                          className="font-medium text-black hover:underline" style={{marginLeft:"7px",fontSize:"20px"}}
                          href={`/${user.username}/`}
                          role="link"
                          tabIndex={0}
                        >
                          {user.username}
                        </a>
                        <span className="text-gray-400" style={{marginLeft:"7px"}}>{user.fullName}</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center">
                      <button className="text-blue-500 font-medium">Switch</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstagramHomePage;
