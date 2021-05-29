import React from 'react';
import { Modal, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
export default function Orders({ handleClose, show, orders }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {orders && orders.length > 0 ? (
                        <ListGroup>
                            {orders.map((order, index) => {
                                return (
                                    <ListGroup.Item className="d-flex" key={order.id}>
                                        <Container>
                                            <Row>
                                                <Col className="text-primary mt-3 font-weight-bold">
                                                    Order No - {index + 1}
                                                </Col>
                                                <Col>
                                                    <p className="mb-0">
                                                        Total - &#8377;<strong>{order.totalCost}</strong>
                                                    </p>
                                                    <p>
                                                        Placed On -{' '}
                                                        <strong>{moment(order.date).format('DD/MM/YYYY')}</strong>
                                                    </p>
                                                </Col>
                                            </Row>
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
