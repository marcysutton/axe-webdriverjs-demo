var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs');

var util = require('util');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Homepage accessibility', function() {

    // Open the Deque website in the browser before each test is run
    beforeEach(function(done) {
        jasmine.addMatchers({
            toHaveNoViolations: function() {
                return {
                    compare: function(result) {
                        var violations = result.violations.length;
                        return {
                            message:  "Expected no accessibility violations but found " + violations,
                            pass: violations == 0
                        }
                    }
                }
            }
        });

        this.driver = new selenium.Builder()
            .forBrowser('firefox')
            .build();

        this.driver
            .get('http://www.hillaryclinton.com/')
            .then(function() {
                done();
            });
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function() {
        this.driver.quit();
    });

    // Test to ensure we are on the home page by checking the <body> tag for a specific class
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.css('.homepage'));

        element.getAttribute('class').then(function(className) {
            expect(className).toContain('home');
            done();
        });
    });

    // Test accessibility with axe-core
    it('Should have no accessibility violations', function(done) {
        AxeBuilder(this.driver)
            .analyze(function(results) {
                // if (results.violations.length > 0) {
                //     console.log(util.inspect(results.violations, true, null));
                // }
                expect(results).toHaveNoViolations();
                done();
            })
    });
});