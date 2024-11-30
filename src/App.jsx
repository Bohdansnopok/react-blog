import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import {Header} from "./components/Header/Header.jsx"
import {BlogPage} from "./containers/BlogPage/BlogPage";
import {Footer} from "./components/Footer/Footer";
import {LoginPage} from "./containers/LoginPage/LoginPage";

export function App() {
    return (
        <Router>
            <div className="App">
                <Header/>

                <main>
                    <Routes>
                        <Route path="/" element={<BlogPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
                </main>

                <Footer year={new Date().getFullYear()}/>
            </div>
        </Router>
    );
}