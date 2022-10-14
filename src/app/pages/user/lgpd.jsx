import React from 'react'
import { CheckmarkCircle, CheckmarkDone } from 'react-ionicons'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { LGBPDItem } from '../../../components/LGPDActionSheet'

export default function LGPDPreferencies() {
  const navigate = useNavigate()

  const handleSavePreferencies = () => {
    const modal = new window.bootstrap.Modal(document.querySelector('#DialogIconedSuccess'))
    modal.show()
  }

  const handleExitModal = () => {
    navigate(-1)
  }
  return (
    <div>
      <Header showGoBack title='Editar Privacidade' rightSide={<></>} />
      <div className="appCapsule" style={{ paddingTop: 80 }}>
        <div className="section">
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
            <button className="btn btn-primary w-100 btn-lg" onClick={handleSavePreferencies}>Salvar</button>
          </div>
        </div>
      </div>

      <div className="modal fade dialogbox" id="DialogIconedSuccess" data-bs-backdrop="static" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-icon text-success">
              <CheckmarkCircle cssClasses='md hydrated' color="#1DCC70" style={{ height: 64, width: 64 }} />
            </div>
            <div className="modal-header">
              <h5 className="modal-title">Sucesso!</h5>
            </div>
            <div className="modal-body">
              Seus dados foram salvos.
            </div>
            <div className="modal-footer">
              <div className="btn-inline">
                <button onClick={handleExitModal} className="btn" data-bs-dismiss="modal">Sair</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
