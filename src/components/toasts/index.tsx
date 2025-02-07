import React, { useEffect, useRef, useState } from "react"
import { ToastContainerStyle } from "./style"
import { Toasttype } from "../../types/toasts"

export const ToastsContainer = ({messages}: {messages: Toasttype[]}) => {
    return (
        <ToastContainerStyle>
            {messages.map((message, index) => (
                <Toast
                key={index}
                message={message.message}
                type={message.type}
                time={message.time}
                />
            ))}
        </ToastContainerStyle>
    )
}
export const Toast = ({type,message,time}: Toasttype) => {
    const [hideAnim, setHideAnim] = useState<boolean>(false)
    const toastRef = useRef<HTMLDivElement>(null)

    const toastRemover = () => {
        setHideAnim(true)
        setTimeout(() => {
            setHideAnim(false)
            if (toastRef.current) {
                toastRef.current.remove();
            }
        }, 500)
    }

    useEffect(() => {
        setTimeout(() => {
            setHideAnim(true)
            setTimeout(() => {
                setHideAnim(false)
                if (toastRef.current) {
                    toastRef.current.remove();
                }
            }, 500)
        }, time*1000)
    })

    return (
        <div className={`toast ${hideAnim ? 'hide':''}`}
            style={{backgroundColor: `${type === 'success' ? '#008000':''}${type==='error'? '#800000':''}${type==='warn'?'#808000':''}`}}
            ref={toastRef}
        >
            <button onClick={() => {toastRemover()}}>X</button>
            <p dangerouslySetInnerHTML={{ __html: message }}></p>
            <div className="load-bar">
                <div className="load" style={{"--time":`${time}s`} as React.CSSProperties}/>
            </div>
        </div>
    )
}