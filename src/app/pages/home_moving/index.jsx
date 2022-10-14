import React, { MutableRefObject, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import HomeMovingForm from "./form";
import "./style.css";

export default function HomeMovingRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeMovingIndex />} />
        <Route path="/confirm" element={<HomeMovingForm />} />
      </Routes>
    </div>
  );
}

function HomeMovingIndex() {
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header showGoBack title="Mudança" rightSide={<></>} />
      <div className="d-flex flex-column section px-2">
        <div
          className=" flex-1"
          style={{ maxHeight: "65vh", overflowY: "scroll" }}
        >
          <p
            className="small text-black text-jusity"
            style={{ textAlign: "justify" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            harum iste et beatae corrupti officiis deleniti dignissimos
            praesentium magni, vero qui minima modi aliquam non nisi numquam
            repellendus culpa est. Vel, perspiciatis aut asperiores hic cum
            aspernatur at! Magni natus labore ullam explicabo deleniti ipsam
            nulla, mollitia placeat et aliquid suscipit esse, aut hic corrupti
            architecto atque vero omnis dolores? Veniam impedit eius corrupti
            beatae consequatur cupiditate labore error voluptates voluptate
            neque atque in reiciendis eum aliquam sint consequuntur nulla quasi,
            harum, illum saepe? Cupiditate natus similique nobis illum neque.
            Delectus voluptatum laudantium earum nihil! Sed rem pariatur
            necessitatibus error commodi eligendi doloremque laudantium ullam
            quia, explicabo voluptatibus corrupti iusto animi esse eum earum
            perspiciatis maxime! Commodi, sed beatae! Cum. Nulla laudantium
            soluta veritatis, deleniti accusantium amet dolor repellendus
            inventore natus consectetur quidem exercitationem corporis rem!
            Similique reprehenderit quia deleniti facilis accusantium eveniet,
            obcaecati cumque, officia, repellat odio a magni!Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Dolorum harum iste et beatae
            corrupti officiis deleniti dignissimos praesentium magni, vero qui
            minima modi aliquam non nisi numquam repellendus culpa est. Vel,
            perspiciatis aut asperiores hic cum aspernatur at! Magni natus
            labore ullam explicabo deleniti ipsam nulla, mollitia placeat et
            aliquid suscipit esse, aut hic corrupti architecto atque vero omnis
            dolores? Veniam impedit eius corrupti beatae consequatur cupiditate
            labore error voluptates voluptate neque atque in reiciendis eum
            aliquam sint consequuntur nulla quasi, harum, illum saepe?
            Cupiditate natus similique nobis illum neque. Delectus voluptatum
            laudantium earum nihil! Sed rem pariatur necessitatibus error
            commodi eligendi doloremque laudantium ullam quia, explicabo
            voluptatibus corrupti iusto animi esse eum earum perspiciatis
            maxime! Commodi, sed beatae! Cum. Nulla laudantium soluta veritatis,
            deleniti accusantium amet dolor repellendus inventore natus
            consectetur quidem exercitationem corporis rem! Similique
            reprehenderit quia deleniti facilis accusantium eveniet, obcaecati
            cumque, officia, repellat odio a magni!
          </p>
        </div>
        <div className="">
          <div className="card mt-2">
            <div className="card-body d-flex flex-column align-items-center justify-content-center px-2">
              <button
                className={`btn btn-primary position-absolute px-5 ${
                  !!termsChecked ? "fade-in" : "opacity-0"
                }`}
                onClick={() => navigate("confirm")}
              >
                Avançar
              </button>
              <div className={`form-check ${!!termsChecked && "fade-out"}`}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheckb3"
                  checked={termsChecked}
                  onChange={() => setTermsChecked((state) => !state)}
                />
                <label className="form-check-label" htmlFor="customCheckb3">
                  Li e aceito os critérios de mudança
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
