import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FormMapa } from "./formMapa";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import * as L from "leaflet";

const CoordinateDisplay = () => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useMapEvents({
    mousemove: (e) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  const { lat, lng } = coords;

  return (
    <div className="coordinate-display">
      <b>Lat:</b> {lat.toFixed(6)} <br />
      <b>Lng:</b> {lng.toFixed(6)}
    </div>
  );
};

export const Mapa = () => {
  const mapRef = useRef(null);
  const selectRef = useRef(null);
  const textareaRef = useRef(null);
  const priceRef = useRef(null);
  const guardarButtonRef = useRef(null);
  const idCounterRef = useRef(1);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [poligonosData, setPoligonosData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const [lat, lng] = searchValue
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    if (!isNaN(lat) && !isNaN(lng)) {
      mapRef.current.setView([lat, lng], 15);
    } else {
      console.error("Coordenadas inválidas");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      event.preventDefault(); // Previene el comportamiento predeterminado del Enter (p. ej., enviar formulario)
    }
  };

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current.setView([latitude, longitude], 13);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      console.error(
        "La Geolocalización que busca no está soportada en este navegador."
      );
    }
  };

  const _onCreate = (e) => {
    const layer = e.layer;

    if (layer instanceof L.Polygon) {
      const latLngs = layer.getLatLngs()[0].map((latLng) => ({
        lat: latLng.lat,
        lng: latLng.lng,
      }));

      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      const formattedArea = L.GeometryUtil.readableArea(area, true);

      const popupContent = getPopupContent(
        formattedArea,
        idCounterRef.current,
        latLngs
      );

      // Crear un div vacío para contener el contenido del popup
      const popupContainer = L.DomUtil.create("div");

      // Renderizar el componente del formulario dentro del div creado
      ReactDOM.render(popupContent, popupContainer);

      // Crear el popup y establecer su contenido a través del div con el formulario renderizado
      layer.bindPopup(popupContainer).openPopup();
    }
  };

  const _onDelete = (e) => {
    const { layers } = e;

    layers.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        layer.closePopup();
      }
    });
  };

  const getPopupContent = (formattedArea, poligonoId, latLngs) => {
    const saveData = (e) => {
      e.preventDefault();

      const cultivo = selectRef.current.value;
      const price = priceRef.current.value;
      const message = textareaRef.current.value;

      // Crear un nuevo objeto con los datos del polígono actual
      const newPoligonoData = {
        id: idCounterRef.current,
        cultivo,
        price,
        message,
        formattedArea,
        latLngs: latLngs,
      };

      idCounterRef.current++;

      // Agregar el nuevo objeto al array de poligonosData
      setPoligonosData((prevPoligonos) => [...prevPoligonos, newPoligonoData]);

      // Cerrar el popup después de guardar
      e.target.closest(".leaflet-popup").remove();

      // Deshabilitar el botón después de guardar
      guardarButtonRef.current.disabled = true;
      selectRef.current.disabled = true;
      textareaRef.current.disabled = true;
      priceRef.current.disabled = true;
    };

    return (
      <div className="formPopUp">
        <h3>Lote {poligonoId}</h3>
        <form name="sentMessage" onSubmit={saveData} validate>
          <div className="col-md-12 padd-form">
            <div className="form-group">
              <label htmlFor="cultivo">Cultivo</label>
              <select className="form-control" required ref={selectRef}>
                <option value="Trigo">Trigo</option>
                <option value="Cebada">Cebada</option>
                <option value="Girasol">Girasol</option>
                <option value="Soja">Soja</option>
                <option value="Maiz">Maiz</option>
                <option value="Otro">Otro</option>
              </select>
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="col-md-12 padd-form">
            <div className="form-group">
              <input
                type="text"
                id="priceHec"
                name="priceHec"
                className="form-control"
                placeholder="Suma asegurada por ha*"
                ref={priceRef}
                required
              />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="col-md-12 padd-form">
            <div className="form-group">
              <label htmlFor="area">Área marcada</label>
              <input
                type="text"
                id="area"
                name="area"
                className="form-control"
                disabled
                required
                value={formattedArea}
              />
              <p className="help-block text-danger"></p>
            </div>
          </div>

          <div className="col-md-12 padd-form">
            <textarea
              name="message"
              id="message"
              className="form-control"
              rows="2"
              placeholder="Mensaje Adicional (opcional)"
              ref={textareaRef}
            ></textarea>
            <p className="help-block text-danger"></p>
          </div>
          <div className="col-md-12 alinearBoton">
            <button
              type="submit"
              className="btn btn-custom btn-lg estiloBoton"
              ref={guardarButtonRef}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  function translateDrawTexts() {
    // Textos para el dibujo
    L.drawLocal.draw.toolbar.actions.title = "Cancelar dibujo";
    L.drawLocal.draw.toolbar.actions.text = "Cancelar";
    L.drawLocal.draw.toolbar.finish.title = "Finalizar dibujo";
    L.drawLocal.draw.toolbar.finish.text = "Finalizar";
    L.drawLocal.draw.toolbar.undo.title = "Eliminar último punto dibujado";
    L.drawLocal.draw.toolbar.undo.text = "Eliminar último punto";
    L.drawLocal.draw.toolbar.buttons.polygon = "Dibujar polígono";
    L.drawLocal.edit.toolbar.actions.clearAll.title = "Eliminar todo del mapa";
    L.drawLocal.edit.toolbar.actions.clearAll.text = "Eliminar todo";

    // Textos para la edición
    L.drawLocal.edit.toolbar.actions.save.title = "Guardar cambios";
    L.drawLocal.edit.toolbar.actions.save.text = "Guardar";
    L.drawLocal.edit.toolbar.actions.cancel.title =
      "Cancelar edición, descartar cambios";
    L.drawLocal.edit.toolbar.actions.cancel.text = "Cancelar";
    L.drawLocal.edit.toolbar.buttons.remove = "Eliminar capas";
    L.drawLocal.edit.toolbar.buttons.removeDisabled =
      "No hay capas para eliminar";
    L.drawLocal.edit.handlers.edit.tooltip.text =
      "Arrastra los manejadores o las capas para editar";
    L.drawLocal.edit.handlers.edit.tooltip.subtext =
      "Haz clic en cancelar para deshacer los cambios";
    L.drawLocal.edit.handlers.remove.tooltip.text =
      "Haz clic en una capa para eliminarla";

    // Otros textos
    L.drawLocal.draw.handlers.marker.tooltip.start =
      "Haz clic en el mapa para colocar el marcador";
    L.drawLocal.draw.handlers.polygon.tooltip.start =
      "Haz clic para comenzar a dibujar un polígono.";
    L.drawLocal.draw.handlers.polygon.tooltip.cont =
      "Haz clic para continuar dibujando el polígono.";
    L.drawLocal.draw.handlers.polygon.tooltip.end =
      "Haz clic en el primer punto para cerrar este polígono.";
  }

  translateDrawTexts();

  return (
    <div>
      <FormMapa
        poligonosData={poligonosData}
        setPoligonosData={setPoligonosData}
      />
      <div className="coord-container">
        <div className="coordinate-search">
          <input
            type="text"
            placeholder="Ej: -30.25,-60.12"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      <MapContainer
        center={[-37.039, -65.668]}
        zoom={6.5}
        scrollWheelZoom={true}
        className="map"
        ref={mapRef}
        attributionControl={true}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
        <div className="coordenadasMap">
          <CoordinateDisplay />
          <button onClick={handleLocateUser} disabled={loading}>
            {loading ? "Obteniendo Ubicación..." : "Detectar Ubicación"}
          </button>
        </div>
        <FeatureGroup>
          <EditControl
            position="bottomleft"
            onCreated={_onCreate}
            onDeleted={_onDelete}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: {
                showArea: true,
                shapeOptions: {
                  color: "#6372ff",
                },
              },
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};
