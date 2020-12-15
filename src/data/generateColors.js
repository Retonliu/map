function colorHex(str) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
        that = str;
    if (/^(rgb|RGB)/.test(that)) {
      let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","),
        strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = that;
      }
      return strHex;
    } else if (reg.test(that)) {
      let aNum = that.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return that;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    } else {
      return that;
    }  
}

function colorRgb(str) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, 
        sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i ++) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgb(" + sColorChange.join(",") + ")";
    } else {
      return sColor;
    }                  
}

function LightenDarkenColor (col, amt) {
    let usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    let num = parseInt(col, 16),
        r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

function getContrastYIQ(hexcolor) {
    let colorrgb = colorRgb(hexcolor),
        colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
        red = colors[1],
        green = colors[2],
        blue = colors[3],
        brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
      return "light";
    } else {
      return "dark";
    }
}

/*function showSet() {
    for (const c of set) {
        console.log(c);
    }
}*/

function generateColorArr() {
    let color = "",
        colors = [],
        chose = "0123456789abcdef",
        set = new Set();
    while (set.size <= 220) { //生成220个数组
        let flag = true;
        while (flag) { //找到一个浅色
            color = '#' + chose.split('').map((v,i,a) => i>5 ? null : a[Math.floor(Math.random()*16)]).join('');
            if (getContrastYIQ(color) === "light"){
                flag = false;
            }
        }
        set.add(color);
    }

    for (const lightColor of set) {
        let amt = -40, //调暗参数，< 0为变暗，>0为变亮
            darkColor = LightenDarkenColor(colorHex(lightColor), amt);
        colors.push([darkColor, lightColor]);
    }
    return colors;
}

export default generateColorArr;