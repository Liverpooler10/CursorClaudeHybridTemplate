param(
  [Parameter(Position = 0)]
  [string]$Destination = ".",
  [string]$ProjectName,
  [string]$PrimaryStack = "custom",
  [string]$Database = "custom",
  [string]$Frontend = "custom",
  [switch]$InstallClaudePlugins,
  [switch]$WithFeatureSkeleton,
  [switch]$Yes,
  [switch]$Force
)

$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$mjs = Join-Path $scriptRoot "bootstrap.mjs"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js >= 18 is required. Install Node and re-run."
}

$argsList = @($Destination)
if ($ProjectName)          { $argsList += @("--project-name",  $ProjectName) }
if ($PrimaryStack)         { $argsList += @("--primary-stack", $PrimaryStack) }
if ($Database)             { $argsList += @("--database",      $Database) }
if ($Frontend)             { $argsList += @("--frontend",      $Frontend) }
if ($InstallClaudePlugins) { $argsList += @("--install-claude-plugins") }
if ($WithFeatureSkeleton)  { $argsList += @("--with-feature-skeleton") }
if ($Yes)                  { $argsList += @("--yes") }
if ($Force)                { $argsList += @("--force") }

& node $mjs @argsList
exit $LASTEXITCODE
