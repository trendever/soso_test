export const getCookie = function(name) {
  var nameEQ = name + "=",
    ca = document.cookie.split(';'),
    value = '',
    firstChar = '',
    parsed = {};
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      value = decodeURIComponent(c.substring(nameEQ.length, c.length));
      firstChar = value.substring(0, 1);
      if (firstChar == "{") {
        try {
          parsed = JSON.parse(value);
          if ("v" in parsed) return parsed.v;
        } catch (e) {
          return value;
        }
      }
      if (value == "undefined") return undefined;
      return value;
    }
  }
  return null;
};
export const setCookie = function(name, value, days, path, secure) {
  var date = new Date(),
    expires = '',
    type = typeof(value),
    valueToUse = '',
    secureFlag = '';
  path = path || "/";
  if (days) {
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  if (type === "object" && type !== "undefined") {
    if (!("JSON" in window)) throw "Bummer, your browser doesn't support JSON parsing.";
    valueToUse = encodeURIComponent(JSON.stringify({ v: value }));
  } else {
    valueToUse = encodeURIComponent(value);
  }
  if (secure) {
    secureFlag = "; secure";
  }

  document.cookie = name + "=" + valueToUse + expires + "; path=" + path + secureFlag;
};

export const removeCookie = function(name) {
  setCookie(name, "", -1);
};


export const  guid = () => {
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }
  return function e7() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
      lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
      lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
      lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  }()
};

export const simpleGuid = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};
