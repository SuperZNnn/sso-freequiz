import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { FormContainer } from "./style"
import LoginForm from "../../components/loginForm"
import ForgotPasswordForm from "../../components/forgotpasswordForm"
import { Toasttype } from "../../types/toasts"

const InitialRedirect = ({addMessage}: {addMessage: (message: Toasttype)=>void}) => {
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
                        <ForgotPasswordForm addMessage={addMessage} backurl={location.state}/>
                    </div>
                </section>
            </FormContainer>
            :<pre>Carregando...</pre>}
        </>
    )
}
export default InitialRedirect