// import { notification } from 'antd';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { FaHome } from 'react-icons/fa';
// import logoImg from '../images/logo.png'; // או הנתיב שלך לקובץ
// // import logoImg from "./AnalyzeImag"; // נתיב לקובץ התמונה של הלוגו
// // import '../styles/Header.css'; // Assuming you have a CSS file for styles

// import {
//     FaRegLightbulb, FaTachometerAlt, FaChartBar, FaClipboardCheck,
// } from 'react-icons/fa';

// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import LoginModal from './Login';

// const Header = () => {

//     const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//     const [api, contextHolder] = notification.useNotification();

//     const [scrolled, setScrolled] = useState(false);
//     const navigate = useNavigate()
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

//     const responseGoogle = (response: any) => {
//         console.log("Google login response:", response);
//         setIsLoginModalOpen(false);
//         api.success({
//             message: 'התחברת בהצלחה עם Google',
//             description: 'ברוך הבא למערכת ExamAI!',
//             placement: 'topRight',
//             className: 'rtl-notification',
//         });
//     };
//     return (<>
//         {contextHolder}
//         <motion.div
//             className={`nav-container ${scrolled ? 'scrolled' : ''}`}
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 100, damping: 15 }}
//         >
//             <div className="logo-container">
//                 <div className="logo-glow"></div>
//                 <motion.div
//                     className="logo"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     {/* <FaRegLightbulb className="logo-icon" /> */}
//                     {/* ExamAI */}
//                     <Link to="/" className="logo-link">
//                     <img src={logoImg} alt="Logo" className="logo-image" />
//                     </Link>
//                     </motion.div>
//             </div>
//             <motion.nav
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="main-nav"
//             >
//                 <ul>
//                     <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/')}>
//                         <FaHome className="nav-icon" />
//                         Home
//                     </motion.li>
//                     <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/dashboard')}>
//                         <FaTachometerAlt className="nav-icon" />
//                         Dashboard
//                     </motion.li>
//                     <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/statistics')}>
//                         <FaChartBar className="nav-icon"  />
//                         Statistics
//                     </motion.li>
//                     <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/tests')}>
//                         <FaClipboardCheck className="nav-icon"  />
//                         Tests
//                     </motion.li>
//                 </ul>
//             </motion.nav>

//             <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="auth-buttons"
//             >
//                 <motion.button
//                     className="sign-in-btn"
//                     onClick={showLoginModal}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                 >
//                     Sign In
//                 </motion.button>
//             </motion.div>
//         </motion.div>
//         {isLoginModalOpen && (
//             <LoginModal
//                 isOpen={isLoginModalOpen}
//                 onClose={handleLoginCancel}
//                 onSuccessLogin={(email, messageType, message) => {
//                     setIsLoginModalOpen(false);
//                     messageType === 'success' ?
//                         api.success({
//                             message: "התחברת בהצלחה!",
//                             description: 'ברוך הבא למערכת! ',
//                             placement: 'topRight',
//                             className: 'rtl-notification',
//                         })
//                         : api.error({
//                             message: 'ההתחברות נכשלה',
//                             description: message,
//                             placement: 'topRight',
//                             className: 'rtl-notification',
//                         });
//                 }}
//             />
//         )}
//     </>)
// }


// export default Header
import { notification } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import logoImg from '/images/logo.png';
import {
     FaTachometerAlt, FaChartBar, FaClipboardCheck,
} from 'react-icons/fa';

import { Link,  useNavigate } from 'react-router-dom';
import LoginModal from './Login';
import UserProfileMenu from './UserProfileMenuProps ';
import AdminNotifications from './AdminNotifications';
// import UserProfileMenu from './UserProfileMenu'; // הקומפוננטה החדשה

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [scrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // מצב התחברות
    const [, setUserInfo] = useState({
        name: 'אנונימי',
        email: 'student@example.com',
        avatar: undefined
    });
    
    const navigate = useNavigate();
    
    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(128, 224, 213, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    const showLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const handleLoginCancel = () => {
        setIsLoginModalOpen(false);
    };

    const handleSignOut = () => {
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

    // const responseGoogle = (response: any) => {
    //     console.log("Google login response:", response);
    //     setIsLoginModalOpen(false);
    //     setIsLoggedIn(true);
        
    //     // עדכון פרטי משתמש (יכול להגיע מהתגובה של Google)
    //     setUserInfo({
    //         name: response.profileObj?.name || 'משתמש',
    //         email: response.profileObj?.email || 'user@example.com',
    //         avatar: response.profileObj?.imageUrl
    //     });
        
    //     api.success({
    //         message: 'התחברת בהצלחה עם Google',
    //         description: 'ברוך הבא למערכת ExamAI!',
    //         placement: 'topRight',
    //         className: 'rtl-notification',
    //     });
    // };

    return (
        <>
            {contextHolder}
            <motion.div
                className={`nav-container ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <div className="logo-container">

                    <div className="logo-glow"></div>
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="logo-link">
                            <img src={logoImg} alt="Logo" className="logo-image" />
                        </Link>
                    </motion.div>
                    <AdminNotifications/>

                </div>
                
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="main-nav"
                >
                    <ul>
                        <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/')}>
                            <FaHome className="nav-icon" />
                            Home
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/dashboard')}>
                            <FaTachometerAlt className="nav-icon" />
                            Dashboard
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/statistics')}>
                            <FaChartBar className="nav-icon" />
                            Statistics
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/tests')}>
                            <FaClipboardCheck className="nav-icon" />
                            Tests
                        </motion.li>
                        {/* <motion.li whileHover={{ scale: 1.1, color: "#64ffda" }} onClick={() => navigate('/tests')}>
                            <FaClipboardCheck className="nav-icon" />

                        </motion.li> */}
                    </ul>
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="auth-buttons"
                >
                    {isLoggedIn ? (
                        <UserProfileMenu
                            // userName={userInfo.name}
                            // userEmail={userInfo.email}
                            // userAvatar={userInfo.avatar}
                            onSignOut={handleSignOut}
                            onProfileClick={handleProfileClick}
                        />
                    ) : (
                        <motion.button
                            className="sign-in-btn"
                            onClick={showLoginModal}
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
                    onClose={handleLoginCancel}
                    onSuccessLogin={(email, messageType, message) => {
                        setIsLoginModalOpen(false);
                        if (messageType === 'success') {
                            setIsLoggedIn(true);
                            setUserInfo({
                                name: 'משתמש',
                                email: email,
                                avatar: undefined
                            });
                            
                            api.success({
                                message: "התחברת בהצלחה!",
                                description: 'ברוך הבא למערכת! ',
                                placement: 'topRight',
                                className: 'rtl-notification',
                            });
                        } else {
                            api.error({
                                message: 'ההתחברות נכשלה',
                                description: message,
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