import * as React from 'react';
import type { VFC } from "react"
import 'react-redux'
import { StoreState, CoffeeState } from '../src/type/type'
import Link from 'next/link'


import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import SearchSharp from '@material-ui/icons/SearchSharp';
import { DefaultRootState, useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { resolveHref } from 'next/dist/shared/lib/router/router';

declare module 'react-redux' {
    interface DefaultRootState extends StoreState {}
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,      
    },
    imageList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));  

// interface Props {
//     testData: string
// }

const ItemView = () => {
    const state = useSelector((state: DefaultRootState ) => state)
    const dispatch = useDispatch();
    const [word, setWord] = useState<string>('')      
    const [search, setSearch] = useState<Array<CoffeeState>>([])
    const [searhResult, setSearchResult]  = useState<string>('商品を検索できます')
    const getToday = new Date()
    const now = { year: getToday.getFullYear(), month: getToday.getMonth() + 1, day: getToday.getDate(), hours: getToday.getHours()}
    const classes = useStyles();    
    const [testWeather, setTestWeather] = useState<string>('')

    const type=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setWord(e.target.value)
    }  
    const Kensaku=()=>{        
        let newSearched = state.Coffee.filter(val2 =>{
            return val2.coffee_name.includes(word)
        });

        newSearched.length === 0 ? 
            setSearchResult('検索結果がございませんでした') :
            setSearchResult(newSearched.length + '　件　商品がございます')

        if(word === '' || newSearched.length === 0){
            newSearched = state.Coffee.concat()
        }
                
        setSearch(newSearched)        
    }    

    const Kuria=()=>{
        setWord('')
    }

    const searchview={
        backgroundColor:'#cef6e5',
        margin:"50px",
        alignSelf: 'flex-end',
        maxWidth: "1000px"
    }  

    const timeSalePriceBefore = {
        textDecoration: "line-through"
    }

    const timeSalePriceAfter = {
        color: "red"
    }

    const stateCheck = async () => {              
        await new Promise((resolve, reject) => {
            axios.get('https://weather.tsukumijima.net/api/forecast',{
              params:{
                city:"130010"
              }
            }).then(res =>{
              // console.log(res)
              const weather = {
                  name:res.data.location.city,
                  date:res.data.forecasts[0].date,
                  detail:res.data.forecasts[0].detail.weather,
                  hai:res.data.forecasts[0].temperature.max.celsius,
                  row:res.data.forecasts[0].temperature.min.celsius,
                  img:res.data.forecasts[0].image.url
                }
                console.log(weather)
                setTestWeather(weather.detail)
                resolve(res.status)
              })  
        })  
    }

    useEffect(() => {
        // setSearch(state.Coffee)
    },[state.Coffee])

    return(
    <Paper>                
        <nav>
        <TableContainer>
            <Table stickyHeader={true} aria-label="sticky table">
                <TableHead>
{/* 検索 */}
                    <TableRow>
                        <TableCell style={searchview}>
                            <p>商品名　
                                <input type='search' value={word} onChange={type} id="box" maxLength={15} />
                            </p>
                        　　　　
                            <Button type='reset' onClick={Kuria}　style={{ color: "#e0f2f1", backgroundColor: "teal" }}>クリア</Button>&nbsp;
                            <Button style={{ color: "#e0f2f1", backgroundColor: "teal" }} variant="contained" type='submit' onClick={Kensaku} >検索<SearchSharp /></Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
{/* 一覧 */}
                <TableBody>
                    <TableRow>
                    <TableCell>
                    <div className={classes.root}>
                        <p>{testWeather}</p>
                        <Button onClick={stateCheck}>stateCheck</Button>
                        <ImageList rowHeight={240} className={classes.imageList}>
                            <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">{searhResult}</ListSubheader>
                            </ImageListItem>
                            {search.map((val3,index)=>{
                                return(
                                    <Link href={`/component/itemdetail/${val3.id}`} >
                                      <ImageListItem key={index}>
                                        <img src={`${window.location.origin}/${val3.image}`} width="100%" alt="商品" />
                                        <ImageListItemBar
                                            title={val3.coffee_name}
                                            subtitle={(
                                                <>
                                                  <div><span>【M】{val3.coffee_priceM}円(税抜)</span></div>
                                                  <div><span>【L】{val3.coffee_priceL}円(税抜)</span></div>
                                                </>
                                                )}
                                            actionIcon={
                                                <IconButton aria-label={`info about ${val3.coffee_name}`} className={classes.icon}>
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                      </ImageListItem>
                                    </Link>
                                )
                            })}
                        </ImageList>
                    </div>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </nav>
    </Paper>
    )}

ItemView.getInitialProps = async () => {
    let testData = ''
    await new Promise((resolve, reject) => {
        axios.get('https://weather.tsukumijima.net/api/forecast',{
          params:{
            city:"130010"
          }
        }).then(res =>{
          // console.log(res)
          const weather = {
              name:res.data.location.city,
              date:res.data.forecasts[0].date,
              detail:res.data.forecasts[0].detail.weather,
              hai:res.data.forecasts[0].temperature.max.celsius,
              row:res.data.forecasts[0].temperature.min.celsius,
              img:res.data.forecasts[0].image.url
            }
            console.log(weather)
            resolve(res.status)
          })  
    })        
    
    console.log('check');
    
    return { testData };
}

export default ItemView