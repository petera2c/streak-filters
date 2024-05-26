# Filter Builder Application

## Usage

To set up the Filter Builder in your project, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies via `npm install`.
3. `npm start` to run the application.

## Overview

This application is a Filter Builder designed for tables, utilizing React and TypeScript. It provides a dynamic way to create and apply filters to data tables, enhancing user interaction and data handling capabilities.

## Testing the Application

To ensure the Filter Builder application functions correctly, follow these testing steps:

### Manual Testing

1. **Filter Functionality**:

   - Launch the application using `npm start`.
   - Navigate to the filter creation section.
   - Use the mouse to click on the filter button to initiate filter creation.
   - Alternatively, use the keyboard:
     - Use the arrow keys to navigate between different filter options.
     - Use `Tab` and `Shift + Tab` to move through filter fields and buttons.
   - Create filters using different data types and operators to ensure they are applied correctly.
   - Verify that the filters are correctly displayed as chips in the UI and can be removed or edited.

2. **UI Checks**:
   - Ensure that all UI components render correctly and are responsive.
   - Test on different browsers (Chrome, Firefox, Safari) and devices (desktop, tablet, mobile) to check cross-browser and cross-device compatibility.

## Features

- **Dynamic Filter Creation**: Users can build filters based on various criteria and data types including numbers, text, dates, booleans, and enums.
- **Multiple Operator Support**: Supports a wide range of operators such as 'Equal to', 'Not equal to', 'Contains', 'Greater than', etc., tailored to the data type.
- **React and TypeScript Integration**: Leverages the power of React for the UI and TypeScript for type safety and scalability.

## Folder Structure and Naming Conventions

The application is structured into several folders, each serving a specific purpose in the organization and functionality of the project:

- **src/**: This is the main folder where the source code of the application resides.
  - **components/**: Contains all the React components used in the application. Each component is placed in its own folder which may also include its specific sub-components.
    - **FilterBuilder/**: Houses the components related to the filter building functionality such as `FilterSelectValue.tsx` which handles the selection of filter values based on the data type.
      - **FilterChip/**: A sub-component used within the FilterBuilder to display individual filter criteria as chips, allowing users to easily view and remove active filters.
    - **Select/**: Contains the `Select` component used across the application for dropdown selections.
  - **consts/**: Includes constant values used throughout the application like `Operators.ts` and `FilterValues.ts` which define the operators for different data types and the boolean values respectively.
  - **types/**: Contains TypeScript type definitions and interfaces to ensure type safety across the application.

### Variable Naming Style

The application follows a clear and consistent naming convention that enhances readability and maintainability:

- **CamelCase**: Used for naming instances and objects, e.g., `selectedColumn`, `setCompleteFilter`.
- **PascalCase**: Used for naming components and types, e.g., `TableColumn`, `FilterBuilder`.
- **UPPER_SNAKE_CASE**: Used for constants, e.g., `BOOLEAN_VALUES`.

### Components Overview

- **FilterBuilder**: The core component that orchestrates the filter creation process. It interacts with various sub-components to allow users to dynamically build filters based on the data type and specified criteria.
  - **FilterChip**: Represents individual filters as chips within the FilterBuilder, providing a visual and interactive way for users to manage their active filters.
- **Filter**: A component that displays the currently applied filters and provides interfaces to modify or remove them.
- **Select**: A reusable component used for making selections. It is customized in different contexts like choosing boolean values or selecting from enumerated types.

This structure and naming convention help in keeping the application organized and its codebase clean, making it easier for new developers to understand and contribute to the project.
