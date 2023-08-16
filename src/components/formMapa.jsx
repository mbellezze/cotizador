import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

export const FormMapa = ({ poligonosData, setPoligonosData }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [celphone, setCelPhone] = useState("");
  const [document, setDocument] = useState("");
  const [moneda, setMoneda] = useState("");
  const [editId, setEditId] = useState("");
  const [showList, setShowList] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = {
      email,
      name,
      celphone,
      document,
      moneda,
      poligonosData,
    };
    console.log(data);

    try {
      const response = await axios.post(
        "https://cotizador-api-production.up.railway.app/api/sendemail",
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        setPopupMessage("Correo enviado exitosamente.");
        setShowPopup(true);
        setEmail("");
        setName("");
        setCelPhone("");
        setDocument("");
        setMoneda("");
        // También puedes restablecer los datos de los polígonos si es necesario
        setPoligonosData([]);

        // Configurar el temporizador para ocultar el popup después de 3 segundos (3000 ms)
        setTimeout(() => {
          setShowPopup(false);
          setPopupMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    // Eliminar el polígono del array de poligonosData usando el id
    const updatedPoligonos = poligonosData.filter(
      (poligono) => poligono.id !== id
    );
    setPoligonosData(updatedPoligonos);
  };

  const handleSave = (id) => {
    // Guardar los cambios realizados en el polígono
    setEditId(id);
  };

  return (
    <div>
      <div className="mapForm">
        <div className="contenidoFormCotizador">
          <h2>Formulario Seguro Agrícola</h2>
          <form name="sentMessage" onSubmit={sendEmail} validate>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Nombre o Empresa*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <div className="areaTel">
                    <input
                      type="number"
                      id="celphone"
                      name="celphone"
                      className="form-control"
                      placeholder="Número de contacto*"
                      value={celphone}
                      onChange={(e) => setCelPhone(e.target.value)}
                      required
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="number"
                    id="document"
                    name="document"
                    className="form-control"
                    placeholder="DNI o CUIT*"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={moneda}
                    onChange={(e) => setMoneda(e.target.value)}
                    required
                  >
                    <option value="">Solicitar cotización en</option>
                    <option value="Pesos">Pesos</option>
                    <option value="Dólares">Dólares</option>
                  </select>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
            </div>
            <div>
              <div className="containerHecSelec">
                <div className="formato-tituloBarras">
                  <div>
                    <hr />
                  </div>
                  <h3
                    onClick={() => setShowList(!showList)}
                    className="titulo-hec"
                  >
                    Lotes seleccionados
                  </h3>
                  <div>
                    <hr />
                  </div>
                </div>
                {showList && (
                  <div>
                    {poligonosData.map((poligono, index) => (
                      <div key={poligono.id}>
                        <h4 className="info-hectarea">Lote {poligono.id}</h4>
                        {editId === poligono.id ? (
                          <>
                            <div className="containerGeneral">
                              <div className="editCulMen">
                                <div className="form-group">
                                  <label htmlFor={`cultivo-${index}`}>
                                    <b>Cultivo</b>
                                  </label>
                                  <select
                                    className="form-control"
                                    id={`cultivo-${index}`}
                                    value={poligono.cultivo}
                                    onChange={(e) => {
                                      const updatedPoligonos = [
                                        ...poligonosData,
                                      ];
                                      updatedPoligonos[index].cultivo =
                                        e.target.value;
                                      setPoligonosData(updatedPoligonos);
                                    }}
                                  >
                                    <option value="Trigo">Trigo</option>
                                    <option value="Cebada">Cebada</option>
                                    <option value="Girasol">Girasol</option>
                                    <option value="Soja">Soja</option>
                                    <option value="Maiz">Maiz</option>
                                    <option value="Otro">Otro</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label htmlFor={`price-${index}`}>
                                    <b>Valor del Lote</b>
                                  </label>
                                  <input
                                    className="form-control"
                                    id={`price-${index}`}
                                    value={poligono.price}
                                    onChange={(e) => {
                                      const updatedPoligonos = [
                                        ...poligonosData,
                                      ];
                                      updatedPoligonos[index].price =
                                        e.target.value;
                                      setPoligonosData(updatedPoligonos);
                                    }}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor={`message-${index}`}>
                                    <b>Mensaje</b>
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id={`message-${index}`}
                                    rows="1"
                                    value={poligono.message}
                                    onChange={(e) => {
                                      const updatedPoligonos = [
                                        ...poligonosData,
                                      ];
                                      updatedPoligonos[index].message =
                                        e.target.value;
                                      setPoligonosData(updatedPoligonos);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="guardarContainer">
                                <button
                                  className="btn-guardarEdit"
                                  type="button"
                                  onClick={() => handleSave()}
                                >
                                  <FontAwesomeIcon icon={faSave} />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="info-container">
                              <div className="info-form">
                                <p className="info-parrafo">
                                  <b>Cultivo</b>: {poligono.cultivo}
                                </p>
                                <p className="info-parrafo">
                                  <b>Valor Lote</b>: {poligono.price}
                                </p>
                                <p className="info-parrafo">
                                  <b>Área</b>: {poligono.formattedArea}
                                </p>
                                {poligono.message ? (
                                  <p className="info-parrafo">
                                    <b>Mensaje</b>: {poligono.message}
                                  </p>
                                ) : null}
                              </div>
                              <div className="buttons-container">
                                <button
                                  className="edit-button"
                                  type="button"
                                  onClick={() => handleEdit(poligono.id)}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  className="delete-button"
                                  type="button"
                                  onClick={() => handleDelete(poligono.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div id="success" className="btn-cotizar">
              <button type="submit" className="btn btn-custom btn-lg">
                Cotizar
              </button>
            </div>
          </form>
          <CSSTransition
            in={showPopup}
            timeout={300}
            classNames="popup"
            unmountOnExit
          >
            <div className="popup">{popupMessage}</div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};
