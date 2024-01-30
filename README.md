# Wolt Summer 2024 Engineering Internship - Frontend Assignment

## Introduction
Welcome to the Wolt Summer 2024 Engineering Internship Frontend Assignment! This project involves creating a web application for calculating delivery fees using React and TypeScript.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Features](#features)
7. [Testing](#testing)
8. [Authors](#authors)

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
1. Clone the repository to your local machine:
```bash
git clone https://github.com/CanKolho/wolt-intern-24.gitl
```
2. Navigate to the project directory:
```bash
cd wolt-intern-24
```
3. Install the project dependencies:
```bash
npm install
```

## Usage
To start the app, run the following command:
```bash
npm run dev
```

## Features
The application calculates the delivery fee based on several rules:
- Small order surcharge for carts under 10€.
- Base (2€) delivery fee for the first 1km, with additional charges for extra distance.
- Surcharge for orders with 5 or more items, and an additional bulk fee for more than 12 items.
- Rush hour multiplier on Friday afternoons.
- Free delivery for carts over 200€.

## Testing
This application holds *5* test suites and *23* tests in total.

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
npm test Notification.test.tsx
```
```bash
npm test CustomDatepicker.test.tsx
```
## Authors
- **Can kolho** - [Github](https://github.com/CanKolho)
