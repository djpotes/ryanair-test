const wdioAction = require('Utils').wdioAction;

class ChooseSeatPage {
    constructor(){
        this.buttonStandardSeat = "button[class='ng-star-inserted seatmap__seat seatmap__seat--standard']";
        this.buttonNextFly = 'button=Next flight';
        this.buttonContinue = 'button=Continue';
        this.noThanksAvoidCrowdsLink = `//button[@data-ref = 'enhanced-takeover-beta-desktop__dismiss-cta']`
    };

    selectSeats(row){
            wdioAction.waitForClickable(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]/child::div[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[2]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[2]/child::div[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[3]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[3]/child::div[1]`);
            wdioAction.click(this.buttonNextFly);
            browser.pause(3000);
            wdioAction.waitForClickable(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[1]/child::div[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[2]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[2]/child::div[1]`);
            $(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[3]`).click();
            wdioAction.waitForExist(`//div[@data-ref='seat-map__seat-row-${row}']/child::div/child::button[3]/child::div[1]`);
    }

    clickContinueButton(){
        wdioAction.click(this.buttonContinue);
        wdioAction.click(this.noThanksAvoidCrowdsLink);
    }
}
module.exports = new ChooseSeatPage();