# Filter Builder Application

## Usage

To set up the Filter Builder in your project, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies via `npm install`.
3. `npm start` to run the application.

## Overview

This application is a Filter Builder designed for tables, utilizing React and TypeScript. It provides a dynamic way to create and apply filters to data tables, enhancing user interaction and data handling capabilities.

## Features

- **Dynamic Filter Creation**: Users can build filters based on various criteria and data types including numbers, text, dates, booleans, and enums.
- **Multiple Operator Support**: Supports a wide range of operators such as 'Equal to', 'Not equal to', 'Contains', 'Greater than', etc., tailored to the data type.
- **React and TypeScript Integration**: Leverages the power of React for the UI and TypeScript for type safety and scalability.

## Components

- `FilterBuilder`: The main component that allows users to construct filters.
- `Filter`: A component that displays the filters applied and allows for their manipulation.

## Operators

Operators are divided based on the data type they support:

- **Text Operators**: Equal to, Not equal to, Contains, Does not contain, Starts with, Ends with.
- **Numeric Operators**: Equal to, Not equal to, Greater than, Less than, Greater than or equal to, Less than or equal to.
- **Date Operators**: Equal to, Not equal to, Before, After, Between, Not between.
- **Boolean Operators**: Is true, Is false.
- **Enum Operators**: Equal to, Not equal to.
- **List Operators**: Contains, Does not contain.
