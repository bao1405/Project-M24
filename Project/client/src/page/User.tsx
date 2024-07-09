import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { fetchUser, User } from '../services/home';
import { fetchPosts, Post } from '../services/home'; // Ensure correct import path for Post type

const Profile: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [postsByUserOnline, setPostsByUserOnline] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await fetchUser();
                const filteredUsers = fetchedUsers.filter(user => user.loginstatus === true);
                setUsers(filteredUsers);

                // Assuming posts are fetched from somewhere
                const fetchedPosts = await fetchPosts();
                setPostsByUserOnline(fetchedPosts.filter(post => post.username === filteredUsers[0].username));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openModalAvatar = async () => {
        try {
            const fetchedUsers = await fetchUser();
            const loggedInUser = fetchedUsers.find(user => user.loginstatus === true); // Adjusted comparison
    
            if (loggedInUser) {
                console.log(`Avatar URL: ${loggedInUser.avartar}`);
                // Implement modal logic here to display the avatar
            } else {
                console.log('No user is currently logged in');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    openModalAvatar();

    const openModalPost = (postId: number) => {
        // Implement your logic here to open post modal
        const post = postsByUserOnline.find(post => post.id === postId.toString()); // Convert postId to string if necessary
        if (post) {
            console.log(`Opening post modal for post id ${postId}`);
            // Implement modal logic here
        } else {
            console.log(`Post with id ${postId} not found`);
        }
    };
    

    return (
        <div className="home">
            <div className="layout">
                <aside className="header-container">
                    <Header />
                </aside>
                <main>
                    <div className='px-[40px] flex gap-[80px] items-center'>
                        {/* Display avatar if users array is not empty and there is a logged-in user */}
                        <img onClick={openModalAvatar} className='cursor-pointer w-[150px] h-[150px] rounded-[50%]' src={users.length > 0 && users.find(user => user.loginstatus === true) ? users.find(user => user.loginstatus === true)!.avartar : ''} alt="" />
                        <div className='flex flex-col gap-[30px]'>
                            <div className='flex gap-[20px] items-center'>
                                <div className='text-[20px]'>{users.length > 0 && users.find(user => user.loginstatus === true) ? users.find(user => user.loginstatus === true)!.username : ''}</div>
                                <Link to={'edit'}><button className='opacity-40 text-[14px]'>Chỉnh sửa trang cá nhân</button></Link>
                                <button className='opacity-40 text-[14px]'>Xem kho lưu trữ</button>
                            </div>
                            <div className='flex gap-[40px]'>
                                <div><span className='font-bold'>{postsByUserOnline.length}</span> bài viết</div>
                                <div><span className='font-bold'>{users.length > 0 && users.find(user => user.loginstatus === true) ? users.find(user => user.loginstatus === true)!.follower.length : 0}</span> người theo dõi</div>
                                <div>Đang theo dõi <span className='font-bold'>{users.length > 0 && users.find(user => user.loginstatus === true) ? users.filter(user => user.follower.includes(users.find(user => user.loginstatus === true)!.id)).length : 0}</span> người dùng</div>
                            </div>
                        </div>
                    </div>
                    {/* Header end */}
                    <div className='mt-[40px] ml-[20px] mb-[40px]'>
                        <i className='bx bx-plus bx-border-circle text-[55px] bg-[rgb(250,250,250)] text-[rgb(199,199,199)] border-1'></i>
                    </div>
                    <hr style={{width:"1120px"}}/>
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
                    {/* Post start */}
                    <div className='grid grid-cols-3 gap-[5px]'>
                        {postsByUserOnline.sort((a, b) => b.id - a.id).map((post: Post) => (
                            <img key={post.id} onClick={() => openModalPost(post.id)} className='h-[300px] w-[300px] hover:opacity-85 cursor-pointer' src={post.image} alt="" />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
