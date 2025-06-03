import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import StatisticsDashboard from "./components/StatisticsDashboard ";
import Upload from "./components/Upload";
import UploadMenu from "./components/UploadMenu";
import Stepper_upload from "./components/Stepper_upload";

export const myRouter = createBrowserRouter([
    {

        path: '/',
        element: <AppLayout />,
        // element: <HomePage></HomePage>,
        // element: <StudentTable />,
        // element: <StudentTableV02></StudentTableV02>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'dashboard',
                element: <Dashboard                    />,
              //    children:[{
              //     path: ':id',
              //     // element: <StudentScoresModal />
              //     element: null, // נשתמש בפרמטר הזה בתוך Dashboard כדי לפתוח מודאל

              // }  ],
            },
            // {
            //     path: 'tests',
            //     element: <StudentTableV02></StudentTableV02>,
            // },
            {
                path: 'statistics',
                element: <StatisticsDashboard/>
                // element: <AdminNotifications/>

            },  
            {path:'tests',element: <Upload />,
              children: [
                {
                  index: true, // עבור /upload
                  element: <UploadMenu />
                },
                {
                  path: "test-results",
                  element: (
                    // <StepperProvider>
                      <Stepper_upload srcComponent={"test-result"} />
                    // </StepperProvider>
                  ),
                },
                {
                  path: "students-test",
                  element: (
                    // <StepperProvider>
                      <Stepper_upload srcComponent={"students-test"} />
                    // </StepperProvider>
                  ),
                },
              ],
            } ,       
                {
                  path: "GetStarted",
                  element: <Upload />, // רק Outlet
                  children: [
                    {
                      index: true, // עבור /upload
                      element: <UploadMenu />
                    },
                    {
                      path: "test-results",
                      element: (
                        // <StepperProvider>
                          <Stepper_upload srcComponent={"test-result"} />
                        // </StepperProvider>
                      ),
                    },
                    {
                      path: "students-test",
                      element: (
                        // <StepperProvider>
                          <Stepper_upload srcComponent={"students-test"} />
                        // </StepperProvider>
                      ),
                    },
                  ],
                }
        
        ]
    }
])