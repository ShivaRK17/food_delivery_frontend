import React, { useEffect } from 'react'
import { useCart, useDispatchCart, useUser } from '../components/ContextReducer'
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { isLogin } = useUser();
    const data = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();
    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                    'Access-Control-Allow-Origin':'*'
                },
                body: JSON.stringify({
                    totalPrice,
                    orderData: data
                })
            });
            await response.json();
            await dispatch({ type: "EMPTY" })
            alert("ORDER PLACED!!")
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    if (data.length === 0) {
        return <div className='container text-center text-danger fs-4'>Cart is Empty!</div>
    }
    return (
        <>
            <div className="container my-4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e, ind) => {
                            return <tr>
                                <th scope="row">{ind + 1}</th>
                                <td>{e.name}</td>
                                <td>{e.size}</td>
                                <td>{e.qty}</td>
                                <td>{e.price}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={() => { dispatch({ type: "REMOVE", index: ind }) }}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="container d-flex justify-content-around">
                    <button className='btn btn-outline-success' onClick={() => { handleCheckout() }}>Checkout</button>
                    <h4>Total Price :<b>{`₹` + totalPrice}/-</b></h4>
                </div>
            </div>
        </>
    )
}

export default Cart