var requestOK=false;
    msgErrorRequest='';

function scriptRequest(url)
{
if (!document.addEventListener) {return true};
requestOK=false;
msgErrorRequest='';
var s=document.createElement('script');
// в старых IE поддерживается только событие, а не onload/onerror
// в теории 'readyState=loaded' означает "скрипт загрузился",
// а 'readyState=complete' -- "скрипт выполнился", но иногда
// почему-то случается только одно из них, поэтому проверяем оба

function checkCallback()
{
if (!requestOK) {alert(msgErrorRequest+'\n'+'Error request: '+url)};
}

s.onreadystatechange = function() 
  {
  if (this.readyState == 'complete' || this.readyState == 'loaded') 
      {
//    Старый IE
//    alert(this.readyState);
      this.onreadystatechange = null;
      setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
      }
  }
s.onload=checkCallback;
s.onerror=checkCallback;
s.src=url;
document.body.appendChild(s);
}

function outWait(id)
{
var i=document.getElementById(id);
if (i!=null) {i.innerHTML='<IMG SRC="/IMAGES/SNAKE.GIF">'};
}
