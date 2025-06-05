
// import { notification } from 'antd';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { FaHome } from 'react-icons/fa';
// import logoImg from '/images/logo.png';
// import {
//      FaTachometerAlt, FaChartBar, FaClipboardCheck,
// } from 'react-icons/fa';

// import { Link,  useNavigate } from 'react-router-dom';
// import LoginModal from './Login';
// import UserProfileMenu from './UserProfileMenuProps ';
// import AdminNotifications from './AdminNotifications';
// // import UserProfileMenu from './UserProfileMenu'; // הקומפוננטה החדשה

// const Header = () => {
//     const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//     const [api, contextHolder] = notification.useNotification();
//     const [scrolled] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // מצב התחברות
//     const [, setUserInfo] = useState({
//         name: 'אנונימי',
//         email: 'student@example.com',
//         avatar: undefined
//     });
    
//     const navigate = useNavigate();
    
//     const buttonVariants = {
//         hover: {
//             scale: 1.05,
//             boxShadow: "0px 8px 15px rgba(128, 224, 213, 0.4)",
//             transition: { duration: 0.3 }
//         },
//         tap: { scale: 0.95 }
//     };

//     const showLoginModal = () => {
//         setIsLoginModalOpen(true);
//     };

//     const handleLoginCancel = () => {
//         setIsLoginModalOpen(false);
//     };

//     const handleSignOut = () => {
//         setIsLoggedIn(false);
//         setUserInfo({
//             name: 'אנונימי',
//             email: 'student@example.com',
//             avatar: undefined
//         });
        
//         api.info({
//             message: 'התנתקת בהצלחה',
//             description: 'להתראות!',
//             placement: 'topRight',
//             className: 'rtl-notification',
//         });
//     };

//     const handleProfileClick = () => {
//         navigate('/profile');
//     };
//     return (
//         <>
//             {contextHolder}
//             <motion.div
//                 className={`nav-container ${scrolled ? 'scrolled' : ''}`}
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 transition={{ type: "spring", stiffness: 100, damping: 15 }}
//             >
//                 <div className="logo-container">

//                     <div className="logo-glow"></div>
//                     <motion.div
//                         className="logo"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <Link to="/" className="logo-link">
//                             <img src={logoImg} alt="Logo" className="logo-image" />
//                         </Link>
//                     </motion.div>
//                     <AdminNotifications/>

//                 </div>
                
//                 <motion.nav
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                     className="main-nav"
//                 >
//                     <ul>
//                         <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/')}>
//                             <FaHome className="nav-icon" />
//                             Home
//                         </motion.li>
//                         <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/dashboard')}>
//                             <FaTachometerAlt className="nav-icon" />
//                             Dashboard
//                         </motion.li>
//                         <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/statistics')}>
//                             <FaChartBar className="nav-icon" />
//                             Statistics
//                         </motion.li>
//                         <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/tests')}>
//                             <FaClipboardCheck className="nav-icon" />
//                             Tests
//                         </motion.li>

//                     </ul>
//                 </motion.nav>

//                 <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="auth-buttons"
//                 >
//                     {isLoggedIn ? (
//                         <UserProfileMenu
//                             onSignOut={handleSignOut}
//                             onProfileClick={handleProfileClick}
//                         />
//                     ) : (
//                         <motion.button
//                             className="sign-in-btn"
//                             onClick={showLoginModal}
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                         >
//                             Sign In
//                         </motion.button>
//                     )}
//                 </motion.div>
//             </motion.div>
            
//             {isLoginModalOpen && (
//                 <LoginModal
//                     isOpen={isLoginModalOpen}
//                     onClose={handleLoginCancel}
//                     onSuccessLogin={(email, messageType, message) => {
//                         setIsLoginModalOpen(false);
//                         if (messageType === 'success') {
//                             setIsLoggedIn(true);
//                             setUserInfo({
//                                 name: 'משתמש',
//                                 email: email,
//                                 avatar: undefined
//                             });
                            
