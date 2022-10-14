import React, { useEffect, useState } from 'react'
import AnimatedPage from '../../../components/AnimatedPage'
import HeaderLogin from './components/HeaderLogin'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  email: yup.string().email('Digite um email válido').required('Digite o seu email'),
})

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [error, setError] = useState(false)
  const [successRecovery, setSuccessRecovery] = useState(false)

  const onSubmit = (data) => {
    if (data.email !== "email@email.com") {
      setError(true)
      return;
    }

    setSuccessRecovery(true)
  }

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        setError(false)
        const alertList = document.querySelectorAll('.alert')
        alertList.forEach(function (alert) {
          new window.bootstrap.Alert(alert).close()
        })
      }, 5000)
    }
  }, [error])

  return (
    <AnimatedPage>
      <div>
        <HeaderLogin withLeftSide />
        <div id="appCapsule">

          <div className="section mt-5 text-center">
            <h1>Recuperar senha</h1>
            <h4>Digite seu email para recuperar sua senha</h4>
          </div>

          <div className="section mb-5 p-2">

            {!!error && <div className="alert alert-danger alert-dismissible fade show mb-1" role="alert">
              Verifique seu email e/ou senha
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            {!!successRecovery && <div className="alert alert-success alert-dismissible fade show mb-1" role="alert">
              Um email de recuperação foi enviado para você!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card">
                <div className="card-body pb-1">

                  <div className="form-group basic">
                    <div className="input-wrapper">
                      <label className="label" htmlFor="email1">E-mail</label>
                      <input type="email" className="form-control" id="email1" placeholder="Seu e-mail" {...register('email')} />

                    </div>
                  </div>
                </div>
              </div>

              <div className="form-button-group transparent">
                <button type="submit" className="btn btn-primary btn-block btn-lg">Recuperar senha</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </AnimatedPage>
  )
}
