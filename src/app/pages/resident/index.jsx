import React from "react";
import Header from "../../../components/Header";

export default function ResidentPage() {
  return (
    <div>
      <Header showGoBack rightSide={<></>} />
      <div className="section mt-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">Cartão do Morador</h5>
            {/* <h6 className="card-subtitle mb-1">Card subtitle</h6> */}
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
              <img
                src="/assets/img/avatar.png"
                className="imaged w140"
                alt=""
              />
              <div className="my-1">
                <h3>Locatário</h3>
                <p className="fs-3">Jaiminho Carteiro</p>
                <h3>BL 4 - Apto 1303</h3>
              </div>
              <div className="my-1">
                <img
                  src="/assets/img/sample/qr.png"
                  alt=""
                  className="imaged square w160"
                />
                <p>222354556678</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
