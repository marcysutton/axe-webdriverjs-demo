var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs');

var driver, browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

var util = require('util');

describe('Selenium-aXe Tutorial', function() {

    // Open the Deque website in the browser before each test is run
    beforeEach(function(done) {
        driver = new selenium.Builder()
            .forBrowser('chrome');

        browser = driver.build();

        browser.manage().timeouts().setScriptTimeout(60000);

        browser.get('http://www.deque.com/').then(function () {
            browser.executeAsyncScript(function(callback) {
                var script = document.createElement('script');
                script.innerHTML = 'document.documentElement.classList.add("deque-axe-is-ready");';
                document.documentElement.appendChild(script);
                callback();
            })
            .then(function () {
                return browser.wait(selenium.until.elementsLocated(selenium.By.css('.deque-axe-is-ready')));
            })
            .then(function(){
                done();
            });
        });
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        browser.quit().then(function () {
            done();
        });
    });

    it('should just fetch the home page and analyze it', function (done) {
        browser.findElement(selenium.By.css('body.home')).then(function (element) {
            return element.getAttribute('class').then(function (className) {
                expect(className.indexOf('home')).toBe(0);
            });
        }).then(function () {
            AxeBuilder(browser)
                .analyze(function(results) {
                    console.log('Accessibility Violations: ', results.violations.length);
                    if (results.violations.length > 0) {
                        console.log(util.inspect(results.violations, { showHidden: true, depth: 8 }));
                    }
                    console.log('Needs review: ', results.incomplete.length);
                    if (results.incomplete.length > 0) {
                        console.log(util.inspect(results.incomplete, { showHidden: true, depth: 8 }));
                    }
                    expect(results.violations.length).toBe(0);
                    done();
                })
        });
    });
});