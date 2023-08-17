import React from 'react'
import type { FunctionComponent } from 'react'
type Props = {
  from: String;
  to: String;
  fdu: String;
  ddt: String;
  adt: String;
  airline: String;
  stop: number;
  amount: String;
  
}
const Flights: FunctionComponent<Props> = ({  from,
  to,
  fdu,
  ddt,
  adt,
  airline,
  stop,amount}:Props)=> {
  return (
    <div>
      <section className="flight flight-inside">

        <p className="disp-space">
<span>
        <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${airline}.svg`} className="airlineimg"/></span>
          <span className="time">{ddt.toString().substr(11)}</span>  -  <span className="time">{adt.toString().substr(11)}</span>
        </p>
        
        <div className="disp-space">
        <p className="time">
            {fdu.split(":")[0]}h {fdu.split(":")[1]}m 
        </p>
          <p className="details">{from} - {to}</p>
        </div>
        {stop == 0 ?
          <p className="time disp-space" >Non Stop</p> : <p className="time disp-space">{stop} Stop</p>}
        <span className="ll"></span>
        <div className="disp-space">
        
          <span>Rs { amount}</span>
          </div>
          
      </section>
      <section className="flight flight-fulls">


<div className="timing">
           
          <div className="width-time">
            <p className="time">{ddt.toString().substr(11)}</p>
            <p className="time">{from}</p>
            </div>
          <div className="flight-desc-border">
          <p className="time stops-width">
    {fdu.split(":")[0]}h {fdu.split(":")[1]}m  <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${airline}.svg`} className="airlineimg" />
</p>
            <p className="flight-dec"></p>
            {stop == 0 ?
  <p className="time stops-width" >Non Stop</p> : <p className="time stops-width">{stop} Stop</p>}
          </div>
          <div className="width-time">
          <p className="time">{adt.toString().substr(11)}</p>
            <p className="time">{to}</p>
            </div>
</div>
<div className="disp-space">

  <p className="amount-width">₹ { amount}</p>
  </div>
  
</section>
    </div>
  )
}

export default Flights;
