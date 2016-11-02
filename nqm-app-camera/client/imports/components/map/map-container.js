import {compose} from "react-komposer";
import loadCarmeraData from "../../composers/load-camera-dataset";
import MainDisplay from "./main-display";

export default compose(loadCarmeraData)(MainDisplay);
