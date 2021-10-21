// ts
import * as React from 'react';
import type { VFC } from "react"
import 'react-redux'
import { StoreState } from '../../src/type/type'
import Link from 'next/link'

import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import { DefaultRootState, useSelector } from "react-redux";

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

const OrderFinish: VFC = () => {
  const state = useSelector((state: DefaultRootState ) => state)

    return (
        <div>
          <Grid container alignItems="center" >
             <Grid item xs={8}>
               <Card>
                <h1>決済が完了しました！</h1>
                <p>この度はご注文ありがとうございます。</p>
                <p>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</p>
                {/* {receiptPDF !== '' && <p><a href={receiptPDF}>領収書を表示</a></p>}                 */}
                  <Link href="/" >
                    <Button
                            variant="contained"
                            color="primary"                    
                            >
                            トップ画面を表示する
                    </Button>
                  </Link>
                 </Card>
             </Grid>   
          </Grid>
        </div>        
    )
}

export default OrderFinish