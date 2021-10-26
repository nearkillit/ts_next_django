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
    let _res

    return await new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/api/rest-auth/registration/', data)
        .then(res => {
          alert('新規登録が完了しました。ログイン画面よりログインしてください。')
          _res = res
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