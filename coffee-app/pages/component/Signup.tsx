import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'

type submit ={
    email: string;
    password1: string;
    password2: string;
}

const Signup = () => {

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
            alert('ログイン画面に戻ります')
            router.push('/component/Login/')
        })
        }
    }

    return (
        <div>
            <h1>新規会員登録</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <th>メールアドレス:</th>
                            <td>
                                <input {...register("email", {required: true, pattern:/^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/})} />
                                <div>{errors.email && "正しい形式でメールアドレスを入力してください"}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>パスワード:</th>
                            <td>
                                <input {...register("password1", {required: true})} type="password"/>
                                <div>{errors.password1 && "パスワードを入力してください"}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>パスワード再入力:</th>
                            <td>
                                <input {...register("password2", {required: true})} type="password"/>
                                <div>{errors.password2 && "もう一度パスワードを入力してください"}</div>
                            </td>

                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="新規登録"/>
            </form>

        </div>
    )
}

export default Signup
