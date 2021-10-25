import axios from 'axios'

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
        //   resolve(res)          
      })  
    })        
    return getData
  }