import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  CalendarOutline,
  ChatbubblesOutline,
  CloudDownloadOutline,
  LinkOutline,
  LocationOutline,
} from "react-ionicons";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import { AccordionItem } from "./components/accordion_item";
import AttachmentActionSheet from "./components/attachment_actionsheet";
import AttachmentChatActionSheet from "./components/chat";
import ComputedVotes from "./components/computed_votes";

export default function AssemblySinglePage() {
  const { id: assemblyId } = useParams();

  const assembly = store.useState((state) =>
    state.assemblies.find((e) => e.id === assemblyId)
  );

  const assemblyClosed = assembly?.status === "closed";

  const [attachmentActionSheet, setAttachmentActionSheet] = useState();
  const [attachmentChatActionSheet, setAttachmentChatActionSheet] =
    useState();
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    setAttachmentActionSheet(() => {
      if (document.querySelector("#attachmentsActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#attachmentsActionSheet")
        );
      }
    });

    setAttachmentChatActionSheet(() => {
      if (document.querySelector("#attachmentsChatActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#attachmentsChatActionSheet")
        );
      }
    });
  }, []);

  if (!assembly) {
    return <Navigate to={"../"} replace />;
  }

  return (
    <div>
      <Header showGoBack title="Assembléia Extraordinária" rightSide={<></>} />
      <div className="section mt-2">
        {!!assemblyClosed && (
          <div className="w-100 d-flex justify-content-center py-2">
            <div className="badge badge-danger">Assembléia Encerrada</div>
          </div>
        )}
        <div className="card">
          <ul className="listview flush transparent image-listview">
            <li>
              <a className="item">
                <div className="icon-box ">
                  <LinkOutline cssClasses="text-primary" />
                </div>
                <div className="in small">Acesse a transmissão</div>
              </a>
            </li>
            <li>
              <a className="item">
                <div className="icon-box ">
                  <LocationOutline cssClasses="text-primary" />
                </div>
                <div className="in small">Online</div>
              </a>
            </li>
            <li>
              <a className="item">
                <div className="icon-box">
                  <CalendarOutline cssClasses="text-primary" />
                </div>
                <div className="in small">
                  Data da Reunião:{" "}
                  {format(new Date(assembly?.initialDate), "dd/MM/yyyy HH:mm")}
                </div>
              </a>
            </li>
            <li>
              <a className="item ">
                <div className="icon-box">
                  <CalendarOutline cssClasses="text-primary" />
                </div>
                <div className="in small">
                  Prazo Votação:{" "}
                  {format(new Date(assembly.finalDate), "dd/MM/yyyy HH:mm")}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="section inset mt-2">
        <div className="section-title">Pautas</div>
        {assembly.guidelines_items.map((el) => (
          <AccordionItem
            key={el.id}
            id={el.id}
            title={el.title}
            type={el.type}
            attachments={el.attachments}
            items={el.items}
            status={assembly.status}
            actionSheet={attachmentActionSheet}
            chatActionSheet={attachmentChatActionSheet}
          />
        ))}
      </div>
      <AttachmentActionSheet files={attachments} />
      <AttachmentChatActionSheet />
    </div>
  );
}
