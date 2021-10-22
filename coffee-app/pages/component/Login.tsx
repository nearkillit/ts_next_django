import { useState } from 'react'
import { useForm } from 'react-hook-form'
import  Link  from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

type submit = {
    email: string;
    password: string
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#7d94d1',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const Login = () => {
  const classes = useStyles();

  const router = useRouter()

  const {register,handleSubmit} = useForm()
  const onSubmit = (data: submit) => {
      console.log(data)
      axios.post('http://localhost:8000/api/rest-auth/login/',{
          email: data.email,
          password: data.password,
      })
      .then(res => {
          console.log(res.data)
          router.push('/')
      }) 
      .catch(err => {
          alert("入力されたEmailもしくはパスワードが異なります")
      })
  }


  return (
    <>
    <h1>ログイン</h1>
    <div>会員登録は <Link href="/component/Signup/"><a>こちらから</a></Link></div>
    <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              {...register("email", {required: true})}
            />

            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              {...register("password", {required: true})}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            type="submit"
           >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
  );
}

export default Login;