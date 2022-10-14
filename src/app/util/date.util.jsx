export function getTimeRange(start, end, interval) {
  function getMinutes(time) {
    var a = time.split(":").map(Number);
    return a[0] * 60 + a[1];
  }

  function getTime(m) {
    var h = (m / 60) | 0;
    m %= 60;
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  var r = [],
    startM = getMinutes(start),
    endM = getMinutes(end) ;

  while (startM + interval <= endM) {
    r.push(getTime(startM) + " - " + getTime(startM + interval));
    startM += interval;
  }
  return r;
}
