# Trusted Voices Frontend

## Overview
The frontend of Trusted Voices is built with React and provides a user interface for:
- Inputting LinkedIn profile URLs
- Setting filtering criteria
- Viewing and exporting connection results

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Project Structure
```
frontend/
├── src/
│   ├── components/    # React components
│   │   ├── ProfileInput/    # LinkedIn URL input
│   │   ├── FilterCriteria/  # Job title and company size filters
│   │   └── ResultsTable/    # Results display
│   ├── services/      # API integration
│   ├── utils/         # Helper functions
│   └── App.js         # Main application
├── public/            # Static files
└── package.json       # Dependencies
```

## Development

### Available Scripts
- `npm start` - Run development server
- `npm test` - Run tests
- `npm build` - Build for production
- `npm lint` - Run linting

### Component Structure
1. **ProfileInput**
   - Handles LinkedIn URL input
   - Supports multiple URLs
   - Basic validation

2. **FilterCriteria**
   - Job title input
   - Company size selection
   - Filter application

3. **ResultsTable**
   - Display filtered results
   - Export functionality
   - Sorting and filtering

### API Integration
- Uses axios for API calls
- Handles errors gracefully
- Implements retry logic
- Shows loading states

## Testing
- Unit tests for components
- Integration tests for API calls
- End-to-end testing setup

## Styling
- Material-UI components
- Custom theme configuration
- Responsive design

## Deployment
- Production build process
- Environment configuration
- Performance optimization

## Contributing
See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines. 