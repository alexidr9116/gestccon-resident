import React from 'react'

export default function ResultSubmitForm({ onButtonClicked }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src='/assets/img/success.png' width='100px' />
      <p>Sua solicitação foi enviada com sucesso!</p>
      <button className="btn btn-secondary" onClick={onButtonClicked}>Enviar outra mensagem</button>
    </div>
  )
}
