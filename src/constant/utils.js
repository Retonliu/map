const debounce = (fn, delay) => {
  // fn是事件的回调函数
  let timer = null; // 利用闭包来保存当前现存的timer
  return function(event) {
      //this指向绑定事件的元素
      let context = this;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function() {
          fn.call(context, event.target);
      }, delay);
  }
};
export { debounce };