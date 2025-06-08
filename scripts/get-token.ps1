# PowerShell script to get Sanity API token
Write-Host "Getting your Sanity API token..." -ForegroundColor Green

# Check if Sanity CLI is installed
if (!(Get-Command "sanity" -ErrorAction SilentlyContinue)) {
    Write-Host "Sanity CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @sanity/cli
}

# Get the token
Write-Host "Running 'sanity debug --secrets' to get your token..." -ForegroundColor Blue
Write-Host "Look for the 'Auth token' value in the output below:" -ForegroundColor Yellow
Write-Host ""

sanity debug --secrets

Write-Host ""
Write-Host "Copy the 'Auth token' value and add it to your .env.local file as:" -ForegroundColor Green
Write-Host "SANITY_API_TOKEN=<your_token_here>" -ForegroundColor Cyan 