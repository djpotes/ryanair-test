const wdioAction = require('Utils').wdioAction;

class ShooseBagPage {
    constructor(){
       this.radioOnlyOneBag = "#ry-radio-button--1";  
    };

    selectOnlyOneBag(){
        wdioAction.waitForDisplayed(this.radioOnlyOneBag, 20000);
        wdioAction.click(this.radioOnlyOneBag);
    }
}
module.exports = new ShooseBagPage();