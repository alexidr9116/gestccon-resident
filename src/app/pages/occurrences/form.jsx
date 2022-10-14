import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AddOutline, CameraOutline } from "react-ionicons";
import Header from "../../../components/Header";
import InputGroup from "../../../components/InputGroup";
import "./style.css";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import { addNewOccurence } from "../../services/occurences.service";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../../store/store";

const defaultImage = "/assets/img/sample/avatar/avatar1.jpg";

const schema = yup.object({
  title: yup.string().required("Campo obrigatório"),
  photo: yup.string(),
  observation: yup.string(),
});

export default function OcurrenceForm() {
  const { id } = useParams();
  const { openDialog } = useAlertDialogContext();
  const occurence = store.useState((state) =>
    state.occurences?.find((e) => e.id === id)
  );

  const [images, setImages] = useState(occurence?.photos || []);
  const navigate = useNavigate();
  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    if (!images.length) {
      openDialog({
        type: "warning",
        title: "Atenção!",
        message: "Escolha ao menos uma foto para continuar",
        buttons: [
          {
            text: "OK",
          },
        ],
      });
      return;
    }
    addNewOccurence({
      id: Date.now().toString(),
      observation: data.observation,
      photos: images,
      title: data.title,
    });

    openDialog({
      type: "success",
      title: "Sucesso!",
      message: "Ocorrência enviada para a administração",
      buttons: [
        {
          text: "OK",
        },
      ],
    });

    navigate(-1);
  }

  return (
    <div>
      <Header
        showGoBack
        title={!!occurence ? "Detalhes da Ocorrência" : "Nova Ocorrência"}
        rightSide={<></>}
      />
      <div className="section mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 mb-2">
              <p
                className="label small text-black m-0"
                style={{ fontSize: "0.8em" }}
              >
                <span className="text-danger small">*</span> Fotos
              </p>
              <div className="d-flex flex-wrap">
                <OcurrencesImageList images={images} setImages={setImages} />
              </div>
            </div>
            <div className="col-12">
              <InputGroup
                {...register("title")}
                label="Título da ocorrência"
                errorMsg={errors.title?.message}
                required
                defaultValue={occurence?.title}
                disabled={!!occurence}
              />
            </div>
            <div className="col-12">
              <div
                className="form-group boxed"
                style={{ opacity: !!occurence ? 0.4 : 1 }}
              >
                <div className="input-wrapper">
                  <label className="label" htmlFor="observation">
                    Observação
                  </label>
                  <textarea
                    {...register("observation")}
                    rows={5}
                    className="form-control"
                    placeholder="Insira a uma observação"
                    defaultValue={occurence?.observation}
                    disabled={!!occurence}
                  ></textarea>
                </div>
              </div>
              {/*   {!!errors.observation && (
                <span className="text-danger small">
                  {errors.observation.message}
                </span>
              )} */}
            </div>
            {!occurence && (
              <div className="col-12 mt-1">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Enviar
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function OcurrencesImageList({ images = [], setImages }) {
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
        [...images].reverse().map((el, i) => (
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
