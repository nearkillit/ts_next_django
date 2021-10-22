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

type submit ={
    email: string;
    password1: string;
    password2: string;
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

const Signup = () => {
  const classes = useStyles();

  const router = useRouter()

  const {register,handleSubmit,formState: {errors}} = useForm()
  const onSubmit = (data: submit) => {
      if(data.password1 !== data.password2){
          alert("入力されたパスワードが異なります")
      } else {
          axios.post('http://localhost:8000/api/rest-auth/registration/',{
          email: data.email,
          password1: data.password1,
          password2: data.password2
      })
      .then(() => {
          alert('新規登録が完了しました。ログイン画面よりログインしてください。')
          router.push('/component/Login/')
      })
      .catch(err => {
          alert('パスワードは8文字以上必要です。')
      })
      }
  }

  return (
    <>
    <h1>新規登録</h1>
    <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="会員登録" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              {...register("email", {required: true, pattern:/^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/})}
            />

            <TextField
              fullWidth
              id="password1"
              type="password"
              label="Password(8文字以上)"
              placeholder="Password(8文字以上)"
              margin="normal"
              {...register("password1", {required: true})}
            />
            <TextField
              fullWidth
              id="password2"
              type="password"
              label="Password再入力"
              placeholder="Password再入力"
              margin="normal"
              {...register("password2", {required: true})}
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
            SignUp
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
  );
}

export default Signup;