function getParam(name){
    return new URL(window.location.href).searchParams.get(name)||"";
}

var mensagens = [
    "Conectando ao atendimento...",
    "Preparando dados...",
    "Quase pronto..."
];

var i = 0;

setInterval(function(){
    var el = document.querySelector(".loading");
    if(el){
        el.innerText = mensagens[i % mensagens.length];
        i++;
    }
}, 2000);

// 🔹 LGPD
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

// 🔹 dados
var dados = {
    nome: getParam("nome") || "Usuário",
    email: getParam("email") || "usuario@local.com"
};

// 🔹 info tela
document.getElementById("info").innerHTML = `
<b>${dados.nome}</b><br>
${getParam("cartorio_nome")}
`;

var carregou = false;

var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

Tawk_API.onLoad = function () {

    carregou = true;

    document.getElementById("loadingArea").classList.add("hidden");

    Tawk_API.setAttributes({
        name: dados.nome,
        email: dados.email
    }, function(){

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

    //enviarLogBackend({
    //    nome: dados.nome,
    //    cartorio: getParam("cartorio_nome"),
    //    cidade: getParam("cartorio_cidade"),
    //    machine_id: getParam("machine_id")
    //});

    Tawk_API.maximize();
};

// 🔥 fallback
setTimeout(function(){
    if(!carregou){
        document.getElementById("loadingArea").classList.add("hidden");
        document.getElementById("btnManual").classList.remove("hidden");
    }
},8000);

// 🔹 botão
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

// 🔹 iniciar Tawk
function iniciarTawk(){
    var s1=document.createElement("script");
    var s0=document.getElementsByTagName("script")[0];

    s1.async=true;
    s1.src='https://embed.tawk.to/69b83be7ff278a1c38c186eb/1jjrqk0bd';
    //s1.charset='UTF-8';
    //s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
}

// 🔹 inicialização
if(verificarLGPD()){
    iniciarTawk();
}

//function enviarLogBackend(dados){
//    fetch("https://SEU_BACKEND/api/atendimento", {
//        method: "POST",
//        headers: {
//            "Content-Type": "application/json"
//        },
//        body: JSON.stringify(dados)
//    })
//    .then(() => console.log("Log enviado"))
//    .catch(() => console.log("Falha ao enviar log"));
//}
