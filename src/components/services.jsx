import React from "react";


export const Services = (props) => {
  const openNewWindow = () => {
    window.open('/mapa', '_blank');
  };

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Cotizador Agro</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <h3>Seguí estos pasos para que podamos cotizar tu seguro</h3><br></br><br></br>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className="paso-number">{d.icon}</i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
        <button onClick={openNewWindow} type="submit" className="btn btn-custom btn-lg">
          Ir al mapa
        </button>
      </div>
    </div>
  );
};
