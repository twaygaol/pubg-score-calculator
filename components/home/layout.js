import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";


const  layout = ({ Children }) => {
    
    return (
        <div className="">
            <Navbar />
            <div>
                <Sidebar />
                <main>
                    {Children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default layout;