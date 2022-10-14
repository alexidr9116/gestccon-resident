
import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const schema = yup.object({
  nome: yup.string().required('Digite seu nome'),
  email: yup.string().email('Digite um email válido').required('Um email é requerido.'),
  mensagem: yup.string().required('Por favor, digite uma mensagem'),
}).required()

export default function AdmCondominioForm({ onSubmitSuccessfully }) {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
 
  const onSubmit = data => {
    console.log(data);
    reset()
    onSubmitSuccessfully()
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <label>Administração do condomínio</label>
      <div className="form-group boxed">
        <div className="input-wrapper">
          <input type="text" className="form-control" id="text4b" placeholder="Seu nome" {...register('nome')} />
          {errors.nome && <div className="input-info" style={{ color: 'red' }}>{errors.nome.message}</div>}
        </div>
      </div>

      <div className="form-group boxed">
        <div className="input-wrapper">
          <input type="email" className="form-control" id="text4b" placeholder="Digite seu email" {...register('email')} />
          {errors.email && <div className="input-info" style={{ color: 'red' }}>{errors.email.message}</div>}
        </div>
      </div>
      <div className="form-group boxed">
        <div className="input-wrapper">
          <textarea className="form-control" id="text4b" rows={5} placeholder="Digite sua mensagem" {...register('mensagem')} />
          {errors.mensagem && <div className="input-info" style={{ color: 'red' }}>{errors.mensagem.message}</div>}
        </div>
      </div>
      <div className="form-group boxed">
        <input type="submit" className="btn btn-secondary me-1 mb-1" value="Enviar Mensagem" />
      </div>
    </form>
  )
}
