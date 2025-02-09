import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import {Header} from "./components/Header/Header.jsx";
import {BlogPage} from "./containers/BlogPage/BlogPage";
import {Footer} from "./components/Footer/Footer";
import {LoginPage} from "./containers/LoginPage/LoginPage";
import {useState} from "react";

export function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userName, setUserName] = useState(localStorage.getItem('userName'));

    return (
        <Router>
            <div className="App">
                <Header userName={userName} isLoggedOn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLoggedIn ? <Navigate to="/blog"/> : <Navigate to="/login"/>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !isLoggedIn ?
                                    <LoginPage
                                        setIsLoggedIn={setIsLoggedIn}
                                        setUserName={setUserName}
                                    /> : <Navigate to="/blog"/>
                            }
                        />
                        <Route
                            path="/blog"
                            element={
                                isLoggedIn ?
                                    <BlogPage/> : <Navigate to="/login"/>
                            }
                        />
                    </Routes>
                </main>

                <Footer year={new Date().getFullYear()}/>
            </div>
        </Router>
    );
}
