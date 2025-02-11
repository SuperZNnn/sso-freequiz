import { useEffect } from "react"
import { SsoApi } from "../../services/api"

const TestePage = () => {
    useEffect(()=>{
        SsoApi.teste()
    },[])

    return (<>

    </>)
}
export default TestePage