import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { fetchUser, User } from '../services/home';
import { fetchPosts, Post } from '../services/home';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../services/user'; // Ensure correct import path for updateUser

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [users, setUsers] = useState<User[]>([]);
    const [postsByUserOnline, setPostsByUserOnline] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null); // State to store user information
    const [isFollowing, setIsFollowing] = useState<boolean>(false); // State to track follow status
    const loggedInUserId = 'yourLoggedInUserId'; // Replace with actual logged-in user ID

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                if (!id) {
                    return; // Exit early if id is not defined
                }
                const userData = await getUserById(id);
                setUser(userData);
                setIsFollowing(userData.follower.includes(loggedInUserId)); // Set initial follow state
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserById();
    }, [id, loggedInUserId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await fetchUser();
                setUsers(fetchedUsers);

                const fetchedPosts = await fetchPosts();
                setPostsByUserOnline(fetchedPosts.filter(post => post.username === fetchedUsers[0].username)); // Adjust the filter condition according to your logic
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openModalAvatar = async () => {
        try {
            if (user) {
                console.log(`Avatar URL for user ${id}: ${user.avartar}`);
                // Implement modal logic here to display the avatar
            } else {
                console.log(`No user found with id ${id}`);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const openModalPost = (postId: number) => {
        const post = postsByUserOnline.find(post => post.id === postId.toString());
        if (post) {
            console.log(`Opening post modal for post id ${postId} of user ${id}`);
            // Implement modal logic here
        } else {
            console.log(`Post with id ${postId} not found for user ${id}`);
        }
    };

    const handleFollow = async () => {
        try {
            if (user) {
                const updatedFollowers = isFollowing
                    ? user.follower.filter(followerId => followerId !== loggedInUserId)
                    : [...user.follower, loggedInUserId];

                const updatedUser = { ...user, follower: updatedFollowers };
                await updateUser(id, updatedUser);
                setIsFollowing(prevState => !prevState);
            }
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };
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
                <main>
                    <div className='px-[40px] flex gap-[80px] items-center'>
                        {user && (
                            <img onClick={openModalAvatar} className='cursor-pointer w-[150px] h-[150px] rounded-[50%]' src={user.avartar} alt="User Avatar" />
                        )}
                        <div className='flex flex-col gap-[30px]'>
                            <div className='flex gap-[20px] items-center'>
                                <div className='text-[20px]'>{user?.username}</div>
                                <button onClick={handleFollow} className='opacity-40 text-[14px]'>
                                    {isFollowing ? 'Đã follow' : 'Follow'}
                                </button>
                                <button className='opacity-40 text-[14px]'>Xem kho lưu trữ</button>
                            </div>
                            <div className='flex gap-[40px]'>
                                <div><span className='font-bold'>{postsByUserOnline.length}</span> bài viết</div>
                                <div><span className='font-bold'>{user?.follower.length}</span> người theo dõi</div>
                                <div>Đang theo dõi <span className='font-bold'>{user?.following.length}</span> người dùng</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[40px] ml-[20px] mb-[40px]'>
                        <i className='bx bx-plus bx-border-circle text-[55px] bg-[rgb(250,250,250)] text-[rgb(199,199,199)] border-1'></i>
                    </div>
                    <hr style={{ width: "1120px" }} />
                    <div className='my-[20px] flex justify-center gap-[200px]'>
                        <div className='flex items-center gap-[10px] text-black cursor-pointer'>
                            <i className='bx bx-menu bx-border'></i>
                            <div className='uppercase'>Bài viết</div>
                        </div>
                        <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
                            <i className='bx bx-home-alt-2'></i>
                            <div className='uppercase'>Đã lưu</div>
                        </div>
                        <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
                            <i className='bx bx-user bx-border'></i>
                            <div className='uppercase'>Được gắn thẻ</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-[5px]'>
                        {postsByUserOnline.sort((a, b) => b.id - a.id).map((post: Post) => (
                            <img key={post.id} onClick={() => openModalPost(post.id)} className='h-[300px] w-[300px] hover:opacity-85 cursor-pointer' src={post.image} alt={`Post ${post.id}`} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
