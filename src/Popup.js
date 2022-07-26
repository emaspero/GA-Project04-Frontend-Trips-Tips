import React from 'react'

export default function Alerts(props) {
  return (
    <div className={`alert ${props.type}`}>
      {props.message}
    </div>  
  )
}
