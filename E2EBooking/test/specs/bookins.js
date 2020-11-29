const SearchPage = require("../pageobjects/searchPage");
const FlightsPage = require("../pageobjects/FlightsPage");
const ChooseSeatePage = require("../pageobjects/chooseSeatPage");
const ShooseBagPage = require("../pageobjects/shooseBagPage");
const config = require("../../config/config");

describe('Create booking', () => {
    
    const passangers = {
        "adults": [
            {
                "firstName": "Sónia",
                "lastName": "Pereira"
            },
            {
                "firstName": "Diogo",
                "lastName": "Bettencourt"
            }
        ],
        "children": [
            {
                "firstName": "Inês",
                "lastName": "Marçal"
            }
        ]
    }
    
    it('should create booking', () => {
        SearchPage.open();
        SearchPage.agreeUsingCookies();
        SearchPage.setDeparture("Portugal", "Lisbon");
        SearchPage.setDestination("France", "Paris Beauvais");
        SearchPage.setDepartureDate(new Date(2021, 5, 6));
        SearchPage.setDestinationDate(new Date(2021, 9, 30));
        SearchPage.setPassangers(passangers,2, 1);
        SearchPage.clickSearch();
        const newDepartureDate = new Date(2021, 5, 12);
        const newReturneDate = new Date(2021, 9, 6);
        /* Change Date*/
        FlightsPage.changeDate(newDepartureDate, 1,  true);
        FlightsPage.changeDate(newReturneDate, -5,  false);
        /* Select Tarifa*/
        FlightsPage.setFlight("Depart", "value");
        FlightsPage.setFlight("Return", "value");
        /* Set passanger details */
        FlightsPage.setPassangerDetails(passangers);
        FlightsPage.clickContinueButton();
        /* Select seats */
        ChooseSeatePage.selectSeats(9);
        ChooseSeatePage.clickContinueButton();
        /* Select bag */
        ShooseBagPage.selectOnlyOneBag();
    });
});