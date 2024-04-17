function convertFromOunces(measurement, ounce) {
    switch(measurement) {
        case("teaspoon"):
            return Math.ceil(ounce * 6);
        case("cup"):
            return Math.ceil(ounce * 0.125);
        case("pound"):
            return Math.ceil(ounce * 0.0625);
    }
}

export default convertFromOunces;