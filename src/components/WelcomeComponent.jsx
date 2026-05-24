import React from 'react'
import welcome from '../assets/welcome.png'
import closedup from '../assets/bird1.jpg'
import closeddown from '../assets/bird2.jpg'

export const WelcomeComponent = ({name}) => {
  return (
    <>
    <div className='row'>
        <div className='row'>
            <h1 className='text-primary fs-3'>{name}</h1>
        </div>
        <div className='row mt-4'>
            <div className='col col-7'>
                <img src={welcome} alt="welcome" className='img-fluid rounded-3'/>
            </div>
            <div className='col col-3  d-flex flex-column justify-content-end align-items-end gap-4'>
                <img src={closedup} alt="closedup" className='img-fluid rounded-3'/>
                    <img src={closeddown} alt="closeddown" className='img-fluid rounded-3' />
            </div>
        </div>
    </div>
    </>
  )
}
