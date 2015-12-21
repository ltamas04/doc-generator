var ImageModule=require('docxtemplater-image-module'),
  DocxGen = require('docxtemplater')
  fs=require('fs')

var opts = {}
opts.centered = false;
opts.getImage=function(tagValue, tagName) {
    return fs.readFileSync(tagValue,'binary');
}

opts.getSize=function(img,tagValue, tagName) {
    return [150,150];
}

var imageModule=new ImageModule(opts);

 content = fs
        .readFileSync(__dirname+"/input/imageExample.docx","binary")


var docx=new DocxGen()
    .attachModule(imageModule)
    .load(content)
    .setData({image:'input/image.png'})
    .render()

var buffer= docx
        .getZip()
        .generate({type:"nodebuffer"})

fs.writeFile("input/imageExample.docx",buffer);