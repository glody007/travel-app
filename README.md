# Travel App

## The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

## Table of contents

1. Tools
2. Important folders
3. Added features
4. Instructions

### Tools

The Language is javascript [ES6] (http://es6-features.org/)

Package manage [npm] (https://www.npmjs.com/)

Build tool [Webpack] (https://webpack.js.org/)

### Important folders

src: Contains all production codes
src/client: Contains all frontend codes
src/server: Contains all backend codes

### Added features

1. End date and display length of trip.
2. Pull in an image for the country from Pixabay API when the entered location brings up no results.
3. Instead of just pulling a single day forecast, pull the forecast for multiple days.
4. Incorporate icons into forecast.

### Instructions

Clone the project: git clone https://github.com/glody007/travel-app.git

Enter in the project folder: cd evaluate-news-nlp

**Set environment variables. See .env.exemple file for reference**

Install dependencies: npm Install

To test: npm run test

For development: npm run start and npm run build-dev

For production: npm run build-prod and npm run start 