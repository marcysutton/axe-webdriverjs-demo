var selenium = require('selenium-webdriver');
var AxeBuilder = require('axe-webdriverjs');

AxeBuilder.prototype.getThenAnalyze = function (url, done) {
	var browser = this._driver; // capture
	var that = this;

    browser.get(url).then(function () {
        browser.executeAsyncScript(function(callback) {
            var script = document.createElement('script');
            script.innerHTML = 'document.documentElement.classList.add("deque-axe-is-ready");';
            document.documentElement.appendChild(script);
            callback();
        })
        .then(function () {
            return browser.wait(selenium.until.elementsLocated(selenium.By.css('html.deque-axe-is-ready')));
        }).then(function () {
        	that.analyze(done);
        });
    });
};

module.exports = AxeBuilder;