import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const CallbackFor = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/', {state: params.url})
    }, [])

    return(
        <pre>Carregando...</pre>
    )
}
export default CallbackFor