import React, { useEffect, useState } from 'react'
import { useUser } from '../components/ContextReducer'
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { isLogin } = useUser();
    const [ordersData, SetordersData] = useState([])
    const navigate = useNavigate();
    const getOrderdetails = async () => {
        if (!isLogin) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                    'Access-Control-Allow-Origin':'*'
                }
            })
            const resp = await response.json();
            const orderresponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getOrders/${resp.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                }
            })
            const orderresp = await orderresponse.json();
            console.log(orderresp);
            SetordersData(orderresp);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(!isLogin){
            navigate('/login')
        }
        getOrderdetails();
        // eslint-disable-next-line
    }, [])
    if(ordersData.length===0){
        return <div className='container text-center text-danger fs-4'>No Orders! :(</div>
    }
    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    {ordersData.map((order) => {
                        return <div className="card mb-2">
                            <div className="card-header">
                                Order Details
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Total Price: ₹{order.totalPrice}</h5>
                                <p className="card-text">Ordered At: {new Date(order.ordered_at).toLocaleString()}</p>
                                <h6>Order Items:</h6>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.order_data && order.order_data.map((e, ind) => {
                                            return <tr>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{e.name}</td>
                                                <td>{e.size}</td>
                                                <td>{e.qty}</td>
                                                <td>{e.price}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default MyOrders