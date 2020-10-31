import React, { useState } from "react";
import Cart from "./Cart";
import { FiShoppingCart } from "react-icons/fi";
import { Navbar, Nav } from "react-bootstrap";
export default function DashboardNavbar({
    logout,
    cartProducts,
    deleteFromCart,
}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <FiShoppingCart className="cart-logo text-info mr-3 " />
                    Shopping Cart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-white ">
                        <Nav.Item className="mr-4" onClick={handleShow}>
                            Cart
                        </Nav.Item>
                        <Nav.Item className="mr-4" onClick={logout}>
                            Logout
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Cart
                handleClose={handleClose}
                handleShow={handleShow}
                show={show}
                cartProducts={cartProducts}
                deleteFromCart={deleteFromCart}
            />
        </div>
    );
}
