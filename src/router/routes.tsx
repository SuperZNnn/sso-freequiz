import { Routes, Route } from "react-router-dom";
import InitialRedirect from "../pages/Initial";
import CallbackFor from "../pages/callbackfor";
import RegisterPage from "../pages/registerPage";
import { ToastsContainer } from "../components/toasts";
import { useState } from "react";
import { Toasttype } from "../types/toasts";
import ResetPasswordPage from "../pages/resetPassword";

const AppRoutes = () => {
    const [toastArray, setToastArray] = useState<Toasttype[]>([])

    const addMessage = (message:Toasttype) => {
        setToastArray([...toastArray, message])
    }

    return (
        <>
            <ToastsContainer messages={toastArray}/>

            <Routes>
                <Route path="/" element={<InitialRedirect addMessage={addMessage}/>}/>
                <Route path="/forgotpassword" element={<InitialRedirect addMessage={addMessage}/>}/>
                <Route path="/callbackfor/:url" element={<CallbackFor/>}/>
                <Route path="/register" element={<RegisterPage addMessage={addMessage}/>}/>
                <Route path="/resetpassword/:email/:token" element={<ResetPasswordPage addMessage={addMessage}/>}/>
            </Routes>
        </>
        
    )
}
export default AppRoutes