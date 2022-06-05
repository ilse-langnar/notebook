const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// $outputFile = "C:\Users\Othmane Moutaouakkil\Desktop\ScreenShot.png"
export default class PowershellScript {

    constructor( target_dir ) {
        return `
$outputFile = "${target_dir}\script.ps1"
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
Start-Sleep -s 5 `
    }

}

