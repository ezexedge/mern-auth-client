import React , {useState,useEffect} from 'react';
import {Link , Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({match}) => {

    const [values,setValues] = useState({
        name : "",
        token : "",
        show: true,
       
    })

    useEffect(()=>{

        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values,name,token})

        }

        console.log(token)

    },[])
    const {name,token,show} = values

   
    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/account-activation`,
            data: {token}
        })
        .then(response => {
            console.log("Activate account",response)
            setValues({...values, show:false})
            toast.success(response.data.message)
        })

        .catch(error => {
            console.log('Activate account error',error.response.data.error)
            setValues({...values,buttonText: "submit"})
            toast.error(error.response.data.error)
        })

    }

    const ActivateLink = () => (
        <div className="text-center">
    <h1 className="p-5 text-center">hey {name} , ready activate your account ?</h1>
    <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate account</button>

        </div>
    )

    
    return ( 
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
        
            <h1>Activate</h1>
            {ActivateLink()}
            </div>
        </Layout>
     );
}
 
export default Activate;