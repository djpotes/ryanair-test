const wdioAction = require('Utils').wdioAction;

class BookingPage {
    constructor(){
        this.buttonUsingCookies = "[class=cookie-popup-with-overlay__button]";
        this.inputDeparture = "#input-button__departure";
        this.inputDestination = "#input-button__destination";
        this.panelDestination ="fsw-destination-container";
        this.inputDateFrom= "[uniqueid=dates-from]";
        this.panelDateFrom = "//fsw-datepicker-container[@data-ref='fsw-datepicker-container__from']";
        this.inputDateTo= "[uniqueid=dates-to]";
        this.panelDateTo = "//fsw-datepicker-container[@data-ref='fsw-datepicker-container__to']";
        this.iconShowMoreMonths = `//div[contains(@class, 'm-toggle__button')]`;
        this.months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        this.buttonAddPassanger = "[class=counter__button-wrapper--enabled]";  
        this.buttonDonePassanger = "button=Done"
    };

    agreeUsingCookies(){
        wdioAction.click(this.buttonUsingCookies);
    }

    setDeparture(country, airport){
        wdioAction.click(this.inputDeparture);
        wdioAction.click(`span=${country}`);
        wdioAction.click(`span=${airport}`);
        wdioAction.waitForVisibility(this.panelDestination);
    }

    setDestination(country, airport){
        wdioAction.click(this.inputDestination);
        wdioAction.click(`span=${country}`);
        wdioAction.click(`span=${airport}`); 
    }

    setPassangers(adults, child){
        this.addAdult(adults-1);
        this.addChild(child);
        wdioAction.click(this.buttonDonePassanger);
        browser.pause(4000)
    }

    formatDate(date){
        return date.toISOString().split('T')[0];
    }

    showMoreMonths(count){
        for( var a=0; a<count; a++){
            $$(this.iconShowMoreMonths)[1].click();
        }
    }

    addAdult(count){
        for( var a=0; a<count; a++){
            $$(this.buttonAddPassanger)[0].click();
        }
    }

    addChild(count){
        for( var a=0; a<count; a++){
            $$(this.buttonAddPassanger)[3].click();
        }
    }

    clickMonth(month){
        $$(`//div[@data-ref='m-toggle-months-item' and text()=' ${month} ']`)[0].click();
    }

    clickDate(date){
        wdioAction.click(`[data-id='${date}']`);
    }

    completeDate(showMonth, date){
        const month = this.months[date.getMonth()];
        const formatedDate = this.formatDate(date);
        this.showMoreMonths(showMonth);
        this.clickMonth(month);
        this.clickDate(formatedDate)
    }

    setDepartureDate(date){
        wdioAction.click(this.inputDateFrom); 
        wdioAction.waitForVisibility(this.panelDateFrom);
        this.completeDate(1, date);
    }

    setDestinationDate(date){
        this.completeDate(4, date);
    }

    open() {
        browser.url("/");
    };
}

module.exports = new BookingPage();