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

    static waitForVisibility(webElement) {
        try {
            $(webElement).waitForDisplayed(2000);
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