import React from "react";
import { Modal, Button, ListGroup, Container } from "react-bootstrap";
export default function Cart({
    handleClose,
    show,
    cartProducts,
    deleteFromCart,
}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartProducts.length > 0 ? (
                        <ListGroup>
                            {cartProducts.map(product => {
                                return (
                                    <ListGroup.Item
                                        className="d-flex"
                                        key={product.id}
                                    >
                                        <Container>
                                            <img
                                                src={product.image}
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    borderRadius: "5px",
                                                }}
                                                alt=""
                                            />
                                        </Container>
                                        <Container>
                                            <p className="mb-0">
                                                {product.name}
                                            </p>
                                            <p>Quantity - {product.quantity}</p>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    deleteFromCart(product)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Container>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    ) : (
                        <p>You have no items added to cart :(</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
