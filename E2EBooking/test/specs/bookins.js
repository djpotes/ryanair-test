const BookingPage = require("../pageobjects/bookingPage");
const config = require("../../config/config");

describe('Create booking', () => {
    it('should create booking', () => {
        BookingPage.open();
        BookingPage.agreeUsingCookies();
        BookingPage.setDeparture("Portugal", "Lisbon");
        BookingPage.setDestination("France", "Paris Beauvais");
        BookingPage.setDepartureDate(new Date(2021, 5, 6));
        BookingPage.setDestinationDate(new Date(2021, 9, 30));
        BookingPage.setPassangers(2, 1);
    });
});