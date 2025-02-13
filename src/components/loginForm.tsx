import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SsoApi } from "../services/api";
import { useState } from "react";
import { Toasttype } from "../types/toasts";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const LoginForm = ({addMessage}: {addMessage: (message: Toasttype)=>void}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [sendButtonState, setSendButtonState] = useState<boolean>(true)
    
    const schema = Yup.object({
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        password: Yup.string().required('Senha é obrigatória'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data:any) => {
        setSendButtonState(false)

        SsoApi.tryLogin(data.email, data.password)
        .then(()=>{
            window.location.href = location.state
            setSendButtonState(true)
        })
        .catch(err=>{
            if (err.status === 401){
                addMessage({message: 'Senha incorreta!', time: 3, type: 'error'})
            }
            else if (err.status === 404){
                addMessage({message: 'Usuário não encontrado!', time: 3, type: 'error'})
            }
            else{
                console.log(err)
                addMessage({message: 'Erro interno, tente novamente', time: 3, type: 'error'})
            }
            setSendButtonState(true)
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Faça Login</h4>

            <div className="inputs-container">
                <input
                    placeholder="E-mail"
                    {...register("email")}
                />
                {errors.email?<p className="error-message">{errors.email.message}</p>:<p className="error-message"></p>}
                <input
                    placeholder="Senha"
                    {...register("password")}
                    type="password"
                />
                {errors.password?<p className="error-message">{errors.password.message}</p>:<p className="error-message"></p>}

                <h3 onClick={() => {
                    navigate('/forgotpassword', {state: location.state})
                }}>Esqueceu a senha?</h3>

                <div className="buttons-container">
                    <button disabled={!sendButtonState}>Fazer Login</button>
                    <button type="button" onClick={() => {
                        navigate('/register', {state: location.state})
                    }}>Registrar-se</button>
                </div>
            </div>
            <button className="login-with-google" type="button"
                onClick={() => {
                    signInWithPopup(auth,googleProvider)
                    .then(res=>{
                        if (typeof res.user === 'object' && 'accessToken' in res.user){
                            SsoApi.firebaseLogin(res.user.accessToken as string)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }}
            >Login Firebase Google</button>
        </form>
        
    )
}
export default LoginForm