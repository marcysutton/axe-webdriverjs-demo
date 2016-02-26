#axe-webdriverjs demo

How to set up aXe with Selenium WebdriverJS and Jasmine for automated testing.

##Requirements
* Node.js
* Firefox browser

##Installation

Download Selenium Standalone Server:
```
curl -O http://selenium-release.storage.googleapis.com/2.52/selenium-server-standalone-2.52.0.jar
```

From the command line, install axe-core:
```
npm install axe-core
```

Install required dependencies (includes Jasmine):
```
npm install
```

##Usage

Start Selenium Server from the command line:
```
java -jar selenium-server-standalone-2.52.0.jar
```

Now, in a separate tab:
```
npm test
```