
function phone(){
    console.log($('#contenido'));
    $('#contenido').load('componentes/otp.html');
    var tel = '3178458838';
    var indicativo = '+57';
    let cambiar =  tel.slice(2,7);
    cambiar = cambiar.replaceAll(/(\w|\W)/ig,"X");
        
    var mostrarcorreo = indicativo + ' ' + tel.slice(0,2) + cambiar + tel.slice(7);
    var texto = "Hemos enviado un codigo a tu tel&eacute;fono:<br><b>"+mostrarcorreo+"</b>";
    localStorage.setItem('texto',texto);
}

function email(){
    $('#contenido').load('componentes/otp.html');
    var email = 'laura.zorro@infomediaservice.com';
    var email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(email);
    var [,nombre,servidor,dominio] = email_analizado;

    var cantnombre = nombre.length;
    let cambiar =  nombre.slice(2);
    cambiar = cambiar.replaceAll(/(\w|\W)/ig,"*");
    var mostrarcorreo = nombre.slice(0,2) + cambiar + '@' + servidor + '.' + dominio;
    var texto = "Hemos enviado un codigo a tu correo electronico:<br><b>"+mostrarcorreo+"</b>";
    localStorage.setItem('texto',texto);
}