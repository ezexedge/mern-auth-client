import cookie from 'js-cookie'

//set in cookie

export const setCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.set(key, value,{
            expires : 1
        })
    }
}
//remove cookie
export const removeCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires : 1
        })
    }
}

export const getCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}


export const setLocalStorage = (key,value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}


export const authenticate = (response,next) => {
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next()
}

export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}

export const updateUser = (response , next )=>{
//yo con esto modifico el usuario en el localstorage 
//por que cuando modifico en la base de datos queda los datos del usuario 
//mientras que en el localsotrage quedane los datos viejo
    console.log("usuario modificado en localstorage", response)
    if(typeof window !== 'window'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()

}