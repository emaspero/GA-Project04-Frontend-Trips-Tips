import React from 'react'

export default function Alerts(props) {
  return (
    <div className={`alert ${props.popup.type} ${props.showPopup ? 'alert-shown' : 'alert-hidden'}`}>
      {props.popup.message}
    </div>     
  )
}
