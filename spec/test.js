var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs'),
    Key = selenium.Key;

var util = require('util');

var driver;

describe('Radio button demo', function() {

    beforeEach(function(done) {
        driver = new selenium.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost:4000/radio/')
            .then(function () {
                done();
            });
    });

    // Close website after each test is run (so it is opened fresh each time)
    afterEach(function(done) {
        driver.quit().then(function () {
            done();
        });
    });

    it('should change state with the keyboard', function() {
      var selector = 'span[role="radio"][aria-labelledby="radiogroup-0-label-0"]';

      driver.findElement(selenium.By.css(selector))
        .then(function (element) {
            element.sendKeys(Key.SPACE);
            return element;
        })
        .then(function (element) {
            return element.getAttribute('aria-checked')
        })
        .then(function (attr) {
            expect(attr).toEqual('true');
        });
    });

    it('should fetch the radio button demo and analyze it', function (done) {
        driver.findElement(selenium.By.css('.radio_'))
            .then(function () {
                AxeBuilder(driver)
                    .analyze(function(results) {
                        console.log('Accessibility Violations: ', results.violations.length);
                        if (results.violations.length > 0) {
                            console.log(util.inspect(results.violations, true, null));
                        }
                        expect(results.violations.length).toBe(0);
                        done();
                    })
            });
    });
});