import React, { useEffect, useState } from "react";
import { DownloadOutline, Search } from "react-ionicons";
import Header from "../../../components/Header";

const documentNames = [
  "Guia do Condomínio",
  "Política de Privacidade",
  "Política de Dados",
];

const documentsMock = documentNames.map((doc, i) => ({
  name: doc,
  url: "http://www.africau.edu/images/default/sample.pdf",
}));

export default function DocumentsPage() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [documents, setDocuments] = useState(documentsMock);

  useEffect(() => {
    if (!searchInputValue) {
      setDocuments(documentsMock);
      return;
    }

    setDocuments((state) => {
      return state.filter((doc) =>
        doc.name.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    });
  }, [searchInputValue]);

  return (
    <div>
      <Header showGoBack title={`Documentos e Atas`} rightSide={<></>} />
      <div className="wide-block pt-2 pb-2">
        <div className="form-group basic d-flex align-items-center">
          <Search color="#c2c2c2" cssClasses="me-1" />
          <input
            type="text"
            className="form-control"
            id="userid1"
            placeholder="Pesquise por algum documento"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="listview-title mt-2">Arquivos</div>
      <ul className="listview image-listview">
        {!!documents.length && documents.map((el, i) => (
          <li key={i}>
            <a href={el.url} className="item" target="_blank">
              <div className="icon-box bg-primary">
                <DownloadOutline
                  color="#FFFFFF"
                  style={{ height: 22, width: 22 }}
                />
              </div>
              <div className="in">
                <div>{el.name}</div>
              </div>
            </a>
          </li>
        )) || <div className="text-center text-muted">Nenhum arquivo encontrado.</div>}
      </ul>
    </div>
  );
}
