export const GetItemById = (id: number, items: Array<any>) => {    
    if(!items || items.length === 0){ return { name:'', detail:'', priceL:10000000, priceM:10000000,} }      
    else { return items.filter( c => c.id == id)[0] }
}

export const GetDiscountByCoupon = (code: string, coupon: Array<{ code: string, price: number }>) => {    
    if(coupon.length === 0) return { price: 0 }
    else { return coupon.filter( c => c.code == code)[0].price }
}