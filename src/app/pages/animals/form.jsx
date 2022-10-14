import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { store } from "../../../store/store";
import InputGroup from "../../../components/InputGroup";
import { CameraOutline } from "react-ionicons";
import "../../../css/visitor.css";
import { addAnimal, deleteAnimal, updateAnimal } from "../../services/animals.service";
import { useAlertDialogContext } from "../../../contexts/alert.context";

const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  photo: yup.string(),
  breed: yup.string().required("Campo obrigatório"),
});

const defaultImg = "/assets/img/sample/avatar/avatar1.jpg";

export default function AnimalsForm() {
  const { id } = useParams();
  const [animalImage, setAnimalImage] = useState(defaultImg);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { openDialog } = useAlertDialogContext();
  const navigate = useNavigate();

  const animal = store.useState((store) =>
    store.animals.find((e) => e.id === id)
  );

  function handleAnimalImageChange(e) {
    const image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        setAnimalImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(image);
  }

  function onSubmit(data) {
    if (!animal) {
      addAnimal({
        id: Date.now().toString(),
        breed: data.breed,
        photo: animalImage,
        name: data.name,
      });
      openDialog({
        type: "success",
        title: "Sucesso!",
        message: "Animal incluído!",
        buttons: [
          {
            text: "OK",
            onClick: () => {
              navigate(-1);
            },
          },
        ],
      });
    } else {
      data.photo = animalImage;
      updateAnimal(id, { ...animal, ...data });
      navigate(-1)
    }
  }

  function handleDeleteAnimal(){
    deleteAnimal(id)
    navigate(-1)
  }

  useEffect(() => {
    if (animal) {
      setAnimalImage(animal.photo);
    }
  }, [animal]);

  if (id && !animal) {
    return <Navigate to="../" replace={true} />;
  }

  return (
    <div>
      <Header
        showGoBack
        title={!!animal ? "Detalhes do Animal" : "Novo Animal"}
        rightSide={<></>}
      />
      <div className="section mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="avatar-section">
                <label htmlFor="animalPhoto">
                  <img
                    //src={!!visitor ? visitor.visitor_photo : visitorImage}
                    src={animalImage}
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
                  id="animalPhoto"
                  className="visitor-photo"
                  onChange={handleAnimalImageChange}
                />
              </div>
            </div>
            <div className="col-12">
              <InputGroup
                {...register("name")}
                label="Nome do Animal"
                errorMsg={errors.name?.message}
                required
                defaultValue={animal?.name}
              />
            </div>
            <div className="col-12">
              <InputGroup
                {...register("breed")}
                label="Raça"
                errorMsg={errors.breed?.message}
                required
                defaultValue={animal?.breed}
              />
            </div>
          </div>
          <div className="row mt-2">
            {!!animal && (
              <div className="col">
                <button className="btn btn-block btn-outline-danger" onClick={handleDeleteAnimal}>
                  Excluir
                </button>
              </div>
            )}
            <div className="col">
              <button type="submit" className="btn btn-block btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
