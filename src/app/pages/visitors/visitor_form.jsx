import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CameraOutline,
  CloseCircle,
  QrCodeOutline,
  Trash,
  TrashOutline,
} from "react-ionicons";
import Header from "../../../components/Header";
import "../../../css/visitor.css";
import InputGroup from "../../../components/InputGroup";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import {
  addNewVisitor,
  revokeAuthorization,
  updateVisitor,
} from "../../services/visitors.service";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../../store/store";

const schema = yup.object({
  day_mode: yup.string(),
  initial_date: yup.string().required("Campo obrigatório"),
  final_date: yup.string().when("day_mode", (day_mode) => {
    return day_mode === "period"
      ? yup.string().required("Campo obrigatório")
      : yup.string();
  }),
  visitor_photo: yup.string(),
  visitor_firstName: yup.string().required("Campo obrigatório"),
  visitor_lastName: yup.string().required("Campo obrigatório"),
  visitor_type: yup.string().required("Campo obrigatório"),
  document_number: yup.string(),
  car_identification: yup.string(),
});

const defaultImg = "/assets/img/avatar.png";

export default function VisitorFormPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    resetField,

  } = useForm({ resolver: yupResolver(schema) });
  const { openDialog } = useAlertDialogContext();
  const navigate = useNavigate();
  let { id } = useParams();

  //States
  const [visitorImage, setVisitorImage] = useState<any>(defaultImg);
  const [authorizationMode, setAuthorizationMode] = useState<"day" | "period">(
    "day"
  );

  const visitor = store.useState((e) =>
    e.visitors.find((x) => x.id === Number(id))
  );

  //Handles
  function handleAuthorizationMode(e) {
    setAuthorizationMode(e.target.value);
    resetField('final_date')
  }
  function handleInitialDateChange(e) {}

  function handleVisitorImageChange(e) {
    const image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        setVisitorImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(image);
  }

  //Form submit
  function onSubmit(data) {
    if (!!data.final_date) {
      if (
        new Date(data.final_date).getTime() <
        new Date(data.initial_date).getTime()
      ) {
        setError('final_date', {message: 'A data final não pode ser menor que a data inicial'})
        return;
      }
    }

    if (!visitor) {
      const id = Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
      );

      addNewVisitor({
        id,
        day_mode: data.day_mode,
        initial_date: data.initial_date,
        final_date: data.final_date,
        visitor_photo: visitorImage,
        visitor_firstName: data.visitor_firstName,
        visitor_lastName: data.visitor_lastName,
        visitor_type: data.visitor_type,
        document_number: data.document_number,
        car_identification: data.car_identification,
      });
      navigate("../share/" + id, { replace: true });
    } else {
      data.visitor_photo = visitorImage;
      updateVisitor(id, { ...visitor, ...data });
      navigate("../share/" + visitor?.id, { replace: true });
    }
  }

  function handleRevokeAuthorization() {
    revokeAuthorization(visitor?.id);
    openDialog({
      type: "success",
      title: "Sucesso!",
      message: "A autorização foi revogada.",
      buttons: [
        {
          text: "OK",
          onClick: () => {
            navigate(-1);
          },
        },
      ],
    });
  }

  //Verify if visitor has an photo
  useEffect(() => {
    if (visitor) {
      setVisitorImage(visitor.visitor_photo);
    }
  }, [visitor]);

  return (
    <div>
      <Header
        showGoBack
        title={!!visitor ? "Editar autorização" : "Autorizar visitante"}
        rightSide={<></>}
      />
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="section btn-group w-100"
          role="group"
          onChange={handleAuthorizationMode}
        >
          <input
            {...register("day_mode")}
            type="radio"
            className="btn-check"
            id="btnRadioDay"
            defaultChecked={visitor?.day_mode === "day" || true}
            value="day"
          />
          <label
            className="btn btn-outline-secondary btn-lg"
            htmlFor="btnRadioDay"
          >
            Autorizar 1 dia
          </label>

          <input
            {...register("day_mode")}
            type="radio"
            className="btn-check"
            id="btnRadioPeriod"
            value="period"
            defaultChecked={visitor?.day_mode === "period" || false}
          />
          <label
            className="btn btn-outline-secondary btn-lg"
            htmlFor="btnRadioPeriod"
          >
            Autorizar período
          </label>
        </div>

        <div className="wide-block py-2 mt-2">
          <div className="row">
            <div className="col-6">
              <InputGroup
                {...register("initial_date")}
                errorMsg={errors.initial_date?.message}
                label="Data Inicial"
                type="date"
                onChange={handleInitialDateChange}
                required
                defaultValue={visitor?.initial_date}
              />
            </div>
            <div className="col-6">
              <InputGroup
                {...register("final_date")}
                errorMsg={errors.final_date?.message}
                label="Data Final"
                disabled={
                  authorizationMode === "day" && visitor?.day_mode !== "period"
                }
                type="date"
                required={authorizationMode === "period"}
                defaultValue={visitor?.final_date}
              />
            </div>
          </div>

          <div className="row py-3">
            <div className="col-12 d-flex justify-content-center">
              <div className="avatar-section">
                <label htmlFor="visitorPhoto">
                  <img
                    //src={!!visitor ? visitor.visitor_photo : visitorImage}
                    src={visitorImage}
                    alt="avatar"
                    className="imaged rounded"
                    style={{ width: 130, height: 130, objectFit: "cover" }}
                  />
                  <span className="button">
                    <CameraOutline cssClasses="md hydrated" color="white" />
                  </span>
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id="visitorPhoto"
                  className="visitor-photo"
                  onChange={handleVisitorImageChange}
                />
              </div>
            </div>
          </div>
          <div className="section row">
            <div className="col-6 px-0">
              <InputGroup
                {...register("visitor_firstName")}
                errorMsg={errors.visitor_firstName?.message}
                label="Nome"
                required
                defaultValue={visitor?.visitor_firstName}
                
              />
            </div>
            <div className="col-6 ps-1">
              <InputGroup
                {...register("visitor_lastName")}
                errorMsg={errors.visitor_lastName?.message}
                label="Sobrenome"
                required
                defaultValue={visitor?.visitor_lastName}
                
              />
            </div>
            <div className="form-group boxed col-12">
              <div className="input-wrapper">
                <label className="label" htmlFor="tipo_visitante">
                  Tipo de Visitante
                </label>
                <select
                  className="form-control custom-select"
                  id="tipo_visitante"
                  {...register("visitor_type")}
                  defaultValue={visitor?.visitor_type}
                >
                  <option value="tipo_1">Tipo 1</option>
                  <option value="tipo_2">Tipo 2</option>
                  <option value="tipo_3">Tipo 3</option>
                  <option value="tipo_4">Tipo 4</option>
                </select>
                <i className="clear-input">
                  <CloseCircle cssClasses="md hydrated" />
                </i>
              </div>
            </div>
            <div className="col p-0">
              <InputGroup
                {...register("document_number")}
                label="Nº do Documento"
                errorMsg={errors.document_number?.message}
                defaultValue={visitor?.document_number}
              />
            </div>
            <div className="col">
              <InputGroup
                {...register("car_identification")}
                label="Placa do Carro"
                errorMsg={errors.car_identification?.message}
                defaultValue={visitor?.car_identification}
                style={{textTransform: 'uppercase'}}
                mask="aaa-****"
              />
            </div>
            <div className="col-12 pt-2 px-0">
              <div className="row">
                {!!visitor && (
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block py-4"
                      onClick={handleRevokeAuthorization}
                    >
                      <div className="icon-inner">
                        <TrashOutline
                          cssClasses="md hydrated me-1"
                          color="#dc3545"
                        />
                      </div>
                      Revogar
                    </button>
                  </div>
                )}
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block py-4"
                  >
                    <div className="icon-inner">
                      <QrCodeOutline
                        cssClasses="md hydrated me-1"
                        color="#FFFFFF"
                      />
                    </div>
                    {!!visitor ? "Atualizar" : "Autorizar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
