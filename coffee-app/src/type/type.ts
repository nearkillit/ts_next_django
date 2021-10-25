
export type StoreState = {
    Coffee: Array<CoffeeState>,
    Topping: Array<ToppingState>,
    Coupon?: Array<CouponState>,
    TimeSale?: Array<TimeSaleState>,
    user: any,      
    cart: CartState,
    orderhistory: OrderhistoryState
}

export type CoffeeState = {
    coffee_detail: string,
    id: string,
    img: string,
    coffee_name: string,
    coffee_priceL: number,
    coffee_priceM: number,
    couponCode?: string
}

export type ToppingState = {    
    id: string,    
    topping_name: string,
    topping_priceL: number,
    topping_priceM: number,
}

export type CouponState = {
    code: string,
    price: number,
}

export type TimeSaleState = {
    deadline: string,
    Itemid: string,
    couponCode: string
}

export type CartItemListState = {    
    Itemid: string,    
    item_number: number,
    price: string,
    subtotal: number,
    topping_id?: Array<string>,
    Coffee?: CoffeeState,
    Topping?: Array<ToppingState>
}

export type CartState = {
    addressNumber: string,
    address: string,
    cartItemList: Array<CartItemListState>,    
    email: string,
    order_name: string,
    order_date: string,
    order_time: string,
    status: number,
    tel: string,
    // couponCode?: string,
}

export type OrderhistoryState = CartState[]

export type ItemState = {
    coffee: Array<CoffeeState>
    topping: Array<ToppingState>
}