import React from 'react'
import { ArrowDownOutline } from 'react-ionicons'
import Header from '../../../components/Header'

export default function NotificationsPage() {
  return (
    <div>
      <Header showGoBack title='Notificações' rightSide={<></>} />

      <div className="section-full">
        <ul className="listview image-listview flush">
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </ul>
      </div>

    </div>
  )
}

const NotificationItem = () => {
  return <li className="">
    <a href="#" className="item">
      <div className="icon-box bg-primary">
        <ArrowDownOutline cssClasses='md hydrated' />
      </div>
      <div className="in">
        <div>
          <div className="mb-05"><strong>Título da Notificação</strong></div>
          <div className="text-small mb-05">Prévia do conteúdo da notificação</div>
          <div className="text-xsmall">5/3/2020 10:30</div>
        </div>
        <span className="badge badge-primary badge-empty"></span>
      </div>
    </a>
  </li>
}