import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SsoApi } from "../services/api";
import { useState } from "react";
import { Toasttype } from "../types/toasts";

const ForgotPasswordForm = ({addMessage, backurl}: {backurl: string ,addMessage: (message: Toasttype) => void}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const schema = Yup.object({
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [sendButtonStatus, setSendButtonStatus] = useState<boolean>(true)

    const onSubmit = (data: any) => {
        setSendButtonStatus(false)

        SsoApi.sendEmailResetPassword(data.email,backurl)
        .then(res => {
            if (res.status === 200){
                addMessage({message: 'E-mail enviado!', time: 3, type:'success'})
            }
            setSendButtonStatus(true)
        })
        .catch(err => {
            if (err.status === 401){
                addMessage({message: 'E-mail já enviado!', time: 3, type: 'warn'})
            }
            else if (err.status === 404){
                addMessage({message: 'Usuário não encontrado!', time: 3, type: 'error'})
            }
            else {
                addMessage({message: 'Erro inesperado, tente novamente!', time: 3, type: 'error'})
            }

            setSendButtonStatus(true)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Esqueci minha senha</h4>

            <div className="inputs-container">
                <input
                    placeholder="E-mail"
                    {...register("email")}
                />
                {errors.email ? <p className="error-message" style={{transform: 'translate(0,-7vh)'}}>{errors.email.message}</p>:<p className="error-message" style={{transform: 'translate(0,-7vh)'}}></p>}

                <div className="buttons-container">
                    <button disabled={!sendButtonStatus}>Recuperar senha</button>
                    <button type="button" onClick={() => {
                        navigate('/', {state: location.state})
                    }}>Fazer Login</button>
                </div>
                
            </div>

            
        </form>
    )
}
export default ForgotPasswordForm