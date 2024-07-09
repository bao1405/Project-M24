import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header: React.FC = () => {
    const { user, isLoggedIn, logout, users } = useUserContext();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showSearchForm, setShowSearchForm] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [searchMessage, setSearchMessage] = useState<string>('');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
        setSearchResults([]);
        setSearchMessage('');
        setSearchQuery('');
    };

    useEffect(() => {
        if (searchQuery === '') {
            setSearchResults([]);
            setSearchMessage('');
        } else {
            const results = users.filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            if (results.length === 0) {
                setSearchMessage('There are no matching accounts.');
            } else {
                setSearchMessage('');
            }
        }
    }, [searchQuery, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mx-auto my-4">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="md:col-span-1 bg-white p-4 text-black rounded">
                    <div className="font-bold">
                        <Link to="/home">
                            <h1 style={{ height: "80px", fontSize: "30px", marginLeft: "10px" }}>Instagram</h1>
                        </Link>
                    </div>
                    <nav style={{ height: "60px", marginLeft: "30px" }}>
                        <ul>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-house text-[#565555] text-[22px]" style={{ marginTop: "10px" }}></i>
                                <Link to="/home">
                                    <a href="/home" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-magnifying-glass text-[#565555] text-[22px]" style={{ marginTop: "12px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }} onClick={toggleSearchForm}>
                                    Search
                                </a>
                            </li>
                            {showSearchForm && (
                                <div className="absolute bg-white border border-gray-300 shadow-lg rounded-md p-4 mt-2" style={{ marginLeft: "30px" }}>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-4 border rounded-md"
                                        placeholder="Search for accounts..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    {searchResults.length > 0 ? (
                                        <ul className="mt-4">
                                            {searchResults.map((result) => (
                                                <li key={result.id} className="py-2 border-b flex items-center">
                                                    <img
                                                        src={result.avartar} // Ensure the correct property name 'avatar' instead of 'avartar'
                                                        alt={`Avatar of ${result.username}`}
                                                        className="w-8 h-8 rounded-full mr-2"
                                                    />
                                                    <a href={`/profile/${result.id}`}>{result.username}</a> {/* Link to the profile */}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="mt-4 text-red-500">{searchMessage}</div>
                                    )}
                                </div>
                            )}
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-plane text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    Explore
                                </a>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-video text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    Reels
                                </a>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-brands fa-facebook-messenger text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    Messages
                                </a>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-heart text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    Notifications
                                </a>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-plus text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <a href="#" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    Create
                                </a>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-user text-[#565555] text-[22px]" style={{ marginTop: "13px" }}></i>
                                <Link to="/profile">
                                    <a href="" className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                        Profile
                                    </a>
                                </Link>
                            </li>
                            <li style={{ height: "50px", display: "flex" }}>
                                <i className="fa-solid fa-bars text-[#565555] text-[22px] relative" style={{ marginTop: "12px" }}></i>
                                <a href="#" onClick={toggleMenu} className="block py-2" style={{ marginLeft: "10px", fontSize: "20px" }}>
                                    More
                                </a>
                            </li>
                            {showMenu && (
                                <ul className="dropdown-menu absolute mt-10 bg-white border border-gray-300 shadow-lg rounded-md p-2" style={{ marginTop: "-145px" }}>
                                    <li className='viewmore-item flex gap-[20px]'>
                                        <i className="fa-solid fa-gear" style={{ marginTop: "5px" }}></i>
                                        <div>Cài đặt</div>
                                    </li>
                                    <li className='viewmore-item flex gap-[20px]'>
                                        <i className="fa-solid fa-chart-line" style={{ marginTop: "5px" }}></i>
                                        <div>Hoạt động của bạn</div>
                                    </li>
                                    <li className='viewmore-item flex gap-[20px]'>
                                        <i className="fa-solid fa-right-from-bracket" style={{ marginTop: "5px", }}></i>
                                        <button onClick={logout}>Đăng xuất</button>
                                    </li>
                                </ul>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
