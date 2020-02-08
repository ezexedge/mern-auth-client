import React , {useState} from 'react';
import {Link , Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {authenticate,isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify'
import Google from './Google'
import Facebook from './Facebook'
import 'react-toastify/dist/ReactToastify.min.css'

const Signin = ({history}) => {

    const [values,setValues] = useState({
       
        email : "",
        password: "",
        buttonText: "submit"
    })
    const {email,password,buttonText} = values

    const handleChange = (name) => (event) => {

        setValues({...values,[name]:event.target.value})
        

    }

    const informParent = response => {
          authenticate(response, ()=>{
                //toast.success(`ey gracias por ingresar ${response.data.user.name} bienvenido`)
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })
    }

    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signin`,
            data: {email,password}
        })
        .then(response => {
            console.log("signin success",response)
            //guardamos las respuesta que esta el token y el usuario en el 
            //localstore y la cookie
            authenticate(response, ()=>{
                setValues({...values, name : " ",email: " ",password : " ", buttonText: "submited"})
                //toast.success(`ey gracias por ingresar ${response.data.user.name} bienvenido`)
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })
          
        })

        .catch(error => {
            console.log('signin error',error.response.data)
            setValues({...values,buttonText: "submit"})
            toast.error(error.response.data.error)
        })

    }

    const signinForm = () => (
        <form>
           

            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
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
         {isAuth()?<Redirect to="/" /> : null}
            <h1>signin</h1>
            <Google informParent={informParent} />
            <Facebook informParent={informParent} />

            {signinForm()}
            <br/>
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">forgot password</Link>
            </div>
        </Layout>
     );
}
 
export default Signin;