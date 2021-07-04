//变暗变亮主方法
function LightenDarkenColor (colorArr, num) {
  const reg = /(?<=\()\d+,\d+,\d+(?=\))/;
  colorArr = reg.exec(colorArr);
  colorArr = colorArr[0].split(',');
  let sColorChange = [];
  for(var i = 0;i < colorArr.length; i++){
          let  val = Number(colorArr[i])+num;
          if(val<0){
          val = 0;
          }
          if(val>255){
              val=255;
          }
          sColorChange.push(val)
  }
  return "rgb(" + sColorChange.join(",") + ")";
}

//判断是否为亮色
function getContrastYIQ(colorrgb) {
    let colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
        red = colors[1],
        green = colors[2],
        blue = colors[3],
        brightness = (red * 0.299) + (green * 0.587) + (blue * 0.114) / 255; // 彩色转灰度
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
        set = new Set();
    while (set.size <= 220) { //生成220个浅色
        let flag = true;
        while (flag) { //找到一个浅色
          const tmp = [];
          for (let i = 0; i < 3; i++) {
              tmp.push(Math.floor(Math.random() * 256));
          }
          color = "rgb(" + tmp.join(",") + ")"
          if (getContrastYIQ(color) === "light"){
              flag = false;
          }
        }
        set.add(color);
    }

    for (const lightColor of set) {
        let amt = -60, //调暗参数，< 0为变暗，>0为变亮
            darkColor = LightenDarkenColor(lightColor, amt);
        colors.push([darkColor, lightColor]);
    }
    return colors;
}

export default generateColorArr;