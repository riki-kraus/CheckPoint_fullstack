import { Outlet } from "react-router"
import Footer from "./Footer"
import Header from "./Header"


const AppLayout = () => {

    return (<>
     
        <Header />
        <div >
            <Outlet />
        </div>
        <Footer />
    </>)
}

export default AppLayout


