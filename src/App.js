import "./App.scss";
import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { auth } from "./firebase/config.js";
import AuthForm from "./components/AuthForm";
import DashBoard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (signed_in_user) {
            if (signed_in_user) {
                setUser(signed_in_user);
            } else {
                setUser({});
            }
            setLoaded(true);
        });
        return () => unsubscribe();
    }, []);

    if (loaded === false) {
        return (
            <Container
                fluid
                className="d-flex align-items-center justify-content-center bg-secondary"
                style={{ minHeight: "100vh" }}
            >
                <Spinner animation="grow" className="mx-auto"></Spinner>;
            </Container>
        );
    }
    return (
        <>
            {user.uid ? (
                <DashBoard user={user} setUser={setUser} />
            ) : (
                <Container
                    fluid
                    className="d-flex align-items-center justify-content-center svg-background"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100">
                        <AuthForm setUser={setUser} />
                    </div>
                </Container>
            )}
        </>
    );
}

export default App;
