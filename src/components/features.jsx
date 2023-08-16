import React from "react";

export const Features = (props) => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title about-text">
          <h2>Nuestra organización en números</h2>
          <p>Gracias al apoyo de nuestros productores y a los clientes que confían en nosotros, 
            hoy en día somos una de las principales organizaciones de seguros del país.</p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  {" "}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  {/* <p>{d.text}</p> */}
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
