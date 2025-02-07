import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const ForgotPasswordForm = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const schema = Yup.object({
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data)
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
                    <button>Recuperar senha</button>
                    <button type="button" onClick={() => {
                        navigate('/', {state: location.state})
                    }}>Fazer Login</button>
                </div>
                
            </div>

            
        </form>
    )
}
export default ForgotPasswordForm