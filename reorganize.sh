#!/bin/bash

# Create necessary directories
mkdir -p frontend/src
mkdir -p server/src

# Move prototype files to frontend/src
mv prototype/* frontend/src/

# Remove empty directories
rm -rf prototype
rm -rf backend

# Create a basic frontend package.json if it doesn't exist
if [ ! -f frontend/package.json ]; then
    cat > frontend/package.json << EOL
{
  "name": "trusted-voices-frontend",
  "version": "1.0.0",
  "description": "Frontend for Trusted Voices LinkedIn connection filtering tool",
  "main": "src/index.html",
  "scripts": {
    "start": "serve src",
    "build": "echo 'Build process to be implemented'"
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}
EOL
fi

# Update frontend README
cat > frontend/README.md << EOL
# Trusted Voices Frontend

This is the frontend for the Trusted Voices LinkedIn connection filtering tool.

## Current Structure
\`\`\`
frontend/
├── src/              # Source files
│   ├── index.html    # Main HTML file
│   ├── script.js     # JavaScript logic
│   └── styles.css    # CSS styles
└── package.json      # Dependencies
\`\`\`

## Development
1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm start
   \`\`\`

## Next Steps
- [ ] Set up proper build process
- [ ] Add React/Modern framework
- [ ] Implement proper component structure
- [ ] Add testing framework
EOL

echo "Project structure has been reorganized!"
echo "Frontend code is now in frontend/src/"
echo "Backend code is in server/src/"
echo ""
echo "Next steps:"
echo "1. Review the new structure"
echo "2. Update any import paths in the code"
echo "3. Test that everything still works" 