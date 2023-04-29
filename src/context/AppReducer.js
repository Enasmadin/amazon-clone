
export const getBasketTotal= (basket) =>(
    basket.reduce ((amount , item) =>{
         return amount + item.price;
    },0) 
    )
export const initialState= {
    basket:[{ id: "eKz1ue2_f1dQ", title: "MeLE PCG02 Fanless Mini PC Stick Windows 11 Pro J4125 8GB/128GB Portable Mini Desktop Computer Stick Business & Home Video Support HDMI 4K 60Hz, BT4.2, 2.4G/5.8G Dual Band Wi-Fi, USB, Ethernet...", price: 239,rating:4 },{ id: "eKz1ue25_f1dQ", title: "MeLE PCG02 Fanless Mini PC Stick Windows 11 Pro J4125 8GB/128GB Portable Mini Desktop Computer Stick Business & Home Video Support HDMI 4K 60Hz, BT4.2, 2.4G/5.8G Dual Band Wi-Fi, USB, Ethernet...", price: 239,rating:4 }],
    user:null
}

const AppReducer = (state = initialState, action) => {
switch (action.type) {
    case "SET_USER":
        return{
            ...state,
            user:action.user
        };
        case "ADD_TO_BASKET":
            return {
              ...state,
              basket: [...state.basket, action.item],
            };
        case "EMPRTY_BASKET" :
            return{
                ...state,
                basket:[]
            } ;  
       case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
            (basketitem)=>basketitem.id===action.id
        )
        let newBasket=[...state.basket];

        if(index>= 0){
            newBasket.splice(index,1)
        }
        else{
         console.warn(`cannot remove product {id ${action.id}} as it is not abasket `)
        }

        return{
            ...state,
            basket:newBasket

        }     
    default:
        return state;
}
}

export default AppReducer
