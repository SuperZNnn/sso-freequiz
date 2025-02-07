import { useEffect, useState } from "react"
import { RegisterPageCotainer } from "./style"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SsoApi } from "../../services/api";
import { Toasttype } from "../../types/toasts";

const RegisterPage = ({addMessage}: {addMessage: (message:Toasttype) => void}) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    
    const [codeError, setCodeError] = useState<string | null>()
    const [emailError, setEmailError] = useState<string  | null>()

    useEffect(()=>{
        if (!location.state){
            window.location.href = 'http://localhost:4200'
        }
    },[])


    const schema = Yup.object({
        name: Yup.string().required('Obrigatório'),
        email: Yup.string().email('E-mail invlálido').required('Obrigatório'),
        code: Yup.string().required('Obrigatório'),
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
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        SsoApi.testCode(data.email, data.code, data.name, data.password)
        .then(res=>{
            if (res?.status === 201){
                addMessage({message: 'Usuário cadastrado com sucesso', type: 'success', time: 5})
                setCodeError(null)
            }
        })
        .catch(err=>{
            if (err?.status === 404){
                setCodeError('Código inválido')
            }
            else if (err?.status === 401){
                addMessage({message: 'E-mail já cadastrado!',time: 3,type:'error'})
            }
        })
    }

    return (
        <RegisterPageCotainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Registre-se</h2>

                <div className="input-group">
                    <input type="text" placeholder="Nome"
                        {...register("name")}
                    />
                    {errors.name?<p>{errors.name.message}</p>:null}
                </div>
                <div className="input-group">
                    <input type="text" placeholder="E-mail" id="email-input"
                        {...register("email")}
                        onChange={() => {
                            setEmailError(null)
                        }}
                    />
                    {errors.email && !emailError?<p>{errors.email.message}</p>:null}
                    {emailError?<p>{emailError}</p>:null}
                </div>
                <div className="input-group">
                    <div className="code-confirm">
                        <input type="text" placeholder="Código" className="half" id="code-input" 
                            {...register("code")}
                        />
                        
                        <button type="button" className="half"
                            onClick={async () => {
                                const isValid = await trigger("email")

                                if (isValid){
                                    const input = document.querySelector<HTMLInputElement>("#email-input")
                                    if (input){
                                        SsoApi.getCode(input.value)
                                        .then((data)=>{
                                            console.log(data)

                                            if (data?.status === 201){
                                                addMessage({message: 'Código enviado para o seu E-mail',time:3,type:'success'})
                                            }
                                            else if (data?.status === 200){
                                                addMessage({message: 'Já existe um código no seu E-mail',time:3,type:'warn'})
                                            }
                                            
                                        })
                                        .catch(err=>{
                                            

                                            if (err?.status === 401){
                                                addMessage({message: 'E-mail já cadastrado!',time: 3,type:'error'})
                                            }
                                        })
                                    }
                                }
                                else{
                                    setEmailError('Insira um E-mail válido')
                                    document.querySelector<HTMLInputElement>("#email-input")?.focus()
                                }
                            }}
                        >Enviar Código</button>
                    </div>
                    {!codeError&&errors.code?<p>{errors.code.message}</p>:null}
                    {codeError?<p>{codeError}</p>:null}
                </div>

                <div className="input-group">
                    <input type={showPassword?'text':'password'} placeholder="Senha"
                        {...register("password")}
                    />
                    {errors.password?<p>{errors.password.message}</p>:null}
                </div>

                <div className="input-group">
                    <div className="see">
                        <input type={showPassword?'text':'password'} placeholder="Confirme sua Senha" style={{width: '40vh'}}
                            {...register("c_password")}
                        />
                        
                        <input type="checkbox" id="see-password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                setShowPassword(e.target.checked)
                            }}
                        />
                        <label htmlFor="see-password" title="Ver senha"/>
                    </div>
                    {errors.c_password?<p>{errors.c_password.message}</p>:null}
                </div>
                

                <h3
                    onClick={()=>{
                        navigate('/', {state: location.state})
                    }}
                >Já possui uma conta? <span>Faça login</span></h3>
                <button className="register" onClick={() => {

                }}>Registrar</button>
            </form>
        </RegisterPageCotainer> 
    )
}
export default RegisterPage