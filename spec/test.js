/*global jasmine*/
var selenium = require('selenium-webdriver'),
    AxeBuilder = require('./attest-axebuilder.js'),
    driver, browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

describe('Selenium-aXe Tutorial', function() {

    // Open the Deque website in the browser before each test is run
    beforeEach(function () {
        driver = new selenium.Builder()
                .forBrowser('chrome')
                .usingServer('http://localhost:4444/wd/hub');

        browser = driver.build();
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function (done) {
        browser.quit().then(function () {
            done();
        });
    });

    it('should just fetch the home page and analyze it', function (done) {
        AxeBuilder(browser).getThenAnalyze('http://www.deque.com/', function (results) {
            expect(results.violations.length).toBe(0);
            done();
        });
    });
});