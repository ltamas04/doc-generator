fs=require('fs')
Docxtemplater = require('docxtemplater');

content = fs
    .readFileSync(__dirname+"/input/tagExample.docx","binary")

doc=new Docxtemplater(content);

doc.setData({
    "first_name":"Hipp",
    "last_name":"Edgar",
    "phone":"0652455478",
    "description":"New Website"
});

doc.render();

var buf = doc.getZip().generate({type:"nodebuffer"});

fs.writeFileSync(__dirname+"/output.docx",buf);