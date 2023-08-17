import React,{useContext} from 'react'
import Link from "next/link"
import { GlobalContext } from "../context/globalState";
export default function FlightDetails() {
  const { changeShow, flightdetails,return_journey,twowaydetails } = useContext(GlobalContext);
  //console.log(twowaydetails)
    let drawer_class = ['side-drawer'];
    // if (show) {
    //     drawer_class.push('open')
    // }
  return (
      
      <div className="side-drawer">
        <div className="header">
          <p className="head">FLIGHT ITINERARY</p>
          <div>
          <img src="https://images.travelxp.com/images/txpin/vector/general/itineraryheaderimage.svg" className="header-img"></img>
          <img onClick={()=>changeShow()} src="https://images.travelxp.com/images/txpin/vector/general/closebutton.svg" className="header-cross"></img>
          </div>
      </div>
      {return_journey ?
        <div>
        <div className="twowayjourney">
      <div className="flight-details-dur">
            <p className="item">
              {twowaydetails.going.segs[0].segdet}
            </p>
            <p className="item">
              {twowaydetails.going.segs[0].fdu.split(":")[0]}h {twowaydetails.going.segs[0].fdu.split(":")[1]}m
          </p>
          </div>
          <div className="border-details"></div>
          <div>
            {twowaydetails.going.segs[0].legs.map((item, index) => (
              <div>
                <div className="flight-items">
                  <p>
                    <span>
                      <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${item.mkc.toString().toLowerCase()}.svg`} className="airlineimg" />
             
 
                    </span>
                    <span className="item">
                      {item.mcn} | {item.mkc} {item.actyp}
                    </span>
                  </p>
                  <p className="item">
                    {item.fcl.toString().toUpperCase()}
                  </p>

          
                </div>
                <div className="flight-itenary">
                  <div className="from">
                    <p className="code">{item.lff}</p>
                    <p className="city">{item.fct},{item.frmcon}</p>
                    <p className="time">{item.ldti.toString().substr(11)}</p>
                    <p className="date">{item.ldti.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fdt}</p>
                  </div>
                  <img src="./flight.jpeg" className="cf" />
                  <div className="from to">
                    <p className="code">{item.lft}</p>
                    <p className="city">{item.tct},{item.tocon}</p>
                    <p className="time">{item.lati.toString().substr(11)}</p>
                    <p className="date">{item.lati.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fat}</p>
                  </div>
                </div>
                <div className="bag-meal">
                  <p className="item">
                    <img src="https://images.travelxp.com/images/txpin/vector/general/baggage.svg" className="jsx-1201596912 bagimg"></img>
                    <span className="bags">{item.baggage[1].fa} | {item.baggage[0].fa} </span>
                  </p>
                  <p className="item">
              
                    <img src="https://images.travelxp.com/images/txpin/vector/general/meals.svg" className="jsx-1201596912 mealimg"></img>
                    {(item.freemeal)!== 0 ? <span className="meals">Meals Included</span> : <span className="meals">No meals</span>}
                  </p>
                </div>
              </div>
          
            ))}
          </div>

          <div className="flight-details-dur">
            <p className="item">
              {twowaydetails.coming.segs[0].segdet}
            </p>
            <p className="item">
              {twowaydetails.coming.segs[0].fdu.split(":")[0]}h {twowaydetails.coming.segs[0].fdu.split(":")[1]}m
          </p>
          </div>
          <div className="border-details"></div>
          <div>
            {twowaydetails.coming.segs[0].legs.map((item, index) => (
              <div>
                <div className="flight-items">
                  <p>
                    <span>
                      <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${item.mkc.toString().toLowerCase()}.svg`} className="airlineimg" />
             
 
                    </span>
                    <span className="item">
                      {item.mcn} | {item.mkc} {item.actyp}
                    </span>
                  </p>
                  <p className="item">
                    {item.fcl.toString().toUpperCase()}
                  </p>

          
                </div>
                <div className="flight-itenary">
                  <div className="from">
                    <p className="code">{item.lff}</p>
                    <p className="city">{item.fct},{item.frmcon}</p>
                    <p className="time">{item.ldti.toString().substr(11)}</p>
                    <p className="date">{item.ldti.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fdt}</p>
                  </div>
                  <img src="./flight.jpeg" className="cf" />
                  <div className="from to">
                    <p className="code">{item.lft}</p>
                    <p className="city">{item.tct},{item.tocon}</p>
                    <p className="time">{item.lati.toString().substr(11)}</p>
                    <p className="date">{item.lati.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fat}</p>
                  </div>
                </div>
                <div className="bag-meal">
                  <p className="item">
                    <img src="https://images.travelxp.com/images/txpin/vector/general/baggage.svg" className="jsx-1201596912 bagimg"></img>
                    <span className="bags">{item.baggage[1].fa} | {item.baggage[0].fa} </span>
                  </p>
                  <p className="item">
              
                    <img src="https://images.travelxp.com/images/txpin/vector/general/meals.svg" className="jsx-1201596912 mealimg"></img>
                    {(item.freemeal)!== 0 ? <span className="meals">Meals Included</span> : <span className="meals">No meals</span>}
                  </p>
                </div>
              </div>
          
            ))}
            </div>
            
         </div>
         <div className="total-fare">
            <p className="text">TOTAL FARE</p>
            <div className="fare-button">
              <p className="fare"> ₹ {twowaydetails.going.fares[0].tot+twowaydetails.coming.fares[0].tot}</p>
              <a className="jsx-4035712791 button">Confirm</a>
            </div>
          </div>
      </div> :
        <div>
          <div className="flight-details-dur">
            <p className="item">
              {flightdetails.segs[0].segdet}
            </p>
            <p className="item">
              {flightdetails.segs[0].fdu.split(":")[0]}h {flightdetails.segs[0].fdu.split(":")[1]}m
          </p>
          </div>
          <div className="border-details"></div>
          <div className="stops-list">
            {flightdetails.segs[0].legs.map((item, index) => (
              <div>
                <div className="flight-items">
                  <p>
                    <span>
                      <img src={`https://images.travelxp.com/images/txpin/vector/airlines/${item.mkc.toString().toLowerCase()}.svg`} className="airlineimg" />
             
 
                    </span>
                    <span className="item">
                      {item.mcn} | {item.mkc} {item.actyp}
                    </span>
                  </p>
                  <p className="item">
                    {item.fcl.toString().toUpperCase()}
                  </p>

          
                </div>
                <div className="flight-itenary">
                  <div className="from">
                    <p className="code">{item.lff}</p>
                    <p className="city">{item.fct},{item.frmcon}</p>
                    <p className="time">{item.ldti.toString().substr(11)}</p>
                    <p className="date">{item.ldti.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fdt}</p>
                  </div>
                  <img src="./flight.jpeg" className="cf" />
                  <div className="from to">
                    <p className="code">{item.lft}</p>
                    <p className="city">{item.tct},{item.tocon}</p>
                    <p className="time">{item.lati.toString().substr(11)}</p>
                    <p className="date">{item.lati.toString().substr(0, 11)}</p>
                    <p className="airport">{item.fat}</p>
                  </div>
                </div>
                <div className="bag-meal">
                  <p className="item">
                    <img src="https://images.travelxp.com/images/txpin/vector/general/baggage.svg" className="jsx-1201596912 bagimg"></img>
                    <span className="bags">{item.baggage[1].fa} | {item.baggage[0].fa} </span>
                  </p>
                  <p className="item">
              
                    <img src="https://images.travelxp.com/images/txpin/vector/general/meals.svg" className="jsx-1201596912 mealimg"></img>
                    {(item.freemeal)!== 0 ? <span className="meals">Meals Included</span> : <span className="meals">No meals</span>}
                  </p>
                </div>
              </div>
          
            ))}
          </div>
          <div className="total-fare">
            <p className="text">TOTAL FARE</p>
            <div className="fare-button">
              <p className="fare"> ₹ {flightdetails.ft}</p>
              <a className="jsx-4035712791 button">Confirm</a>
            </div>
          </div>
        </div>}
      </div>
      
    )
}