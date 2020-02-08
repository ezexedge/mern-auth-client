import React , {useState} from 'react';
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = ({history}) => {

    const [values,setValues] = useState({
       
        email : "",

        buttonText: "request password reset link"
    })
    const {email,buttonText} = values

    const handleChange = (name) => (event) => {

        setValues({...values,[name]:event.target.value})
        

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/forgot-password`,
            data: {email}
        })
        .then(response => {
            console.log("Forgot success",response)
            //guardamos las respuesta que esta el token y el usuario en el 
            //localstore y la cookie
               //toast.success(`ey gracias por ingresar ${response.data.user.name} bienvenido`)
               toast.success(response.data.message)
            setValues({...values , buttonText : 'Requested'})


          
        })

        .catch(error => {
            console.log('Forgot error',error.response.data)
            setValues({...values,buttonText:  "request password reset link"})
            toast.error(error.response.data.error)
        })

    }

    const ForgotForm = () => (
        <form>
           

            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
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
    
            <h1>Forgot</h1>
            {ForgotForm()}
            </div>
        </Layout>
     );
}
 
export default Forgot;