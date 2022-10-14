import { useState } from "react";
import { useAlertDialogContext } from "../../../../contexts/alert.context";


export function GuestEmailActionSheet({
  onSendEmail,
  controller,
}) {
  const { openDialog } = useAlertDialogContext();
  const [value, setValue] = useState("");
  function close() {
    controller.hide();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSendEmail();
    openDialog({
      type: "success",
      title: "Sucesso!",
      message:
        "A mensagem foi enviada com sucesso!",
      buttons: [{ text: "OK" }],
    });
    close();
  }
  return (
    <div
      className="modal fade action-sheet"
      id="guestEmailActionSheet"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar email ao convidado</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group basic">
                  <label className="label">Email</label>
                  <div className="input-group">
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="Digite o email do convidado"
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                    />
                  </div>
                  <div className="input-info text-center">
                    O convidado irá receber o endereço do condomínio e um cartão
                    de autorização de visitante.
                  </div>
                </div>

                <div className="form-group basic">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                  >
                    Enviar email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
