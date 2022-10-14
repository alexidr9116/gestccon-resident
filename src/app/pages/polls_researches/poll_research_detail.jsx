import { format, subDays } from "date-fns";
import { addDays } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import {
  CalendarOutline,
  Checkmark,
  CheckmarkDone,
  DocumentAttach,
  DocumentAttachOutline,
  InformationCircle,
  InformationCircleOutline,
} from "react-ionicons";
import Header from "../../../components/Header";

export default function PollResearchDetail() {
  const [attachmentActionSheet, setAttachmentActionSheet] = useState() ;
  useEffect(() => {
    setAttachmentActionSheet(() => {
      if (document.querySelector("#pollAttachmentsActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#pollAttachmentsActionSheet")
        );
      }
    });
  }, []);
  return (
    <div>
      <Header showGoBack title="Enquete" rightSide={<></>} />
      <div className="section mt-2">
        <div className="card">
          <ul className="listview flush transparent image-listview">
            <li>
              <div className="item">
                <div className="icon-box">
                  <InformationCircleOutline cssClasses="text-primary" />
                </div>
                <div className="in small">
                  <div className="fw-bold text-primary">
                    Votação em andamento
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="icon-box">
                  <CalendarOutline cssClasses="text-primary" />
                </div>
                <div className="in small">
                  <div>
                    Início:{" "}
                    <span className="fw-bold">
                      {format(subDays(Date.now(), 1), "dd/MM/yyyy 00:00")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="icon-box">
                  <CalendarOutline cssClasses="text-primary" />
                </div>
                <div className="in small">
                  <div>
                    Término:{" "}
                    <span className="fw-bold">
                      {format(addDays(Date.now(), 2), "dd/MM/yyyy 19:00")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="section inset">
        <div className="section-title mt-2">Itens</div>
        <Item
          type="checkbox"
          title="Quais locais, em sua opinião, são considerados de grande importância
          para a instalação das câmeras?"
          items={[
            {
              label: "Portaria",
              name: "portaria",
              value: "portaria",
              percentage: 40,
            },
            {
              label: "Piscina",
              name: "piscina",
              value: "piscina",
              percentage: 30,
            },
            {
              label: "Churrasqueira",
              name: "churrasqueira",
              value: "churrasqueira",
              percentage: 30,
            },
          ]}
          attachmentActionSheet={attachmentActionSheet}
        />
        <Item
          type="radio"
          title="Você concorda com a aquisição de sensores de segurança?"
          items={[
            {
              label: "A FAVOR",
              name: "radioList",
              value: "SIM",
              percentage: 70,
            },
            {
              label: "CONTRA",
              name: "radioList",
              value: "NAO",
              percentage: 30,
            },
          ]}
          attachmentActionSheet={attachmentActionSheet}
        />
      </div>
      <Attatchments />
    </div>
  );
}



function Item({ type = "checkbox", ...props }) {
  const id = Math.floor(Math.random() * 10000);
  const [selectedItems, setSelectedItems] = useState(
    new Array(props.items?.length).fill(false)
  );
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    console.log({ selectedItems });
  }, [selectedItems]);
  function handleOpenActionSheet() {
    props.attachmentActionSheet?.show();
  }
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-subtitle">{props.title}</h5>
        <div className="input-list mt-1">
          {!voted &&
            props.items?.map((el, i) => (
              <div className="form-check" key={`${el.name}${i}`}>
                <input
                  type={type}
                  className="form-check-input"
                  id={el.value}
                  name={`${el.name}${id}`}
                  checked={selectedItems[i]}
                  onChange={(el) =>
                    setSelectedItems((state) =>
                      state.map((item, index) => (index === i ? !item : item))
                    )
                  }
                />
                <label className="form-check-label " htmlFor={el.value}>
                  {el.label}
                </label>
              </div>
            ))}
          {!!voted &&
            props.items?.map((el, i, arr) => {
              return (
                <div className="px-3 pt-2">
                  <label className="small">{`${el.label} (${el.percentage}) votos`}</label>
                  <div className="progress mb-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${el.percentage}%` }}
                    >{`${el.percentage}%`}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between mt-1">
          <button
            className="btn btn-outline-primary"
            onClick={handleOpenActionSheet}
          >
            <DocumentAttachOutline cssClasses="text-primary me-1" />
            Anexos
          </button>
          <button
            className="btn btn-success"
            disabled={!!voted || !selectedItems.some((e) => e === true)}
            onClick={() => setVoted(true)}
          >
            <Checkmark cssClasses="text-white me-1" />
            {!voted ? "Votar" : "Obrigado!"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Attatchments() {
  return (
    <div
      className="modal fade action-sheet"
      id="pollAttachmentsActionSheet"
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
