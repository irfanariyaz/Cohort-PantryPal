function convertFromPounds(measurement, pound) {
    switch(measurement) {
        case("tablespoon"):
            return Math.ceil(pound * 32);
        case("ounce"):
            return Math.ceil(pound * 16);
        case("cup"):
            return Math.ceil(pound * 2);
    }
}

export default convertFromPounds;