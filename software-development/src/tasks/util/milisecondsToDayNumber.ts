export function milisecondsToDayNumber(time: number): number {
  let cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(time / cd),
    h = Math.floor((time - d * cd) / ch),
    m = Math.round((time - d * cd - h * ch) / 60000),
    pad = function(n: number): string | number {
      return n < 10 ? '0' + n : n;
    };

  if (m === 60) {
    h++;
    m = 0;
  }

  if (h === 24) {
    d++;
    h = 0;
  }

  return Number([d, pad(h), pad(m)].join(':').split(':')[0]);
}
