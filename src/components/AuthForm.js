import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { auth } from "../fireBase/config";

export default function AuthForm({ setUser }) {
    const user = false;
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    const onDismiss = () => setVisible(false);
    const [hasAccount, setHasAccount] = useState(false);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: "",
            password: "",
        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({ [name]: newValue });
    };
    const handleLogin = () => {
        auth.signInWithEmailAndPassword(
            userInput.email,
            userInput.password
        ).catch(err => {
            setError(err.message);
        });
    };
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(
            userInput.email,
            userInput.password
        ).then(
            function (user) {
                setError("");
                var new_user = auth.currentUser;
                new_user
                    .updateProfile({
                        displayName: userInput.name,
                    })
                    .then(function () {
                        setUser(new_user);
                        console.log("userrr", new_user);
                    });
            },
            function (err) {
                setError(err.message);
            }
        );
    };
    const submitForm = e => {
        e.preventDefault();
        if (hasAccount) {
            handleLogin();
        } else {
            handleSignUp();
        }
    };
    return (
        <Container className="w-50  px-5 pt-3 pb-5 main-form bg-white">
            {hasAccount ? (
                <h2 className="text-center text-info my-2">Welcome Back!</h2>
            ) : (
                <h2 className="text-center text-info my-2">Register Now!</h2>
            )}

            {error && (
                <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    {error}
                </Alert>
            )}
            <Form onSubmit={submitForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        name="email"
                    />
                </Form.Group>
                {!hasAccount && (
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter email"
                            onChange={handleChange}
                            name="name"
                        />
                    </Form.Group>
                )}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </Form.Group>

                {hasAccount ? (
                    <Container fluid className="text-center ">
                        <Button variant="success" className="w-50 mt-2">
                            Login
                        </Button>
                        <p className="form-p">
                            Don't have an account?{" "}
                            <span onClick={() => setHasAccount(false)}>
                                Sign-Up
                            </span>
                        </p>
                    </Container>
                ) : (
                    <Container fluid className="text-center ">
                        <Button variant="success" className="w-50 mt-2">
                            Sign-Up
                        </Button>
                        <p className="form-p">
                            Already have an account?{" "}
                            <span onClick={() => setHasAccount(true)}>
                                Login
                            </span>
                        </p>
                    </Container>
                )}
            </Form>
        </Container>
    );
}
