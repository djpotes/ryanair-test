const wdioAction = require('Utils').wdioAction;

class BookingPage {
    constructor(){
        //Locators
        /*this.inputUserName = "[name='username']";
        this.inputPassword = "[name='password']";
        this.buttonLogin = "[data-testid='sign-in']";*/
    };

    /*setUserName(value){
        wdioAction.setValue(this.inputUserName, value);
    };

    setPassword(value){
        wdioAction.setValue(this.inputPassword, value);
    };

    clickLogin(){
        wdioAction.click(this.buttonLogin);
        $("[data-testid='main-menu']").waitForDisplayed();
    }*/

    open() {
        browser.url("/");
    };
}

module.exports = new BookingPage();