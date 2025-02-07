import axios from "axios";

export const ApiPrefix = 'http://localhost:3000'

export class SsoApi {
    static async getCode (email: string) {
        try{
            const response = await axios.post(`${ApiPrefix}/sso/createRegisterCode`, {email: email})
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

            const response = await axios.post(`${ApiPrefix}/sso/verifyCode/${code}`, payload)
            return response
        }
        catch (err){
            throw err
        }
    }
}