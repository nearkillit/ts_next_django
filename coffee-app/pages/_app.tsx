// react
import Link from 'next/link'
import { useDispatch, useSelector, DefaultRootState } from "react-redux";
import React, { useState, useEffect } from "react";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store/createStore';
import { StoreState } from '../src/type/type'
import { UPDATE_USER } from '../src/store/slice/slice'

// material ui
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { AppBar } from "@material-ui/core";
// material ui icon
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';

// axios
import axios from 'axios'

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

function HistoryApp(props){  
  const whiteMoji = {
    color: "white"
  }
  let newDOM = (<> </>)
  
  if(props.tag === 'img') newDOM = ( <img src={props.context} alt="ロゴ" > </img> )
  if(props.tag === 'button') newDOM = ( <Link href={props.link}><Button style={whiteMoji}>{props.icon}{props.name}</Button></Link> )
  if(props.tag === 'button_img') newDOM = ( <Link href={props.link}><Button style={whiteMoji}><img src={props.context} alt="ロゴ" ></img></Button></Link> )

  return (
    <>
    {newDOM}
    </>
  )
}

const UserCheck = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: DefaultRootState) => state);

  const user = state.user.user
  console.log(user)

  const logout = () => {
    dispatch(UPDATE_USER({}))
  }  

  const userStyle = {
    display: 'inline',
    width: "10%",
    fontSize: "3px"
  }

  const userNameStyle = {
    margin: '1%', 
    fontSize: "6px"
  }

  const whiteMoji = {
    color: "white"
  }

  return (
    <>
     { user && user.token  ? 
              <>          
                <div style={userStyle}>
                  <p>ユーザー名：</p>
                  <p style={userNameStyle}>{user.user.email}</p>
                </div>                  
                <Button onClick={logout} style={whiteMoji}><LockIcon />ログアウト</Button>                  
              </>          
              :
              <Link href="/component/Login/"><a><Button style={whiteMoji}><LockOpenIcon />ログイン</Button></a></Link>
            }   
    </>                
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <div className="App">        
        <AppBar>          
          {/* <div className='App-header1'>
            <HistoryApp tag='button_img' link='/' context={`/header_logo.png`}  />        
          </div> */}
          <span className='App-header2' >
            <UserCheck />
            <HistoryApp tag='button' link='/cart' icon={<ShoppingCartIcon />} name='カート'/>
            <HistoryApp tag='button' link='/orderhistory' icon={<HistoryIcon />} name='注文履歴'/>           
          </span> 
        </AppBar>               
      </div>
      <CssBaseline />
      <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;