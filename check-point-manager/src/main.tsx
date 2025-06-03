// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
// import Dashboard from './components/Dashboard.tsx'
// import StudentSubmissionsTable from './components/StudentSubmissionsTable.tsx'
// import Home from './components/Home.tsx'
// import Upload from './components/Upload.tsx'
// import Stepper_upload from './components/Stepper_upload.tsx'
// import  { StepperProvider } from './components/context/StepperContext.tsx'
// import GoogleLogin from './components/GoogleLogin.tsx'
// import UploadMenu from './components/UploadMenu.tsx'
// import StatisticsDashboard from './components/StatisticsDashboard .tsx'


// const routes = createBrowserRouter
// ([
//   {
//     path: '/', // דף הבית הראשי
//     // element: <Navigate to="/home" />, // הפניה אוטומטית ל-home
//     element: <StatisticsDashboard />, // הפניה אוטומטית ל-home

//   //  element:     <GoogleLogin/>
//     // , // הפניה אוטומטית ל-home
// //StatisticsDashboard
//   },
//   {
//     path: '/home', // דף הבית
//     element: <Home />, // קומפוננטת Home
//   },
//   {
//     path: '/dashboard', // דף הבית
//      element: <Dashboard />, children: [
//       {path:":id",element:<StudentSubmissionsTable />},]
//   },
  
//     {
//       path: "upload",
//       element: <Upload />, // רק Outlet
//       children: [
//         {
//           index: true, // עבור /upload
//           element: <UploadMenu />
//         },
//         {
//           path: "test-results",
//           element: (
//             <StepperProvider>
//               <Stepper_upload srcComponent={"test-result"} />
//             </StepperProvider>
//           ),
//         },
//         {
//           path: "students-test",
//           element: (
//             <StepperProvider>
//               <Stepper_upload srcComponent={"students-test"} />
//             </StepperProvider>
//           ),
//         },
//       ],
//     }
    
  
  
//   // UserMeetings
// ]);



// createRoot(document.getElementById('root')!).render(
//   <RouterProvider router={routes} />,
//   //add-recipe
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import myImg from "/images/background.jpg";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
      <img src={myImg} id="imgBackground" alt="background"></img>
  </StrictMode>,
)
