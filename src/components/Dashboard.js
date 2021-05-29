import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { auth, firebaseDB } from '../firebase/config';
import DashboardNavbar from './DashboardNavbar';

export default function DashBoard({ user, setUser }) {
    const [products, setProdcuts] = useState([]);
    const [totalCost, setTotalCost] = useState();
    const [cartProducts, setCartProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const logout = () => {
        auth.signOut().then(() => {
            setUser({});
        });
    };
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`./products.json`);
            const data = await response.json();
            setProdcuts(data.products);
        };

        const fetchCartProducts = async () => {
            const childSnapshot = await firebaseDB.ref(`/users/${user.uid}/cart`).once('value');
            let products = [];
            console.log('childSnapshot products', childSnapshot);
            childSnapshot.forEach(function (userSnapshot) {
                var userData = userSnapshot.val();
                products.push(userData);
                console.log('products', userData);
            });
            setCartProducts(products);
        };
        const fetchOrders = async () => {
            const childSnapshot = await firebaseDB.ref(`/users/${user.uid}/orders`).once('value');
            console.log('childSnapshot', childSnapshot);
            let _orders = [];
            childSnapshot.forEach(function (userSnapshot) {
                var orderData = userSnapshot.val();
                _orders.push(orderData);
                console.log('orderData', orderData);
            });
            setOrders(_orders);
        };
        fetchProducts();
        fetchCartProducts();
        fetchOrders();
    }, [user.uid]);

    useEffect(() => {
        let _totalCost = 0;
        for (let product of cartProducts) {
            _totalCost = _totalCost + parseInt(product.price);
        }
        setTotalCost(_totalCost);
    }, [cartProducts]);

    const clearCart = () => {
        // setCartProducts([]);
        // firebaseDB.ref('/users').child(user.uid).set({
        //     cart: [],
        //     orders: orders,
        // });
    };
    const updateFirebaseDB = (cartProducts, productName, success) => {
        firebaseDB
            .ref(`/users`)
            .child(user.uid)
            .set(
                {
                    cart: cartProducts,
                    orders: orders,
                },
                function (error) {
                    if (error) {
                        alert(error);
                    } else {
                        if (success) {
                            toast.success(`${productName} to added to cart!`, {
                                position: 'bottom-right',
                            });
                        } else {
                            toast.error(`${productName} is deleted from cart!`, {
                                position: 'bottom-right',
                            });
                        }
                    }
                }
            );
    };
    const updateFirebaseDBOrders = newOrder => {
        console.log('updating orders');
        firebaseDB
            .ref(`/users`)
            .child(user.uid)
            .set(
                {
                    cart: [],
                    orders: [...orders, newOrder],
                },
                function (error) {
                    if (error) {
                        alert(error);
                    }
                }
            );
        setOrders([newOrder, ...orders]);
    };
    const deleteFromCart = deletedProduct => {
        setCartProducts(cartProducts.filter(product => product.id !== deletedProduct.id));
        let newArr = cartProducts;
        let index = cartProducts.findIndex(product => product.id === deletedProduct.id);
        newArr.splice(index, 1);
        updateFirebaseDB(newArr, deletedProduct.name, false);
    };

    const addNewOrder = newOrder => {
        setCartProducts([]);
        updateFirebaseDBOrders(newOrder);
    };
    const addToCart = addedProduct => {
        let newArr;
        if (cartProducts.length !== 0) {
            newArr = cartProducts;
            let newProduct = true;
            for (let product of cartProducts) {
                if (product.id === addedProduct.id) {
                    newProduct = false;
                    let index = newArr.findIndex(product => product.id === addedProduct.id);
                    newArr[index].quantity += 1;
                }
            }
            if (newProduct) {
                newArr = [...newArr, addedProduct];
            }
        } else {
            newArr = [addedProduct];
        }
        setCartProducts(newArr);
        updateFirebaseDB(newArr, addedProduct.name, true);
    };
    return (
        <div className="dashboard-page pb-4">
            <DashboardNavbar
                logout={logout}
                cartProducts={cartProducts}
                deleteFromCart={deleteFromCart}
                totalCost={totalCost}
                addNewOrder={addNewOrder}
                orders={orders}
                clearCart={clearCart}
            />
            <h2 className="text-center mt-3 text-dark  py-1" style={{ color: '#1B4965', fontWeight: '600' }}>
                Welcome {user.displayName}
            </h2>
            <hr />
            <Container fluid>
                <Row>
                    {products.map(product => {
                        return (
                            <Col sm={3} className="mt-3" key={product.name}>
                                <Card>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>&#8377; {product.price}</Card.Text>
                                        <Button variant="primary" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <ToastContainer position="bottom-right" />
        </div>
    );
}
