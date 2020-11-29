const wdioAction = require('Utils').wdioAction;

class FlightsPage {
    constructor(){
        this.buttonNextDate = `button[aria-label='Search next dates']`;
        this.buttonPreviewDate = `button[aria-label='Search previous dates']`;
        this.dateScroll = `div[class='carousel']`;
        this.listFlight = "div[class='card-info']";
        this.tarifaValue = `div[data-e2e='fare-card--standard']`;
        this.linkLogLater = "div[class='login-touchpoint__chevron-container']";
        this.buttonTitlePassanger = "button[class*='dropdown__toggle']";
        this.titleListPassanger = "ry-dropdown-item";
        this.buttonContinue = 'button=Continue';
        //this.familiCityWarningButton = 'button=Okay, got it.';
        //this.familiCityWarningButton = `//button[text()='Okay, got it.']`;
        this.familiCityWarningButton = `//button[contains(@class,'seats-modal__cta ry-button--gradient-blue')]`
        
        
        //
    };

    formatDate(date){
        return date.toISOString().split('T')[0];
    }

    scrollDate(count, isDeparture){
        var scrollButton;
        wdioAction.waitForDisplayed(`button[aria-label='Search previous dates']`, 10000);
        
        if(isDeparture){
            if(count>0){
                scrollButton = $$(this.dateScroll)[0].$(this.buttonNextDate);
            }else{
                scrollButton = $$(this.dateScroll)[0].$(this.buttonPreviewDate);
            }
        }else{
            if(count>0){
                scrollButton = $$(this.dateScroll)[1].$(this.buttonNextDate);
            }else{
                scrollButton = $$(this.dateScroll)[1].$(this.buttonPreviewDate);
            }
        }

        for( var a=0; a<Math.abs(count); a++){
            scrollButton.click();
            browser.pause(1000);
        }
    }

    changeDate(date, countScroll, isDeparture){
        this.scrollDate(countScroll, isDeparture);
        const formatedDate = this.formatDate(date);
        if(isDeparture){
            $$(this.dateScroll)[0].$(`button[data-ref='${formatedDate}']`).click();
        }else{
            $$(this.dateScroll)[1].$(`button[data-ref='${formatedDate}']`).click();
        }
    }

    setFlight(depart_return, tarifa){
        wdioAction.waitForClickable(this.listFlight);
        if(depart_return == "Depart"){
            $$(this.listFlight)[0].click();
        }
        if(depart_return == "Return"){
            browser.pause(1000);
            $$(this.listFlight)[1].click();
        }
        this.setTarifa(tarifa)
    }

    setTarifa(type){
        wdioAction.waitForDisplayed(this.tarifaValue, 10000);
        if(type == "value"){
            wdioAction.click(this.tarifaValue);
        }
    }

    clickContinueButton(){
        wdioAction.click(this.buttonContinue);
        wdioAction.waitForClickable(this.familiCityWarningButton, 20000);
        wdioAction.click(this.familiCityWarningButton);
    }

    setPassangerDetails(passangers){
        wdioAction.waitForDisplayed(this.linkLogLater, 10000);
        wdioAction.click(this.linkLogLater);
        for(var a=0; a<passangers.adults.length; a++){
            $$(this.buttonTitlePassanger)[a].click();
            $$(this.titleListPassanger)[0].click();
            $(`input[id='formState.passengers.ADT-${a}.name']`).addValue(passangers.adults[a].firstName);
            $(`input[id='formState.passengers.ADT-${a}.surname`).addValue(passangers.adults[a].lastName);
        }
        for(var a=0; a<passangers.children.length; a++){
            $(`input[id='formState.passengers.CHD-${a}.name']`).addValue(passangers.children[a].firstName);
            $(`input[id='formState.passengers.CHD-${a}.surname']`).addValue(passangers.children[a].lastName);
        }
        
    }
}
module.exports = new FlightsPage();