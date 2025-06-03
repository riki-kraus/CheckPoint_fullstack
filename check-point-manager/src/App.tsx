// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import FileUploader from './components/זבל/FileUploader'
// import Login from './components/Login'
// import Test from './components/זבל/test'
// import Test2 from './components/זבל/test2'
// import StudentList from './components/זבל/am2'
// import StudentSubmissionsTable from './components/StudentSubmissionsTable'
// import StudentTable from './components/זבל/am2'
// import SubmissionTable from './components/זבל/am'
// import Home from './components/Home'
// import Dashboard from './components/Dashboard'
// // import CrudListDataGrid from './components/am'
// // import Login from './components/login'

// function App() {

//   return (
//     <>
//     {/* <Dashboard/> */}
//     <StudentTable/>
//     </>
//   )
// }

// export default App

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './Router'
import { StepperProvider } from './components/context/StepperContext'
// import STable from './components/table'
function App() {

  return (
    <>

      {/* .....העלאת מבחן/קובץ ל AWS....... */}
      {/* <ExamUploader></ExamUploader> */}

      {/* .....התחברות...... */}
      {/* <Login></Login> */}

      {/* ....פיענוח מבחן...... */}
      {/* <FileProcessor></FileProcessor> */}

      {/* .....טבלת התלמידים...... */}
      {/* <StudentTable/> */}
      <StepperProvider>
        <RouterProvider router={myRouter} />
        {/* טבלה של V0 */}
        {/* <STable></STable> */}
      </StepperProvider>
      {/* <StudentTable></StudentTable> */}
    </>
  )
}

export default App
