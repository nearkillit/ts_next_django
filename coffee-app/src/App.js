import './App.css';
import { newCart } from './store/index';
// firebase
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
// react
import { 
  Switch,
  Route,  
  useHistory
  // useParams,  
} from 'react-router-dom'
import Cart from './views/Cart.tsx'
import ItemDetail from './views/ItemDetail.tsx'
import ItemView from './views/ItemView.tsx'
import OrderConfirm from './views/OrderConfirm.tsx'
import OrderFinish from './views/OrderFinish.tsx'
import OrderHistory from './views/OrderHistory.tsx'
import Administrator from './views/Administrator.tsx'
import './store/index'
import { GetDiscountByCoupon } from './components/Items'

// material ui
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import React, { useState,useEffect } from "react";
import { AppBar } from "@material-ui/core";
// material ui icon
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
// import CheckIcon from '@material-ui/icons/Check';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

//material ui wether
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';


// axios
import axios from 'axios'

function HistoryApp(props){
  const history = useHistory();
  const handleLink = path => history.push(path)
  const whiteMoji = {
    color: "white"
  }
  let newDOM = ''
  
  if(props.tag === 'img') newDOM = ( <img src={props.context} alt="ロゴ" onClick={() => handleLink(props.link)} > </img> )
  if(props.tag === 'button') newDOM = ( <Button style={whiteMoji} onClick={() => handleLink(props.link)}>{props.icon}{props.name}</Button> )
  if(props.tag === 'button_img') newDOM = ( <Button style={whiteMoji} onClick={() => handleLink(props.link)}><img src={props.context} alt="ロゴ" ></img></Button> )

  return (
    <>
    {newDOM}
    </>
  )
}

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const history = useHistory();
  const handleLink = path => history.push(path)     

  let [wetherSet,setWetherSet] = useState("")
  const [ getTS, setGetTS ] = useState(false)

  const login = () => {        
    const google_auth_provider = new firebase.auth.GoogleAuthProvider();        
    firebase.auth().signInWithRedirect(google_auth_provider)                                   
  } 

  const logout = () => {                
    firebase.auth().signOut().then( () => {        
      dispatch({ type: 'UPDATE_USER', payload: { user: {}}})
      handleLink('/')
    })
  }

  const check = () => {                    
    console.log(state);       
  }
  // 必ず fetchItems内で行う
  const fetchTimeSaleByCoffee = () => { 
    //　タイムセール商品の期限切れの削除
    const deadTimeSaleItem = state.TimeSale.filter( t => {            
      const getDeadLine = new Date(t.deadline)
      const diff = getDeadLine - new Date()         
      return diff >= 0
    })      

    const Coffee = state.Coffee.map( c => {
      const getTimeSale = deadTimeSaleItem.filter( t => c.id == t.Itemid )      
      if(getTimeSale[0]){        
        c.discount = GetDiscountByCoupon(getTimeSale[0].couponCode, state.Coupon)
        c.couponCode = getTimeSale[0].couponCode
      }
      return c      
    })     
    dispatch({ type: 'FETCH_ITEM', payload: { Items:{ Coffee } }})    
    firebase.firestore()
            .collection(`Items`)
            .doc('TimeSale')
            .set({ TimeSale: deadTimeSaleItem }) 
            .then( querySnapshot => {                                                            
              dispatch({ type: 'FETCH_ITEM', payload: { Items:{ TimeSale: deadTimeSaleItem } }})              
            })   
    setGetTS(true)    
  }      

  const fetchItems = () => {    
    firebase.firestore()
            .collection(`Items`)
            .get()
            .then( querySnapshot => {
              querySnapshot.forEach( doc => {                                
                dispatch({ type: 'FETCH_ITEM', payload: { Items: doc.data() }})                                  
              })                                                 
            })    
  }
  
  const fetchCarts = async () => {         
    const setCart = Object.assign({},newCart)
    let cartUid = ''

    // 途中ログインの場合
    if(localStorage.getItem('middle_login')){      
      const newCartItemList = JSON.parse(localStorage.getItem('cart')).cartItemList      
      setCart.cartItemList = newCartItemList            
    }  
    
    await firebase.firestore()
            .collection(`users/${state.user.uid}/carts`)
            .get()
            .then( querySnapshot => {                            
              if(querySnapshot.empty){
                  createCarts(setCart);
              }else{
                querySnapshot.forEach( doc => {
                  let cartMergeUid = doc.data()
                  cartMergeUid.uid = doc.id
                  cartUid = doc.id
                  if(doc.data().status === 0) dispatch({ type: 'FETCH_CART', payload: { cart: cartMergeUid }}) 
                  if(doc.data().status !== 0) dispatch({ type: 'FETCH_ORDERHISTORY', payload: { orderhistory: doc.data(), uid: doc.id }})
                })                        
              }              
            })
        
      //　途中ログイン処理
      if(localStorage.getItem('middle_login')){
        localStorage.removeItem('middle_login');
        updateCart(setCart, cartUid)
        handleLink('/orderconfirm')
      }                     
    }      

  const start = () => {       
    const auth = getAuth(); 
    onAuthStateChanged(auth, ( user => {      
      if(user){                         
        dispatch({ type: 'UPDATE_USER', payload: { user }})
      }                         
    }))
  }

  const updateCart = (setCart, cuid) => {    
    const newCarts = Object.assign({},setCart)
    newCarts.uid = cuid
    firebase.firestore()
            .collection(`users/${state.user.uid}/carts`)
            .doc(cuid)
            .update(setCart)
            .then( querySnapshot => {                                                            
              dispatch({ type: 'UPDATE_CART', payload: { cart: newCarts }})              
            })   
  }

  const createCarts = (createCart) => {    
    firebase.firestore()
            .collection(`users/${state.user.uid}/carts`)                     
            .add(createCart)          
            .then( d => {
              const newCarts = Object.assign({},createCart)
              newCarts.uid = d.id
              dispatch({ type:'CREATE_CART', payload:{ cart: newCarts }})                 
            }) 
  } 



  const getWether = () =>{
    axios.get('https://weather.tsukumijima.net/api/forecast',{
      params:{
        city:"130010"
      }
    }).then(res =>{
      // console.log(res)
      const wether = {
          name:res.data.location.city,
          date:res.data.forecasts[0].date,
          detail:res.data.forecasts[0].detail.weather,
          hai:res.data.forecasts[0].temperature.max.celsius,
          row:res.data.forecasts[0].temperature.min.celsius,
          img:res.data.forecasts[0].image.url
        }
        setWetherSet(wether)
      })
    }    

  useEffect(()=>{
    if(state.user && state.user.uid){                  
      fetchCarts();
      console.log("user uid = " + state.user.uid);
    }  
  },[state.user])  

  useEffect(()=> {
    if(state.Coupon.length !== 0 && state.TimeSale[0] && !getTS ){
      fetchTimeSaleByCoffee()
    }    
  },[ state.Coupon, state.TimeSale])  

  useEffect(() => {        
    start()
    fetchItems()
    getWether()  
  },[])  

  const userStyle = {
    display: 'inline',
    width: "10%",
    fontSize: "3px"
  }

  const userNameStyle = {
    margin: '1%', 
    fontSize: "6px"
  }

  const imgStyle = {
    display: 'block',
    width: '3%',
    height: '3%',
    marginTop: "0.6%"
  }  
  
  const weatherStyle =  {
    display: "flex",
    width: "25%",
    height: "40%",
  }

  const weatherMarkStyle =  {
    display: "inline",
    width: "30%",      
    fontSize: "7px",    
  }

  const weatherMathStyle =  {
    display: "inline",
    width: "70%",   
    fontSize: "3px",
    textAlign: "left",
    padding: "0px"
  }

  const whiteMoji = {
    color: "white"
  }

  return (
    <div className="App">
      <AppBar>
      <div className='App-header1'>
        <HistoryApp tag='button_img' link='/' context={`${process.env.PUBLIC_URL}/header_logo.png`}  />        
      </div>

        <span className='App-header2' >
        <div style={weatherStyle}>
          <div style={weatherMarkStyle}>
            <span>今日の天気</span>
            <img src={wetherSet.img} width="90%" className="weatherIcon"/>
          </div>          
          <div style={weatherMathStyle}>
            <p width="100%">最高気温：{wetherSet.hai || "--"}</p>
            <p width="100%">最低気温：{wetherSet.row || "--"}</p>
            <p style={{fontSize:'2px'}}>（{wetherSet.date}の{wetherSet.name}）　</p>
          </div>
        </div> 
        { state.user && state.user.displayName ? 
        <>          
          <div style={userStyle}>
            <p>ユーザー名：</p>
            <p style={userNameStyle}>{state.user.displayName}</p>
            </div>  
          <img src={state.user.photoURL} style={imgStyle} alt="ユーザー"/>
          <Button onClick={logout} style={whiteMoji}><LockIcon />ログアウト</Button>                  
        </>          
        :
        <Button onClick={login} style={whiteMoji}><LockOpenIcon />ログイン</Button>
        }          
        {/* <Button onClick={check}>チェック</Button>         */}
        <HistoryApp tag='button' link='/cart' icon={<ShoppingCartIcon />} name='カート'/>
        <HistoryApp tag='button' link='/orderhistory' icon={<HistoryIcon />} name='注文履歴'/>  
        {(state.user.uid === "oD7bRul05kcE0Ez2oQfH01PKv073" || state.user.uid === "zjoltJkfYMMTpJv9zbK7xXTvLdH3" ) && <HistoryApp tag='button' link='/administrator' icon={<SupervisorAccountIcon />} name='※管理者画面'/>}
        </span> 
      </AppBar>               
            <div>                
                <Switch>
                    <Route path='/' exact component={ItemView} />
                    <Route path='/cart' exact component={Cart} />
                    <Route path='/itemdetail/:Item_id' exact component={ItemDetail} />
                    <Route path='/orderconfirm' exact component={OrderConfirm} />
                    <Route path='/orderfinish' exact component={OrderFinish} />
                    <Route path='/orderhistory' exact component={OrderHistory} />  
                    <Route path='/administrator' exact component={Administrator} />                                              
                    <Route>
                        <p>Not found</p>
                    </Route>
                </Switch>
            </div>
    </div>
  );
}

export default App;
