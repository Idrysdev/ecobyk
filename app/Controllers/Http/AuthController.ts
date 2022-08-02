// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Response } from "@adonisjs/core/build/standalone";
import {schema , rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {

    public async register({request , response}){
        const validations = await schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({table: 'users' , column: 'email'})    
            ]),
            password: schema.string({} , [
                rules.confirmed()
            ]), 
    
    })
    const data = await request.validate({schema:validations,
         messages:{
            'email.email': "Le champs téléphone est obligatoire (sans indicatif)",
            'email.unique': "Le champs email est obligatoire et unique",
            'password_confirmation.confirmed': "Vous dévez confirmer votre mot de passe",
    }})
    const user = await User.create(data)
    return response.send({
        "status": "success",
        "message":"Votre inscription été validé !",
        "user" : user
    })



}

public async login({request ,response, auth}){
    const email = request.input('email')
    const password = request.input('password')
    const user =  await auth.use('api').attempt(email, password)
    return response.send({
        'sucess':"Conneced !" ,
        'user':user
    })
    

}









}
