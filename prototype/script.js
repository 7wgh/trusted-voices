// DOM Elements
const linkedinUrlsInput = document.getElementById('linkedin-urls');
const jobTitlesInput = document.getElementById('job-titles');
const companySizeCheckboxes = document.querySelectorAll('input[name="company-size"]');
const processBtn = document.getElementById('process-btn');
const cancelBtn = document.getElementById('cancel-btn');
const exportBtn = document.getElementById('export-btn');
const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
const processedCount = document.getElementById('processed-count');
const matchesCount = document.getElementById('matches-count');
const errorMessage = document.getElementById('error-message');

// Mock data for demonstration
const mockData = [
    {
        clientName: "John Doe",
        connectionName: "Jane Smith",
        jobTitle: "Senior Software Engineer",
        company: "Tech Corp",
        companySize: "501-1000",
        connectionStrength: "Strong",
        email: "jane.smith@techcorp.com"
    },
    {
        clientName: "John Doe",
        connectionName: "Mike Johnson",
        jobTitle: "Product Manager",
        company: "Innovation Labs",
        companySize: "51-200",
        connectionStrength: "Familiar",
        email: "mike.j@innovationlabs.com"
    },
    {
        clientName: "Alice Brown",
        connectionName: "Sarah Wilson",
        jobTitle: "Marketing Director",
        company: "Growth Co",
        companySize: "201-500",
        connectionStrength: "Weak",
        email: "sarah.w@growthco.com"
    }
];

// Event Listeners
processBtn.addEventListener('click', handleProcess);
cancelBtn.addEventListener('click', handleCancel);
exportBtn.addEventListener('click', handleExport);

// Process button handler
async function handleProcess() {
    // Clear previous results
    clearResults();
    showError('');
    
    // Get input values
    const urls = linkedinUrlsInput.value.trim().split('\n').filter(url => url.trim());
    const jobTitles = jobTitlesInput.value.trim().split(',').map(title => title.trim());
    const companySizes = Array.from(companySizeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Basic validation
    if (!urls.length) {
        showError('Please enter at least one LinkedIn URL');
        return;
    }

    if (!jobTitles.length) {
        showError('Please enter at least one job title');
        return;
    }

    if (!companySizes.length) {
        showError('Please select at least one company size range');
        return;
    }

    // Simulate processing
    processBtn.disabled = true;
    cancelBtn.disabled = false;
    exportBtn.disabled = true;

    try {
        // Send request to our server
        const response = await fetch('http://localhost:3000/api/process-connections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                linkedinUrls: urls,
                jobTitles: jobTitles,
                companySizes: companySizes
            })
        });

        const data = await response.json();

        if (data.success) {
            // Update UI with the results
            updateResults(data.data.connections);
            processedCount.textContent = data.data.processedProfiles;
            matchesCount.textContent = data.data.matchesFound;
        } else {
            showError(data.message || 'Failed to process connections');
        }
    } catch (error) {
        showError('Error connecting to server. Please try again.');
        console.error('Error:', error);
    } finally {
        processBtn.disabled = false;
        cancelBtn.disabled = true;
        exportBtn.disabled = false;
    }
}

// Cancel button handler
function handleCancel() {
    processBtn.disabled = false;
    cancelBtn.disabled = true;
    exportBtn.disabled = true;
    showError('Processing cancelled');
}

// Export button handler
function handleExport() {
    const rows = Array.from(resultsTable.getElementsByTagName('tr'));
    if (!rows.length) {
        showError('No data to export');
        return;
    }

    // Create CSV content
    const headers = ['Client Name', 'Connection Name', 'Job Title', 'Company', 'Company Size', 'Connection Strength', 'Email'];
    const csvContent = [
        headers.join(','),
        ...rows.map(row => {
            const cells = Array.from(row.getElementsByTagName('td'));
            return cells.map(cell => `"${cell.textContent}"`).join(',');
        })
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = URL.createObjectURL(blob);
    link.download = `linkedin_connections_${timestamp}.csv`;
    link.click();
}

// Helper functions
function clearResults() {
    resultsTable.innerHTML = '';
    processedCount.textContent = '0';
    matchesCount.textContent = '0';
}

function updateResults(data) {
    clearResults();
    
    // Update counts
    processedCount.textContent = mockData.length;
    matchesCount.textContent = data.length;

    // Update table
    data.forEach(item => {
        const row = resultsTable.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle('visible', !!message);
} 