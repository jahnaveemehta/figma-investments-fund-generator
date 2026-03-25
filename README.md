# Investments Fund Generator (Figma Plugin)

A Figma plugin designed to instantly populate strict design system components with realistic investment fund data, complete with auto-calculated returns and dynamic logo swapping. 

*Note: Currently pending review in the Figma Community.*

## ⚠️ Important: Design System Dependency
Please note that this plugin is purpose-built to integrate with a specific, proprietary design system. 

The codebase strictly targets specific component names and nested layer structures to function (e.g., a parent `ListGroup` instance, a nested `ListItem (Timeline)` component, and specific variant states like `List Items` and `Icons`). 

To evaluate my work, I highly recommend:
1. **Watching the demo video** https://www.linkedin.com/posts/jahnavee-mehta_uxdesign-designsystem-figmaplugin-activity-7434629078801887232-qdEg?utm_source=share&utm_medium=member_desktop&rcm=ACoAACRyJI8Bf5QAprvK5HM3Gz2-ahjzC2XzanE
3. **Reviewing `code.js`** to see how I handled variant updates, nested instance swapping, and API asynchronous calls.
   
**If you run this plugin in a blank Figma file, it will not execute** because the required components do not exist. To evaluate my work, please use the sandbox file provided below or review `code.js` to see the logic.

## 🎮 Try it yourself! (Sandbox)
If you want to test the plugin locally, I have set up a sandbox Figma file containing the exact components required for the plugin to run:

 **(https://www.figma.com/design/TtESXs9neg7zspR4YQukk3/Plugin-Playground?node-id=1-7609&t=13hwZLt1ZrON3rcW-1)**

**To test:**
1. Open the link and duplicate the file to your Drafts.
2. Download this repository to your computer.
3. In your duplicated Figma file, go to **Plugins > Development > Import plugin from manifest...** and select the `manifest.json` file.
4. Select the `ListGroup` on the canvas and run the plugin!

## 🚀 The Challenge & Technical Highlights
Designing fintech interfaces requires realistic data to test layouts, but manually typing out fund names, calculating annual returns, and hunting down provider logos is incredibly time-consuming. I built this plugin to automate that workflow directly within Figma.

This project was built to bridge the gap between design systems and code:
* **Deep Design System Integration:** The plugin doesn't just paste text; it physically interacts with component variants (dynamically changing the `List Items` variant to spawn the correct number of rows).
* **Nested Instance Swapping:** I wrote logic to traverse deep-nested component layers, find placeholder icons, and automatically swap them with real company logo components (Vanguard, iShares, etc.) based on CSV data. 
* **AI-Assisted Development:** I leveraged AI as a pair-programmer to navigate the strict requirements of the Figma Plugin API, handle cross-origin UI messaging, and build complex component fallbacks.

## 💻 How to Run Locally (Standard Instructions)
1. Clone or download this repository.
2. Open the Figma desktop app.
3. Go to **Main Menu > Plugins > Development > Import plugin from manifest...**
4. Select the `manifest.json` file from this folder.
