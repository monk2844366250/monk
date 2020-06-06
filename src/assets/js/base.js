import { uploadImage } from '@/utils'
const base = {}

/**

 * @description: 图片添加水印

 * @param {file} file 图片的file对象

 * @param {Function} callback 因为onload异步的问题 所以采用callback方式  

 */

base.watermark = (file, callback) => { 

  if (!file || !file.name) return false

 console.log('水印base.watermark', file, callback)

  // 这个是水印的图片

  let markImg = 'http://pic33.nipic.com/20130909/13622524_224205387002_2.jpg'
//   let markImg = document.getElementById('waterMark')

 

  let fileReader = new FileReader()

  fileReader.readAsDataURL(file)

  let img = new Image()

  fileReader.onload = function () {

    img.src = fileReader.result

    img.onload = function() {

      // 图片的清晰度 有关压缩

      let quality = ''

      // 创建canvas进行绘图

      let canvas = document.getElementById('myCanvas'),
        ctx    = canvas.getContext('2d')

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // ctx.rotate(-20 * Math.PI / 180)
        // ctx.font = '15px Vedana'
        // ctx.fillStyle = 'rgba(0, 0, 0, 0.50)'
        // ctx.textAlign = 'left'
        // ctx.textBaseline = 'Middle'
        // ctx.fillText('店小二', canvas.width / 20, canvas.height )
      if (img.width <= 3000 && img.width > 1000) {
        quality = 1
        canvas.width  = img.width  / 3
        canvas.height = img.height / 3
      }else{
        quality = 1
        canvas.width  = img.width
        canvas.height = img.height
      }
      // 设置水印的宽高
      let markImgH = canvas.height / 5,
          markImgW = markImgH * 3
      首先绘制需要上传至服务器的图
      ctx.rotate(-20 * Math.PI / 180)
      
      // 将水印绘制上去，位置在右下角

      ctx.drawImage(markImg,  canvas.width, canvas.height - markImgH, markImgW, markImgH)
      ctx.drawImage('markImg',  canvas.width, canvas.height - markImgH, markImgW, markImgH)
      // 转为base64格式
      let imgData = canvas.toDataURL(file.type, 0.9)
    //   console.log('生成的tupianshuju ', imgData)
      // 转为file对象传递出去
      console.log('用户使用性情', imgData, file.name)
      var e = dataURLtoFile(imgData, file.name)
    //   var classlist = callback(dataURLtoFile(imgData, file.name))
    //   console.log('xinwenjian新文件', file)
      console.log('xinwenjian新文件', e)
      uploadImage(e)
    }
  }
} 

// 将base64转换为文件
function dataURLtoFile(dataurl, filename) { 
  var arr = dataurl.split(','), 
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n)
  while(n--){
      u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

 

 

 

 

// export default base

// (function () {
//   function __picWM({ url = '',
//                      textAlign = 'center',
//                      textBaseline = 'middle',
//                      font = "20px Microsoft Yahei",
//                      fillStyle = 'rgba(184, 184, 184, 0.8)',
//                      content = '请勿外传',
//                      cb = null,
//                      textX = 100,
//                      textY = 30
//                    } = {}) {
//     const img = new Image();
//     img.src = url;
//     img.crossOrigin = 'anonymous';
//     img.onload = function () {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');

//       ctx.drawImage(img, 0, 0);
//       ctx.textAlign = textAlign;
//       ctx.textBaseline = textBaseline;
//       ctx.font = font;
//       ctx.fillStyle = fillStyle;
//       ctx.fillText(content, img.width - textX, img.height - textY);

//       const base64Url = canvas.toDataURL();
//       cb && cb(base64Url);
//     }
//   }

//   if (typeof module != 'undefined' && module.exports) {  //CMD
//     module.exports = __picWM;
//   } else if (typeof define == 'function' && define.amd) { // AMD
//     define(function () {
//       return __picWM;
//     });
//   } else {
//     window.__picWM = __picWM;
//   }

// })();

// // 调用
// __picWM({
//   url: 'http://localhost:3000/imgs/google.png',
//   content: 'QQMusicFE',
//   cb: (base64Url) => {
//     document.querySelector('img').src = base64Url
//   },
// });

