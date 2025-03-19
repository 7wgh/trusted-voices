const axios = require('axios');

class TheSwarmService {
    constructor() {
        this.apiKey = process.env.THE_SWARM_API_KEY;
        this.baseURL = process.env.THE_SWARM_API_URL;
        
        if (!this.apiKey || !this.baseURL) {
            throw new Error('Missing required The Swarm API configuration. Please check your .env file.');
        }

        console.log('Initializing TheSwarm service with:', {
            baseURL: this.baseURL,
            apiKeyPresent: !!this.apiKey,
            apiKeyLength: this.apiKey ? this.apiKey.length : 0
        });
        
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });

        // Add response interceptor for better error handling
        this.client.interceptors.response.use(
            response => response,
            error => {
                console.error('API Error:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
                return Promise.reject(error);
            }
        );
    }

    // Extract LinkedIn profile ID from URL
    extractProfileId(url) {
        try {
            console.log('Extracting profile ID from URL:', url);
            const match = url.match(/linkedin\.com\/in\/([^\/]+)/);
            const profileId = match ? match[1] : null;
            console.log('Extracted profile ID:', profileId);
            return profileId;
        } catch (error) {
            console.error('Error extracting profile ID:', error);
            return null;
        }
    }

    // Get connections for a LinkedIn profile
    async getConnections(profileUrl) {
        try {
            console.log('Getting connections for profile:', profileUrl);
            
            const profileId = this.extractProfileId(profileUrl);
            if (!profileId) {
                throw new Error('Invalid LinkedIn URL');
            }

            console.log('Making API request for profile:', profileId);
            
            // First, get the profile details
            const profileResponse = await this.client.get(`/profiles/${profileId}`);
            console.log('Profile details received:', JSON.stringify(profileResponse.data, null, 2));

            // Then, get the network connections
            const networkResponse = await this.client.get(`/profiles/${profileId}/network`);
            console.log('Network data received:', JSON.stringify(networkResponse.data, null, 2));
            
            // Transform the API response to match our application's data structure
            return this.transformConnections(networkResponse.data, profileResponse.data);
        } catch (error) {
            console.error('Error in getConnections:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Error Response:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
                throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from API');
                throw new Error('No response received from API - please check your connection and API availability');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                throw new Error(`Request setup error: ${error.message}`);
            }
        }
    }

    // Transform API response to match our application's data structure
    transformConnections(networkData, profileData) {
        try {
            console.log('Transforming API response:', JSON.stringify(networkData, null, 2));
            
            if (!networkData || !networkData.connections) {
                throw new Error('Invalid network data received from API');
            }

            return {
                success: true,
                data: {
                    profileName: profileData?.name || 'Unknown',
                    connections: networkData.connections.map(connection => ({
                        clientName: profileData?.name || 'Unknown',
                        connectionName: connection.name || 'Unknown',
                        jobTitle: connection.currentPosition?.title || 'Unknown',
                        company: connection.currentPosition?.company || 'Unknown',
                        companySize: this.getCompanySizeRange(connection.currentPosition?.companySize),
                        connectionStrength: this.getConnectionStrength(connection.connectionStrength),
                        email: connection.email || 'Not available'
                    }))
                }
            };
        } catch (error) {
            console.error('Error transforming connections:', error);
            throw new Error('Failed to transform API response');
        }
    }

    // Helper function to convert company size to our predefined ranges
    getCompanySizeRange(size) {
        if (!size) return 'Unknown';
        
        const sizeNum = parseInt(size);
        if (sizeNum <= 10) return '1-10';
        if (sizeNum <= 50) return '11-50';
        if (sizeNum <= 200) return '51-200';
        if (sizeNum <= 500) return '201-500';
        if (sizeNum <= 1000) return '501-1000';
        if (sizeNum <= 5000) return '1001-5000';
        if (sizeNum <= 10000) return '5001-10000';
        return '10001+';
    }

    // Helper function to convert connection strength to our predefined values
    getConnectionStrength(strength) {
        const strengthMap = {
            'strong': 'Strong',
            'medium': 'Familiar',
            'weak': 'Weak',
            'none': 'Unfamiliar'
        };
        return strengthMap[strength?.toLowerCase()] || 'Unfamiliar';
    }
}

module.exports = new TheSwarmService(); 