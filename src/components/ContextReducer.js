import React, { createContext, useContext, useReducer, useState } from 'react'

const CartStateContext  = createContext();
const CartDispatchContext = createContext();
const userContext = createContext();


const reducer  = (state,action) =>{
  switch (action.type) {
    case "ADD":
      return [...state,{
        id:action.id,
        name:action.name,
        price:Number.parseInt(action.price),
        qty:Number.parseInt(action.qty),
        size:action.size,
        img:action.img
      }]
    case "REMOVE":
      console.log(state);
      let tempArr = [...state]  
      tempArr.splice(action.index,1);
      return tempArr;
    case "UPDATE":
      let temArr = [...state];
      for (const e of temArr){
        if(e.id===action.id && e.size===action.size){
            e.qty=Number.parseInt(action.qty);
            // console.log(e.price+action.price);
          // e.qty+=Number.parseInt(action.qty);
          e.price=Number.parseInt(action.price);
          return temArr
        }
      }
      return temArr;
    case "EMPTY":
      return []
    default:
      console.log(`Error in Reducer`);
      break;
  }
}

const ContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(reducer,[]);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('authToken'));
  const [userDetails, setUserDetails] = useState([])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        <userContext.Provider value={{isLogin,setIsLogin,userDetails,setUserDetails}}>
          {children}
        </userContext.Provider>
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export default ContextProvider
export const useCart = ()=> useContext(CartStateContext)
export const useDispatchCart = ()=> useContext(CartDispatchContext)
export const useUser = ()=>useContext(userContext)