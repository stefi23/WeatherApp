import React from "react";
import "./App.css";
import img from "./Loading.jpeg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      location: "",
      weather: null,
      error: false,
      temperature: undefined,
      humidity: undefined,
      description: undefined,
      city: "",
      image: undefined
    };
  }

  handleInput = e => {
    // handle form input here
    this.setState({
      location: e.target.value
    });
  };

  handleSubmit = () => {
    // handle form input here
    this.setState({
      loading: true,
      location: ""
    });
  };

  getWeather = async e => {
    e.preventDefault();
    // call Open Weather API
    const apiKey = "4482eb7c5cc1bfcc269ddde71d43a734";
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&appid=${apiKey}&units=metric`
    );

    const data = await apiCall.json();

    const apiPics = "14470492-2e8ec77f878d4d259f35a57e1";
    const apiCallPics = await fetch(
      ` http://pixabay.com/api/?key=${apiPics}&q=${this.state.location} + city&image_type=photo&pretty=true`
    );
    console.log(apiCallPics);

    const images = await apiCallPics.json();
    console.log(images);
    console.log(images.hits[0].largeImageURL);
    console.log(data);

    if (this.state.weather === null) {
      this.setState({
        loading: true,
        location: "",
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].main,
        error: "",
        image: images.hits[0].webformatURL
      });
    } else {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="text-center container centered ">
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-4 col-md-6 col-xl-4 flex-column align-items-center align-self-center border border-info rounded bg-light">
            <div className="row header p-2 ">
              <div className="col-12 text-center">
                <h1>My Weather App</h1>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-12">
                <input
                  className="form-control mt-2"
                  type="text"
                  placeholder="Location"
                  onChange={this.handleInput}
                  value={this.state.location}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 offset-3">
                <button
                  type="button"
                  className="btn mt-3"
                  onClick={this.getWeather}
                  disabled={this.state.location === ""}
                >
                  Get Weather!
                </button>
              </div>
            </div>
            <hr />

            {this.state.loading ? (
              <div className="row">
                <div
                  className="col-10 col-lg-10 col-md-10 col-xl-10  m-4 p-3 text-center shadow w-100 d-flex justify-content-center align-items-center "
                  style={{
                    backgroundColor: `#f9f9f9`,
                    backgroundImage: `url(${this.state.image}`,
                    backgroundPosition: `center center`,
                    backgroundSize: `contain`,
                    backgroundRepeat: `no-repeat`,
                    height: `200px`,
                    width: `auto`
                    // test 2
                  }}
                >
                  <div
                    className="p-3 pl-5 pr-5 rounded"
                    style={{
                      backgroundColor: `white`,
                      opacity: `0.6`
                    }}
                  >
                    <p
                      className="mb-0  rounded"
                      style={{
                        fontFamily: `'Open Sans', sans-serif;`,
                        fontSize: `16px`
                      }}
                    >
                      <b>
                        {this.state.city}
                        <br />
                        {Math.round(this.state.temperature)} °C
                        <br />
                        {this.state.description}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className=" col-10 m-4 p-3 text-center card shadow">
                  <img src={img} className="img-thumbnail" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    // This form should have an input for "location" and a button to "submit".
    // Clicking on "submit" should call the method "getWeather" on your component.
    // Clicking on "submit" should also update the state "loading" to true.
  }
}

export default App;
