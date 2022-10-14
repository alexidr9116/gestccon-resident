import React, { useEffect, useState } from 'react'
import { CheckmarkDone } from 'react-ionicons'

export default function LGPDActionSheet({ openModal }) {


  function handleMoreOptions() {
    var someTabTriggerEl = document.querySelector('#myTab #lgpd2-tab')
    console.log({ someTabTriggerEl })
    var tab = new window.bootstrap.Tab(someTabTriggerEl)

    tab.show()
  }

  function showTermsAndServices() {
    setTimeout(() => {
      const myCollapse = document.getElementById('actionSheetForm')
      const bsCollapse = new window.bootstrap.Modal(myCollapse)
      bsCollapse.hide()

      const modal = new window.bootstrap.Modal(document.getElementById('termsAndServiceModal'))
      modal.show()
    }, 400)
  }
  return (
    <div className="modal fade action-sheet" id="actionSheetForm" tabIndex={-1} style={{ display: 'none' }} aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex flex-column">
            <h5 className="modal-title pb-0">Controle sua privacidade</h5>
            <small className="input-info text-center">Nosso site usa cookies para melhorar a navegação</small>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content d-flex flex-column">
              <ul className="nav" id="myTab" role="tablist">
                <li id="lgpd1-tab" data-bs-toggle="tab" data-bs-target="#lgpd-tab-1" role="tab" aria-controls="lgpd1-tab" aria-selected="true" />
                <li id="lgpd2-tab" data-bs-toggle="tab" data-bs-target="#lgpd-tab-2" role="tab" aria-controls="lgpd2-tab" aria-selected="false" />
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade active show" role="tabpanel" id="lgpd-tab-1">
                  <p className="small d-flex justify-content-center">
                    <a href="#" onClick={showTermsAndServices}>Política de Privacidade</a>
                  </p>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-secondary me-1 mb-1" onClick={handleMoreOptions}>Minhas opções</button>
                    <button type="button" className="btn btn-primary me-1 mb-1" data-bs-dismiss="modal">Aceitar</button>
                  </div>
                </div>


                <div className="tab-pane fade" role="tabpanel" id="lgpd-tab-2">
                  <LGBPDItem
                    id="item1"
                    title="Cookies de Navegação"
                    icon={<CheckmarkDone />}
                    onChange={() => { console.log('laskdlkasdklaskd') }}
                    text="Os cookies são essenciais e só são usados para o funcionamento do site. Exemplo: acesso as áreas seguras, identificação das suas reservas, dos seus classificados, etc. Não usamos para fins de publicidades ou para fornecer anúncios. Sem os cookies o site não funcionaria corretamente. Ao desabilitar, não será possível o acesso às areas seguras do site."
                  />
                  <LGBPDItem
                    id="item2"
                    title="Mensagens do Sistema"
                    icon={<CheckmarkDone />}
                    onChange={() => { console.log('laskdlkasdklaskd') }}
                    text="Respeitamos sua privacidade e você pode desabilitar o recebimento de qualquer mensagem do site. Importante ressaltar que as mensagens são enviadas pela administração exemplo: Comunicados. Informativos, aviso de confirmação de reserva, de correspondência, de assembleia virtual, de interessados nos seus anúncios, etc. Ao desabilitar, você deixará de receber todos os avisos do sistema e da Administração do Condomínio."
                  />
                  <div className="my-2">
                    <button className="btn btn-primary w-100 btn-lg" data-bs-dismiss="modal">Salvar</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LGBPDItem = ({ id, title, icon, text = "", onChange }) => {
  const [checked, setChecked] = useState(true)
  function handleChange(e) {
    onChange(e)
    setChecked(e.currentTarget.checked)
  }
  return <div className="d-flex flex-column">
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-center">
        {/* <CheckmarkDone /> */}
        {icon}
        <h4 className="m-0 ms-1">{title}</h4>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id={id} onChange={handleChange} checked={checked} />
        <label className="form-check-label" htmlFor={id}></label>
      </div>
    </div>
    <div className="mt-2" style={{ lineHeight: 1.2 }}>
      <p style={{ textAlign: "justify", fontSize: "0.67rem" }}>{text}</p>
    </div>
  </div>
}

