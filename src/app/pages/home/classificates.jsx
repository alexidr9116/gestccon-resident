import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../../../store/store'
import { classificatesMock } from '../../data/mocks'
import { reservationsMock } from '../reservations/mock'

const Splide = window.Splide

export default function Classificates() {

  const classificates = store.useState(state => state.classificates)

  useEffect(() => {
    new Splide('.carousel-classificates', {
      perPage: 1,
      rewind: true,
      type: "loop",
      gap: 16,
      padding: 16,
      arrows: false,
      pagination: false,
      breakpoints: {
        768: {
          perPage: 2
        },
        991: {
          perPage: 3
        }
      }
    }).mount()
  })
  return (
    <div>
      <div className="section full mt-4">
        <div className="section-heading padding">
          <h2 className="title">Classificados</h2>
          <Link to="/app/classificates" className="link">Ver Todos</Link>
        </div>

        <div className="carousel-classificates splide splide--loop splide--ltr splide--draggable is-active" style={{ visibility: 'visible' }}>
          <div className="splide__track" id="splide04-track" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            <ul className="splide__list" id="splide04-list" style={{ transform: 'translateX(-0px)' }}>
              {classificates.map((el, i) => {
                return <li key={i} className="splide__slide is-active is-visible" id="splide03-slide01" aria-hidden="false" tabIndex={0} style={{ marginRight: '16px', height: 200, width: '163.5px' }}>
                  <Link to={'classificates/'+el.id} state={el}>
                    <div className="blog-card">
                      <div style={{ display: 'flex', overflow: 'hidden', height: '150px' }} >
                        <img style={{ objectFit: 'cover' }} src={el.images[0]} />
                      </div>
                      <div className="text">
                        <h4 className="title">{el.title}</h4>
                      </div>
                    </div>
                  </Link>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

