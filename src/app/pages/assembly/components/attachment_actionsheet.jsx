import React from "react";


export default function AttachmentActionSheet(
  props
) {
  return (
    <div
      className="modal fade action-sheet"
      id="attachmentsActionSheet"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Anexos</h5>
          </div>
          <div className="modal-body">
            <ul className="listview link-listview">
              <li>
                <a href="#">Documento 1</a>
              </li>
              <li>
                <a href="#">Documento 2</a>
              </li>
              <li>
                <a href="#">Documento 3</a>
              </li>
              <li>
                <a href="#">Documento 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
