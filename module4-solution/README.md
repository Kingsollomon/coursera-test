# Module 4 Solution: Interactive Greeting App

A simple browser app that displays “Hello” or “Good Bye” greetings for a list of names. Buttons are grouped by greeting type, styled for accessibility, and accompanied by a Clear-Greetings control. All functionality is covered by Jasmine specs.

---

## Features

- Alphabetically sorted name buttons  
- Separate sections for “Hello” and “Good Bye” buttons  
- Accessible ARIA labels on each button  
- Hover and focus styles for better UX  
- Append greetings to a live-region container  
- Clear all greetings with one click  
- Jasmine specs ensure 100% test coverage  

---

## Installation

**Prerequisites**

- Node.js (v14+)  
- npm (v6+)

**Steps**

```bash
git clone https://github.com/Kingsollomon/coursera-test.git
cd coursera-test/module4-solution
npm install

Usage

npx browser-sync start --server --files "*.*"
Open your browser to http://localhost:3000/index.html

Click any name button to display its greeting

Click Clear Greetings to remove all messages

Running Tests
Browser Runner
Start the dev server as above.

Open http://localhost:3000/SpecRunner.html

Ensure the green banner: “All specs have passed.”
