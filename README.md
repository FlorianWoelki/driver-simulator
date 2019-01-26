[![Contributors][contributors-shield]]()
[![MIT License][license-shield]][license-url]

# 🚖 Driver Simulator

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)


## About the Project

[![Header of Product][product-screenshot]](https://florianwoelki.github.io/driver-simulator/#/)

### Built With
* [🍃 Leaflet](https://leafletjs.com/)
* [👨‍💻 VueJS](https://vuejs.org)
* [📁 Vuetify](https://vuetifyjs.com/en/)
* [🏁 Nominatim](https://nominatim.openstreetmap.org/)
* [🚲 OpenRouteService](https://openrouteservice.org/)
* [📈 Chart.js](https://www.chartjs.org/)
* [🧠 Vuex](https://vuex.vuejs.org/)



## Getting Started

This guide will get you started with driver-simulator!

### Prerequisites

You need the latest npm version.
```sh
npm install npm@latest -g
```



### Installation

1. Get a free API key at [Open Route Service](https://openrouteservice.org)
2. Clone the repo
```sh
git clone https://github.com/FlorianWoelki/driver-simulator.git
```
3. Install NPM packages
```sh
npm install
```
4. Create a new file in the src directory named `config.js`
```js
export const config = {
  API_KEY: 'YOUR API KEY HERE'
};
```
5. You are set up and now you can start the application
```sh
npm run serve
```



## Usage

You can do whatever you want with this project. Notice, that it is only a simulation of drivers.

There is no real driving. I won't store any information about your location or something else!

In addition, you can click on the driver to see his information about him and you can navigate around using the bottom right button.

You can set your pickup and destination location and will draw a route for you.



## Contributing

If you want to contribute to this project, just visit the `CONTRIBUTING` file.

Here is a easy way to contribute:
1. Fork the Project
2. Create your feature branch (`git checkout -b feature/AwesomeFeature`)
3. When finished use lint (`npm run lint`)
4. Commt your changes (`git commit -m "Added some amazing features`)
5. Push to the Branch (`git push origin feature/AwesomeFeature`)
6. Open a Pull Request



## License

Distributed under the MIT License. See `LICENSE` for more information.



## Acknowledgements
* [Leaflet](https://leafletjs.com/)
* [VueJS](https://vuejs.org)
* [Vuetify](https://vuetifyjs.com/en/)
* [Nominatim](https://nominatim.openstreetmap.org/)
* [OpenRouteService](https://openrouteservice.org/)
* [Chart.js](https://www.chartjs.org/)
* [Vuex](https://vuex.vuejs.org/)



<!-- MARKDOWN LINKS -->
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
[product-screenshot]: https://raw.githubusercontent.com/FlorianWoelki/driver-simulator/master/header.png
