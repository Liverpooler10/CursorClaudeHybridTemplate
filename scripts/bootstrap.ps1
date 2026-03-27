param(
  [string]$Destination = ".",
  [Parameter(Mandatory = $true)]
  [string]$ProjectName,
  [string]$PrimaryStack = "custom",
  [string]$Database = "custom",
  [string]$Frontend = "custom",
  [switch]$InstallClaudePlugins,
  [switch]$Force
)

$ErrorActionPreference = "Stop"

function Write-Step($message) {
  Write-Host "==> $message"
}

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptRoot
$templateRoot = Join-Path $repoRoot "template"

if (-not (Test-Path -LiteralPath $templateRoot)) {
  throw "Template directory not found: $templateRoot"
}

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
}

$destinationPath = (Resolve-Path -LiteralPath $Destination).Path

Write-Step "Scaffolding project into $destinationPath"

Copy-Item -Path (Join-Path $templateRoot "*") -Destination $destinationPath -Recurse -Force

$tokens = @{
  "__PROJECT_NAME__" = $ProjectName
  "__PRIMARY_STACK__" = $PrimaryStack
  "__DATABASE__" = $Database
  "__FRONTEND__" = $Frontend
  "__CURRENT_DATE__" = (Get-Date -Format "yyyy-MM-dd")
}

$textFiles = Get-ChildItem -Path $destinationPath -Recurse -File | Where-Object {
  $_.FullName -notmatch "\\\.git\\" -and
  (
    $_.Extension -in @(".md", ".json", ".txt", ".example", ".ps1", ".sh", "") -or
    $_.Name -in @(".cursorrules", "CLAUDE.md")
  )
}

foreach ($file in $textFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  foreach ($token in $tokens.Keys) {
    $content = $content.Replace($token, $tokens[$token])
  }
  [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
}

Write-Step "Template files copied and placeholders replaced"

if ($InstallClaudePlugins) {
  if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    throw "Claude Code CLI was not found in PATH. Install Claude first, then re-run with -InstallClaudePlugins."
  }

  Push-Location $destinationPath
  try {
    Write-Step "Adding Claude marketplaces"
    claude plugins marketplace add --scope project nextlevelbuilder/ui-ux-pro-max-skill
    claude plugins marketplace add --scope project kepano/obsidian-skills

    Write-Step "Installing Claude plugins"
    claude plugins install --scope project superpowers@claude-plugins-official
    claude plugins install --scope project ui-ux-pro-max@ui-ux-pro-max-skill
    claude plugins install --scope project obsidian@obsidian-skills
  }
  finally {
    Pop-Location
  }
}

Write-Step "Done"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Review CLAUDE.md and .cursorrules"
Write-Host "2. Fill out .planning/PROJECT.md, ROADMAP.md, and STATE.md"
Write-Host "3. Run 'claude plugins list' inside the target project to verify plugin state"
