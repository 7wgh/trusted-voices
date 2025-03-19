# Trusted Voices - LinkedIn Connection Filter

## Overview
Trusted Voices is a tool designed to help identify relevant connections from your clients' LinkedIn networks based on specific criteria. This tool streamlines the process of finding potential introductions and referrals by filtering connections based on job titles and company size.

## Core Features

### Input
- LinkedIn Profile URL Input
  - Support for up to 100 client LinkedIn profile URLs
  - URL format: "https://www.linkedin.com/in/profilename/"
  - Support for pasting multiple URLs at once (e.g., from spreadsheet)
  - No URL validation required
  - Ability to save commonly used job titles for quick access

- Filtering Criteria
  - Job Title Filtering
    - Comma-separated list input for multiple job titles
    - Partial matching enabled (e.g., "Software Engineer" will match "Senior Software Engineer")
  
  - Company Size Filtering
    - Predefined ranges to choose from:
      - 1-10 employees
      - 11-50 employees
      - 51-200 employees
      - 201-500 employees
      - 501-1000 employees
      - 1001-5000 employees
      - 5001-10000 employees
      - 10001+ employees
    - Multiple ranges can be selected simultaneously
    - Visual checkbox interface for easy selection
    - Responsive grid layout for all screen sizes

### Processing
- Integration with TheSwarm.com API
  - Automated network data retrieval
  - Filtering based on specified criteria
  - Processing of up to 100 LinkedIn profiles
  - Ability to cancel processing job
  - Error reporting for failed profile processing
  - Job title matching:
    - Case-insensitive matching
    - Partial matching enabled (e.g., "Software Engineer" matches "Senior Software Engineer")
    - No partial matching by seniority (e.g., "Chief Marketing Officer" does not match "Chief Financial Officer")

### Output
- Results Table Display
  - Column A: Client Name
  - Column B: Connection Name
  - Column C: Connection's Job Title
  - Column D: Connection's Company
  - Column E: Company Employee Count
  - Column F: Connection Strength (Strong, Familiar, Weak, Unfamiliar)
  - Column G: Connection's Email Address
  - No additional sorting or filtering options
  - Summary statistics showing number of profiles processed and matches found

- Export Capabilities
  - CSV file export functionality
  - Standard CSV format with headers
  - Filename includes timestamp (e.g., "linkedin_connections_20240315_143022.csv")
  - Special characters removed from job titles in CSV output
  - No additional metadata or summary statistics in CSV

## Technical Requirements

### Backend
- Simple Node.js/Express.js server
- Integration with TheSwarm.com API
  - API key stored in .env file (not in code or README)
  - Basic error handling

### Frontend
- React.js for the user interface
- Material-UI for styling
- Desktop-first design optimized for Chrome
- Basic input validation

### Data Processing
- Support for processing up to 100 LinkedIn profiles
- Basic CSV generation for results

### Security
- Basic input validation to prevent API errors
- API key stored in .env file (not in code or README)

### Error Handling
- Clear error messages for common scenarios:
  - Invalid LinkedIn URL format
  - API rate limit reached
  - Network connection issues
  - No results found

### Testing
- Manual testing for critical user flows

### Deployment
- Docker containerization for easy deployment
- [Hosting solution to be determined by technical partner]

### Browser Support
- Chrome (latest version)

## User Interface
- Simple, clean interface with:
  - LinkedIn URL input field with format guidance
  - Job title input field with comma-separated list support
  - Company size range selection via checkboxes
  - Results table display
  - CSV export button

## Open Questions
- TheSwarm.com API Integration:
  - Exact format of API response
  - Available fields in the response
  - API rate limits
  - Error response formats

## Development Roadmap

### Phase 1: HTML Prototype
1. Create basic HTML structure with:
   - LinkedIn URL input area with paste support
   - Job title input field with comma-separated support
   - Company size dropdown
   - Results table layout
   - CSV export button
2. Add basic CSS styling for layout and responsiveness
3. Add JavaScript for:
   - Basic input validation
   - Table display functionality
   - CSV export functionality
4. Create sample data and mock API responses
5. Document all features and interactions

### Phase 2: Technical Implementation (To be handled by technical partner)
1. Set up development environment
2. Implement backend with Node.js/Express
3. Implement frontend with React
4. Integrate with TheSwarm.com API
5. Add proper error handling
6. Implement data processing logic
7. Add security measures
8. Deploy application

### Phase 3: Testing and Refinement
1. Manual testing of all features
2. Bug fixes and performance optimization
3. Documentation updates
4. Final deployment preparation

## Future Enhancements
- Additional export formats
- Advanced sorting and filtering options
- Saved search configurations
- Batch processing capabilities
- Enhanced matching algorithms
