import { useState } from "react";
import {
  ChatbubblesOutline,
  Checkmark,
  CloudDownloadOutline,
  DocumentAttachOutline,
} from "react-ionicons";


export function AccordionItem(props) {
  const [voted, setVoted] = useState(false);
  const id = Math.floor(Math.random() * 10000);

  function openActionSheet() {
    props.actionSheet.show();
  }

  function openChatActionSheet() {
    props.chatActionSheet.show();
  }

  return (
    <div className="card mt-2">
      <div className="card-body">
        <h5 className="card-subtitle">{props.title}</h5>
        <div className="input-list mt-1">
          {props.status === "open" &&
            !voted &&
            props.items?.map((el, i) => (
              <div className="form-check" key={`${el.value}${i}`}>
                <fieldset>
                  <input
                    type={props.type}
                    className="form-check-input"
                    name={el.name}
                    id={`${el.value}${id}`}
                    value={el.value}
                  />
                  <label
                    className="form-check-label "
                    htmlFor={`${el.value}${id}`}
                  >
                    {el.label}
                  </label>
                </fieldset>
              </div>
            ))}
          {(props.status === "closed" || !!voted) &&
            props.items?.map((el) => {
              return (
                <div className="px-3 pt-2">
                  <label className="small">{`${el.label} (${el.count}) votos`}</label>
                  <div className="progress mb-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${el.count}%` }}
                    >{`${el.count}%`}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between mt-1 gap-2">
          <button className="btn btn-outline-primary" onClick={openActionSheet}>
            <DocumentAttachOutline cssClasses="text-primary me-1" />
            Anexos
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={openChatActionSheet}
          >
            <ChatbubblesOutline cssClasses="me-1 text-primary" />
            Chat
          </button>
        </div>
        {props.status !== "closed" && (
          <div className="mt-2">
            <button
              className="btn btn-success w-100"
              disabled={!!voted}
              onClick={() => setVoted(true)}
            >
              <Checkmark cssClasses="text-white me-1" />
              {!voted ? "Votar" : "Obrigado!"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* return (
    <div className="accordion-item" key={accordionId}>
      <h2 className="accordion-header py-2">
        <button
          className="accordion-button collapsed fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#accordion" + accordionId}
        >
          {props.title}
        </button>
      </h2>
      <div
        id={"accordion" + accordionId}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionGuidelines"
      >
        <div className="accordion-body p-0">
          {!!props.computedValues &&
            props.computedValues.map((el) => (
              <div className="px-3">
                <p>{el.label}</p>
                <div className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${el.percentage}%` }}
                  >{`${el.percentage}%`}</div>
                </div>
              </div>
            ))}
          {!!props.options?.length && (
            <div className="input-list">
              {props.options.map((el) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={"radioList" + accordionId}
                    id={el.value}
                  />
                  <label className="form-check-label" htmlFor={el.value}>
                    {el.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {!props.computedValues?.length && (
            <div className="d-flex gap-1 justify-content-between p-2">
              <button
                className="btn btn-outline-secondary"
                onClick={openActionSheet}
              >
                <CloudDownloadOutline cssClasses="me-1 text-secondary" />
                Anexos
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={openChatActionSheet}
              >
                <ChatbubblesOutline cssClasses="me-1 text-primary" />
                Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ); */
}
