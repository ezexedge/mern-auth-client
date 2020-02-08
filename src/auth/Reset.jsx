import React , {useState , useEffect} from 'react';
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({match}) => {

    const [values,setValues] = useState({
       
        email : "",
        token : "",
        newPassword : "",
        buttonText: "reset password"
    })

    useEffect (()=> {
        let token = match.params.token
        let {name} = jwt.decode(token)

        if(token){
            setValues({...values , name , token})
        }

    },[])

    const {name , token ,newPassword,buttonText} = values

    const handleChange =  event => {

        setValues({...values,newPassword:event.target.value})
        

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/reset-password`,
            data: {newPassword , resetPasswordLink : token}
        })
        .then(response => {
            console.log("Reset success",response)
            //guardamos las respuesta que esta el token y el usuario en el 
            //localstore y la cookie
               //toast.success(`ey gracias por ingresar ${response.data.user.name} bienvenido`)
               toast.success(response.data.message)
            setValues({...values , buttonText : 'Done'})


          
        })

        .catch(error => {
            console.log('Reset error',error.response.data)
            setValues({...values,buttonText:  "RESET password"})
            toast.error(error.response.data.error)
        })

    }

    const ResetForm = () => (
        <form>
           

            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange} value={newPassword} type="password" className="form-control"
                placeholder="type new password"
                required
                />
            </div>

           
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    )
    return ( 
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
    
    <h1>hola {name} escribe tu nuevo password</h1>
            {ResetForm()}
            </div>
        </Layout>
     );
}
 
export default Reset;