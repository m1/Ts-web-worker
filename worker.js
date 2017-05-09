self.addEventListener('message', (e) => {
  const data = e.data;
  switch (data.cmd) {
    case 'nextDigit':
      const input      = data.number;
      const inputTotal = input.split('')
                              .reduce((total, n) => parseInt(total, 10) + parseInt(n, 10));
      const realNumber = parseInt(input, 10);

      if (input.match(/[a-z]/i) || isNaN(realNumber)) {
        return self.postMessage({msg: `${input} is not a number`});
      } else if (input.length > 15) {
        return self.postMessage({msg: `${input} is too long, 15 digits max`});
      }

      const maxNumber = parseInt("9".repeat(input.length), 10);

      for (let i = realNumber + 1; i <= maxNumber; i++) {
        const sumNumber = i.toString()
                           .split('')
                           .reduce((total, n) => parseInt(total, 10) + parseInt(n, 10));

        if (sumNumber === inputTotal) {
          return self.postMessage({msg: i.toString().padStart(input.length, "0")});
        }
      }

      return self.postMessage({msg: -1});
  }
}, false);