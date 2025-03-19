#!/bin/bash

# Remove only unnecessary files
rm -rf .DS_Store

# Clean up build artifacts but keep node_modules
find . -name "build" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +

# Remove any .env files
find . -name ".env" -type f -delete

# Create fresh .env.example if it doesn't exist
if [ ! -f server/.env.example ]; then
    cat > server/.env.example << EOL
# Server Configuration
PORT=3000

# The Swarm API Configuration
THE_SWARM_API_KEY=your_api_key_here
THE_SWARM_API_URL=https://api.theswarm.com/v1

# Optional: Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
EOL
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
fi

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Trusted Voices prototype (Frontend priority)"

echo "Repository is ready for GitHub!"
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Add the remote: git remote add origin <github-repo-url>"
echo "3. Push the code: git push -u origin main"
echo ""
echo "Note: Backend code is included for reference but is optional."
echo "Focus should be on frontend development first." 