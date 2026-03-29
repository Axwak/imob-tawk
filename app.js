// ===============================
// 🔹 UTIL
// ===============================
function getParam(name){
    return new URL(window.location.href).searchParams.get(name)||"";
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
// 🔹 DADOS
// ===============================
var dados = {
    nome: getParam("nome") || "Usuário",
    email: getParam("email") || "usuario@local.com",
    cartorio: getParam("cartorio_nome") || "Não informado",
    cidade: getParam("cartorio_cidade") || "Não informado",
    uf: getParam("cartorio_uf") || ""
};

// ===============================
// 🔹 INFO NA TELA
// ===============================
document.getElementById("info").innerHTML = `
<b>Usuário:</b> ${dados.nome}<br>
<b>Cartório:</b> ${dados.cartorio}<br>
<b>Local:</b> ${dados.cidade} ${dados.uf ? "- " + dados.uf : ""}
`;

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

    // 🔹 atributos básicos
    Tawk_API.setAttributes({
        name: dados.nome,
        email: dados.email
    }, function(error){

        if(error){
            console.log("Erro atributos básicos:", error);
            return;
        }

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
    s1.src="https://embed.tawk.to/SEU_ID_AQUI/default"; // ⚠️ TROCAR

    s0.parentNode.insertBefore(s1,s0);
}

// ===============================
// 🔹 START
// ===============================
if(verificarLGPD()){
    iniciarTawk();
}
