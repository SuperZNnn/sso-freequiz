import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SsoApi } from "../services/api";

const LoginForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const schema = Yup.object({
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        password: Yup.string().required('Senha é obrigatória'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data:any) => {
        SsoApi.tryLogin(data.email, data.password)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
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
                    <button>Fazer Login</button>
                    <button type="button" onClick={() => {
                        navigate('/register', {state: location.state})
                    }}>Registrar-se</button>
                </div>
            </div>

            
        </form>
    )
}
export default LoginForm