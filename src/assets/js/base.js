
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

  let markImg = document.getElementById('waterMark')

 

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

      // 首先绘制需要上传至服务器的图
    //   ctx.rotate(-20 * Math.PI / 180)

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 将水印绘制上去，位置在右下角

      ctx.drawImage(markImg,  canvas.width - markImgW, canvas.height - markImgH, markImgW, markImgH)
    // ctx.rotate(-20 * Math.PI / 180)
    // ctx.font = '15px Vedana'
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.50)'
    // ctx.textAlign = 'left'
    // ctx.textBaseline = 'Middle'
    // ctx.fillText('店小二', canvas.width / 20, canvas.height )

      // 转为base64格式

      let imgData = canvas.toDataURL(file.type)
    //   console.log('生成的tupianshuju ', imgData)
      // 转为file对象传递出去
      console.log('用户使用性情', file.name)
      callback(dataURLtoFile(imgData, file.name))

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

 

 

 

 

export default base
