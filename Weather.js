/**
 * Created by sashok123351 on 25.06.2016.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';

import './Weather.less';
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            weather: null,
            loading: false,
            error: null
        }
    }

    cityHandler(e) {
        this.setState({
            city: e.target.value
        })
    }

    showData(e) {

        if (e.keyCode == 13) {
            this.setState({
                loading: true,
                error: null,
                weather: null
            });
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=en,ru,uk&APPID=629cb265ccd3687ced8dce62e722025d`).then(result => {
                if (result.status == 200) {
                    return result.json()
                } else {
                    throw new Error('данные не были получены, проверте название города')
                }

            }).then(json => {
                this.setState({
                    loading: false,
                    weather: json,
                    city: ""
                })
            }).catch(err => {
                this.setState({
                    loading: false,
                    error: err,
                    city: ""
                })
            });

        }
    }


    render() {
        const {weather,city,error,loading} = this.state;
        let img = "";

        return (
            <div className="container">

                <span className="title">React Weather App</span>

                <div className="main-form">
                    <input className="weather-input"
                           type="text"
                           value={city}
                           placeholder="type the city here"
                           onChange={this.cityHandler.bind(this)}
                           onKeyUp={this.showData.bind(this)}
                    />


                    {error ? error.message : ''}

                    {
                        loading == false ?
                            <div className="weather-form">
                                {weather ?
                                    <div className="weather-box">

                                        <div className="city-name">{weather.name},{weather.sys.country}</div>
                                        <div className="temperature"><img className="image"
                                                                          src={"http://openweathermap.org/img/w/" +weather.weather[0].icon + ".png"}/>{weather.main.temp}°C
                                        </div>
                                        <table className="weather-info">
                                            <tr>
                                                <td>Wind</td>
                                                <td>Speed:{weather.wind.speed} m/s</td>
                                            </tr>
                                            <tr>
                                                <td>Cloudiness</td>
                                                <td>{weather.weather[0].description}</td>
                                            </tr>
                                            <tr>
                                                <td>Pressure</td>
                                                <td>{weather.main.pressure}hpa</td>
                                            </tr>
                                            <tr>
                                                <td>Humidity</td>
                                                <td>{weather.main.humidity}%</td>
                                            </tr>
                                            <tr>
                                                <td>Geo coords</td>
                                                <td>{weather.coord.lon}:{weather.coord.lat}</td>
                                            </tr>

                                        </table>
                                    </div>
                                    : null}
                            </div>
                            :
                            <img className="loader" src="http://preloaders.net/images/ajax-loader.gif" alt=""/>

                    }
                </div>
            </div>



        )
    }
}

render(
    <Weather/>,
    document.getElementById("container")
);
