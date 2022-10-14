import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AddOutline } from "react-ionicons";
import Header from "../../../components/Header";
import InputGroup from "../../../components/InputGroup";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import "../../../css/classificates.css";
import { addClassificate } from "../../services/classificates.service";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório") /* 
    .min(30, "Por favor, insira ao menos 30 caracteres"), */,
  updatedAt: yup.date(),
  createdAt: yup.date(),
});

export default function ClassificateFormPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  function onSubmit(data) {
    console.log({ data });
    const id = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );

    addClassificate({
      id: String(id),
      title: data.title,
      id_user: 1,
      description: data.description,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    navigate("../" + id, { replace: true });
  }

  return (
    <div>
      <Header showGoBack title="Novo Classificado" rightSide={<></>} />
      <div className="section mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12">
              <InputGroup
                {...register("title")}
                label="Título do classificado"
                errorMsg={errors.title?.message}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-group boxed">
                <div className="input-wrapper">
                  <label className="label" htmlFor="description">
                    <span className="text-danger">* </span>
                    Descrição do Classificado
                  </label>
                  <textarea
                    {...register("description")}
                    rows={8}
                    className="form-control"
                    placeholder="Insira a descrição do seu classificado"
                  ></textarea>
                  {!!errors.description?.message && (
                    <p
                      className="small text-danger mt-1"
                      style={{ fontSize: "0.7rem", lineHeight: 1.5 }}
                    >
                      {errors.description?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <small>Imagens do Classificado</small>
              <ClassificateImageList images={images} setImages={setImages} />
            </div>
            <div className="col-12 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg py-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ClassificateImageList({ images, setImages }) {
  const { openDialog } = useAlertDialogContext();

  function handleAddNewImage(e) {
    /* if (e.target.files[0].size > 2097152) {
      openDialog({
        type: "warning",
        title: "Atenção",
        message:
          "A imagem selecionada têm mais de 2mb de tamanho, por favor escolha outra imagem mais leve.",
        buttons: [{ text: "OK" }],
      });

      return;
    } */
    const image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        setImages((state) => [...state, fileReader.result]);
      }
    };
    fileReader.readAsDataURL(image);
  }

  return (
    <div className="d-flex mt-2 flex-wrap">
      {!!images &&
        images.reverse().map((el, i) => (
          <div key={i} className="image-wrapper">
            <img src={el} alt="" className="imaged object-cover me-1" />
          </div>
        ))}
      <label htmlFor="classificatePhoto" className="text-small label">
        <a
          className="btn btn-icon btn-primary"
          style={{ width: 64, height: 64 }}
        >
          <AddOutline color="#FFF" />
        </a>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="classificatePhoto"
          onChange={handleAddNewImage}
        />
      </label>
    </div>
  );
}
