# ScreenShot Desktop using PowerShell (PS)
# Version v1
# Written by: Othmane Moutaouakkil [ WHOAMI2507 ]  (You don't become a coder by just changing the credits)
# Github: https://github.com/whoami2507


# [ Takes snapshot of your screen and saves to a file ]

$outputFile = "C:\Users\Othmane Moutaouakkil\Desktop\ScreenShot.png"

Add-Type -AssemblyName System.Windows.Forms
Add-type -AssemblyName System.Drawing

# Return resolution
$Screen = [System.Windows.Forms.SystemInformation]::VirtualScreen
$Width = $Screen.Width
$Height = $Screen.Height
$Left = $Screen.Left
$Top = $Screen.Top

# Create graphic
$screenshotImage = New-Object System.Drawing.Bitmap $Width, $Height

# Create graphic object
$graphicObject = [System.Drawing.Graphics]::FromImage($screenshotImage)

# Capture screen
$graphicObject.CopyFromScreen($Left, $Top, 0, 0, $screenshotImage.Size)

# Save to file - Saves to your path
$screenshotImage.Save($outputFile)

Write-Output "Saved to:"
Write-Output $outputFile
Start-Sleep -s 5
