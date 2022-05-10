import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./composant/EventCard";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [limit, setLimit] = useState("20");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [citiesFilled, setCitiesFilled] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&rows=${limit}&q=${city}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Le premier useeffect qui ne s'active qu'au rafraichissement de la page
  // useEffect(() => {
  //   const recup = async () => {
  //     let fetchD = await fetchData();

  //     let initArray = [];
  //     fetchD?.records.map((item) => {
  //       initArray.push(item.fields?.city);
  //     });
  //     setCities([...new Set(initArray)]);
  //   };
  //   recup();
  //   setCitiesFilled(true);
  // }, []);

  // //
  useEffect(() => {
    const recup = async () => {
      let fetchD = await fetchData();
      setData(fetchD);
      setIsLoading(false);
      if (!citiesFilled) {
        let initArray = fetchD?.records.map((item) => {
          return item.fields?.city;
        });
        setCities([...new Set(initArray)]);
        setCitiesFilled(true);
      }
    };
    recup();
  }, [limit, city, citiesFilled]);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>My Event App</h1>
      </header>
      <main className="container">
        <article className="d-flex justify-content-evenly my-1">
          {/* <div>
            <label for="city-select">Choisir une ville : </label>
            <input
              id="city-select"
              placeholder="Paris"
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div> */}
          <div>
            <select
              name="newCity"
              id="newCity-select"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            >
              {cities.map((newCity, index) => {
                return <option value={newCity}>{newCity}</option>;
              })}
            </select>
          </div>
          <div>
            <label for="limit-select">Nombre d'évenements : </label>
            <select
              onChange={(event) => {
                setLimit(event.target.value);
              }}
              type="select"
              name="limit"
              id="limit-select"
            >
              <option value="">--Choisir un nombre d'evenements--</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
          </div>
        </article>

        <div className="d-flex flex-wrap justify-content-between my-2">
          {data.records.map((eachEvent, index) => {
            return <EventCard key={eachEvent.recordid} eachEvent={eachEvent} />;
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

// useEffect(() => {
//   const recup = async () => {
//     let fetchD = await fetchData();

//     let initArray = [];
//     fetchD?.records.map((item) => {
//       initArray.push(item.fields?.city);
//     });
//     setCities([...new Set(initArray)]);
//   };
//   recup();
// }, []);

// //
// useEffect(() => {
//   const recup = async () => {
//     let fetchD = await fetchData();
//     setData(fetchD);
//     setIsLoading(false);
//   };
//   recup();
// }, [limit, city]);
