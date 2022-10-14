import "react-datepicker/dist/react-datepicker.css";

import React, { MutableRefObject } from "react";
import Header from "../../../components/Header";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import * as yup from "yup";
import InputGroup from "../../../components/InputGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DatePicker from "react-datepicker";

const schema = yup.object({
  id: yup.string(),
  date: yup
    .date()
    .min(format(Date.now(), "yyyy/MM/dd"), "Digite uma data válida")
    .required("Digite uma data válida"),
  moving_type: yup.string().required("Campo obrigatório"),
  observation: yup.string(),
});

export default function HomeMovingForm() {
  const { openDialog } = useAlertDialogContext();
  const navigate = useNavigate(); 
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    openDialog({
      type: "success",
      title: "Sucesso!",
      message: "Pedido de mudança enviado!",
      buttons: [
        {
          text: "OK",
        },
      ],
    });

    navigate("/app", { replace: true });
  }

  return (
    <div>
      <Header showGoBack title="Mudança" rightSide={<></>} />
      <div className="section mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12">
              {/* Data */}
              <div className="form-group boxed">
                <div className="input-wrapper">
                  <label className="label" htmlFor="text4b">
                    <span className="text-danger small">*</span> Data da mudança
                  </label>

                  <Controller
                    control={control}
                    name="date"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <DatePicker
                        onBlur={onBlur} // notify when input is touched
                        onChange={(date) => setValue('date', date)} // send value to hook form
                        inputRef={ref}
                        className="form-control"
                        locale={ptBR}
                        dateFormat="EEEE' - ' dd/LLL/yyyy"
                        selected={value}
                      />
                    )}
                  />
                </div>
                {!!errors.date && (
                  <span className="text-danger small">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group boxed">
                <div className="input-wrapper">
                  <label className="label" htmlFor="observation">
                    <span className="text-danger">* </span>
                    Tipo de Mudança
                  </label>
                  <select
                    {...register("moving_type")}
                    className="form-control custom-select"
                  >
                    <option value="ENTRADA" defaultChecked>
                      Entrada
                    </option>
                    <option value="SAIDA" defaultChecked>
                      Saída
                    </option>
                    <option value="SAIDA"></option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group boxed">
                <div className="input-wrapper">
                  <label className="label" htmlFor="observation">
                    Observação
                  </label>
                  <textarea
                    {...register("observation")}
                    rows={8}
                    className="form-control"
                    placeholder="Insira a uma observação"
                  ></textarea>
                </div>
              </div>
              {/*   {!!errors.observation && (
                <span className="text-danger small">
                  {errors.observation.message}
                </span>
              )} */}
            </div>
            {/* Button */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
