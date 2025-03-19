// Import the tools we need (like getting our receptionist's tools ready)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load our environment variables (like setting up our secure key box)
dotenv.config();

// Import our services after environment variables are loaded
const theSwarmService = require('./services/theSwarmService');

// Create our server (like hiring our receptionist)
const app = express();

// Set up our server to understand JSON (like teaching our receptionist to read messages)
app.use(express.json());

// Allow our website to talk to our server (like setting up a phone line)
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Function to process a single LinkedIn profile
async function processLinkedInProfile(profileUrl) {
    try {
        console.log(`Processing profile: ${profileUrl}`);
        
        // Validate URL format
        if (!profileUrl.includes('linkedin.com/in/')) {
            throw new Error('Invalid LinkedIn URL format');
        }

        // Use TheSwarm service to get connections
        const result = await theSwarmService.getConnections(profileUrl);
        console.log(`Profile processed successfully: ${profileUrl}`);
        console.log('Result:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error(`Error processing profile ${profileUrl}:`, error.message);
        return {
            success: false,
            error: error.message || 'Failed to process profile'
        };
    }
}

// Create a route to handle LinkedIn URLs (like teaching our receptionist to handle specific requests)
app.post('/api/process-connections', async (req, res) => {
    try {
        // Get the data from the request (like receiving a note from the front desk)
        const { linkedinUrls, jobTitles, companySizes } = req.body;

        // Log the received data (like our receptionist taking notes)
        console.log('Received request:', {
            urls: linkedinUrls,
            titles: jobTitles,
            sizes: companySizes
        });

        // Basic validation
        if (!linkedinUrls || !Array.isArray(linkedinUrls) || linkedinUrls.length === 0) {
            throw new Error('No LinkedIn URLs provided');
        }

        if (!jobTitles || !Array.isArray(jobTitles) || jobTitles.length === 0) {
            throw new Error('No job titles provided');
        }

        if (!companySizes || !Array.isArray(companySizes) || companySizes.length === 0) {
            throw new Error('No company sizes selected');
        }

        // Process each LinkedIn URL
        const results = await Promise.all(
            linkedinUrls.map(url => processLinkedInProfile(url))
        );

        console.log('All profiles processed. Results:', JSON.stringify(results, null, 2));

        // Combine all results
        const allConnections = results
            .filter(result => result.success)
            .flatMap(result => result.data.connections);

        console.log('Combined connections:', JSON.stringify(allConnections, null, 2));

        // Filter connections based on criteria
        const filteredConnections = allConnections.filter(connection => {
            const matchesJobTitle = jobTitles.some(title => 
                connection.jobTitle.toLowerCase().includes(title.toLowerCase())
            );
            const matchesCompanySize = companySizes.includes(connection.companySize);
            return matchesJobTitle && matchesCompanySize;
        });

        console.log('Filtered connections:', JSON.stringify(filteredConnections, null, 2));

        // Send back the response (like our receptionist giving the answer)
        res.json({
            success: true,
            message: 'Processing complete',
            data: {
                processedProfiles: linkedinUrls.length,
                matchesFound: filteredConnections.length,
                connections: filteredConnections
            }
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error processing connections',
            error: error.message
        });
    }
});

// Create a simple test route (like having our receptionist say "Hello" when someone calls)
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Hello! The server is working!',
        apiConfigured: !!process.env.THE_SWARM_API_KEY,
        apiUrl: process.env.THE_SWARM_API_URL
    });
});

// Test endpoint for The Swarm API
app.get('/test-swarm', async (req, res) => {
    try {
        // Test with a real LinkedIn URL
        const testUrl = 'https://www.linkedin.com/in/satyanadella';
        console.log('Testing The Swarm API connection with URL:', testUrl);
        console.log('API Configuration:', {
            apiUrl: process.env.THE_SWARM_API_URL,
            apiKeyConfigured: !!process.env.THE_SWARM_API_KEY
        });
        
        const result = await theSwarmService.getConnections(testUrl);
        
        res.json({
            success: true,
            message: 'The Swarm API connection test completed',
            apiStatus: 'Connected',
            apiUrl: process.env.THE_SWARM_API_URL,
            testResult: result
        });
    } catch (error) {
        console.error('The Swarm API test failed:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
        
        res.status(500).json({
            success: false,
            message: 'The Swarm API connection test failed',
            error: error.message,
            apiStatus: 'Failed',
            apiUrl: process.env.THE_SWARM_API_URL,
            errorDetails: {
                message: error.message,
                response: error.response?.data
            }
        });
    }
});

// Tell our server which door to listen at (like telling our receptionist which desk to sit at)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 