const _calcASCII = (num, letter) => {
  num = num
    .map((item, idx) => ((idx + 1) % 2 === 0 ? item * 2 : item * 1))
    .reduce((acc, val) => acc + val);
  let ascii = String.fromCharCode((num % 26) + 65);
  return ascii === letter;
};

export const isPinValid = (pin) => {
  const pinRegex = /^JN-\d{4}-\d{4}-[A-Z]{2}$/;
  if (!pin.match(pinRegex)) {
    return false;
  } else {
    const pinArr = pin.split("-");
    const firstSet = pinArr[1].split("");
    const secondSet = pinArr[2].split("");
    const firstLetter = pinArr[3].charAt(0);
    const secondLetter = pinArr[3].charAt(1);
    const firstMatch = _calcASCII(firstSet, firstLetter);
    if (!firstMatch) return false;
    const secondMatch = _calcASCII(secondSet, secondLetter);
    return firstMatch && secondMatch;
  }
};

export const MOBILE_BREAKPOINT = "@media (max-width: 768px)";

export const ERRORS = {
  INVALID_PIN: "Please enter a valid pin",
  CHOOSE_RIDE: "Please choose a ride",
  RIDE_ALREADY_BOOKED: `Cannot book more the one ride at a time.`,
  ENTER_PIN: "Please enter a pin",
  PARK_CLOSED: "Park is currently closed. Please visit between 09:00 and 19:00",
};
