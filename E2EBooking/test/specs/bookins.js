const BookingPage = require("../pageobjects/bookingPage");
const config = require("../../config/config");

describe('Create booking', () => {
    it('should create booking', () => {
        BookingPage.open();
    });
});