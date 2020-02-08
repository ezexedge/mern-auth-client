import React , {useState,useEffect} from 'react';
import {Link , Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {isAuth, getCookie,signout, updateUser} from './../auth/helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


const Private = ({history}) => {

    const [values,setValues] = useState({
        role : '',
        name : '',
        email : '',
        password: '',
        buttonText: "submit"
    })

    const token = getCookie('token')

    useEffect(()=> {
        loadProfile()
    },[])


     const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/api/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const {role , name,email,password,buttonText} = values

    const handleChange = (name) => (event) => {

        setValues({...values,[name]:event.target.value})
        

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values,buttonText: "submitting"})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/api/user/update`,
        
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {name,password}

        })
        .then(response => {
            console.log("profile update success",response)
            updateUser(response , ()=>{
                setValues({...values, buttonText: "submited"})
                toast.success("profile update success")
            })
           
        })

        .catch(error => {
            console.log('profile update error',error.response.data.error)
            setValues({...values,buttonText: "submit"})
            toast.error('profile updated error')
        })

    }

    const updateForm = () => (
        <form>
            
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input   defaultValue={role} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}  defaultValue={name} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">email</label>
                <input defaultValue={email} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">password</label>
                <input  type="password" className="form-control"/>
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
            <h1>profile update</h1>
            {updateForm()}
            </div>
        </Layout>
     );
}
 
export default Private;