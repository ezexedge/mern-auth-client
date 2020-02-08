import React , {useState} from 'react';
import {Link , Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {isAuth} from './helpers'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {

    const [values,setValues] = useState({
        name : "",
        email : "",
        password: "",
        buttonText: "submit"
    })
    const {name,email,password,buttonText} = values

    const handleChange = (name) => (event) => {

        setValues({...values,[name]:event.target.value})
        

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signup`,
            data: {name,email,password}
        })
        .then(response => {
            console.log("signup success",response)
            setValues({...values, name : " ",email: " ",password : " ", buttonText: "submited"})
            toast.success(response.data.message)
        })

        .catch(error => {
            console.log('signup error',error.response.data)
            setValues({...values,buttonText: "submit"})
            toast.error(error.response.data.error)
        })

    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}  value={name} type="text" className="form-control"/>
            </div>

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
            {isAuth() ? <Redirect to="/" /> : null}
            <h1>signup</h1>
            {signupForm()}
            <br/>
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">forgot password</Link>
            </div>
        </Layout>
     );
}
 
export default Signup;