//                             api.success({
//                                 message: "התחברת בהצלחה!",
//                                 description: 'ברוך הבא למערכת! ',
//                                 placement: 'topRight',
//                                 className: 'rtl-notification',
//                             });
//                         } else {
//                             api.error({
//                                 message: 'ההתחברות נכשלה',
//                                 description: message,
//                                 placement: 'topRight',
//                                 className: 'rtl-notification',
//                             });
//                         }
//                     }}
//                 />
//             )}
//         </>
//     );
// };

// export default Header;

import { notification } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaHome, FaTachometerAlt, FaChartBar, FaClipboardCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '/images/logo.png';
import LoginModal from './Login';
import AdminNotifications from './AdminNotifications';
import UserProfileMenu from './UserProfileMenuProps ';

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [, setUserInfo] = useState({
        name: 'אנונימי',
        email: 'student@example.com',
        avatar: undefined
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/' },
        { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FaChartBar />, label: 'Statistics', path: '/statistics' },
       {  label: 'Show Tests', path: '/show-tests' },
        // { icon: <FaClipboardCheck />, label: 'Tests', path: '/tests' },
    ];

    const handleProtectedClick = (path: string) => {
        if (!isLoggedIn) {
            api.warning({
                message: 'עליך להתחבר',
                description: 'אנא התחבר לפני שתוכל לגשת לעמוד זה',
                placement: 'topRight',
                className: 'rtl-notification',
            });
            setIsLoginModalOpen(true);
            return;
        }
        navigate(path);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserInfo({
            name: 'אנונימי',
            email: 'student@example.com',
            avatar: undefined
        });

        api.info({
            message: 'התנתקת בהצלחה',
            description: 'להתראות!',
            placement: 'topRight',
            className: 'rtl-notification',
        });
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(128, 224, 213, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <>
            {contextHolder}
            <motion.div className="nav-container" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 15 }}>
                <div className="logo-container">
                    <div className="logo-glow"></div>
                    <motion.div className="logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Link to="/" className="logo-link">
                            <img src={logoImg} alt="Logo" className="logo-image" />
                        </Link>
                    </motion.div>
                    <AdminNotifications />
                </div>

                <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="main-nav">
                    <ul>
                        {navItems.map(({ icon, label, path }) => (
                            <motion.li
                                key={label}
                                whileHover={isLoggedIn ? { scale: 1.1, color: "#64ffda" } : {}}
                                onClick={() => handleProtectedClick(path)}
                                style={{
                                    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                                    opacity: isLoggedIn ? 1 : 0.5
                                }}
                            >
                                {icon}
                                {label}
                            </motion.li>
                        ))}
                    </ul>
                </motion.nav>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="auth-buttons">
                    {isLoggedIn ? (
                        <UserProfileMenu onSignOut={handleSignOut} onProfileClick={handleProfileClick} />
                    ) : (
                        <motion.button
                            className="sign-in-btn"
                            onClick={() => setIsLoginModalOpen(true)}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Sign In
                        </motion.button>
                    )}
                </motion.div>
            </motion.div>

            {isLoginModalOpen && (
                <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    onSuccessLogin={(email, type, msg) => {
                        if (type === 'success') {
                            localStorage.setItem('token', 'dummy-token');
                            setIsLoggedIn(true);
                            setUserInfo({ name: 'משתמש', email, avatar: undefined });
                            api.success({
                                message: "התחברת בהצלחה!",
                                description: 'ברוך הבא למערכת!',
                                placement: 'topRight',
                                className: 'rtl-notification',
                            });
                            setIsLoginModalOpen(false);
                        } else {
                            api.error({
                                message: 'ההתחברות נכשלה',
                                description: msg,
                                placement: 'topRight',
                                className: 'rtl-notification',
                            });
                        }
                    }}
                />
            )}
        </>
    );
};

export default Header;
