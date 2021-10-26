// ts
import * as React from 'react';
import { useEffect } from 'react'
import type { VFC } from "react"
import 'react-redux'
import { StoreState } from '../../../src/type/type'
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next'

// material ui
import Button from '@material-ui/core/Button' 
import Card from '@material-ui/core/Card';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import { useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { GetCoffeeById } from '../../../src/components/Items'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

declare module 'react-redux' {
    interface DefaultRootState extends StoreState {}
}

type PathParams = {
    id: string;
}

type PageProps = {
    title: string;
    author: string;
}  

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    // /books/001、/books/002、/books/003 のページを事前生成するには、
    // 次のように paths プロパティの値を設定して返します。
    // 本来は id のリストを外部 API（getBookList など）で取得します。
    return {
      paths: [
        { params: { id: '4b16547d-a64e-4ed3-882a-3f8c07b3334e' } },        
      ],
      fallback: false  // 上記以外のパスでアクセスした場合は 404 ページにする
    }
  }

export const getStaticProps: GetStaticProps<PageProps> = async context => {
    // ファイル名が [id].tsx なので id パラメーターを取り出すことができる
    const { id } = context.params as PathParams    

    // 本来はここで getBook(id) のように API を呼び出してデータを取得する
    const props: PageProps = {
      title: `Title-${id}`,
      author: `Author-${id}`
    }
  
    // ページコンポーネントに渡す PageProps オブジェクトを
    // props プロパティに設定したオブジェクトを返す
    return { props }
}

const ItemDetail: VFC<PageProps> = ({ title, author }: PageProps) =>{
    const router = useRouter();
    const Item_id = router.query.id
    const state = useSelector((state: DefaultRootState ) => state.user)
    const dispatch = useDispatch()

    let [choiceTopping, setChoiceTopping] = useState<Array<string>>([])
    let [sizeChoice, setSizeChoice] = useState<"M" | "L">("M")
    let [quantityChoise, setQuantityChoise] = useState<string>("")
    let [sizeFinal, setSizeFinal] = useState<string>("")
    let [puantityFinal, setQuantityFinal] = useState<string>("")    

    const setTopping = (e) => {
        const getId = e.target.value
    
        if(choiceTopping.includes(getId)){
            setChoiceTopping(choiceTopping.filter(item => item !== getId));
        } else {
            setChoiceTopping([...choiceTopping, getId]);
        }
    }
    
    let totalPrice = ()  => {
        if(sizeChoice === "M"){
            return  choiceTopping.length * GetItemById(Item_id, state.Topping).priceM * Number(quantityChoise) + GetItemById(Item_id, state.Coffee).priceM * Number(quantityChoise)
        }else if(sizeChoice === "L"){
            return  choiceTopping.length * GetItemById(Item_id, state.Topping).priceL * Number(quantityChoise) + GetItemById(Item_id, state.Coffee).priceL * Number(quantityChoise) 
        }
    }
    
    let setQuantity = (e) => setQuantityChoise(e.target.value) 
    // let allSelects = {}
    let sizePrice = ""
    
    const checkValid = ()  => {
        setSizeFinal("")
        setQuantityFinal("")
        let errorSentence = ""

        if (quantityChoise==="" || quantityChoise==="-------------------------------") {       
           setQuantityFinal("個数を選択してください")
           errorSentence += "個数 "
        }
        if(errorSentence !== ""){
            alert(errorSentence + "を入力してください")
        }else{
            if(sizeChoice === "M"){
                sizePrice= "priceM"
            }else if(sizeChoice === "L"){
                sizePrice= "priceL"
            }

            let allSelects = {  item_number: Number(quantityChoise), 
                                Itemid: GetItemById(Item_id, state.Coffee).id, 
                                topping_id: choiceTopping, 
                                price : "price" + sizePrice,
                                subtotal: 0 }
     
            // カート作成         
            let cartItemList = state.cart.cartItemList
            cartItemList.push(allSelects)
            let cartItem = state.cart
            cartItem.cartItemList = cartItemList
            
            // ログインしていた場合はFirebase、storeを更新
            if(state.user && state.user.uid){
                // firebase.firestore()
                //   .collection(`users/${state.user.uid}/carts`)
                //   .doc(state.cart.uid)
                //   .update(cartItem)
                //   .then( querySnapshot => {                                              
                //     dispatch({ type: 'UPDATE_CARTITEMLIST', payload: { cartItemList }})            
                //   })
            
            // ログインしていない場合はstore飲み更新
            }else{
                // dispatch({ type: 'UPDATE_CARTITEMLIST', payload: { cartItemList }})
            }  
            // handleLink('/cart')              
        }                
    }
    
    const mainview = {
        display:"flex"
    }

    const itemdetail = {
        display: "block",
        width: "100%",
        // textAlign: "center"
    }

    useEffect(() => {
        console.log(Item_id);
        console.log(state);
    },[])

    return (
        <Card style={mainview}>
            <div style={itemdetail}>
            <h1>{GetItemById(Item_id, state.Coffee).name} </h1>
            <p>{GetItemById(Item_id, state.Coffee).detail}</p>
         
            <img src={`${GetItemById(Item_id, state.Coffee).image}`}  height="400px" alt="商品" style={{borderRadius:10}}/>
            <h3 style={{backgroundColor:"rgb(70, 77, 180)"}}>合計金額：{totalPrice()}円(税抜)</h3>                      
            <p id='error'> {sizeFinal}</p>
            <p>
               <span>サイズの選択：　</span>
               <input type="radio" name="size" id='M' onClick={() => setSizeChoice("M")} value="M" /><label htmlFor='M' className='point'>
               <span><LocalCafeIcon fontSize='small'/>&nbsp;M&nbsp;&nbsp;{GetItemById(Item_id, state.Coffee).priceM}円(税抜)</span></label>
               &nbsp;&nbsp;/&nbsp;&nbsp;
               <input type="radio" name="size" id='L' onClick={() => setSizeChoice("L")} value="L" /><label htmlFor='L' className='point'>
               <span><LocalCafeIcon />&nbsp;L&nbsp;&nbsp;{GetItemById(Item_id, state.Coffee).priceL}円(税抜)</span></label>
            </p>

            <div>
            <div id='error'> {puantityFinal}</div>  
            <span>個数の選択：　　　　</span>
    
                <select onChange={setQuantity}>
                    <option >-------------------------------</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <span>トッピングの選択：</span>
                <span style={{textAlign:'right', fontSize:'5px'}}>１つにつきMサイズ：200円・Lサイズ：300円</span>
                    {state.Topping && state.Topping.map((row,index) => (
                        <ul style={{listStyle:'none', }} key={index}>
                        <li className='toppingNarabi'>                                                       
                            <input id={"tid" + index} type="checkbox" value={row.id} onChange={setTopping} checked={choiceTopping.includes(row.id)}/>
                            <label htmlFor={"tid" + index}>{GetItemById(row.id,state.Topping).name}</label>                            
                        </li>
                        </ul>
                        ))
                    }
            </div>


            <p></p>

                <p></p>                                          
                <Button variant="contained" onClick={checkValid} style={{ color: "#e0f2f1", backgroundColor: "teal", height:"55px" }}><ShoppingCartIcon />カートに追加</Button>             
            </div>
        </Card>
    )
}


export default ItemDetail