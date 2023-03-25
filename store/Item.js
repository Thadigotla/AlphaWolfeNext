import {createContext, useState} from "react";
 
const CartItemsContext = createContext({
    cartItems:[],
    open:false,
    setCartItems:function(data){},
    totalCount: function(){},
    totalPrice: function(){return null},
    showDrawer: function(){},
    onClose :function(){}
    
})

export function CartItemsContextProvider(props){

    const [cartItems, setCartItems] = useState([]);
   
    const [open, setOpen] = useState(false);

    function addItemsHandler(item){

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
        existingItem.quantity += 1;
        setCartItems([...cartItems]);
        } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    }

    function setCartItemsHandler(data){
        setCartItems(data)
    }

    function totalCountHandler(){
        const totalCount = cartItems.reduce(
            (accumulator, current) => accumulator + current.quantity,
            0
          );

          return totalCount
    }

    function totalPriceHandler(){
        const totalPrice = cartItems.reduce(
            (accumulator, current) => accumulator + current.cost * current.quantity,
            0
          );
          return totalPrice
    }

    function showDrawerHandler(){
        setOpen(true);

    }
 
    function onCloseHandler(){
        setOpen(false);
    }
      

    const context = {
        cartItems:cartItems,
        open:open,
        setCartItems:setCartItemsHandler,
        totalCount: totalCountHandler,
        totalPrice: totalPriceHandler,
        showDrawer:showDrawerHandler,
        onClose: onCloseHandler,
        
    }


    return <CartItemsContext.Provider value={context}>
             {props?.children}
            </CartItemsContext.Provider>
}

export default CartItemsContext;
