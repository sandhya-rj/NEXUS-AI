Param(
  [Parameter(Mandatory=$true)][string]$Repo, # e.g. "sandhya-rj/NEXUS-AI"
  [Parameter(Mandatory=$true)][string[]]$Users, # e.g. @("username1","username2")
  [string]$Permission = "push" # push=write, pull=read, admin=admin
)

Write-Host "Adding collaborators to $Repo with permission '$Permission'" -ForegroundColor Cyan

foreach ($u in $Users) {
  try {
    gh api -X PUT "repos/$Repo/collaborators/$u" -f permission=$Permission | Out-Null
    Write-Host "✓ Added $u" -ForegroundColor Green
  } catch {
    Write-Host "✗ Failed to add $u: $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host "Done." -ForegroundColor Cyan