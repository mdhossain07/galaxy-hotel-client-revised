import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 23.777176,
    lng: 90.399452,
  },
  zoom: 11,
};

const Map = () => {
  return (
    <div style={{ height: "100vh", width: "100%", marginTop: "50px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={23.777176} lng={90.399452} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
