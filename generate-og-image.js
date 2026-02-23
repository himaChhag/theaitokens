// To generate the OpenGraph image, you can:
// 1. Open create-og-image.html in your browser
// 2. Take a screenshot at exactly 1200x630 pixels
// 3. Save as og-model.png in the public folder

// OR use this Node.js script with puppeteer:
// npm install puppeteer
// node generate-og-image.js

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to exact OG image dimensions
    await page.setViewport({ width: 1200, height: 630 });
    
    // Load the HTML file
    const htmlPath = path.join(__dirname, 'create-og-image.html');
    await page.goto(`file://${htmlPath}`);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'public/og-model.png',
      width: 1200,
      height: 630
    });
    
    await browser.close();
    console.log('✅ OpenGraph image generated: public/og-model.png');
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    console.log('💡 Alternative: Open create-og-image.html in browser and screenshot at 1200x630');
  }
}

generateOGImage();