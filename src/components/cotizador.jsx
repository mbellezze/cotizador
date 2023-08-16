import React from "react";

export const Cotizador = (props) => {
  return (
    <div id="cotizador" className="text-center">
      <div className="container">
        <div className="container-formMap">
          <div>
            <form name="sentMessage" validate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Nombre*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          className="form-control"
                          placeholder="Apellido*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="areaTel">
                          <p>0</p>
                          <input
                            type="number"
                            id="codArea"
                            name="codArea"
                            className="form-control"
                            placeholder="Cód. área*"
                            required
                            
                          />
                          <p className="help-block text-danger"></p>
                          <p>15</p>
                          <input
                            type="number"
                            id="celphone"
                            name="celphone"
                            className="form-control"
                            placeholder="Celular*"
                            required
                            
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="document"
                          name="document"
                          className="form-control"
                          placeholder="DNI o CUIT*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <select className="form-control">
                      {props.data
                        ? props.data.map((d, i) => (  
                            <option 
                              key={`${d.id}-${i}`} 
                              className="col-md-4" 
                              value="asd">{d.nombre}</option>
                          ))
                        : "loading"}
                       </select>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                      <select className="form-control">
                      {props.data
                        ? props.data.map((d, i) => (  
                            <option 
                              key={`${d.id}-${i}`} 
                              className="col-md-4" 
                              value="asd">{d.nombre}</option>
                          ))
                        : "loading"}
                       </select>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <input
                          type="number"
                          id="hecta"
                          name="hecta"
                          className="form-control"
                          placeholder="Cantidad de Hectáreas*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select className="form-control">
                                <option value="">Cultivo</option>
                                <option value="">Cebada</option>
                                <option value="">Girasol</option>
                                <option value="">Maiz</option>
                                <option value="">Soja</option>
                                <option value="">Sorgo</option>
                                <option value="">Trigo</option>
                            </select>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <input
                          type="number"
                          id="priceHec"
                          name="priceHec"
                          className="form-control"
                          placeholder="Valor Estimado por ha*"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select className="form-control">
                                <option value="">Moneda</option>
                                <option value="">Pesos</option>
                                <option value="">Dólar</option>
                            </select>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <input
                          type="file"
                          id="inputFile"
                          name="inputFile"
                          className="form-control"
                          placeholder=""
                          accept=".jpg, .jpeg, .png"
                          required
                          
                        />
                        <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Mensaje Adicional (opcional)"
                      required
                      
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Cotizar
                  </button>
                  <a href="/mapa">Ir</a>
            </form>
          </div>
          <div>
            <iframe title="mapa" width="500" height="100%" frameborder="0" marginheight="0" marginwidth="0" src={"https://www.openstreetmap.org/export/embed.html?bbox=-70.04882812500001%2C-39.605688178320804%2C-61.63330078125001%2C-34.705493410225465&amp;layer=mapnik"}></iframe>
            <br/>
            <small>
                <a href="https://www.openstreetmap.org/#map=7/-37.195/-65.841">Ver mapa más grande</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};