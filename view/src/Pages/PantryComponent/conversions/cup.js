function convertFromCup(measurement, cup) {
    switch(measurement) {
        case("tbsp"):
            return Math.ceil(cup * 16);
        case("ounce"):
            return Math.ceil(cup * 8);
        case("pound"):
            return Math.ceil(cup / 2);
    }
}

export default convertFromCup;