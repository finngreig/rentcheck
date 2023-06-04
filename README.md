# 🏘️ Rent Check NZ
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B5L2WE9)

This project is a web application that helps users determine if their rent is too high compared to similar properties in their area. The app uses data from New Zealand's Ministry of Business, Innovation and Employment (MBIE) Tenancy Services and Addressfinder API to look up residential addresses.

## Table of Contents

- [Methodology](#methodology)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)

## Methodology

This web application conducts a comparison of a user's rent to the general rent levels in their area to determine whether their rent is higher than typical. Here is how it's achieved from a statistical perspective:

1. User inputs their current rent, the number of bedrooms, and their property address. The system identifies the property from its database using the input address.

2. A request is sent to the server with the user's information. The server then fetches comparable rental data for similar properties (same number of bedrooms) in the same geographical area. 

3. This comparable data is analyzed, and three primary statistics are calculated: 
    - The **upper quartile** (75th percentile), which is the value below which 75% of the data falls.
    - The **median** (50th percentile), which is the middle value of the data.
    - The **lower quartile** (25th percentile), which is the value below which 25% of the data falls.

4. For each of these statistics, a comparison is made between the user's rent and the calculated values. This is done by simply subtracting the user's rent from each of these values. This results in three differentials, one each for the upper quartile, median, and lower quartile. If the differentials are positive, this indicates the user's rent is below the corresponding value. If they're negative, the user's rent is above that value.

5. Another statistic calculated is the interquartile range above the upper quartile (IQR above UQ), which is the degree to which the user's rent exceeds the 75th percentile. An IQR above UQ of 1.5 or greater is considered significantly high and triggers a warning message suggesting the rent may be unusually high.

This way, users can compare their own rent to that of similar properties in the same area and understand whether they're paying an average, below average, or above-average rent. It's worth noting that the higher the user's rent is above the median and quartiles, the more they are paying compared to other renters in the area.

## Features

- Address autocomplete using Addressfinder API
- Rent comparison based on Tenancy Services data
- Visual presentation of the user's rent compared to the upper quartile, median, and lower quartile of similar properties in the area
- Display a message if the user's rent is significantly higher than the median rent, informing them that the Tenancy Tribunal might consider an application for rent adjustment

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/rent-too-damn-high.git
   cd rent-too-damn-high
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys for MBIE Tenancy Services:
   ```
   ENVIRONMENT=development
   MBIE_CONSUMER_KEY=your_mbie_consumer_key
   MBIE_CONSUMER_SECRET=your_mbie_consumer_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The application should now be running on `http://localhost:3000`.

## Usage

Users enter their residential address, monthly rent, and the number of bedrooms in their property. The app then compares the user's rent to the upper quartile, median, and lower quartile of similar properties in the area, displaying the results in a table.

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own instance, follow these steps:

1. Create a new project on Vercel and link it to your GitHub repository
2. Add the `MBIE_CONSUMER_KEY` and `MBIE_CONSUMER_SECRET` environment variables in your Vercel project settings
3. Trigger a deployment by pushing your changes to GitHub

## Built With

- [Tailwind CSS](https://tailwindcss.com/)
- [jQuery](https://jquery.com/)
- [jQuery UI](https://jqueryui.com/)
- [MBIE Tenancy Services API](https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/)
- [Addressfinder API](https://addressfinder.nz/)
