import React, { useEffect, useState } from 'react'
import HeaderLogin from './components/HeaderLogin'
import { CloseCircle } from 'react-ionicons'
import AnimatedPage from '../../../components/AnimatedPage'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const schema = yup.object({
  email: yup.string().email('Digite um email válido').required('Digite o seu email'),
  senha: yup.string().required('Digite uma senha válida')
})

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const [loginError, setLoginError] = useState(false)
  const {login} = useAuth();
  const navigate = useNavigate()
  
  const onSubmit = async(data) => {
    await login(data.email, data.senha);

    // const response = await axios.post('/resident/auth/login-with-resident',{email:data.email, password:data.senha});
    // console.log(response);
    // if(response.status === 200 && response.data?.data?.token){
    //   store.update(e=>{
    //     e.user = response.data?.data?.user;
    //     e.user.token = response.data?.data?.token;
        
    //   })
      navigate('/app',{replace:true})
    // }
    
    // else{
    //   setLoginError(true)
    //   return;
    // }
    
  }

  useEffect(() => {
    if (loginError === true) {      
      setTimeout(() => {
        setLoginError(false)
        const alertList = document.querySelectorAll('.alert')
        alertList.forEach(function (alert) {
          new window.bootstrap.Alert(alert).close()
        })        
      }, 5000)
    }
  }, [loginError])

  function handleScrollFocus() {
    setTimeout(() => {
     window.scroll(0, 400)
    }, 150)
  }

  return (
    <AnimatedPage>
      <div>
        <HeaderLogin />
        <div id="appCapsule">
          <div className="w-100" style={{ height: 250, overflow: 'hidden' }}>
            <img className="w-100" src='/assets/img/verano-local.png' style={{ objectFit: 'cover' }} />
          </div>
          <div className="">
            <div className="section mt-2 text-center">
              {loginError && <div className="alert alert-danger alert-dismissible fade show mb-1" role="alert">
                Verifique seu email e/ou senha
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>}
            </div>
            <div className="section pb-5 pt-1">

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                  <div className="card-body px-2 py-2 pb-1">
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        {/* <label className="label">E-mail</label> */}
                        <input type="email" className="form-control" id="email1" placeholder="Seu e-mail" {...register('email')} onFocus={handleScrollFocus} />
                        {errors.email && <div className="input-info" style={{ color: 'red' }}>{errors.email.message}</div>}
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        {/* <label className="label" >Senha</label> */}
                        <input type="password" className="form-control" id="password1" placeholder="Sua senha" {...register('senha')} onFocus={handleScrollFocus} />
                        {errors.senha && <div className="input-info" style={{ color: 'red' }}>{errors.senha.message}</div>}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="form-links mt-2">
                  {/* <div>
                <a href="app-register.html">Register Now</a>
              </div> */}
                  <div className="ml-5"><Link to="/app/recover-password" className="text-muted">Esqueci minha senha</Link></div>
                </div>

                <div className="form-button-group  transparent">
                  <button type="submit" className="btn btn-primary w-100 btn-lg">Login</button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </AnimatedPage>
  )
}
