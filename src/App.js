import "./App.scss";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { auth, firebaseDB } from "./fireBase/config";
import AuthForm from "./components/AuthForm";
import DashBoard from "./components/DashBoard";

function App() {
    const [user, setUser] = useState(true);
    auth.onAuthStateChanged(function (signed_in_user) {
        if (signed_in_user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
    return (
      {!user ? (
        <Container fluid className="d-flex align-items-center justify-content-center bg-secondary"
                        style={{ minHeight: "100vh" }}
                    >
                        <div className="w-100">
                            <AuthForm setUser={setUser} />
                        </div>
                    </Container>
    ) : (
            <DashBoard/>
    )}
    );
}

export default App;
