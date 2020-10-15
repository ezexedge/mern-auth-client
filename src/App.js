import React from 'react';
import Layout from './core/Layout';
import { Helmet } from 'react-helmet';

const App = () => {
    const head = () => (
        <Helmet>
            <meta charSet="utf-8" />
            <title>MERN Stack</title>
            <link rel="canonical" href="https://mern-stack.com" />
        </Helmet>
    );
    return (
        <Layout>
            {head()}
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">React Node MongoDB Autenticacion</h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png" style={{"width": "300px"}} />
                <h2 className="mt-5">De que se trata?</h2>
            
                <hr />
                <p className="lead">crear tu cuenta,iniciar sesion , modificar tu cuenta de usuario y recuperar tu password con la ayuda de sendgrid </p>
                <p className="lead"></p>
            </div>
        </Layout>
    );
};

export default App;
