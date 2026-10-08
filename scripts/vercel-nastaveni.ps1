# WOHAKO — příprava .env.local a nasazení na Vercel
# Spuštění: dvojklik na vercel-nastaveni.cmd v kořeni projektu
#   nebo: powershell -ExecutionPolicy Bypass -File scripts\vercel-nastaveni.ps1

# Nativní příkazy (npm, npx) píšou průběh do stderr — chyby kontrolujeme přes $LASTEXITCODE.
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$source = Join-Path $root '.secrets\env.txt'

function Step($text) { Write-Host ''; Write-Host "==> $text" -ForegroundColor Cyan }

if (-not (Test-Path $source)) {
  Write-Host "Chybí soubor .secrets\env.txt s přístupovými údaji." -ForegroundColor Red
  exit 1
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host 'Není nainstalovaný Node.js. Stáhněte verzi 24 LTS z https://nodejs.org a spusťte skript znovu.' -ForegroundColor Red
  exit 1
}

# 1) Načtení proměnných
$vars = [ordered]@{}
foreach ($line in Get-Content $source -Encoding UTF8) {
  if ($line -match '^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$') { $vars[$Matches[1]] = $Matches[2] }
}

# 2) .env.local pro lokální spuštění
Step 'Vytvářím .env.local'
$utf8 = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText((Join-Path $root '.env.local'), (Get-Content $source -Raw -Encoding UTF8), $utf8)
Write-Host 'Hotovo: .env.local (do Gitu se nenahrává).'

# 3) Závislosti
Step 'Instaluji balíčky (npm install)'
npm install
if ($LASTEXITCODE -ne 0) { throw 'npm install selhal.' }

$answer = Read-Host 'Nahrát proměnné na Vercel a nasadit web? (A/N)'
if ($answer -notmatch '^[AaYy]') {
  Write-Host 'Vercel přeskočen. Lokálně spustíte web příkazem: npm run dev'
  exit 0
}

$vercel = @('--yes', 'vercel@latest')

# 4) Přihlášení a propojení projektu
Step 'Přihlášení k Vercelu'
cmd /c "npx --yes vercel@latest whoami >nul 2>nul"
if ($LASTEXITCODE -ne 0) { npx @vercel login }
if ($LASTEXITCODE -ne 0) { throw 'Přihlášení k Vercelu se nepovedlo.' }

Step 'Propojení s projektem na Vercelu (vyberte existující projekt WOHAKO, nebo založte nový)'
npx @vercel link
if ($LASTEXITCODE -ne 0) { throw 'Propojení s Vercelem se nepovedlo.' }

# 5) Proměnné prostředí (Production + Development)
Step 'Nahrávám proměnné prostředí'
$tmp = [IO.Path]::GetTempFileName()
try {
  foreach ($name in $vars.Keys) {
    $value = $vars[$name]
    if ([string]::IsNullOrWhiteSpace($value)) { Write-Host "  $name je prázdná — přeskakuji"; continue }
    foreach ($target in @('production', 'development')) {
      $null = cmd /c "npx --yes vercel@latest env rm $name $target --yes 2>nul"
      [IO.File]::WriteAllText($tmp, $value, $utf8)
      cmd /c "npx --yes vercel@latest env add $name $target < `"$tmp`""
      if ($LASTEXITCODE -ne 0) { throw "Nahrání $name ($target) se nepovedlo." }
    }
    Write-Host "  $name OK" -ForegroundColor Green
  }
} finally {
  Remove-Item $tmp -ErrorAction SilentlyContinue
}

# 6) Nasazení
Step 'Nasazuji na produkci'
npx @vercel deploy --prod
if ($LASTEXITCODE -ne 0) { throw 'Nasazení selhalo. Podívejte se na výpis výše.' }

Write-Host ''
Write-Host 'Hotovo. Nezapomeňte v MongoDB Atlas → Network Access povolit 0.0.0.0/0,' -ForegroundColor Yellow
Write-Host 'jinak se web na Vercelu k databázi nepřipojí. Administrace: /administrator' -ForegroundColor Yellow
