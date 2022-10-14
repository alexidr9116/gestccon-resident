import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  LogoFacebook,
  LogoInstagram,
  LogoLinkedin,
  LogoTwitter,
  LogoWhatsapp,
  ShareOutline,
} from "react-ionicons";
import Header from "../../../components/Header";
import { store } from "../../../store/store";

export default function InformativePostPage() {
  const { id } = useParams();
  console.log({id})
  const informative = store.useState((state) =>
    state.informatives.find((e) => e.id === Number(id))
  );

  const [shareModal, setShareModal] = useState() ;

  useEffect(() => {
    setShareModal(
      new window.bootstrap.Modal(document.getElementById("actionSheetShare"))
    );
  }, []);

  function handleShareButton() {
    shareModal?.show();
  }
  return (
    <div className="bg-white">
      <Header
        showGoBack
        title="Informativo"
        rightSide={<ShareButton onClick={handleShareButton} />}
      />
      <div className="section pt-2">
        <h1>{informative?.title}</h1>
        <div className="blog-header-info mt-2 mb-2">
          <div>
            <img
              src={informative?.image}
              alt="img"
              className="imaged rounded me-05"
              style={{ width: 24, height: 24 }}
            />
            por <a href="#">Marco Aurélio</a>
          </div>
          <div>24, Setembro 2022</div>
        </div>
        <div className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam
          fringilla euismod. Nulla viverra eu ante tincidunt viverra. Sed
          dignissim maximus turpis et dictum.
        </div>
      </div>

      <div className="section mt-2">
        <p>
          Proin luctus viverra volutpat. Aenean hendrerit nisi quis consequat
          pretium. Maecenas ut vestibulum justo. Morbi eleifend ante eget arcu
          sodales malesuada. Nunc interdum ac diam ut bibendum. Proin gravida
          sit amet urna ac scelerisque. Vivamus consectetur ex vel felis
          bibendum fermentum.
        </p>
        <figure>
          <img
            src="/assets/img/sample/photo/3.jpg"
            alt="image"
            className="imaged img-fluid"
          />
        </figure>
        <p>
          Nullam augue magna, dignissim sit amet libero eu, ultrices tempus
          metus. Ut finibus ac justo eu tempor. Quisque egestas lectus neque,
          quis sodales lacus volutpat id.
        </p>
        <h3>Quisque id risus diam</h3>
        <p>
          Vivamus venenatis at purus at varius. Nam pharetra, magna et interdum
          dignissim, purus risus ullamcorper ipsum, et pharetra turpis ex vel
          orci.
        </p>
        <figure>
          <img
            src="/assets/img/sample/photo/1.jpg"
            alt="image"
            className="imaged img-fluid"
          />
        </figure>
        <h3>Pellentesque dictum</h3>
        <p>
          Pellentesque condimentum ornare nibh, nec iaculis purus faucibus ac.
          Etiam lacus ante, eleifend et aliquam a, tristique vel urna.
        </p>
        <p>
          Vivamus venenatis at purus at varius. Nam pharetra, magna et interdum
          dignissim, purus risus ullamcorper ipsum, et pharetra turpis ex vel
          orci. Nulla tincidunt nibh ac elit semper placerat. Fusce mattis,
          sapien vel vulputate scelerisque, ligula erat mollis elit, vitae
          condimentum ante leo quis quam. Vivamus sit amet quam ut eros varius
          venenatis et et orci. Pellentesque dictum egestas odio, sed auctor
          nulla euismod quis. Donec elementum feugiat ex, nec pharetra nulla
          sodales ac.
        </p>
      </div>

      <div className="section my-3 py-3">
        <a
          href="#"
          className="btn btn-block btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#actionSheetShare"
        >
          <ShareOutline cssClasses="md hydrated me-2" color="white" />
          Compartilhe este post
        </a>
      </div>
      <ShareActionSheet />
    </div>
  );
}

function ShareButton({ onClick }) {
  return (
    <a onClick={onClick}>
      <ShareOutline />
    </a>
  );
}

function ShareActionSheet() {
  function handleWhatsappClick() {
    const message = encodeURI(
      "Informativo: https://gestconn.com/app/informative/ask2354a"
    );
    window.open("https://wa.me/?text=" + message, "_blank");
  }

  return (
    <div
      className="modal fade action-sheet inset"
      id="actionSheetShare"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Compartilhar com</h5>
          </div>
          <div className="modal-body">
            <ul className="action-button-list">
              <li>
                <a
                  href="#"
                  className="btn btn-list"
                  onClick={handleWhatsappClick}
                  data-bs-dismiss="modal"
                >
                  <span>
                    <LogoWhatsapp cssClasses="md hydrate me-1" />
                    Whatsapp
                  </span>
                </a>
              </li>
              {/* <li>
                <a href="#" className="btn btn-list" data-bs-dismiss="modal">
                  <span>
                    <LogoTwitter cssClasses="md hydrate me-1" />
                    Twitter
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="btn btn-list" data-bs-dismiss="modal">
                  <span>
                    <LogoInstagram cssClasses="md hydrate me-1" />
                    Instagram
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="btn btn-list" data-bs-dismiss="modal">
                  <span>
                    <LogoLinkedin cssClasses="md hydrate me-1" />
                    Linkedin
                  </span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
