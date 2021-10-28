import axios from 'axios'
import { SignUpState } from '../type/type'

// export const getItemByApi = async () => {
//     let getData = { Coffee:[], Topping:[]}

//     await new Promise((resolve, reject) => {
//       axios.get('http://127.0.0.1:8000/api/coffee/'          
//       ).then(res =>{          
//           getData.Coffee = res.data  
//           axios.get('http://127.0.0.1:8000/api/topping/'          
//           ).then(_res =>{            
//             getData.Topping = _res.data            
//             resolve(_res)            
//           })               
//       })  
//     })        
//     return getData
// }

export const signUpByApi = async (data: SignUpState) => {    

    return await new Promise(async (resolve, reject) => {
      try{
        const res = await axios.post('http://localhost:8000/api/rest-auth/registration/', data)
        const res2 = await axios.post('http://127.0.0.1:8000/api/cart/', res.data,{
                        headers: {
                          Authorization: `JWT ${res.data.token}`
                        }
                    })
        alert('新規登録が完了しました。ログイン画面よりログインしてください。')          
        resolve({ user:{ id: res.data.user.id, email:res.data.user.email, token: res.data.token}
            , cart:res2.data })
      }catch(err){
        alert('パスワードは8文字以上必要です。')
        reject(err)
      }
    })    
}

export type cartUpdApi = {    
    cart: cartUpdCar,
    token: string,
    topping: Array<cartUpdTop>
}

type cartUpdTop = {
    topping_id: string,
    cart: string
}

type cartUpdCar = {    
    item_number: number,
    coffee_id: string,
    item_size: string,   
    carts: string 
}

export type cartDelApi = {    
    cart: cartDelCar,
    token: string,    
}

type cartDelCar = {
    id: string,    
}

export const cartUpdateByApi = async (data: cartUpdApi) => {
    return await new Promise( async (resolve, reject) => {        
        try{            
          const res = await axios.post('http://localhost:8000/api/ordercoffee/', data.cart
                        ,{headers: {
                            Authorization: `JWT ${data.token}`
                        }}
                    )
        
          const res1 = await axios.post('http://localhost:8000/api/ordertoppings/', data.topping
                        ,{headers: {
                            Authorization: `JWT ${data.token}`
                        }}
                    )

          resolve({cart: res, topping: res1 })
        }catch(err){            
          reject(err)
        }
    })  
}

export const cartDeleteByApi = async (data: cartDelApi) => {
    return await new Promise( async (resolve, reject) => {        
        try{            
          await axios.delete('http://localhost:8000/api/ordercoffee/3fa55a0c-026e-4a41-b38f-715fa4c66120/'
                        ,{
                            // params: { id: "3fa55a0c-026e-4a41-b38f-715fa4c66120" },
                            headers: {
                              Authorization: `JWT ${data.token}`
                        }}
                    )

          resolve("ok delete")
        }catch(err){            
          reject(err)
        }
    })  
}

export type loginState = {
    email: string,
    password: string
}

export type loginUserState = {
    user: loginUserDataState,
    cart: Array<any>,
    order: Array<any>,
    ordercart: Array<any>,
    ordertopping: Array<any>,
}

export type loginUserDataState = {
    user_id: string,
    email: string,
    token: string,     
}

export const loginByApi = async (data: loginState) => { 
    let userData: loginUserState = {
        user: { user_id: '', email: '', token: '' },
        cart: [],
        order: [],
        ordercart: [],
        ordertopping: []
    }
    

    return await new Promise( async (resolve, reject) => {
      try {
        const res = await axios.post('http://localhost:8000/api/rest-auth/login/',{
          email: data.email,
          password: data.password,
        })        
        userData.user.user_id = res.data.user.id
        userData.user.email = res.data.user.email
        userData.user.token = res.data.token
        const res1 = await axios.get('http://127.0.0.1:8000/api/cart/',{
            headers: {
              Authorization: `JWT ${res.data.token}`
            }
        })
        
        if(res1.data.length === 0){
            const res2 = await axios.post('http://127.0.0.1:8000/api/cart/', res.data,{
                headers: {
                  Authorization: `JWT ${res.data.token}`
                }
            })
            userData.cart[0] = { id: res2.data.id }
        }else{
            // cart を持ってくる処理
            userData.cart = res1.data                
                
            // orderers　を持ってくる
            const _res = await axios.get('http://127.0.0.1:8000/api/orderers/',{
                headers: {
                  Authorization: `JWT ${res.data.token}`
                }
            })
            userData.order = _res.data
            // ordercart を持ってくる処理
            const __res = await axios.get('http://127.0.0.1:8000/api/ordercoffee/',{
                params: res1.data
            })
            userData.ordercart = __res.data            

            const ___res = await axios.get('http://127.0.0.1:8000/api/ordertopping/',{
                params: __res.data
            })
            userData.ordertopping = ___res.data
            
        }                             
        resolve(userData)
      } catch (err){
        reject(err)
      } 
    })
}

export const getOrdersByApi = async (token: string) => { 
    return await new Promise((resolve, reject) => { 
        axios.get('http://127.0.0.1:8000/api/orderers/',{
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then(_res => {
            resolve(_res)
        }).catch(_err => {
            reject(_err)
        })
    })
}
