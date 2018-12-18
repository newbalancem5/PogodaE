import React, { Component } from "react";
import "bootswatch/dist/journal/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";


const PLACES = [
  { name: "Смоленск", zip: "214031" },
  { name: "Москва", zip: "140008" },
  { name: "Санкт-Петербург", zip: "198323" },
  { name: "Десногорск", zip: "216400" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Загрузка</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} />
        </h1>
        <p>Температура: {weatherData.main.temp}°</p>
        <p>Максимальная: {weatherData.main.temp_max}°</p>
        <p>Минимальная: {weatherData.main.temp_min}°</p>
        <p>Скорость ветра: {weatherData.wind.speed} Миль/Час</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Pogoda
            </Navbar.Brand>
            
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>            
            <Col md={4} sm={4}>
              <h3>Выберите город</h3>
              <Nav 
                class="nav"
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem  key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
              
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;