import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { Calendar } from "@natscale/react-calendar";
import "./calendar.css";
import { CalendarOutline, LinkOutline, TimeOutline } from "react-ionicons";
import {
  endOfDay,
  format,
  isValid,
  parse,
  setHours,
  startOfDay,
} from "date-fns";
import { store } from "../../../store/store";
import { getTimeRange } from "../../util/date.util";
import TermsAndConditionsAmbientBook from "./components/TermsAndConditions";
import { fShortenNumber } from "../../util/number.util";

const monthsLabel = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

const weekDaysLabel = {
  0: "DOM",
  1: "SEG",
  2: "TER",
  3: "QUA",
  4: "QUI",
  5: "SEX",
  6: "SAB",
};

export default function ReservationsBook() {
  const { innerWidth: width, innerHeight: height } = window;
  const { id } = useParams();
  const navigate = useNavigate();
  const hoursRef = useRef() ;
  const ambient = store.useState((state) =>
    state.ambients.find((e) => e.id === Number(id))
  );
  const [selectedDate, setSelectedDate] = useState();
  const [rangeTimeSelected, setRangeTimeSelected] = useState();
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [selectHourCollapse, setHourCollapse] = useState() ;
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const booksHoursBusy = useMemo(() => {
    if (!!selectedDate) {
      const reservationBook = ambient?.reservations?.filter(
        (e) => e.book_date === format(selectedDate, "yyyy-MM-dd")
      );

      return reservationBook?.map((el) => {
        const initialBookPeriod = new Date(el?.initial_book_period);
        const finalBookPeriod = new Date(el?.final_book_period);

        return `${initialBookPeriod.getHours()}:00 - ${finalBookPeriod.getHours()}:00`;
      });
    }
  }, [selectedDate, ambient]);

  const hoursRange = useMemo(() => {
    if (ambient?.book_type === "hour" && !!selectedDate) {
      return getTimeRange(
        ambient?.availableInitialHour,
        ambient?.availableFinalHour,
        60
      ).map((range) => {
        return {
          range: range,
          busy: booksHoursBusy?.some((e) => e === range),
        };
      });
    }
  }, [booksHoursBusy, selectedDate, ambient]) ;

  const onChange = (val) => {
    setSelectedDate(val);
    setRangeTimeSelected(undefined);
    //selectDateCollapse.toggle();
    if (ambient?.book_type === "hour") {
      console.log({ selectHourCollapse });
      selectHourCollapse?.show();
      setTimeout(() => {
        window.scrollTo(0, hoursRef?.current?.offsetHeight - 120);
      }, 100);
    }
  };
  function handleTimeSelect(e) {
    let [initialHour, finalHour] = e.target.value.split("-");
    if (initialHour.split(":")[0] < 10) {
      initialHour = `0${initialHour}`;
    }
    if (finalHour.split(":")[0] < 10) {
      finalHour = `0${finalHour}`;
    }

    console.log({ initialHour, finalHour });
    setRangeTimeSelected({
      initialHour: initialHour.trim(),
      finalHour: finalHour.trim(),
    });
  }

  const isDisabled = useCallback(
    (date) => {
      //Mark as disabled every date in past
      if (date.getTime() < Date.now()) return true;

      //When ambient book_type === day
      if (
        ambient?.reservations?.some((e) => {
          return (
            format(date, "dd/MM/yyyy") ===
              format(
                parse(e.book_date, "yyyy-MM-dd", Date.now()),
                "dd/MM/yyyy"
              ) && ambient?.book_type === "day"
          );
        })
      ) {
        return true;
      }

      return false;
    },
    [ambient]
  );

  const formValidated = (() => {
    if (!selectedDate) {
      return false;
    }

    if (ambient?.book_type === "hour" && !rangeTimeSelected) return false;

    if (!!booksHoursBusy?.length && ambient?.book_type === "day") return false;

    if (!acceptedTerms) return false;

    return true;
  })();

  useEffect(() => {
    setHourCollapse(() => {
      if (document.getElementById("accordionHours")) {
        return new window.bootstrap.Collapse(
          document.getElementById("accordionHours"),
          { toggle: false }
        );
      }
    });
  }, [ambient?.book_type === "hour"]);

  const handleAdvanceToConfirmation = () => {
    const date = format(selectedDate, "yyyy-MM-dd");
    let final_book_period =
      format(selectedDate, "yyyy-MM-dd") + "T" + rangeTimeSelected?.finalHour;
    let initial_book_period =
      format(selectedDate, "yyyy-MM-dd") +
      "T" +
      rangeTimeSelected?.initialHour;

    const state  = {
      book_date: date,
      id_user: 123456,
      final_book_period,
      initial_book_period,
      guests: [],
      locationName: ambient?.location,
      locationId: ambient?.id,
      tax: ambient?.tax,
      book_type: ambient?.book_type,
    };

    if (ambient?.book_type === "day") {
      state.initial_book_period = format(
        startOfDay(selectedDate),
        "yyyy-MM-dd'T'HH:mm"
      );
      state.final_book_period = format(
        startOfDay(selectedDate),
        "yyyy-MM-dd'T'HH:mm"
      );
    }
    console.log(state);
    store.update(e=>{
      e.environment = {
        bookedDate:date,
        cost:ambient.cost,
        id:ambient.id,
        name:ambient.name,
        periodDate:state.final_book_period,
        
      }
      
    })
    navigate("confirm", { state });
  };

  return (
    <div>
      <Header showGoBack title="Reserva de ambiente" rightSide={<></>} />
      <div className="extraHeader pe-0 ps-0">
        <div className="w-100 text-center">
          <h4 className="mb-0">{ambient?.name}</h4>
        </div>
      </div>
      <div style={{ marginTop: 48 }}>
        <div className="row py-2 px-3 bg-white ">
          <div className="col d-flex flex-column align-items-start">
            <h4 className="m-0">CAPACIDADE</h4>
            <p className="p-0 m-0">{ambient?.capacity} pessoas</p>
          </div>
          <div className="col d-flex flex-column align-items-center">
            <h4 className="m-0">TAXA</h4>
            <p className="p-0 m-0">R$ {fShortenNumber(ambient?.cost || 0)}</p>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <h4 className="m-0">CANCELAMENTO</h4>
            <p className="p-0 m-0">{ambient?.cancelation}</p>
          </div>
        </div>
        <div className="section my-2">
          <div className="card">
            <div className="card-body d-flex align-items-center justify-content-between">
              <p className="small p-0 m-0">
                Li e aceito as{" "}
                <a href="#" onClick={() => setShowTermsAndConditions(true)}>
                  condições de reserva
                </a>
              </p>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="aceiteReservaCheck"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label
                  htmlFor="aceiteReservaCheck"
                  className="form-check-label"
                ></label>
              </div>
            </div>
          </div>
        </div>
        {acceptedTerms && (
          <div className="accordion" id="accordionExample2">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button reset-arrow"
                  type="button"
                  //data-bs-toggle="collapse"
                  data-bs-target="#accordionCalendar"
                  aria-expanded="false"
                >
                  <CalendarOutline cssClasses="text-primary me-2" />
                  {!selectedDate
                    ? "Selecione uma data"
                    : `Data selecionada: ${format(selectedDate, "dd/MM/yyyy")}`}
                </button>
              </h2>
              <div>
                <div className="accordion-body p-0">
                  <Calendar
                    size={width}
                    value={selectedDate || []}
                    onChange={onChange}
                    isDisabled={isDisabled}
                    monthsLabel={monthsLabel}
                    weekDaysLabel={weekDaysLabel}
                  />
                </div>
              </div>
            </div>
            {ambient?.book_type === "hour" && (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordionHours"
                    aria-expanded="false"
                  >
                    <TimeOutline cssClasses="text-primary me-2" />
                    {!!rangeTimeSelected
                      ? `Horário selecionado: ${rangeTimeSelected.initialHour} - ${rangeTimeSelected.finalHour}`
                      : "Selecione um horário"}
                  </button>
                </h2>
                <div
                  id="accordionHours"
                  className="accordion-collapse"
                  data-bs-parent="#accordionExample2"
                  ref={hoursRef}
                >
                  <div className="accordion-body">
                    {!selectedDate ? (
                      <p className="p-0 text-small text-muted text-center">
                        Defina uma data primeiro
                      </p>
                    ) : (
                      <div className="row">
                        <div className="col-12 p-0">
                          <div
                            className="input-list"
                            onChange={handleTimeSelect}
                          >
                            {hoursRange.map((el) => {
                              const uniqueId = Math.floor(
                                Math.random() * 5000
                              ).toString();
                              return (
                                <div className="form-check" key={el.range}>
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="selectedHour"
                                    id={uniqueId}
                                    value={el.range}
                                    disabled={!!el.busy}
                                  />
                                  <label
                                    htmlFor={uniqueId}
                                    className="form-check-label"
                                  >
                                    <span
                                      className={
                                        !!el.busy ? "text-danger" : undefined
                                      }
                                    >
                                      {el.range}
                                      {!!el.busy && " Reservado"}
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="section mt-2">
          <div className="row">
            <div className="col-12 mt-2">
              <button
                className="btn btn-primary btn-lg btn-block"
                disabled={!formValidated}
                onClick={handleAdvanceToConfirmation}
              >
                Avançar
              </button>
            </div>
          </div>
        </div>
      </div>
      <TermsAndConditionsAmbientBook
        showModal={showTermsAndConditions}
        onClose={() => setShowTermsAndConditions(false)}
      />
    </div>
  );
}
{
  /* <Calendar
size={width}
value={value}
onChange={onChange}
isDisabled={isDisabled}
monthsLabel={monthsLabel}
weekDaysLabel={weekDaysLabel}
hideAdjacentDates
/> */
}
