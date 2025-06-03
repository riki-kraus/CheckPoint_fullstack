

// // import { Outlet, useNavigate } from 'react-router-dom'

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Upload=()=>
// // {
// // const nav=useNavigate()
// // return<>
// // <div id="upload-container">
// // <button onClick={()=>{nav(`students-test`)}}>student's test</button>
// // <button onClick={()=>{nav(`test-results`)}}>results test</button>
// // <Outlet/>

// // </div>
// // </>
// // }
// // export default Upload



// // import { SetStateAction, useState } from 'react';

// // // Mock navigate function (in actual implementation, you'd use the useNavigate hook from react-router-dom)
// // const mockNavigate = (path) => {
// //   console.log(`Navigating to: ${path}`);
// //   // Navigation logic would go here
// // };

// import { Outlet, useNavigate } from 'react-router-dom';
// import '../styles/Upload_s3.css'; // ייבוא קובץ ה-CSS שיצרנו

// const Upload = () => {
//   const nav = useNavigate();

//   return (
//     <div id="upload-container">
//       <h1 className="title">Choose Your Action</h1>
//       <p className="subtitle">
//         Our system allows you to check exams and view results quickly and efficiently
//       </p>

//       <div className="options-container">
//         <div 
//           className="option-card"
//           onClick={() => nav('students-test')}
//         >
//           <div className="icon-circle">
//             <div className="icon-background"></div>
//             <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h2 className="card-title">Student Exam Check</h2>
//           <p className="card-description">Upload and check student exams</p>
//         </div>
        
//         <div 
//           className="option-card"
//           onClick={() => nav('test-results')}
//         >
//           <div className="icon-circle">
//             <div className="icon-background"></div>
//             <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//           <h2 className="card-title">Exam Results</h2>
//           <p className="card-description">View and edit exam results</p>
//         </div>
//       </div>
      
//       <button 
//         className="back-button"
//         onClick={() => nav('/')}
//       >
//         <svg className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Back to Home
//       </button>
      
//       <Outlet />
//     </div>
//   );
// };

// export default Upload;

// Upload.tsx
import { Outlet } from 'react-router-dom';

const Upload = () => {
  return <Outlet />;
};

export default Upload;
