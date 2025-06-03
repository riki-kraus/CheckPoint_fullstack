
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './Router'
import { StepperProvider } from './components/context/StepperContext'
function App() {

  return (
    <>
      <StepperProvider>
        <RouterProvider router={myRouter} />
      </StepperProvider>
    </>
  )
}

export default App
