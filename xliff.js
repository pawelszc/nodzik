const fs = require('fs')
const {create} = require('xmlbuilder2')
const {fragment} = require('xmlbuilder2')
const parser = require('xml-parser')
const file = fs.readFileSync('./data/exportIai12.xliff', 'utf8')
var obj = parser(file);
let arrayGroup = obj.root.children[0].children[0].children
let frag = fragment()
for (let i = 0; i < arrayGroup.length; i++){
    let fragGroup = frag.ele('group', {id:arrayGroup[i].attributes.id})
    let array = obj.root.children[0].children[0].children[i].children
    for (let i = 0; i < array.length;i++){
        

        fragGroup.ele('unit',{id:array[i].attributes.id}).ele('segment').ele('source').txt(array[i].children[0].content).up().ele('target')
    }
}
console.log(frag.end({prettyPrint:true}))
const doc = create()
let docFile = doc.ele('urn:oasis:names:tc:xliff:document:2.0','xliff',{'version':2.1, 'srcLang':'pl'}).ele('file')
docFile.import(frag)
fs.writeFileSync('xliff21new.xliff',doc.end({prettyPrint:true}), 'utf8') 

// xliff 1.2 to 2.1 converion
       /*
const file = fs.readFileSync('./data/exportIai12.xliff', 'utf8')
var inspect = require('util').inspect
var obj = parser(file);
let array = obj.root.children[0].children[0].children[0].children
let frag = fragment()
//console.log(array)
for (let i = 0; i<array.length;i++){
    frag.ele('unit',{id:array[i].attributes.id}).ele('segment').ele('source').txt(array[i].children[0].content).up().ele('target')
}
const doc = create()
let docFile = doc.ele('urn:oasis:names:tc:xliff:document:2.0','xliff',{'version':2.1, 'srcLang':'pl'}).ele('file')
docFile.import(frag)
//console.log(doc.end({prettyPrint: true}))
fs.writeFileSync('xliff21new.xliff',doc.end({prettyPrint:true}), 'utf8')
   */

// xliff 2.1 to 1.2 conversion
       /*
const file = fs.readFileSync('./xliff21new (francuski).xliff', 'utf8')
var inspect = require('util').inspect
var obj = parser(file);
let array = obj.root.children[0].children
let frag = fragment()
//console.log(array[0].children[0].children[0].content)
//console.log(array.children[0].children[0].content)
for (let i = 0; i<array.length;i++){
    frag.ele('trans-unit',{'id':array[i].attributes.id}).ele('source').txt(array[i].children[0].children[0].content).up().ele('target').txt(array[i].children[0].children[1].content)
}
const doc = create({'version':'1.0', 'encoding':'UTF-8'})
let docFile = doc.ele('urn:oasis:names:tc:xliff:document:1.2','xliff',{'version':1.2}).ele('file',{'original':'translations.xliff','xml:space':'preserve','source-language':'pol','target-language':'fre'}).ele('body').ele('group')
docFile.import(frag)
//console.log(doc.end({prettyPrint: true}))
fs.writeFileSync('NOWY-xliff12.xliff',doc.end({prettyPrint:true}), 'utf8') 
       */




