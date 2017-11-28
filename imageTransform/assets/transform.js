/***************************************************
 * 
 * File Type Convert Anything
 * 
 ***************************************************/
function fileToDataUrl(file, cb) {
  var reader = new FileReader()

  reader.onloadend = function (e) {
    cb(e.target.result)
  }

  reader.readAsDataURL(file)
}

function fileToImage(file, cb) {
  fileToDataUrl(file, function (dataUrl) {
    dataUrlToImage(dataUrl, function (image) {
      cb(image)
    })
  })
}

function fileToCanvas(file, cb) {
  fileToImage(file, function (image) {
    imageToCanvas(image, function (canvas) {
      cb(canvas)
    })
  })
}

/***************************************************
 * 
 * DataURL Type Convert Anything
 * 
 ***************************************************/
function dataUrlToImage(dataUrl, cb) {
  var image = new Image()

  image.onload = function () {
    cb(image)
  }

  image.src = dataUrl
}

function dataUrlToCanvas(dataUrl, cb) {
  dataUrlToImage(dataUrl, function (image) {
    imageToCanvas(image, function (canvas) {
      cb(canvas)
    })
  })
}

function dataUrlToFile(dataUrl, cb) {
  dataUrlToImage(dataUrl, function (image) {
    imageToFile(image, function (file) {
      cb(file)
    })
  })
}


/***************************************************
 * 
 * Image Type Convert Anything
 * 
 ***************************************************/
function imageToCanvas(image, cb) {
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')

  var canvasWidth = 128
  var canvasHeight = 128 * image.height / image.width

  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)

  context.width = image.width
  context.height = image.height
  context.drawImage(image, 0, 0, canvasWidth, canvasHeight)

  cb(canvas)
}

function imageToDataUrl(image, cb) {
  var mime = image.src.match(/([^.])+$/)[0] || 'image/jpeg'

  imageToCanvas(image, function (canvas) {
    cb(canvas.toDataURL(mime, 1))
  })
}

function imageToFile(image, cb) {
  var mime = image.src.match(/([^.])+$/)[0] || 'image/jpeg'

  imageToCanvas(image, function (canvas) {
    canvas.toBlob(function (blob) {
      cb(blob)
    }, mime, 1)
  })
}