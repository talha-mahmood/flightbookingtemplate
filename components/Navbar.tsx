import type {FunctionComponent}from 'react'
import Link from "next/link";
const Navbar:FunctionComponent=()=> {
  return (
    <div className="navbar">
      <div className="nav-comp">
      <div className="nav-logo">
        <p className="item">Flights</p>
      </div>
      <div className="nav-menu">
      <Link href="/" ><a className="item"><img src="https://images.travelxp.com/images/txpin/vector/general/home.svg"/></a></Link>
        <Link href="/flights" ><a className="item"><img src="https://images.travelxp.com/images/txpin/vector/general/flight.svg"/></a></Link>
        </div>
        </div>
    </div>
  )
}
export default Navbar;
