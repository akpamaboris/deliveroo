import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

//components
import Header from "./Header.js";
import Menu from "./Menu.js";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-z.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
        // console.log("data is", data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="App">
      <Header />
      <Menu data={data} />
    </div>
  );
}

export default App;
