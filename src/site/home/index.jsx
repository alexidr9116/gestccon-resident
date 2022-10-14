import React, { useEffect, useState } from 'react'
import { CloseCircle } from 'react-ionicons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './components/style.css'
import AdmCondominioForm from './components/AdmCondominioForm';
import ResultSubmitForm from './components/ResultSubmitForm';

const schema = yup.object({
  nome: yup.string().required('Digite seu nome'),
  email: yup.string().email('Digite um email válido').required('Um email é requerido.'),
  mensagem: yup.string().required('Por favor, digite uma mensagem'),
}).required()

export default function HomeSite() {
  const [isSubmitSuccessful, setSubmitSuccessfull] = useState(false)

  const handleSubmit = () => {
    setSubmitSuccessfull(true)
  }

  const handleOtherMessage = () => {
    setSubmitSuccessfull(false)
  }

  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <div className="container-lg mt-5">
        <div className="d-flex align-items-center ">
          <div className="row justify-content-xl-center">

            <div className="col-12 col-sm-6">
              <div className="d-flex align-items-center">
                <img src='/assets/img/verano.png' width='170' />
                <h1 className="ms-2">Verano Residence</h1>
              </div>
              <div className='mt-5 mb-2'>
                <p style={{ lineHeight: 1.5, fontSize: 13 }}>O Verano Residence Park é um verdadeiro complexo de piscinas cercado por mais de 1.500m²
                  de lâmina d'agua com um verde exuberante incluindo cascatas, fontes, hidromassagem, bar,
                  pérgolas, piscina com raia, piscina infantil, solarium e até a sofisticação de um lounge em
                  pleno parque aquático. Está localizado em frente a um de 40.000m² distribuídos em grandes
                  áreas verdes com ciclovias, shopping, colégio, quadras esportivas e muito lazer, além de um
                  magnífico acervo de obras de arte ao ar livre do paisagismo assinado por Burble Marx.
                </p>
              </div>
              <div className="row">
                <div className="col-8 col-xl-8">
                  <div className={isSubmitSuccessful ? 'item-fadeout d-none' : 'item'}>
                    <AdmCondominioForm onSubmitSuccessfully={handleSubmit} />
                  </div>
                  <div className={isSubmitSuccessful ? 'item' : 'item-fadeout d-none'}>
                    <ResultSubmitForm onButtonClicked={handleOtherMessage} />
                  </div>
                </div>
                <div className="col d-flex d-lg-flex justify-content-end align-items-end">
                  <div className="d-flex">
                    <div style={styles.qrButton}>
                      <img src='/assets/img/sample/qr.png' style={{ width: '100%' }} />
                      <p style={{ lineHeight: 1.3, marginTop: 10 }}>Aponte sua câmera e acesse o aplicativo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className='d-flex justify-content-md-end'>
                <div style={styles.phoneWrapper}>
                  <div style={styles.in}>
                    <iframe style={styles.in} src='/app' frameBorder={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.footer} className="d-flex justify-content-center mt-3">
        <a href="https://www.youtube.com/watch?v=YFX4262CXIE" className="mt-2" style={{ color: 'white', fontSize: '12px' }}>Copyright &copy; 2022 <span>GestCCon</span></a>
      </div>
    </div>
  )
}

const styles = {
  phoneWrapper: {
    borderRadius: '20px',
    background: '#000',
    border: '3px solid #999',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
  },
  in: {
    width: '350px',
    height: '700px',
    borderRadius: '20px',
  },
  phoneContent: {
    //width: '500px',
    /* display: 'flex', */
    /*  justifyContent: 'flex-end' */
  },
  qrButton: {
    display: 'block',
    textAlign: 'center',
    zIndex: 100,
    border: 0,
    width: '120px',
    height: '190px',
    background: '#fff',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 26%)',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '12px',
  },
  footer: {
    height: '56px',
    width: '100vw',
    background: '#000',
  }
}