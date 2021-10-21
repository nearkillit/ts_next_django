import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartState, CoffeeState, OrderhistoryState, ToppingState, CartItemListState, ItemState } from '../../type/type'
  
export type userState = {
    Coffee: CoffeeState | [],
    Topping: ToppingState | [],
    user: any,
    cart: CartState | {},
    orderhistory: OrderhistoryState | []
}

export const initialState: userState = {
    Coffee:[],
    Topping:[],  
    user: {},      
    cart:{},
    orderhistory:[]
} 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        UPDATE_CART(state, action: PayloadAction<CartState>) {
            return { ...state,
                cart: action.payload,
            };
        },
        UPDATE_CARTITEMLIST(state, action: PayloadAction<CartItemListState>){
            return { ...state,
                cart: { ...state.cart, cartItemList: action.payload }
            };  
        },
        UPDATE_USER(state, action: PayloadAction<any>){
            console.log(action);            
            return { ...state,
                user: action.payload.user
            }
        },
        ADD_ORDERHISTORY(state, action: PayloadAction<CartState>){
            return { ...state,
                orderhistory: [...state.orderhistory, action.payload]
            };
        },
        CREATE_CART(state, action: PayloadAction<CartState>){
            return { ...state,
                cart: action.payload
            }
        },
        FETCH_CART(state, action: PayloadAction<CartState>){
            return { ...state,
                cart: action.payload
            }
        },
        FETCH_ITEM(state, action: PayloadAction<any>){
            if(action.payload.coffee) return { ...state,Coffee: action.payload.coffee }
            if(action.payload.topping) return { ...state,Topping: action.payload.topping }           
        }
    },
  })

// ここまで

  export const newCart = {
    addNumber:'',
    address:'',
    cartItemList:[],
    email:'',
    name:'',
    orderDate:'',
    orderTime:0,
    status:0,
    tel:'',
    couponCode:''
  }                  
