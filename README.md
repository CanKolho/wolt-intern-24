# Wolt Summer 2024 Engineering Internship - Frontend Assignment

## Introduction
Welcome to the Wolt Summer 2024 Engineering Internship Frontend Assignment! This project involves creating a web application for calculating delivery fees using React and TypeScript.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Authors](#authors)

## Project Overview
This project is a front-end application designed to calculate delivery fees based on various parameters such as cart value, delivery distance, number of items, and order time. It adheres to specific business rules provided in the assignment, ensuring accurate calculation of delivery fees.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before you begin, make sure you have the following installed on your machine:
- Node.js (version 14 or above)
- npm  (Node Package Manager)

## Installation
Follow these steps to set up your development environment:

1. Download the project's zip file from the Google Drive link provided with the job application.
   
2. Unzip the downloaded file in your preferred directory.

3. Open a terminal and navigate to the project directory:
```bash
cd path_to_unzipped_folder/cankolho-wolt-intern-24
```
4. Install the project dependencies:
```bash
npm install
```

## Usage
To start the app, run the following command:
```bash
npm run dev
```
## Testing
This application holds *4* test suites and *24* tests in total.

To run all tests, run command:
```bash
npm test
```

If you want to test just one file, run the following commands:

Unit test:
```bash
npm test calculation.test.ts
```

React components:
```bash
npm test DeliveryFeeForm.test.tsx
```
```bash
npm test DeliveryFee.test.tsx
```
```bash
npm test CustomDatepicker.test.tsx
```
## Authors
- **Can kolho** - [Github](https://github.com/CanKolho)
