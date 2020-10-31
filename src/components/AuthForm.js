import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { auth } from "../firebase/config";

export default function AuthForm({ setUser }) {
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
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
    const handleSignUp = async () => {
        try {
            const userCredentials = await auth.createUserWithEmailAndPassword(
                userInput.email,
                userInput.password
            );
            await userCredentials.user.updateProfile({
                displayName: userInput.name,
            });
            const new_user = {
                ...userCredentials.user,
            };
            setUser(new_user);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setShow(true);
        }
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

            {error && show && (
                <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    {error}
                </Alert>
            )}
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        name="email"
                    />
                </Form.Group>
                {!hasAccount && (
                    <Form.Group>
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
                        name="password"
                        onChange={handleChange}
                    />
                </Form.Group>

                {hasAccount ? (
                    <Container fluid className="text-center ">
                        <Button
                            variant="success"
                            className="w-50 mt-2"
                            type="submit"
                        >
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
                        <Button
                            variant="success"
                            className="w-50 mt-2"
                            type="submit"
                        >
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
