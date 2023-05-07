# Rent Check NZ

This project is a web application that helps users determine if their rent is too high compared to similar properties in their area. The app uses data from New Zealand's Ministry of Business, Innovation and Employment (MBIE) Tenancy Services and Addressfinder API to look up residential addresses.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)

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
