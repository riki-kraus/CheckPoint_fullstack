import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import StatisticsDashboard from "./components/StatisticsDashboard ";
import Upload from "./components/Upload";
import UploadMenu from "./components/UploadMenu";
import Stepper_upload from "./components/Stepper_upload";
import ScannedTestsGallery from "./components/ScannedTestsGallery";
import AppLayout from "./components/AppLayout";

export const myRouter = createBrowserRouter([
    {

        path: '/',
        element: <AppLayout />,
              //  element: <ScannedTestsGallery />,

        children: [
            {
                index: true,
                element: <HomePage />
            },
           
                {
                  path:"show-tests",
                  element: <ScannedTestsGallery />,
                } ,
            {
                path: 'dashboard',
                element: <Dashboard/>,

            },
            {
                path: 'statistics',
                element: <StatisticsDashboard/>
                // element: <AdminNotifications/>

            },  
            {path:'tests',element: <Upload />,
              children: [
                {
                  index: true, 
                  element: <UploadMenu />
                },
                {
                  path: "test-results",
                  element: (
                      <Stepper_upload srcComponent={"test-result"} />
                  ),
                },
                {
                  path: "students-test",
                  element: (
                      <Stepper_upload srcComponent={"students-test"} />
                  ),
                },
              ],
            } ,       
                {
                  path: "GetStarted",
                  element: <Upload />, 
                  children: [
                    {
                      index: true, 
                      element: <UploadMenu />
                    },
                    {
                      path: "test-results",
                      element: (
                          <Stepper_upload srcComponent={"test-result"} />
                      ),
                    },
                    {
                      path: "students-test",
                      element: (
                          <Stepper_upload srcComponent={"students-test"} />
                      ),
                    },
                  ],
                }
        
        ]
    }
])