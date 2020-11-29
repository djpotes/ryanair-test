const wdioAction = require('Utils').wdioAction;

class FlightsPage {
    constructor(){
        this.buttonNextDate = `button[aria-label='Search next dates']`;
        this.buttonPreviewDate = `button[aria-label='Search previous dates']`;
        this.dateScroll = `div[class='carousel']`;
        //this.listFlight = `flight-list`;
        this.listFlight = "div[class='card-info']";
        
        this.tarifaValue = `div[data-e2e='fare-card--standard']`;
        this.linkLogLater = "div[class='login-touchpoint__chevron-container']";
    };

    formatDate(date){
        return date.toISOString().split('T')[0];
    }

    scrollDate(count, isDeparture){
        var scrollButton;
        wdioAction.waitForVisibility(`button[aria-label='Search previous dates']`);
        
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
        wdioAction.waitForVisibility(this.tarifaValue);
        if(type == "value"){
            wdioAction.click(this.tarifaValue);
        }
        //browser.pause(1000);
    }

    setPassangerDetails(passangers){
        wdioAction.waitForVisibility(this.linkLogLater, 10000);
        wdioAction.click(this.linkLogLater);
        for(var a=0; a<passangers.adults.length; a++){
            $(`input[id='formState.passengers.ADT-${a}.name']`).addValue(passangers.adults[a].firstName);
            $(`input[id='formState.passengers.ADT-${a}.surname`).addValue(passangers.adults[a].lastName);
        }
        for(var a=0; a<passangers.children.length; a++){
            $(`input[id='formState.passengers.CHD-${a}.name']`).addValue(passangers.children[a].firstName);
            $(`input[id='formState.passengers.CHD-${a}.surname']`).addValue(passangers.children[a].lastName);
        }
        browser.pause(1000);
    }
}

module.exports = new FlightsPage();