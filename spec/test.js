/*global jasmine*/
var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs'),
    driver, browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

describe('Selenium-aXe Tutorial', function() {

    // Open the Deque website in the browser before each test is run
    beforeEach(function(done) {
        driver = new selenium.Builder()
                .forBrowser('chrome')
                .usingServer('http://localhost:4444/wd/hub');

        browser = driver.build();

        browser.get('http://www.deque.com/').then(function () {
            browser.executeAsyncScript(function(callback) {
                var script = document.createElement('script');
                script.innerHTML = 'document.documentElement.classList.add("deque-axe-is-ready");';
                document.documentElement.appendChild(script);
                callback();
            })
            .then(function () {
                return browser.wait(selenium.until.elementsLocated(selenium.By.css('html.deque-axe-is-ready')));
            }).then(done);
        });
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        browser.quit().then(function () {
            done();
        });
    });

    // Test to ensure we are on the home page by checking the <body> tag for a specific class
    it('The home page should have no accessibility issues', function(done) {
        browser.findElement(selenium.By.css('body.home')).then(function (element) {
            return element.getAttribute('class').then(function (className) {
                expect(className.indexOf('home')).toBe(0);
            });
        }).then(function () {
            AxeBuilder(browser)
                .analyze(function(results) {
                    expect(results.violations.length).toBe(0);
                    done();
                })
        }).catch(function () {
            expect(false).toBe(true);
            done();
        });
    });
});