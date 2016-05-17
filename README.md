#axe-webdriverjs demo

How to set up aXe with Selenium WebdriverJS and Jasmine for automated testing.

##Requirements
* Node.js
* npm
* Chrome browser

##Installation

If you don't already have it, [download Chrome driver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and put it in a location on your system $PATH.

>For more info on setup and testing other browsers, review the [selenium-webriver documentation](https://www.npmjs.com/package/selenium-webdriver).

Install dependencies (including Jasmine):
```
npm install
```

###Demo Project

This demo tests eBay's Accessibility Pattern examples running locally at http://localhost:4000. You can follow along with the project by cloning the repository and setting it up on your local machine: https://github.com/ianmcburnie/mindpatterns/ 

##Usage: Run tests

```
npm test
```