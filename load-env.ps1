# Load environment variables from .env file
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]*)\s*=\s*(.*)\s*$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove quotes if present
            if ($value.StartsWith('"') -and $value.EndsWith('"')) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            if ($value.StartsWith("'") -and $value.EndsWith("'")) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            
            Set-Item -Path "env:$name" -Value $value
            Write-Host "Loaded: $name" -ForegroundColor Green
        }
    }
    Write-Host "Environment variables loaded from .env file" -ForegroundColor Cyan
} else {
    Write-Host ".env file not found" -ForegroundColor Yellow
} 