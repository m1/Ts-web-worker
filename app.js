class SumDigits {
  /**
   * Parse the given input into finding the next sum of digits
   *
   * @param {string} input The input to parse
   *
   * @returns {string|int} The next digit with the sum of the input digits,
   *                       return -1 if not found
   */
  parse(input) {
    this.input     = input;
    const inputInt = parseInt(this.input, 10);

    if (inputInt === 0 || isNaN(inputInt) || this.input.match(/[a-z]/i)) {
      return `${this.input} is not a valid number`;
    }

    if (this.input.length > 14) {
      return `max input is 14 digits`;
    }

    // region 1
    let trailingZeros = 0;
    let inputIntTemp  = inputInt;

    while (inputIntTemp % 10 === 0) {
      trailingZeros++;
      inputIntTemp /= 10;
    }

    this.region1 = trailingZeros;

    // region 2
    let inputArrTemp = inputIntTemp.toString().split('');
    this.region2     = parseInt(inputArrTemp.pop(), 10);

    // region 3
    let consecutiveNines = 0;

    for (let n of inputArrTemp.reverse()) {
      if (parseInt(n, 10) === 9) {
        consecutiveNines++;
      }
    }

    this.region3 = consecutiveNines;

    // region 4
    inputArrTemp.reverse();
    inputArrTemp = inputArrTemp.splice(0, inputArrTemp.length - consecutiveNines);

    this.region4 = inputArrTemp.length ? parseInt(inputArrTemp.join(""), 10) : 0;

    return this.parseRegions();
  }

  /**
   * Parses the regions into the final output
   *
   * @returns {string|int} The next digit with the sum of the input digits,
   *                       return -1 if not found
   */
  parseRegions() {
    let finalRegion = [
      this.region4 + 1,
      "0".repeat(this.region1),
      this.region2 - 1,
      "9".repeat(this.region3)
    ];

    finalRegion = finalRegion.filter((n) => {
      return n !== null && n !== "";
    }).join("");

    if (finalRegion.length > this.input.length) {
      return -1;
    }

    return finalRegion.padStart(this.input.length, "0");
  }
}

function search() {
  const sd = new SumDigits();

  document.getElementById('content').innerHTML = sd.parse(document.getElementById('number').value);
}
