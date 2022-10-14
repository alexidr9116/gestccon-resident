import React from 'react'

export default function TermsAndServices({ opened = false }) {
  
  return (
    <div className="modal fade modalbox show" id="termsAndServiceModal" tabIndex={-1} style={{ display: 'none' }} aria-modal="true" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Política de Privacidade</h5>
            <a href="#" data-bs-dismiss="modal">Fechar</a>
          </div>
          <div className="modal-body">
            <h4>Política de Privacidade da GestCCon </h4>
            <p>
              Todas as suas informações são usadas pela Administração do Condomínio na gestão condominial
              como legítimo interesse, e visam também tornar a sua visita no Portal do Condomínio a mais
              produtiva e agradável possível. Permitindo a você o acesso as áreas seguras, para que os
              moradores possam usufruir das comodidades de uso do sistema, tais como reservas de ambientes,
              fazer anúncios, inserir classificados, responder a enquetes e pesquisas, ler e baixar
              documentos ou atas, entre outras funcionalidades disponíveis no sistema.
            </p>
            <p>
              Importante ressaltar que todas as informações são utilizadas exclusivamente pela administração
              do seu condomínio.  Inclusive para envio de comunicados relativos ao condomínio, controle da
              base cadastral dos moradores, envio de enquetes, informações de achados e perdisos, entre outros.
              A GestCCon não compartilha ou usa seus dados pessoais para envio de qualquer tipo de anúncio,
              comunicado ou publicidade. A garantia da confidencialidade dos dados pessoais dos utilizadores
              do site é importante para o seu condomínio e para nós da GestCCon. Todas as informações pessoais
              serão tratadas em concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro de 1998
              (Lei n.º 67/98).
            </p>
            <h4>Os Cookies </h4>
            <p>
              Os cookies são essenciais e só usados para o funcionamento do site.  Sem os cookies o site não
              funcionaria corretamente, pois é necessário para sua navegação segura ao Portal e Painel.
              A informação inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider, como o Sapo, Clix, ou outro),
              o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o Firefox),
              permitindo assim o acesso as áreas seguras, o tempo da sua visita e que páginas visitou e quais
              ações foram realizadas, como exemplo reservas, registro de manutenção, resposta para enquetes,
              entre outros disponibilizados pela administração do condomínio que gerencia o Portal.
            </p>
            <p>
              Utilizamos cookies para armazenar informação, tais como as suas preferências quando visita o Portal.
              Isto poderá incluir um simples poup-up, ou uma ação sistêmica dos vários serviços tais como envio de
              e-mail sistêmico para confirmação de reserva, de segunda via da senha de acesso, envio de SMS entre outros.
              Você detém o poder de desligar os seus cookies, nas opções do seu browser, ou efetuando alterações nas
              ferramentas de programas Anti-Virus, como o Norton Internet Security. No entanto, isso poderá alterar
              a forma como interage com o Portal e no recebimento das mensagens enviadas pela administração,
              até mesmo impossibilitando seu acesso as áreas seguras.
            </p>
            <h4>Aceitação ao Termo de Privacidade</h4>
            <p>
              O uso do Portal dos Moradores e do Painel Administrativo do GestCCon pela administração pressupõe a
              aceitação deste termo de privacidade. Com o aceite, você concorda com o termo de privacidade, contudo,
              poderá revogar a qualquer tempo no menu minhas informações.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
