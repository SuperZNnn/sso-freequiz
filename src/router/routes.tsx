import { Routes, Route } from "react-router-dom";
import InitialRedirect from "../pages/Initial";
import CallbackFor from "../pages/callbackfor";
import RegisterPage from "../pages/registerPage";
import { ToastsContainer } from "../components/toasts";
import { useState } from "react";
import { Toasttype } from "../types/toasts";

const AppRoutes = () => {
    const [toastArray, setToastArray] = useState<Toasttype[]>([])

    const addMessage = (message:Toasttype) => {
        setToastArray([...toastArray, message])
    }

    return (
        <>
            <ToastsContainer messages={toastArray}/>

            <Routes>
                <Route path="/" element={<InitialRedirect/>}/>
                <Route path="/forgotpassword" element={<InitialRedirect/>}/>
                <Route path="/callbackfor/:url" element={<CallbackFor/>}/>
                <Route path="/register" element={<RegisterPage addMessage={addMessage}/>}/>
            </Routes>
        </>
        
    )
}
export default AppRoutes