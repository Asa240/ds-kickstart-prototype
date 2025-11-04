# Demo Studio Onboarding Module

A comprehensive onboarding flow for Demo Studio, built with React, TypeScript, and Tailwind CSS.

## Features

- **7-Step Onboarding Flow**
  1. Welcome Screen - Introduction to Demo Studio
  2. Global Authentication Setup - Zendesk account connection
  3. AI Business Context Configuration - Define multiple business contexts
  4. Apply Configurations - Import macros, fields, views, and themes
  5. Activate Common Ticket Schedules - Select categorized schedules
  6. Cleanup & Random Configs - Configure cleanup and additional settings
  7. Configuration Complete - Success screen with summary

- **Modern UI/UX**
  - Clean, centered card layouts
  - Smooth transitions and hover effects
  - Progress indicators
  - Responsive design
  - Tailwind CSS styling with custom color palette

- **State Management**
  - React Context API for global state
  - Persistent configuration across steps
  - Multiple AI business contexts support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── ProgressBar.tsx
│   └── Select.tsx
├── context/            # React Context for state management
│   └── OnboardingContext.tsx
├── steps/              # Onboarding step components
│   ├── WelcomeStep.tsx
│   ├── AuthenticationStep.tsx
│   ├── AIContextStep.tsx
│   ├── ApplyConfigsStep.tsx
│   ├── TicketSchedulesStep.tsx
│   ├── CleanupConfigsStep.tsx
│   └── CompleteStep.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Design System

### Colors

- **Background**: #F7F8F8
- **Primary Text**: #1C1E21
- **Secondary Text**: #60646C
- **Primary Button**: #174A5B (dark teal)
- **Hover**: #1C586C
- **Borders**: #E5E7EB

### Typography

- **Font**: Inter (imported from Google Fonts)
- **Title**: Bold, 3xl
- **Subtitle**: Semibold, xl
- **Body**: Normal, base

### Components

All components follow a consistent design language with:
- Rounded corners (lg, xl, 2xl)
- Subtle shadows
- Smooth transitions (200ms)
- Focus rings for accessibility

## Usage

The onboarding flow automatically saves state as users progress through each step. Users can:

- Add multiple AI business contexts
- Select specific contexts for different configurations
- Choose schedules from categorized lists
- Configure cleanup schedules
- Enable optional configurations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
