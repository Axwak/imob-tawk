// ===============================
// 🔹 UTIL
// ===============================
function getParam(name) {
    return new URL(window.location.href).searchParams.get(name) || "";
}

// ===============================
// 🔹 LGPD
// ===============================
function verificarLGPD() {
    if (!localStorage.getItem("lgpd_aceito")) {
        document.getElementById("lgpdModal").classList.remove("hidden");
        return false;
    }
    return true;
}

function aceitarLGPD() {
    localStorage.setItem("lgpd_aceito", "1");
    document.getElementById("lgpdModal").classList.add("hidden");
    iniciarTawk();
}

function reabrirLGPD(){
    localStorage.removeItem("lgpd_aceito");
    document.getElementById("lgpdModal").classList.remove("hidden");
}      

function resetLGPD(){
    localStorage.removeItem("lgpd_aceito");
    alert("LGPD resetado");
}

// ===============================
// 🔹 DADOS
// ===============================
var nome = getParam("nome") || "Usuário";
var email = getParam("email") || "usuario@local.com";
var cartorio = getParam("cartorio_nome") || "Não informado";
var cidade = getParam("cartorio_cidade") || "";
var uf = getParam("cartorio_uf") || "";

// ===============================
// 🔹 INFO NA TELA
// ===============================
document.getElementById("info").innerHTML =
    "<b>Usuário:</b> " + nome + "<br>" +
    "<b>Cartório:</b> " + cartorio + "<br>" +
    "<b>Local:</b> " + (cidade ? cidade + (uf ? " - " + uf : "") : "Não informado");

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

    Tawk_API.setAttributes({
        name: nome,
        email: email,
        cartorio: 'cartorio003'
    }, function () {

        setTimeout(function () {
            Tawk_API.setAttributes({
                cartorio_nome: getParam("cartorio_nome"),
                cartorio_cns: getParam("cartorio_cns"),
                cartorio_cidade: getParam("cartorio_cidade"),
                cartorio_uf: getParam("cartorio_uf"),
                cartorio_oficial: getParam("cartorio_oficial"),
                versao_imob: getParam("versao_imob"),
                versao_postgres: getParam("versao_postgres"),
                machine_id: getParam("machine_id")
            });
        }, 800);
    });

    window.Tawk_API.addTags(['Cartório', 'Cartório001'], function(error){});
    window.Tawk_API.addTags(['Cidade_UF', 'Cidade001-PR'], function(error){});
    
    Tawk_API.maximize();
};

// ===============================
// 🔹 FALLBACK
// ===============================
setTimeout(function () {
    if (!carregou) {
        document.getElementById("loadingArea").classList.add("hidden");
        document.getElementById("btnManual").classList.remove("hidden");
    }
}, 8000);

// ===============================
// 🔹 BOTÃO MANUAL
// ===============================
function abrirChat() {
    if (Tawk_API && typeof Tawk_API.maximize === "function") {
        Tawk_API.maximize();
    }
}

// ===============================
// 🔹 INICIAR TAWK
// ===============================
function iniciarTawk() {
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/69b83be7ff278a1c38c186eb/1jjrqk0bd';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
}

// ===============================
// 🔹 START
// ===============================
if (verificarLGPD()) {
    iniciarTawk();
}
