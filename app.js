// ===============================
// 🔹 UTIL - PEGAR PARAMETRO
// ===============================
function getParam(name){
    return new URL(window.location.href).searchParams.get(name)||"";
}

// ===============================
// 🔹 PEGAR TODOS PARAMETROS
// ===============================
function getAllParams(){
    const params = new URL(window.location.href).searchParams;

    let resultado = {};

    for (const [key, value] of params.entries()) {
        resultado[key] = value;
    }

    return resultado;
}

// ===============================
// 🔹 LGPD
// ===============================
function verificarLGPD(){
    var aceito = localStorage.getItem("lgpd_aceito");

    if(!aceito){
        document.getElementById("lgpdModal").classList.remove("hidden");
        return false;
    }

    return true;
}

function aceitarLGPD(){
    localStorage.setItem("lgpd_aceito","1");
    document.getElementById("lgpdModal").classList.add("hidden");
    iniciarTawk();
}

// ===============================
// 🔹 DEBUG VISUAL
// ===============================
var allParams = getAllParams();

console.log("PARAMETROS RECEBIDOS:", allParams);

let debugHtml = "<b>DEBUG - Parâmetros recebidos:</b><br><br>";

for (var key in allParams) {
    var valor = allParams[key];

    if(!valor){
        valor = "<span style='color:red'>VAZIO</span>";
    }

    debugHtml += `<b>${key}:</b> ${valor}<br>`;
}

// mostrar URL completa
debugHtml += "<br><b>URL:</b><br>" + window.location.href;

document.getElementById("info").innerHTML = debugHtml;


// ===============================
// 🔹 DADOS PRINCIPAIS
// ===============================
var dados = {
    nome: getParam("nome") || "Usuário",
    email: getParam("email") || "usuario@local.com"
};

// ===============================
// 🔹 CONTROLE
// ===============================
var carregou = false;

var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

// ===============================
// 🔹 TAWK
// ===============================
Tawk_API.onLoad = function () {

    carregou = true;

    document.getElementById("loadingArea").classList.add("hidden");

    console.log("Tawk carregado");

    // 🔹 atributos básicos
    Tawk_API.setAttributes({
        name: dados.nome,
        email: dados.email
    }, function(error){

        if(error){
            console.log("Erro atributos básicos:", error);
            return;
        }

        console.log("Enviando atributos extras");

        // 🔹 atributos extras
        setTimeout(function(){

            Tawk_API.setAttributes({
                cartorio_nome:getParam("cartorio_nome"),
                cartorio_cns:getParam("cartorio_cns"),
                cartorio_cidade:getParam("cartorio_cidade"),
                cartorio_uf:getParam("cartorio_uf"),
                cartorio_oficial:getParam("cartorio_oficial"),
                versao_imob:getParam("versao_imob"),
                versao_postgres:getParam("versao_postgres"),
                machine_id:getParam("machine_id")
            }, function(err){
                if(err) console.log("Erro atributos extras:", err);
                else console.log("Atributos enviados com sucesso");
            });

        },1000);
    });

    Tawk_API.maximize();
};

// ===============================
// 🔹 FALLBACK
// ===============================
setTimeout(function(){
    if(!carregou){
        console.log("Tawk não carregou - fallback manual");

        document.getElementById("loadingArea").classList.add("hidden");
        document.getElementById("btnManual").classList.remove("hidden");
    }
},8000);


// ===============================
// 🔹 BOTÃO MANUAL
// ===============================
function abrirChat(){

    var tentativas=0;

    var intervalo=setInterval(function(){

        if(Tawk_API && typeof Tawk_API.maximize==="function"){
            Tawk_API.maximize();
            clearInterval(intervalo);
        }

        tentativas++;

        if(tentativas>10){
            clearInterval(intervalo);
            alert("Não foi possível abrir o chat.");
        }

    },500);
}


// ===============================
// 🔹 INICIAR TAWK
// ===============================
function iniciarTawk(){
    var s1=document.createElement("script");
    var s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/69b83be7ff278a1c38c186eb/1jjrqk0bd';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
}


// ===============================
// 🔹 START
// ===============================
if(verificarLGPD()){
    iniciarTawk();
}
