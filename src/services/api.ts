import axios from "axios";

export const ApiPrefix = 'http://localhost:3000'

export class SsoApi {
    static async getCode (email: string, name: string) {
        try{
            const response = await axios.post(`${ApiPrefix}/sso/createRegisterCode`, {email: email, name: name})
            return response
        }
        catch (err){
            throw err
        }
    }
    static async testCode (email: string, code: string, name: string, password: string){
        try{
            const payload = {
                email,
                password,
                name
            }

            const response = await axios.post(`${ApiPrefix}/sso/verifyCode/${code}`, payload, { withCredentials: true })
            return response
        }
        catch (err){
            throw err
        }
    }

    static async tryLogin (email: string, password: string){
        try{
            const payload = {
                email,
                password
            }

            const response = await axios.post(`${ApiPrefix}/sso/trylogin`, payload, { withCredentials: true })
            return response
        }
        catch (err){
            throw err
        }
    }

    static async teste (){
        try{
            const response = await axios.get(`${ApiPrefix}/sso/verifySession`, { withCredentials:true })
            console.log(response)
        }
        catch (err){
            console.log(err)
        }
    }

    static async sendEmailResetPassword (email: string, callback: string){
        try{
            const response = await axios.post(`${ApiPrefix}/sso/sendResetPasswordEmail/${callback}`, {email: email})
            return response
        }
        catch (err){
            throw err
        }
    }
}