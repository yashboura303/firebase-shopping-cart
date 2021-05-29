import React from 'react';
import { Modal, Button, ListGroup, Container } from 'react-bootstrap';
import GooglePayButton from '@google-pay/button-react';
import { toast } from 'react-toastify';
export default function Cart({ handleClose, show, cartProducts, totalCost, deleteFromCart, addNewOrder, clearCart }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {cartProducts.length > 0 ? (
                        <ListGroup>
                            {cartProducts.map(product => {
                                return (
                                    <ListGroup.Item className="d-flex" key={product.id}>
                                        <Container>
                                            <img src={product.image} className="cart-images" alt="" />
                                        </Container>
                                        <Container>
                                            <p className="mb-0">
                                                <strong>{product.name}</strong>
                                            </p>
                                            <p>Quantity - {product.quantity}</p>
                                            <Button variant="danger" size="sm" onClick={() => deleteFromCart(product)}>
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
                    {cartProducts.length > 0 && totalCost && (
                        <p className="font-weight-bold my-1 text-primary">Total Payable - &#8377;{totalCost}</p>
                    )}
                    {cartProducts.length > 0 && (
                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'example',
                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                        },
                                    },
                                ],
                                merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: totalCost ? totalCost.toString() : '0',
                                    currencyCode: 'INR',
                                    countryCode: 'IN',
                                },
                                shippingAddressRequired: true,
                                callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                            }}
                            onLoadPaymentData={paymentRequest => {
                                handleClose();
                                clearCart();
                                let newOrder = {
                                    data: new Date(),
                                    name: paymentRequest.shippingAddress.name,
                                    totalCost,
                                    items: cartProducts,
                                };
                                addNewOrder(newOrder);
                                console.log('Success', paymentRequest);
                                toast.success('Order Confirmed!');
                            }}
                            onPaymentAuthorized={paymentData => {
                                console.log('Payment Authorised Success', paymentData);
                                return { transactionState: 'SUCCESS' };
                            }}
                            onPaymentDataChanged={paymentData => {
                                console.log('On Payment Data Changed', paymentData);
                                return {};
                            }}
                            existingPaymentMethodRequired="false"
                            buttonColor="black"
                            buttonType="Buy"
                            className="my-3"
                        />
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
