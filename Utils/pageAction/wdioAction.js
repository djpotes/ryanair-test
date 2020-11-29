class wdioAction {
    static setValue(locator, value){
        try{
            $(locator).setValue(value)
        } catch(e){
            throw new Error(e);
        }
    };

    static isVisible(webElement) {
        try {
            return $(webElement).isDisplayed();
        } catch (e) {
            throw new Error(e);
        }
    }

    static waitForExist(webElement, time) {
        try {
            $(webElement).waitForExist(time?time:2000);
        } catch (e) {
            throw new Error(e);
        }
    }

    static waitForDisplayed(webElement, time) {
        try {
            $(webElement).waitForDisplayed(time?time:2000);
        } catch (e) {
            throw new Error(e);
        }
    }

    static waitForClickable(webElement, time) {
        try {
            $(webElement).waitForClickable(time?time:2000);
        } catch (e) {
            throw new Error(e);
        }
    }

    static click(locator){
        try{
            $(locator).click();
        } catch(e){
            throw new Error(e);
        }
    };
}

module.exports = wdioAction;