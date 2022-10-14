import React from "react";
import { ArrowForwardOutline, Camera } from "react-ionicons";

export default function AttachmentChatActionSheet() {
  return (
    <div
      className="modal fade modalbox"
      id="attachmentsChatActionSheet"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chat</h5>
            <a href="#" data-bs-dismiss="modal">Fechar</a>
          </div>
          <div className="modal-body p-0 pb-5">
            <div className="pb-5">
              <div className="message-divider">Friday, Sep 20, 10:40 AM</div>

              <div className="message-item">
                <img
                  src="/assets/img/sample/avatar/avatar1.jpg"
                  alt="avatar"
                  className="avatar"
                />
                <div className="content">
                  <div className="title">John</div>
                  <div className="bubble">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="footer">10:44 AM</div>
                </div>
              </div>

              <div className="message-item user">
                <div className="content">
                  <div className="bubble">Aenean volutpat.</div>
                  <div className="footer">10:46 AM</div>
                </div>
              </div>

              <div className="message-divider">Friday, Sep 21, 7:40 PM</div>

              <div className="message-item">
                <img
                  src="/assets/img/sample/avatar/avatar1.jpg"
                  alt="avatar"
                  className="avatar"
                />
                <div className="content">
                  <div className="title">John</div>
                  <div className="bubble">
                    Aenean hendrerit porttitor dolor id elementum. Mauris nec
                    purus pulvinar, fringilla ex eget, ultrices urna.
                  </div>
                  <div className="footer">10:40 AM</div>
                </div>
              </div>

              <div className="message-item user">
                <div className="content">
                  <div className="bubble">
                    <img
                      src="/assets/img/sample/photo/2.jpg"
                      alt="photo"
                      className="imaged w160"
                    />
                  </div>
                  <div className="footer">10:46 AM</div>
                </div>
              </div>

              <div className="message-item user">
                <div className="content">
                  <div className="bubble">
                    Maecenas sollicitudin justo vel posuere eleifend. In eget
                    iaculis mi, vitae suscipit dui. Phasellus a facilisis magna,
                    eget aliquam turpis. Nullam eros neque, varius vitae commodo
                    blandit, placerat quis est.
                  </div>
                  <div className="footer">10:40 AM</div>
                </div>
              </div>

              <div className="message-item">
                <img
                  src="/assets/img/sample/avatar/avatar1.jpg"
                  alt="avatar"
                  className="avatar"
                />
                <div className="content">
                  <div className="title">John</div>
                  <div className="bubble">
                    <img
                      src="/assets/img/sample/photo/5.jpg"
                      alt="photo"
                      className="imaged w160"
                    />
                  </div>
                  <div className="footer">10:40 AM</div>
                </div>
              </div>

              <div className="message-item">
                <img
                  src="/assets/img/sample/avatar/avatar1.jpg"
                  alt="avatar"
                  className="avatar"
                />
                <div className="content">
                  <div className="title">John</div>
                  <div className="bubble">
                    Aenean hendrerit porttitor dolor id elementum. Mauris nec
                    purus pulvinar, fringilla ex eget, ultrices urna.
                  </div>
                  <div className="footer">10:40 AM</div>
                </div>
              </div>
            </div>
            <div className="chatFooter">
              <form>
                <a href="#" className="btn btn-icon btn-text-secondary rounded">
                  <Camera cssClasses="md hydrated text-secondary" />
                </a>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite uma mensagem..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-icon btn-primary rounded"
                >
                  <ArrowForwardOutline cssClasses="md hydrated text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
