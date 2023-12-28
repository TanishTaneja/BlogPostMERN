import React, { useState } from 'react';

const Navbar = () => {
  const [style, setStyle] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="index.html">Blogs</a>
          <button onClick={() => {
            setStyle(!style);
          }} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div id="navbarResponsive2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div style={style ? {
            height: "100px",
            overflow: "hidden",
            transition: "0.4s"
          } : {
            height: "0px",
            overflow: "hidden",
            transition: "0.4s"
          }} className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;
