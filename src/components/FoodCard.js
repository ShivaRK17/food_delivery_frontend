import React, { useState } from 'react'
import { useCart, useDispatchCart, useUser } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

const FoodCard = (props) => {
    let dispatch = useDispatchCart()
    let data = useCart()    
    const {isLogin} = useUser();
    const navigate = useNavigate();
    const priceOptions = Object.keys(props.jsondata.options[0])
    const [quan, setQuan] = useState(1);
    const [size, setSize] = useState(priceOptions[0])
    const handleAddtocart = async ()=>{
        if(!isLogin){
            navigate('/login');
            return;
        }
        for (const e of data) {
            if(e.id===props.jsondata._id && e.size===size){
                await dispatch({type:"UPDATE",id:props.jsondata._id,name:props.jsondata.name,size:size,price:finalPrice()+e.price,qty:Number.parseInt(quan)+Number.parseInt(e.qty)});
                return;
            }
        }
        console.log(`Adding`)
        await dispatch({type:"ADD",id:props.jsondata._id,name:props.jsondata.name,qty:quan,size:size,price:finalPrice(),img:props.jsondata.img});
        // console.log(data);
    }
    const finalPrice = ()=>{
        return quan*(props.jsondata.options[0][size]);
    }

    return (
        <>
            <div className="card m-2" style={{ 'width': '18rem' }}>
                <img src={props.jsondata.img} className="card-img-top" style={{objectFit:'cover',height:'250px'}} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.jsondata.name}</h5>
                    <p>{props.jsondata.CategoryName}</p>
                    {/* <p>{props.jsondata.description}</p> */}
                    <div className='container w-100 d-flex justify-content-center align-items-center'>
                        <select className='m-2 h-100 p-1 rounded-2 bg-success' onChange={(e)=>{setQuan(e.target.value)}}>
                            <option value="1" key={1}>1</option>
                            <option value="2" key={2}>2</option>
                            <option value="3" key={3}>3</option>
                            <option value="4" key={4}>4</option>
                            <option value="5" key={5}>5</option>
                            <option value="6" key={6}>6</option>
                        </select>
                        <select className='m-2 h-100 p-1 rounded-3 bg-success' onChange={(e)=>{setSize(e.target.value)}}>
                            {Object.keys(props.jsondata.options[0]).map((e,ind)=>{
                                return <option value={e} key={ind}>{e}</option>
                            })}
                        </select>
                        {/* <div>{size}</div> */}
                        <b>{`₹`+finalPrice()}/-</b>
                    </div>
                    <hr />
                    <button className='btn btn-success btn-sm' onClick={handleAddtocart}>Add to cart</button>
                </div>
            </div>
        </>
    )
}

export default FoodCard