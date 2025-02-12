import { useEffect, useState } from "react"
import { RegisterPageCotainer } from "../registerPage/style"
import * as Yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SsoApi } from "../../services/api"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Toasttype } from "../../types/toasts"

const ResetPasswordPage = ({addMessage}: {addMessage: (message: Toasttype)=>void}) => {
    const navigate = useNavigate()

    const [seePassword, setSeePassword] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string | null>()

    const schema = Yup.object({
        password: Yup
        .string()
        .min(8, 'A senha deve possuir ao menos 8 caractéres')
        .matches(/[A-Z]/,'A senha deve conter ao menos uma letra maiúscula')
        .matches(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter ao menos um caractere especial')
        .matches(/[0-9]/, 'A senha deve conter ao menos um número')
        .test(
            'no-invalid-sequence',
            'A senha não pode começar com a sequência "#@#"',
            value => value ? !value.startsWith('#@#') : true
        )
        .required('Senha é obrigatória'),
        c_password: Yup.string().required('Confirme sua senha').oneOf([Yup.ref('password')], 'Os campos não coincidem'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const { email, token } = useParams()

    const onSubmit = (data: any) => {
        SsoApi.resetPassword(email?email:'', token?token:'', data.password)
        .then(()=>{
            window.location.href = sValue?sValue:'http://localhost:4200'
        })
        .catch(err=>{
            if (err.status === 400){
                setPasswordError('A senha não pode ser identica a anterior')
            }
            else if (err.status === 404){
                addMessage({message: 'Token inválido!', time: 3, type: 'error'})
            }
            else{
                addMessage({message: 'Erro interno!', time: 3, type: 'error'})
            }
        })
    }

    const [searchParams] = useSearchParams()
    const sValue = searchParams.get('s')

    useEffect(() => {
        SsoApi.verifyResetToken(email?email:'', token?token:'')
        .catch(err=>{
            if (err.status === 404){
                addMessage({message: 'Token inválido!', time: 3, type: 'error'})
            }
            else{
                addMessage({message: 'Erro interno!', time: 3, type: 'error'})
            }
            navigate('/', {state: sValue})
        })
    },[])

    return (
        <RegisterPageCotainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sua nova senha</h2>
                
                <div className="input-group">
                    <input type={seePassword?'text':'password'} placeholder="Sua nova senha"
                        {...register("password")}
                        onChange={()=>{
                            setPasswordError(null)
                        }}
                    />
                    {!passwordError && errors.password?<p>{errors.password.message}</p>:null}
                    {passwordError ? <p>{passwordError}</p>:null}
                </div>
                
                <div className="input-group">
                    <div className="see">
                        <input type={seePassword?'text':'password'} style={{width: '40vh'}} placeholder="Confirme sua nova senha"
                            {...register("c_password")}
                        />
                        <input type="checkbox" id="see-password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                setSeePassword(e.target.checked)
                            }}
                        />
                        <label htmlFor="see-password" title="Ver senha"/>
                    </div>

                    {errors.c_password?<p>{errors.c_password.message}</p>:null}
                </div>
                <button className="register">Mudar senha</button>
            </form>
        </RegisterPageCotainer>
    )
}
export default ResetPasswordPage