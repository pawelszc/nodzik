function readFileAsText(file, x){
    let fr = new FileReader();
    fr.addEventListener('load',()=>{array.push(fr.result)
    read(array[x])
    })

    
    fr.readAsText(file)
      }

document.getElementById("fileinput").addEventListener("change", function(ev){
     let files = ev.currentTarget.files;
     // Abort if there were no files selected
     if(!files.length) return;

     for(let i=0; i<files.length;i++){
       readFileAsText(files[i], i)
        }
})

let array = []

const read = function(textxml) {

let parser = new DOMParser();
let xmldoc = parser.parseFromString(textxml, 'text/xml');
let paczkiobiekty = [];



for (let i = 0; i < xmldoc.querySelector('set').childElementCount; i++) {

let xmlset = xmldoc.getElementsByTagName('set')[0];
let xmlevent = xmlset.getElementsByTagName('event')[i];
let xmlreceiver = xmlevent.getElementsByTagName('receiver')[0];
let xmladdress = xmlreceiver.getElementsByTagName('address')[0];
let xmlname = xmladdress.getElementsByTagName('name')[0].textContent;
let xmlcompany = '';
if (xmladdress.getElementsByTagName('company')[0] === undefined) {
   xmlcompany = '';
 } else {
   xmlcompany = xmlreceiver.getElementsByTagName('company')[0].textContent;
   };
let xmlcountry =  xmladdress.getElementsByTagName('country')[0].textContent
let xmlpostcode = xmladdress.getElementsByTagName('postcode')[0].textContent;
let xmlcity = xmladdress.getElementsByTagName('city')[0].textContent;
let xmlstreetandnumber = xmladdress.getElementsByTagName('address')[0].textContent;
let xmlcontact = xmlreceiver.getElementsByTagName('contact')[0];
let xmltelephone = xmlcontact.getElementsByTagName('telephone')[0].textContent;
if (xmltelephone === '') {
   xmltelephone = '123456789';
 };

let xmlemail = xmlcontact.getElementsByTagName('email')[0].textContent;

function Package() {
       this.value = "300",
       this.size_d = 20,
       this.size_l = 20,
       this.size_w = 20,
       this.weight = 1,
       this.content = xmlevent.getAttribute('id')
};

function Receiver() {
       this.tel = xmltelephone,
       this.city = xmlcity,
       this.name = xmlname,
       this.email = xmlemail,
       this.company = xmlcompany,
       this.country = xmlcountry,
       this.zip_code = xmlpostcode,
       this.address_line_1 = xmlstreetandnumber,
       this.address_line_2 = ""
};

function Paczka() {
       this.package = package,
       this.reciver = receiver,
       
       this.curier = "DHL24_DE"
};


let package = new Package();
let receiver = new Receiver();
let newParcel = new Paczka();
paczkiobiekty.push(newParcel);
 };
if (paczkiobiekty.length > 0) {
let div1 = document.getElementById('div1');
let paczkiobiektytekst = JSON.stringify(paczkiobiekty);
div1.textContent += paczkiobiektytekst}

}