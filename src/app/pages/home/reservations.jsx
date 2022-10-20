import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import useAuth from '../../../hooks/useAuth'
import { store } from '../../../store/store'


// import { ambientsMock } from '../../data/mocks'
import axios, { HOST_API } from '../../util/axios'
import { informativesMock } from '../informatives/mock'

const Splide = window.Splide

export default function Reservations() {
  const [environments, setEnvironments] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('/resident/environment/gets').then(res => {
      if (res.status === 200 && res.data.data) {
        setEnvironments(res.data.data.environments)
        store.update(e => {
          e.ambients = res.data?.data?.environments;
        })
      }
    }).catch(err => {

    }).finally(() => {
      setLoading(false)
    })
  }, [user]);
  useEffect(() => {
    if (environments.length > 0)
      new Splide('.carousel-multiple', {
        perPage: 1,
        rewind: false,
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
  }, [environments])
  return (
    <div>
      <div className="section full mt-4">
        <div className="section-heading padding">
          <h2 className="title">Reserva de Ambiente</h2>
          <Link to="/app/reservations" className="link">Ver Todas</Link>
        </div>
        {loading &&
          <div className='w-100' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
            <div>
              <PropagateLoader color="#36d7b7" />
            </div>

          </div>

        }
        <div className="carousel-multiple splide splide--loop splide--ltr splide--draggable is-active" style={{ visibility: 'visible' }}>
          <div className="splide__track" id="splide02-track" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            <ul className="splide__list" id="splide02-list" style={{ transform: 'translateX(-0px)' }}>

              {!loading && environments.map((el, i) => {
                return <li key={i} className="splide__slide is-active is-visible" id={`${el.id}`} aria-hidden="false" tabIndex={0} style={{ marginRight: '16px', height: 200 }}>
                  <Link to={'reservations/book/' + el.id}>
                    <div className="blog-card" style={{ width: '100%', }}>
                      <div style={{ display: 'flex', overflow: 'hidden', height: '150px' }} >
                        <img className='imaged w-100' src={`${HOST_API}${el.image}`} alt="" />
                      </div>
                      <div className="text">
                        <h4 className="title">{el.name}</h4>
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

