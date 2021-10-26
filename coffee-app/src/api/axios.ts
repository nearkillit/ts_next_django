import axios from 'axios'
import { SignUpState } from '../type/type'

export const getItemByApi = async () => {
    let getData = { Coffee:[], Topping:[]}

    await new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:8000/api/coffee/'          
      ).then(res =>{          
          getData.Coffee = res.data  
          axios.get('http://127.0.0.1:8000/api/topping/'          
          ).then(_res =>{            
            getData.Topping = _res.data            
            resolve(_res)            
          })               
      })  
    })        
    return getData
}

export const signUpByApi = async (data: SignUpState) => {    

    return await new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/api/rest-auth/registration/', data)
        .then(res => {
          alert('新規登録が完了しました。ログイン画面よりログインしてください。')          
          resolve(res)
      })
      .catch(err => {
          alert('パスワードは8文字以上必要です。')
          reject(err)          
        })
      })      
}

export type cartUpdateApi = {
    item_number: number,
    coffee_id: string,
    item_size: string,   
    carts: string 
}

export const cartUpdateByApi = async (data: cartUpdateApi) => {
    return await new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/ordercoffee/', data)
          .then(res => {
            resolve(res)
        })
        .catch(err => {            
            reject(err)          
          })
        })  
}

export type cartFetchApi = {
    id: string
}

export const cartFetchByApi = async (data: cartFetchApi) => {
    return await new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/cart/', { id: '41e1749d-8333-4eb5-a8e7-90e4fd628135'})
          .then(res => {
            resolve(res)
        })
        .catch(err => {            
            reject(err)          
          })
        })  
}

export type loginState = {
    email: string,
    password: string
}

export const loginByApi = async (data: loginState) => { 
    
    return await new Promise((resolve, reject) => { 
        axios.post('http://localhost:8000/api/rest-auth/login/',{
          email: data.email,
          password: data.password,
        })
        .then(res => {
          console.log(res.data);
          console.log(res.data.token);
          axios.post('http://localhost:8000/api/cart/', res.data
          ,{ headers: {
              Authorization: `JWT ${res.data.token}`
            }}
            ).then( _res => {
              resolve(_res.data)
            })
            .catch( _err => {
              reject(_err)
            })
        }) 
        .catch(err => {
          alert("入力されたEmailもしくはパスワードが異なります")
          reject(err)
        })
    })
}