var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs');

describe('Selenium-aXe Tutorial', function() {

    // Open the Deque website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder()
            .forBrowser('firefox')
            .build();

        this.driver
            .get('http://www.deque.com/')
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
        var element = this.driver.findElement(selenium.By.tagName('body'));

        element.getAttribute('class').then(function(className) {
            expect(className).toContain('home');
            done();
        });
    });

    // Test accessibility with axe-core
    it('Should have no accessibility violations', function(done) {
        AxeBuilder(this.driver)
            .analyze(function(results) {
                expect(results.violations.length).toBe(0);
                console.log(results.violations);
                done();
            })
    });
});