wPrintWin=800;
hPrintWin=400;

function userFunctionMainNasel()
{
//getEl('buttonappend').click();
}

function userKeyListDayOneMedic(keyCode)
{
//alert(keyCode);
if (keyCode==83) {getEl('tabloframe').contentWindow.getEl('b4').click()};
if (keyCode==65) {getEl('tabloframe').contentWindow.getEl('b1').click()};
}


function openWinTablo(nameWinTablo)
{
var w=window.open("null.htm",nameWinTablo,"width=300px");
}

function doChangeOperQueue(i)
{
var l=document.getElementsByName(i.name);
for (n=0; n<l.length ; n++) {
     if ((i.value=='ау0033')&&(i.checked)&&(l[n].value=='ау0004')) {l[n].checked=false};
    }
}

function setOperQueue(v)
{
var l=document.getElementsByName('CGIOPERQUEUE');
for (n=0; n<l.length ; n++) {
     if ((v=='ау0033')&&(l[n].value=='ау0004')) {l[n].checked=false};
    }

}


var oldRost="";oldVes="";
function setImt()
{
var rost=document.getElementById("rost").innerHTML;
var ves=document.getElementById("ves").innerHTML;
if ((rost!=oldRost)||(ves!=oldVes))
   {
    oldRost=rost;
    oldVes=ves;
    var re=/&nbsp;/gi;
    rost=rost.replace(re,"");
    ves=ves.replace(re,"");
    var imk=parseInt(ves)*10000/(parseInt(rost)*parseInt(rost));
    if (!isNaN(imk)) {document.getElementById("imt").innerHTML=imk.toFixed(2)};
   }
}


function _stat_dialogEditTalon(){
var nameStorage='';
var valueStorage='';
try{
var nameStorage='DIAG_'+
                document.querySelector("[NAME=SURNAMEINFO]").value+'_'+
                document.querySelector("[NAME=NAME1INFO]").value+'_'+
                document.querySelector("[NAME=NAME2INFO]").value+'_'+
                document.querySelector("[NAME=DRINFO]").value;
var valueStorage=localStorage.getItem(nameStorage);
if (document.querySelector("[NAME=DIAG]").value=='') {document.querySelector("[NAME=DIAG]").value=valueStorage};
} catch (e) {};
}              

function _sendgosp_dialogStartSendGosp(){
var nameStorage='';
var valueStorage='';
try{
var nameStorage='DIAG_'+
                document.querySelector("[NAME=SURNAMEINFO]").value+'_'+
                document.querySelector("[NAME=NAME1INFO]").value+'_'+
                document.querySelector("[NAME=NAME2INFO]").value+'_'+
                document.querySelector("[NAME=DRINFO]").value;
var valueStorage=localStorage.getItem(nameStorage);
document.querySelector("[NAME=DIAGGOSP]").value=valueStorage;
} catch (e) {};
}

function _sendgosp_regis_dialogSendGosp(){
var nameStorage='';
var valueStorage='';
try{
var nameStorage='DIAG_'+
                document.querySelector("[NAME=SURNAMEINFO]").value+'_'+
                document.querySelector("[NAME=NAME1INFO]").value+'_'+
                document.querySelector("[NAME=NAME2INFO]").value+'_'+
                document.querySelector("[NAME=DRINFO]").value;
var valueStorage=localStorage.getItem(nameStorage);
document.querySelector("[NAME=DIAG1]").value=valueStorage;
} catch (e) {};
}

function smda3(i,nameFile)
{
idEditModalWin=i;
if ((nameFile==null)||(nameFile=="")) {nameFile="answer.dba"}
var user=document.getElementById('USER').value;
if (user==null)
   {
   alert('Не определен элемен USER');
   return false;
   }
commandLineModalWin='statcgi.exe?COMMAND=LOADANSWER&NAMEFILE='+nameFile+'&USER='+user;

removeModalWin();

setOpacityAllPage(0.1);

f=document.createElement('iframe');
f.style.position='fixed';
f.style.top='10%';
f.style.left='10%';
f.style.borderRadius='10px';
f.style.border='5px outset blue';
f.style.display='none';
f.id=iframeModalWin;
f.style.width='80%';
f.style.height='80%';
f.src=commandLineModalWin;
document.body.appendChild(f);
f.contentWindow.dialogArguments='';
f.style.display=''
f.contentWindow.myclose=function () {smda3Close()}; 
f.focus();


var b=document.createElement('button');
b.id='idclosemodalwin';
b.style.position='fixed';
b.style.top='10%';
b.style.left='91%';
b.style.width='auto';
b.style.height='auto';
b.style.backgroundColor='red';
b.style.textAlign='center';
b.style.borderRadius='50%';
b.style.fontWeight='900';
b.innerHTML='X';
b.title='Закрыть справочник';
b.onclick=function () {smda3Close()};
document.body.appendChild(b);


}

function smda3Close()
{
setOpacityAllPage(1.0);

var f=document.getElementById(iframeModalWin);
var i=idEditModalWin;
var s='';
if ('returnValue' in f.contentWindow) {s=f.contentWindow.returnValue};

removeModalWin();

while (s.indexOf("@")>=0) {
   s01=s.split("@");
   s=smda2(i,s01[1]);
   if (s01.length>2) 
      {prefixAnswerModalWin=prefixAnswerModalWin+" "+s01[2]}
   else
      {prefixAnswerModalWin=''}
   return 
   }

if (s!="---") {
     s=prefixAnswerModalWin+" "+s;
     i.className='';
     i.onclick=function () {};
     var listNode=s.split('#');

     s='<BR>';
     for (l1=0;l1<listNode.length;l1++){
          s=s+listNode[l1]+'<span> йНКХВЕЯРБН:</span><span contentEditable="True">1</span><BR>';
         }
     if (i.tagName=='INPUT') 
        {
         i.value=s;
         i.size=i.value.length+4;
        }
     else
        {
         i.innerHTML=s;
        }
     }

}




