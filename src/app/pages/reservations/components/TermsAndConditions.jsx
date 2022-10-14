import React, { useEffect, useState } from "react";

export default function TermsAndConditionsAmbientBook({ showModal = false, onClose }) {
  const [modal, setModal] = useState();
  useEffect(() => {
    setModal(() => {
      if (document.querySelector("#termsAndConditionsAmbientBookModal")) {
        return new window.bootstrap.Modal(
          document.querySelector("#termsAndConditionsAmbientBookModal")
        );
      }
    });
  }, [])

  useEffect(() => {
    if(!!modal) {
      if(showModal) modal.show() 
    }
  }, [showModal, modal])
  return (
    <div
      className="modal fade modalbox"
      id="termsAndConditionsAmbientBookModal"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Termos e Condições da reserva</h5>
            <a href="#" data-bs-dismiss="modal" onClick={onClose}>
              Fechar
            </a>
          </div>
          <div className="modal-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              fermentum, urna eget finibus fermentum, velit metus maximus erat,
              nec sodales elit justo vitae sapien. Sed fermentum varius erat, et
              dictum lorem. Cras pulvinar vestibulum purus sed hendrerit.
              Praesent et auctor dolor. Ut sed ultrices justo. Fusce tortor
              erat, scelerisque sit amet diam rhoncus, cursus dictum lorem. Ut
              vitae arcu egestas, congue nulla at, gravida purus.
            </p>
            <p>
              Donec in justo urna. Fusce pretium quam sed viverra blandit.
              Vivamus a facilisis lectus. Nunc non aliquet nulla. Aenean arcu
              metus, dictum tincidunt lacinia quis, efficitur vitae dui. Integer
              id nisi sit amet leo rutrum placerat in ac tortor. Duis sed
              fermentum mi, ut vulputate ligula.
            </p>
            <p>
              Vivamus eget sodales elit, cursus scelerisque leo. Suspendisse
              lorem leo, sollicitudin egestas interdum sit amet, sollicitudin
              tristique ex. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Phasellus id ultricies
              eros. Praesent vulputate interdum dapibus. Duis varius faucibus
              metus, eget sagittis purus consectetur in. Praesent fringilla
              tristique sapien, et maximus tellus dapibus a. Quisque nec magna
              dapibus sapien iaculis consectetur. Fusce in vehicula arcu.
              Aliquam erat volutpat. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
