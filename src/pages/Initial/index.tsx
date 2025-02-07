import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { FormContainer } from "./style"
import LoginForm from "../../components/loginForm"
import ForgotPasswordForm from "../../components/forgotpasswordForm"

const InitialRedirect = () => {
    const location = useLocation()

    useEffect(()=>{
        if (!location.state){
            window.location.href = 'http://localhost:4200'
        }
    },[])

    return (
        <>
            {location.state?<FormContainer>
                <section>
                    <div className="scroll" style={{transform: `${location.pathname==='/forgotpassword'?'translate(0,-70vh)':''}`}}>
                        <LoginForm/>
                        <ForgotPasswordForm/>
                    </div>
                </section>
            </FormContainer>
            :<pre>Carregando...</pre>}
        </>
    )
}
export default InitialRedirect