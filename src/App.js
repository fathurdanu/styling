import "./App.css";
import Buttons from "./component_list/Buttons";
import Dropdowns from "./component_list/Dropdowns";
import Textfields from "./component_list/Textfields";
import Checkboxs from "./component_list/Checkboxs";
import LayoutCards from "./component_list/LayoutCards";

function App() {
  return (
    <div className="p-5">
      <Buttons />
      <Textfields />
      <Dropdowns />
      <Checkboxs />
      <LayoutCards />
    </div>
  );
}

export default App;
