import "./App.css";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      {/* <Button type="primary" status="active" color="red">
        {"primary"}
      </Button> */}
      <Button type="secondary" status="" color="green">
        {"secondary"}
      </Button>
    </div>
  );
}

export default App;
