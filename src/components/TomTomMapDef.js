import React, {Component, createRef} from "react";
import tt from "@tomtom-international/web-sdk-maps";
import {services} from "@tomtom-international/web-sdk-services";

const API_KEY = "MpDzVxcXLw4nlsC7MsGbFocH9XlOkUAF";
const SAN_FRANCISCO = [-122.4194, 37.7749];

export default class TomTomMapDef extends Component {
    constructor(props) {
        super(props);
        this.mapRef = createRef();
    }

    componentDidMount() {
        this.map = tt.map({
            key: API_KEY,
            container: this.mapRef.current,
            center: SAN_FRANCISCO,
            zoom: 12
        });
    }

    render() {
        return (
            <div>
                <div ref={this.mapRef} className="mapDiv"></div>
            </div>
        );
    }
}