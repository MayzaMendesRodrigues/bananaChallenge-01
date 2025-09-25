import { validateDates, hotelsTotalPrice, cheaperHotel, compareHotel } from "./hotel.js";

describe("Validate dates", () => {
  test("should return an array of boolean values indicating if the dates are weekends", () => {
    const dates = [
      "16Mar2023(thu)",
      "17Mar2023(fri)",
      "18Mar2023(sat)",
      "19Mar2023(sun)",
    ];
    const result = validateDates(dates);
    expect(result).toEqual([false, false, true, true]);
  });

  test("return empty array", () => {
    const result = validateDates([]);
    expect(result).toEqual([]);
  });
});

describe("Validate hotels total prices", () => {
  test("Price without discount for regular client type for only 3 consecutive days", () => {
    const weekendFlag = [false, false, true];
    const result = hotelsTotalPrice("regular", weekendFlag);
    expect(result).toEqual([
      { name: "lakewood", stars: 3, totalPrice: 110 + 110 + 90 },
      { name: "bridgewood", stars: 4, totalPrice: 160 + 160 + 60 },
      { name: "ridgewood", stars: 5, totalPrice: 220 + 220 + 150 },
    ]);
  });

  test("10% off to regular for more than 3 consecutive days", () => {
      const weekendFlag = [false, false, true, true];
      const result = hotelsTotalPrice("regular", weekendFlag)
      expect(result).toEqual([
      { name: "lakewood", stars: 3, totalPrice: 360},
      { name: "bridgewood", stars: 4, totalPrice: 396 },
      { name: "ridgewood", stars: 5, totalPrice: 666 },
      ])
  })

  test("20% off to reward for more than 3 consecutive days", () => {
    const weekendFlag = [false, false, true, true];
    const result = hotelsTotalPrice("reward", weekendFlag)
    expect(result).toEqual([
    { name: "lakewood", stars: 3, totalPrice: 256},
    { name: "bridgewood", stars: 4, totalPrice: 256 },
    { name: "ridgewood", stars: 5, totalPrice: 224 },
    ])
  })
});


describe("Cheaper Hotel", () => {
  test("compare hotels and star", () => {
    const hotels = [
      { name: "lakewood", stars: 3, totalPrice: 100 },
      { name: "bridgewood", stars: 4, totalPrice: 100 },
      { name: "ridgewood", stars: 5, totalPrice: 100 },
    ];
    const result = cheaperHotel(hotels);
    expect(result).toEqual({ name: "ridgewood", stars: 5, totalPrice: 100 });
  });

  test("should return compare hotel prices", () => {
    const hotels = [
      { name: "lakewood", stars: 3, totalPrice: 200 },
      { name: "bridgewood", stars: 4, totalPrice: 100 },
      { name: "ridgewood", stars: 5, totalPrice: 200 },
    ];
    const result = cheaperHotel(hotels);
    expect(result).toEqual({ name: "bridgewood", stars: 4, totalPrice: 100 });
  });
});
//desafio 
//10% para regular para 3 dias consecutivo, e 20% para rewards para 3 dias consecutivo
