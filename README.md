# Hudl Interview
SDET technical interview for Hudl 2025

Eva Martinuzzi | [Linkedin](https://www.linkedin.com/in/eva-martinuzzi-291689a1)

## The Challenge
A Hudl Coach account has been created on a test team. Set up automation using either Python Selenium or Typescript Playwright (I have selected Playwright). Automate any cases to test the functionality of validating logging into hudl.com with credentials, remembering not to include any passwords in public repos. Goal is to write tests with well established best practices and patterns. The suite will be run against the site. This should be complted within 4 days and take no more than 4 hours.

## The Setup
1. Download a command line interface (ex. Git Bash)
2. Ensure you have SSH set up on Github
3. Clone the repo: ```git clone git@github.com:EvaMartinuzzi/HudlInterview.git```
4. Install [Node.js](https://nodejs.org/en/download)
5. Install Playwright: ```npm init playwright@latest```

## Running the Tests
There are two ways to run tests in Playwright: headless (tests are run with no visual, this is typically faster) and headed (a GUI opens so the engineer can see what actions the automation is performing). To login with credentials, we need to send the username and password in these commands so we avoid hardcoding them. Please replace the brackets with valid strings.
* To run the tests in the command line, run: ```USERNAME=[usernamehere] PASSWORD=[passwordhere] npx playwright test```
* To run the tests with GUI, run: ```USERNAME=[usernamehere] PASSWORD=[passwordhere] npx playwright test --ui```
