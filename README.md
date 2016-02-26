#axe-webdriverjs demo

How to set up aXe with Selenium WebdriverJS for automated testing.

##Requirements
* Node.js
* Firefox browser
* Selenium Webdriver

##Installation

Download Selenium Standalone Server:
```
curl -O http://selenium-release.storage.googleapis.com/2.52/selenium-server-standalone-2.52.0.jar
```

From the command line, install axe-core:
```
npm install axe-core
```

Install required dependencies (includes selenium-webdriver):
```
npm install
```

Install Jasmine globally (may require sudo):
```
npm install -g jasmine
jasmine init
```

##Usage

Start Webdriver from the command line:
```
java -jar selenium-server-standalone-2.47.0.jar
```

Now, in a separate tab:
```
jasmine spec/test.js
```