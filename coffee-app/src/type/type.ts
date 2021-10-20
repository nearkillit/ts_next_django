
export type StoreState = {
    Coffee: Array<CoffeeState>,
    Topping: Array<ToppingState>,
    Coupon?: Array<CouponState>,
    TimeSale?: Array<TimeSaleState>,
    user: any,      
    cart: CartState,
    orderhistory: Array<OrderhistoryState>
}

export type CoffeeState = {
    coffee_detail: string,
    id: number,
    image: string,
    coffee_name: string,
    coffee_priceL: number,
    coffee_priceM: number,
    couponCode?: string
}

export type ToppingState = {    
    id: number,    
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
    Itemid: number,
    couponCode: string
}

export type CartItemListState = {    
    Itemid: number,
    Topping: Array<ToppingState>,
    number: string,
    price: "priceM" | "priceL",
    subtotal: number,
    topping_id: Array<number>
}

export type CartState = {
    addressNumber: string,
    address: string,
    cartItemList: Array<CartItemListState> | [],
    couponCode?: string,
    email: string,
    order_name: string,
    order_date: string,
    order_time: string,
    status: '0' | '1' | '2',
    tel: string,    
}

export type OrderhistoryState = Array<CartState>

export type ItemState = {
    coffee: Array<CoffeeState>
    topping: Array<ToppingState>
}