import { useState, useCallback } from "react";

// ─── DESTINOS (100) ──────────────────────────────────────────────
const DESTS = [
  // EUROPA (25)
  {id:1,name:"Paris",country:"França",cont:"Europa",flag:"🇫🇷",g:"#1a0533,#7b2d8b",tag:"Cidade do Amor"},
  {id:2,name:"Roma",country:"Itália",cont:"Europa",flag:"🇮🇹",g:"#5c1212,#c97720",tag:"Cidade Eterna"},
  {id:3,name:"Barcelona",country:"Espanha",cont:"Europa",flag:"🇪🇸",g:"#8b0000,#e8860a",tag:"Gaudí & Mar"},
  {id:4,name:"Londres",country:"Reino Unido",cont:"Europa",flag:"🇬🇧",g:"#0d2340,#8b1a1a",tag:"Capital Imperial"},
  {id:5,name:"Amsterdã",country:"Holanda",cont:"Europa",flag:"🇳🇱",g:"#4a1942,#c94a00",tag:"Cidade dos Canais"},
  {id:6,name:"Praga",country:"Rep. Tcheca",cont:"Europa",flag:"🇨🇿",g:"#0d2340,#6b2080",tag:"Cidade de Ouro"},
  {id:7,name:"Viena",country:"Áustria",cont:"Europa",flag:"🇦🇹",g:"#12102a,#9e2a2a",tag:"Cidade da Música"},
  {id:8,name:"Lisboa",country:"Portugal",cont:"Europa",flag:"🇵🇹",g:"#0a1f40,#c94a00",tag:"7 Colinas"},
  {id:9,name:"Atenas",country:"Grécia",cont:"Europa",flag:"🇬🇷",g:"#0a3060,#1a1a5c",tag:"Berço da Civilização"},
  {id:10,name:"Santorini",country:"Grécia",cont:"Europa",flag:"🇬🇷",g:"#0a2460,#0a5c8b",tag:"Ilha dos Sonhos"},
  {id:11,name:"Dubrovnik",country:"Croácia",cont:"Europa",flag:"🇭🇷",g:"#0a2a14,#0a3060",tag:"Pérola do Adriático"},
  {id:12,name:"Veneza",country:"Itália",cont:"Europa",flag:"🇮🇹",g:"#1a0d5c,#0a3060",tag:"Cidade das Águas"},
  {id:13,name:"Berlim",country:"Alemanha",cont:"Europa",flag:"🇩🇪",g:"#1a1a1a,#4a0a0a",tag:"Capital da Cultura"},
  {id:14,name:"Budapeste",country:"Hungria",cont:"Europa",flag:"🇭🇺",g:"#4a0040,#1a3a00",tag:"Pérola do Danúbio"},
  {id:15,name:"Copenhague",country:"Dinamarca",cont:"Europa",flag:"🇩🇰",g:"#8b0a0a,#0a2040",tag:"A Cidade Mais Feliz"},
  {id:16,name:"Edimburgo",country:"Escócia",cont:"Europa",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",g:"#0a1a40,#1a3a0a",tag:"Terras Altas"},
  {id:17,name:"Florença",country:"Itália",cont:"Europa",flag:"🇮🇹",g:"#3a1a0a,#5c3500",tag:"Berço do Renascimento"},
  {id:18,name:"Istambul",country:"Turquia",cont:"Europa",flag:"🇹🇷",g:"#6b0a0a,#0a1a60",tag:"Entre Dois Mundos"},
  {id:19,name:"Porto",country:"Portugal",cont:"Europa",flag:"🇵🇹",g:"#3a1a0a,#0a1a60",tag:"Cidade do Vinho"},
  {id:20,name:"Sevilha",country:"Espanha",cont:"Europa",flag:"🇪🇸",g:"#7a2200,#5c4a00",tag:"Capital do Flamenco"},
  {id:21,name:"Estocolmo",country:"Suécia",cont:"Europa",flag:"🇸🇪",g:"#004060,#5c3a00",tag:"Veneza do Norte"},
  {id:22,name:"Bruges",country:"Bélgica",cont:"Europa",flag:"🇧🇪",g:"#0a0a40,#4a0a0a",tag:"Veneza Belga"},
  {id:23,name:"Mônaco",country:"Mônaco",cont:"Europa",flag:"🇲🇨",g:"#4a0a0a,#1a1a3a",tag:"Glamour e Luxo"},
  {id:24,name:"Reykjavik",country:"Islândia",cont:"Europa",flag:"🇮🇸",g:"#003350,#0a3a10",tag:"Fogo e Gelo"},
  {id:25,name:"Mykonos",country:"Grécia",cont:"Europa",flag:"🇬🇷",g:"#004080,#0a6080",tag:"Ilha da Diversão"},
  // ÁSIA (25)
  {id:26,name:"Tóquio",country:"Japão",cont:"Ásia",flag:"🇯🇵",g:"#6b0a1a,#4a0060",tag:"Futuro & Tradição"},
  {id:27,name:"Bali",country:"Indonésia",cont:"Ásia",flag:"🇮🇩",g:"#0a3a0a,#7a2200",tag:"Ilha dos Deuses"},
  {id:28,name:"Bangkok",country:"Tailândia",cont:"Ásia",flag:"🇹🇭",g:"#4a0080,#5c4a00",tag:"Cidade dos Templos"},
  {id:29,name:"Singapura",country:"Singapura",cont:"Ásia",flag:"🇸🇬",g:"#6b0a0a,#0a1a60",tag:"Cidade do Futuro"},
  {id:30,name:"Kyoto",country:"Japão",cont:"Ásia",flag:"🇯🇵",g:"#4a0030,#0a3a0a",tag:"Japão Ancestral"},
  {id:31,name:"Hong Kong",country:"China",cont:"Ásia",flag:"🇭🇰",g:"#6b0a0a,#0a0a0a",tag:"Oriente & Ocidente"},
  {id:32,name:"Seul",country:"Coreia do Sul",cont:"Ásia",flag:"🇰🇷",g:"#0a0a60,#6b0a0a",tag:"Capital do K-Pop"},
  {id:33,name:"Phuket",country:"Tailândia",cont:"Ásia",flag:"🇹🇭",g:"#004060,#0a3a0a",tag:"Paraíso Tropical"},
  {id:34,name:"Maldivas",country:"Maldivas",cont:"Ásia",flag:"🇲🇻",g:"#004080,#006040",tag:"Paraíso na Terra"},
  {id:35,name:"Dubai",country:"E.A.U.",cont:"Ásia",flag:"🇦🇪",g:"#5c4a00,#0a1a60",tag:"Cidade do Futuro"},
  {id:36,name:"Chiang Mai",country:"Tailândia",cont:"Ásia",flag:"🇹🇭",g:"#0a3a0a,#5c3a00",tag:"Capital do Norte Thai"},
  {id:37,name:"Ho Chi Minh",country:"Vietnã",cont:"Ásia",flag:"🇻🇳",g:"#6b0a0a,#5c4a00",tag:"Energia Pulsante"},
  {id:38,name:"Hanói",country:"Vietnã",cont:"Ásia",flag:"🇻🇳",g:"#6b0a0a,#0a3a0a",tag:"Capital Histórica"},
  {id:39,name:"Siem Reap",country:"Camboja",cont:"Ásia",flag:"🇰🇭",g:"#2a1000,#0a3a0a",tag:"Porta de Angkor"},
  {id:40,name:"Kathmandu",country:"Nepal",cont:"Ásia",flag:"🇳🇵",g:"#6b0a0a,#2a1000",tag:"Portal do Himalaia"},
  {id:41,name:"Goa",country:"Índia",cont:"Ásia",flag:"🇮🇳",g:"#6b2200,#0a3a0a",tag:"Paraíso Indiano"},
  {id:42,name:"Taipei",country:"Taiwan",cont:"Ásia",flag:"🇹🇼",g:"#003300,#6b0a0a",tag:"Alta Tecnologia"},
  {id:43,name:"Xangai",country:"China",cont:"Ásia",flag:"🇨🇳",g:"#6b0a0a,#0a0a0a",tag:"Metrópole Oriental"},
  {id:44,name:"Penang",country:"Malásia",cont:"Ásia",flag:"🇲🇾",g:"#00336b,#2a1000",tag:"Capital Gastronômica"},
  {id:45,name:"Luang Prabang",country:"Laos",cont:"Ásia",flag:"🇱🇦",g:"#6b0a0a,#0a3a0a",tag:"Cidade Sagrada"},
  {id:46,name:"Agra",country:"Índia",cont:"Ásia",flag:"🇮🇳",g:"#5c2500,#2a2a2a",tag:"Terra do Taj Mahal"},
  {id:47,name:"Jodhpur",country:"Índia",cont:"Ásia",flag:"🇮🇳",g:"#001a60,#6b2200",tag:"Cidade Azul"},
  {id:48,name:"Osaka",country:"Japão",cont:"Ásia",flag:"🇯🇵",g:"#6b002a,#6b2200",tag:"Capital da Culinária"},
  {id:49,name:"Colombo",country:"Sri Lanka",cont:"Ásia",flag:"🇱🇰",g:"#5c3a00,#001a60",tag:"Pérola do Índico"},
  {id:50,name:"Yangon",country:"Myanmar",cont:"Ásia",flag:"🇲🇲",g:"#5c4a00,#6b0a0a",tag:"Terra das Pagodas"},
  // AMÉRICAS (25)
  {id:51,name:"Nova York",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#001a4a,#5c2500",tag:"A Cidade que Nunca Dorme"},
  {id:52,name:"Rio de Janeiro",country:"Brasil",cont:"Américas",flag:"🇧🇷",g:"#0a3a0a,#5c4a00",tag:"Cidade Maravilhosa"},
  {id:53,name:"Buenos Aires",country:"Argentina",cont:"Américas",flag:"🇦🇷",g:"#002a5c,#2a3a50",tag:"Paris da América do Sul"},
  {id:54,name:"Cancún",country:"México",cont:"Américas",flag:"🇲🇽",g:"#004060,#0a3a0a",tag:"Paraíso Caribenho"},
  {id:55,name:"Miami",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#5c2200,#4a004a",tag:"Cidade do Sol"},
  {id:56,name:"San Francisco",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#5c3a00,#001a60",tag:"Silicon Valley"},
  {id:57,name:"Machu Picchu",country:"Peru",cont:"Américas",flag:"🇵🇪",g:"#0a3a0a,#2a1000",tag:"Cidade Perdida dos Incas"},
  {id:58,name:"Cartagena",country:"Colômbia",cont:"Américas",flag:"🇨🇴",g:"#5c4a00,#6b0a0a",tag:"Joia do Caribe"},
  {id:59,name:"Cidade do México",country:"México",cont:"Américas",flag:"🇲🇽",g:"#0a3a0a,#6b0a0a",tag:"Megacidade Cultural"},
  {id:60,name:"Havana",country:"Cuba",cont:"Américas",flag:"🇨🇺",g:"#001a60,#6b0a0a",tag:"Tempo Parado"},
  {id:61,name:"Nova Orleans",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#30004a,#5c3a00",tag:"Capital do Jazz"},
  {id:62,name:"Vancouver",country:"Canadá",cont:"Américas",flag:"🇨🇦",g:"#0a3a0a,#6b0a0a",tag:"Natureza & Cidade"},
  {id:63,name:"Patagônia",country:"Argentina",cont:"Américas",flag:"🇦🇷",g:"#1a2a30,#1a3a4a",tag:"Fim do Mundo"},
  {id:64,name:"Santiago",country:"Chile",cont:"Américas",flag:"🇨🇱",g:"#6b0a0a,#001a60",tag:"Capital Andina"},
  {id:65,name:"Bogotá",country:"Colômbia",cont:"Américas",flag:"🇨🇴",g:"#5c4a00,#0a3a0a",tag:"Capital Cultural"},
  {id:66,name:"Lima",country:"Peru",cont:"Américas",flag:"🇵🇪",g:"#6b0a0a,#5c3a00",tag:"Capital Gastronômica"},
  {id:67,name:"Cusco",country:"Peru",cont:"Américas",flag:"🇵🇪",g:"#2a1000,#5c3a00",tag:"Umbigo do Mundo Inca"},
  {id:68,name:"Florianópolis",country:"Brasil",cont:"Américas",flag:"🇧🇷",g:"#004060,#0a3a0a",tag:"Ilha da Magia"},
  {id:69,name:"Medellín",country:"Colômbia",cont:"Américas",flag:"🇨🇴",g:"#5c4a00,#4a0050",tag:"Primavera Eterna"},
  {id:70,name:"Las Vegas",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#30004a,#5c4a00",tag:"Cidade dos Cassinos"},
  {id:71,name:"Los Angeles",country:"EUA",cont:"Américas",flag:"🇺🇸",g:"#5c2200,#30004a",tag:"Terra das Estrelas"},
  {id:72,name:"Toronto",country:"Canadá",cont:"Américas",flag:"🇨🇦",g:"#6b0a0a,#001a60",tag:"Multicultural"},
  {id:73,name:"Salvador",country:"Brasil",cont:"Américas",flag:"🇧🇷",g:"#5c4a00,#0a3a0a",tag:"Capital da Alegria"},
  {id:74,name:"Tulum",country:"México",cont:"Américas",flag:"🇲🇽",g:"#004060,#3a2000",tag:"Ruínas & Praias"},
  {id:75,name:"Galápagos",country:"Equador",cont:"Américas",flag:"🇪🇨",g:"#0a3a0a,#004060",tag:"Paraíso Natural"},
  // ÁFRICA (15)
  {id:76,name:"Marrakech",country:"Marrocos",cont:"África",flag:"🇲🇦",g:"#6b0a0a,#5c2500",tag:"Cidade Vermelha"},
  {id:77,name:"Cidade do Cabo",country:"África do Sul",cont:"África",flag:"🇿🇦",g:"#0a3a0a,#001a60",tag:"Dois Oceanos"},
  {id:78,name:"Zanzibar",country:"Tanzânia",cont:"África",flag:"🇹🇿",g:"#004060,#0a3a0a",tag:"Ilha das Especiarias"},
  {id:79,name:"Cairo",country:"Egito",cont:"África",flag:"🇪🇬",g:"#5c2500,#5c4a00",tag:"Terra dos Faraós"},
  {id:80,name:"Nairóbi",country:"Quênia",cont:"África",flag:"🇰🇪",g:"#0a3a0a,#6b0a0a",tag:"Portal do Safari"},
  {id:81,name:"Serengeti",country:"Tanzânia",cont:"África",flag:"🇹🇿",g:"#5c3a00,#0a3a0a",tag:"Grande Migração"},
  {id:82,name:"Casablanca",country:"Marrocos",cont:"África",flag:"🇲🇦",g:"#5c4a00,#6b0a0a",tag:"Pérola Atlântica"},
  {id:83,name:"Cataratas Victoria",country:"Zimbábue",cont:"África",flag:"🇿🇼",g:"#0a3a0a,#004060",tag:"A Fumaça que Troveja"},
  {id:84,name:"Luxor",country:"Egito",cont:"África",flag:"🇪🇬",g:"#5c2500,#5c4a00",tag:"Museu a Céu Aberto"},
  {id:85,name:"Essaouira",country:"Marrocos",cont:"África",flag:"🇲🇦",g:"#004060,#5c4a00",tag:"Cidade dos Ventos"},
  {id:86,name:"Joanesburgo",country:"África do Sul",cont:"África",flag:"🇿🇦",g:"#5c4a00,#0a3a0a",tag:"Cidade do Ouro"},
  {id:87,name:"Maurício",country:"Maurício",cont:"África",flag:"🇲🇺",g:"#004060,#0a3a0a",tag:"Paraíso Índico"},
  {id:88,name:"Adis Abeba",country:"Etiópia",cont:"África",flag:"🇪🇹",g:"#0a3a0a,#5c4a00",tag:"Capital Africana"},
  {id:89,name:"Acra",country:"Gana",cont:"África",flag:"🇬🇭",g:"#5c4a00,#6b0a0a",tag:"Porta da África Ocidental"},
  {id:90,name:"Diani Beach",country:"Quênia",cont:"África",flag:"🇰🇪",g:"#004060,#0a3a0a",tag:"Praia Perfeita"},
  // OCEANIA (5)
  {id:91,name:"Sydney",country:"Austrália",cont:"Oceania",flag:"🇦🇺",g:"#004060,#5c2500",tag:"Ópera & Praias"},
  {id:92,name:"Melbourne",country:"Austrália",cont:"Oceania",flag:"🇦🇺",g:"#001a60,#4a0040",tag:"Capital Cultural"},
  {id:93,name:"Auckland",country:"Nova Zelândia",cont:"Oceania",flag:"🇳🇿",g:"#003300,#001a60",tag:"Cidade das Velas"},
  {id:94,name:"Queenstown",country:"Nova Zelândia",cont:"Oceania",flag:"🇳🇿",g:"#0a3a0a,#1a3a4a",tag:"Adrenalina Pura"},
  {id:95,name:"Fiji",country:"Fiji",cont:"Oceania",flag:"🇫🇯",g:"#004060,#0a3a0a",tag:"Paraíso do Pacífico"},
  // ORIENTE MÉDIO (5)
  {id:96,name:"Petra",country:"Jordânia",cont:"Oriente Médio",flag:"🇯🇴",g:"#5c2500,#2a1000",tag:"Cidade Rosa"},
  {id:97,name:"Jerusalém",country:"Israel",cont:"Oriente Médio",flag:"🇮🇱",g:"#5c4a00,#2a1000",tag:"Cidade Santa"},
  {id:98,name:"Abu Dhabi",country:"E.A.U.",cont:"Oriente Médio",flag:"🇦🇪",g:"#5c4a00,#0a3a0a",tag:"Grandiosidade Árabe"},
  {id:99,name:"Muscat",country:"Omã",cont:"Oriente Médio",flag:"🇴🇲",g:"#6b0a0a,#5c4a00",tag:"Joia Árabe"},
  {id:100,name:"Tel Aviv",country:"Israel",cont:"Oriente Médio",flag:"🇮🇱",g:"#004060,#5c4a00",tag:"Cidade Vibrante"},
];

const TRAVELER_TYPES = [
  {id:"solo",label:"Solo",icon:"🧳",desc:"Aventura Individual"},
  {id:"casal",label:"Casal",icon:"💑",desc:"Experiência Romântica"},
  {id:"familia",label:"Família",icon:"👨‍👩‍👧",desc:"Para a Família"},
  {id:"kids",label:"Kids",icon:"🧒",desc:"Com Crianças Pequenas"},
];
const DURATIONS = [5,7,10,14];
const CONTINENTS = ["Todos","Europa","Ásia","Américas","África","Oceania","Oriente Médio"];
const CONT_ICONS = {Europa:"🏰",Ásia:"🏯",Américas:"🗽",África:"🦁",Oceania:"🦘","Oriente Médio":"🕌"};
const TABS = [
  {id:"roteiro",label:"📅 Roteiro"},
  {id:"hoteis",label:"🏨 Hotéis"},
  {id:"restaurantes",label:"🍽️ Restaurantes"},
  {id:"passeios",label:"🎒 Passeios"},
  {id:"perolas",label:"💎 Pérolas"},
  {id:"dicas",label:"💡 Dicas"},
];

// ─── SHARE UTILS ─────────────────────────────────────────────────
const shareWA = (d,days) => {
  const t = encodeURIComponent(`✈️ Roteiro de ${days} dias em ${d.name}, ${d.country}!\nEncontrei no DestinoBarato.com.br — roteiros prontos para o mundo inteiro! 🌍`);
  window.open(`https://wa.me/?text=${t}`,"_blank");
};
const shareEmail = (d,days) => {
  const s = encodeURIComponent(`Roteiro ${days} dias em ${d.name} | DestinoBarato.com.br`);
  const b = encodeURIComponent(`Olá!\n\nEncontrei um roteiro incrível de ${days} dias em ${d.name}, ${d.country}.\n\nAcesse: https://destinobarato.com.br\n\nBoa viagem! ✈️`);
  window.open(`mailto:?subject=${s}&body=${b}`);
};

// ─── AI PROMPT ───────────────────────────────────────────────────
const buildPrompt = (dest, days, traveler) => {
  const tm = {solo:"viajante solo/individual",casal:"casal em viagem romântica",familia:"família com adultos e adolescentes",kids:"família com crianças pequenas (até 10 anos)"};
  return `Crie um guia completo de viagem para ${dest.name}, ${dest.country} — ${days} dias — para ${tm[traveler]}.

Retorne APENAS JSON válido (sem markdown), estrutura exata:
{"roteiro":[{"dia":1,"titulo":"string","manha":"string","tarde":"string","noite":"string","dica":"string"}],"hoteis":[{"nome":"string","estrelas":4,"preco":"US$ 150/noite","tipo":"solo|casal|familia|todos","nota":"8.8","destaque":"string"}],"restaurantes":[{"nome":"string","culinaria":"string","preco":"$","prato":"string","dica":"string"}],"passeios":[{"nome":"string","duracao":"3h","preco":"US$ 40","nivel":"fácil","porque":"string"}],"perolas":[{"nome":"string","descricao":"string","comoIr":"string"}],"transporte":["string"],"seguranca":["string"],"comunicacao":["string"],"visto":{"brasileiro":"string","custo":"string","validade":"string"},"orcamento":{"economico":"US$ 60/dia","medio":"US$ 150/dia","luxo":"US$ 400/dia"},"melhorEpoca":"string"}

Regras: ${days} itens em roteiro. 6 hotéis reais (2x 3★, 2x 4★, 2x 5★). 8 restaurantes reais (variados $, $$, $$$). 5 passeios reais. 3 pérolas escondidas. 4 dicas de transporte, 4 de segurança, 4 de comunicação. Dados reais e atualizados de ${dest.name}.`;
};

// ─── STYLES ──────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#07090f;color:#eef2f7;font-family:'DM Sans',sans-serif}
input::placeholder{color:#4b5563}
button{cursor:pointer;font-family:inherit}
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#1e2533;border-radius:3px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.dest-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.5)!important}
.dest-card{transition:transform .3s,box-shadow .3s}
.tab-btn:hover{color:#10b981!important}
.filter-btn:hover{border-color:#10b981!important;color:#10b981!important}
.cont-card:hover{border-color:rgba(16,185,129,.4)!important;background:rgba(16,185,129,.05)!important}
.cont-card{transition:all .2s}
.share-btn:hover{opacity:.85!important;transform:translateY(-1px)}
.share-btn{transition:all .2s}
.anim{animation:fadeIn .5s ease-out}
`;

// ─── SUB-COMPONENTS ──────────────────────────────────────────────
const Spinner = () => (
  <div style={{textAlign:"center",padding:"4rem 2rem",color:"#64748b"}}>
    <div style={{width:44,height:44,border:"3px solid rgba(16,185,129,.2)",borderTop:"3px solid #10b981",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 1.5rem"}}/>
    <p style={{fontSize:"1rem",color:"#94a3b8",marginBottom:8}}>Gerando roteiro personalizado...</p>
    <p style={{fontSize:.8+"rem",animation:"pulse 2s infinite"}}>Isso pode levar alguns segundos</p>
  </div>
);

const Badge = ({children,color="#10b981",bg="rgba(16,185,129,.12)"}) => (
  <span style={{display:"inline-block",padding:"2px 10px",borderRadius:999,background:bg,color,fontSize:".75rem",fontWeight:500,border:`1px solid ${color}33`}}>{children}</span>
);

const TipItem = ({icon,text}) => (
  <div style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 14px",background:"rgba(255,255,255,.02)",borderRadius:8,marginBottom:8}}>
    <span style={{fontSize:"1rem",minWidth:20}}>{icon}</span>
    <span style={{fontSize:".9rem",color:"#94a3b8",lineHeight:1.6}}>{text}</span>
  </div>
);

const Stars = ({n}) => (
  <span style={{color:"#f59e0b",fontSize:".85rem"}}>
    {"★".repeat(n)}{"☆".repeat(5-n)}
  </span>
);

const DestCard = ({d,onSelect}) => (
  <div className="dest-card" onClick={()=>onSelect(d)} style={{borderRadius:14,overflow:"hidden",cursor:"pointer",boxShadow:"0 8px 30px rgba(0,0,0,.4)"}}>
    <div style={{width:"100%",aspectRatio:"4/3",background:`linear-gradient(135deg,${d.g})`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1.5rem",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 65%)"}}/>
      <div style={{position:"relative",zIndex:2}}>
        <div style={{fontSize:"1.4rem",marginBottom:2}}>{d.flag}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:700,lineHeight:1.2,marginBottom:2}}>{d.name}</div>
        <div style={{fontSize:".82rem",color:"rgba(255,255,255,.65)",marginBottom:8}}>{d.country}</div>
        <Badge>{d.tag}</Badge>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────
export default function DestinoBarato() {
  const [view, setView] = useState("home");
  const [contFilter, setContFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [dest, setDest] = useState(null);
  const [traveler, setTraveler] = useState("solo");
  const [days, setDays] = useState(7);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("roteiro");
  const [copied, setCopied] = useState(false);
  const [starFilter, setStarFilter] = useState(0);

  const filtered = DESTS.filter(d =>
    (contFilter==="Todos"||d.cont===contFilter) &&
    (search===""||d.name.toLowerCase().includes(search.toLowerCase())||d.country.toLowerCase().includes(search.toLowerCase()))
  );

  const selectDest = (d) => { setDest(d); setContent(null); setView("detail"); window.scrollTo(0,0); };

  const generateContent = useCallback(async () => {
    if(!dest) return;
    setLoading(true); setContent(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4096,messages:[{role:"user",content:buildPrompt(dest,days,traveler)}]})
      });
      const data = await res.json();
      const txt = data.content?.[0]?.text||"";
      const clean = txt.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setContent(parsed); setActiveTab("roteiro");
    } catch(e) {
      console.error(e);
      alert("Erro ao gerar o roteiro. Verifique sua conexão e tente novamente.");
    } finally { setLoading(false); }
  }, [dest, days, traveler]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://destinobarato.com.br/destino/${dest?.id}`);
    setCopied(true); setTimeout(()=>setCopied(false),2200);
  };

  // ── Styles ──
  const s = {
    nav:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 2rem",background:"rgba(7,9,15,.96)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,.06)"},
    logo:{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,background:"linear-gradient(135deg,#10b981,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",cursor:"pointer",letterSpacing:"-.02em"},
    navLink:{color:"#64748b",cursor:"pointer",fontSize:".82rem",letterSpacing:".06em",textTransform:"uppercase",fontWeight:500,background:"none",border:"none",padding:"4px 8px"},
    hero:{position:"relative",minHeight:"92vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4rem 2rem",textAlign:"center",overflow:"hidden"},
    heroBg:{position:"absolute",inset:0,background:"radial-gradient(ellipse at 60% 0%,#0d2a18 0%,#0a1520 40%,#07090f 100%)",zIndex:0},
    heroGrid:{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(16,185,129,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.04) 1px,transparent 1px)",backgroundSize:"64px 64px",zIndex:1},
    heroOrb:{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,.06) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-60%)",zIndex:1,pointerEvents:"none"},
    heroContent:{position:"relative",zIndex:2,maxWidth:800,width:"100%"},
    h1:{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.4rem,7vw,5rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:"1.25rem"},
    heroSub:{fontSize:"1.05rem",color:"#64748b",maxWidth:560,margin:"0 auto 2.5rem",lineHeight:1.75},
    searchBox:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:"12px 16px",display:"flex",gap:12,alignItems:"center",maxWidth:680,width:"100%",margin:"0 auto 2.5rem",backdropFilter:"blur(10px)"},
    searchInput:{flex:1,background:"transparent",border:"none",outline:"none",color:"#eef2f7",fontSize:"1rem",fontFamily:"inherit"},
    cta:{padding:"12px 28px",borderRadius:10,background:"linear-gradient(135deg,#10b981,#059669)",border:"none",color:"#fff",fontWeight:600,fontSize:"1rem",whiteSpace:"nowrap"},
    statsRow:{display:"flex",gap:"3rem",justifyContent:"center",flexWrap:"wrap"},
    statN:{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"#10b981"},
    statL:{fontSize:".75rem",color:"#374151",textTransform:"uppercase",letterSpacing:".1em"},
    section:{padding:"4rem 2rem",maxWidth:1440,margin:"0 auto"},
    sectionHdr:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",gap:12,flexWrap:"wrap"},
    sectionTitle:{fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:700},
    gridCont:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.5rem"},
    contGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:"1rem"},
    featureGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1.25rem"},
    strip:{background:"rgba(255,255,255,.02)",borderTop:"1px solid rgba(255,255,255,.05)",borderBottom:"1px solid rgba(255,255,255,.05)",padding:"4rem 2rem"},
    filterRow:{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"1.5rem"},
    filterBtn:(a)=>({padding:"6px 18px",borderRadius:999,border:`1px solid ${a?"#10b981":"rgba(255,255,255,.1)"}`,background:a?"rgba(16,185,129,.12)":"transparent",color:a?"#10b981":"#64748b",fontSize:".83rem",fontWeight:a?600:400,transition:"all .2s",fontFamily:"inherit"}),
    card:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"1.4rem"},
    // Detail
    detailHero:(g)=>({width:"100%",minHeight:"60vh",background:`linear-gradient(160deg,${g})`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"2.5rem 2rem",position:"relative"}),
    detailOverlay:{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,9,15,1) 0%,rgba(7,9,15,.25) 100%)"},
    detailContent:{position:"relative",zIndex:2,maxWidth:1200,margin:"0 auto",width:"100%"},
    controls:{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"1.75rem"},
    ctrlRow:{display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"flex-end"},
    ctrlGroup:{flex:1,minWidth:220},
    ctrlLabel:{fontSize:".72rem",textTransform:"uppercase",letterSpacing:".1em",color:"#475569",marginBottom:10,display:"block"},
    typeRow:{display:"flex",gap:8,flexWrap:"wrap"},
    typeBtn:(a)=>({padding:"8px 14px",borderRadius:8,border:`1px solid ${a?"#10b981":"rgba(255,255,255,.1)"}`,background:a?"rgba(16,185,129,.12)":"transparent",color:a?"#10b981":"#64748b",fontSize:".85rem",fontFamily:"inherit",transition:"all .2s",display:"flex",alignItems:"center",gap:5}),
    dayRow:{display:"flex",gap:8},
    dayBtn:(a)=>({width:58,height:58,borderRadius:10,border:`2px solid ${a?"#10b981":"rgba(255,255,255,.1)"}`,background:a?"rgba(16,185,129,.12)":"transparent",color:a?"#10b981":"#64748b",fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,transition:"all .2s"}),
    genBtn:{padding:"14px 28px",background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:10,color:"#fff",fontWeight:600,fontSize:"1rem",whiteSpace:"nowrap",minWidth:180,marginTop:4},
    tabRow:{display:"flex",gap:2,borderBottom:"1px solid rgba(255,255,255,.08)",marginBottom:"2rem",overflowX:"auto"},
    tab:(a)=>({padding:"12px 18px",cursor:"pointer",fontSize:".83rem",fontWeight:a?600:400,color:a?"#10b981":"#64748b",borderBottom:`2px solid ${a?"#10b981":"transparent"}`,whiteSpace:"nowrap",fontFamily:"inherit",background:"transparent",border:"none",borderBottom:`2px solid ${a?"#10b981":"transparent"}`,transition:"color .2s"}),
    dayCard:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"1.5rem",marginBottom:"1rem"},
    dayNum:{fontSize:".72rem",color:"#10b981",textTransform:"uppercase",letterSpacing:".14em",marginBottom:2},
    dayTitle:{fontFamily:"'Playfair Display',serif",fontSize:"1.25rem",fontWeight:600,marginBottom:"1rem"},
    slotRow:{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"},
    slotLabel:{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".1em",color:"#10b981",minWidth:62,paddingTop:3,fontWeight:600},
    slotText:{color:"#94a3b8",fontSize:".9rem",lineHeight:1.65},
    tipBox:{background:"rgba(16,185,129,.04)",border:"1px solid rgba(16,185,129,.13)",borderRadius:8,padding:"10px 14px",marginTop:10,fontSize:".83rem",color:"#6b7280"},
    hotelCard:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"1.25rem",marginBottom:".75rem"},
    ratingBadge:{padding:"3px 8px",background:"rgba(16,185,129,.14)",borderRadius:6,color:"#10b981",fontWeight:700,fontSize:".83rem"},
    restCard:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"1.1rem"},
    priceBadge:(p)=>({padding:"2px 8px",borderRadius:6,background:p==="$"?"rgba(16,185,129,.14)":p==="$$"?"rgba(245,158,11,.14)":"rgba(239,68,68,.14)",color:p==="$"?"#10b981":p==="$$"?"#f59e0b":"#ef4444",fontSize:".78rem",fontWeight:700}),
    tourCard:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"1.1rem"},
    shareBar:{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"},
    shareBtn:(c)=>({padding:"8px 16px",borderRadius:8,background:c,border:"none",color:"#fff",fontWeight:600,fontSize:".83rem",display:"flex",alignItems:"center",gap:6}),
    vistoCard:{background:"rgba(245,158,11,.04)",border:"1px solid rgba(245,158,11,.15)",borderRadius:12,padding:"1.25rem"},
    budgetGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12},
    budgetCard:(t)=>({background:t==="economico"?"rgba(16,185,129,.05)":t==="medio"?"rgba(245,158,11,.05)":"rgba(168,85,247,.05)",border:`1px solid ${t==="economico"?"rgba(16,185,129,.18)":t==="medio"?"rgba(245,158,11,.18)":"rgba(168,85,247,.18)"}`,borderRadius:12,padding:"1.1rem",textAlign:"center"}),
    twoCol:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:".875rem"},
    threeCol:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:".875rem"},
    backBtn:{display:"flex",alignItems:"center",gap:8,color:"#64748b",background:"none",border:"none",fontSize:".9rem",marginBottom:"1rem",padding:0},
    footer:{background:"rgba(255,255,255,.02)",borderTop:"1px solid rgba(255,255,255,.05)",padding:"3rem 2rem",marginTop:"5rem",textAlign:"center"},
  };

  // ── Views ────────────────────────────────────────────────────────
  const NavBar = () => (
    <nav style={s.nav}>
      <div style={s.logo} onClick={()=>setView("home")}>✈ DestinoBarato</div>
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
        <button style={s.navLink} onClick={()=>setView("home")}>Início</button>
        <button style={s.navLink} onClick={()=>{setContFilter("Todos");setView("browse")}}>Destinos</button>
        {CONTINENTS.filter(c=>c!=="Todos").map(c=>(
          <button key={c} style={{...s.navLink,display:"none",["@media(min-width:900px)"]:{display:"block"}}} onClick={()=>{setContFilter(c);setView("browse")}}>{c}</button>
        ))}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div>
      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroBg}/>
        <div style={s.heroGrid}/>
        <div style={s.heroOrb}/>
        <div style={s.heroContent}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 16px",borderRadius:999,border:"1px solid rgba(16,185,129,.25)",color:"#10b981",fontSize:".78rem",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1.5rem"}}>
            ✈ 100 Destinos · Roteiros com IA · Para Todo Tipo de Viajante
          </div>
          <h1 style={s.h1}>
            Seu próximo destino,<br/>
            <span style={{background:"linear-gradient(135deg,#10b981,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>sem complicação</span>
          </h1>
          <p style={s.heroSub}>Roteiros prontos de 5, 7, 10 e 14 dias para os 100 melhores destinos do mundo. Para quem viaja solo, em casal, família ou com crianças.</p>
          <div style={s.searchBox}>
            <span style={{fontSize:"1rem"}}>🔍</span>
            <input style={s.searchInput} placeholder="Buscar destino, país, continente..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setView("browse")}/>
            <button style={s.cta} onClick={()=>setView("browse")}>Explorar</button>
          </div>
          <div style={s.statsRow}>
            {[["100","Destinos"],["6","Continentes"],["4","Perfis de Viagem"],["4","Durações"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={s.statN}>{n}</div>
                <div style={s.statL}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESTINOS EM DESTAQUE */}
      <div style={s.section}>
        <div style={s.sectionHdr}>
          <h2 style={s.sectionTitle}>✨ Destinos em Destaque</h2>
          <button style={{...s.cta,background:"transparent",border:"1px solid rgba(16,185,129,.3)",color:"#10b981",padding:"8px 20px"}} onClick={()=>setView("browse")}>Ver todos os 100 →</button>
        </div>
        <div style={s.gridCont}>
          {DESTS.slice(0,6).map(d=><DestCard key={d.id} d={d} onSelect={selectDest}/>)}
        </div>
      </div>

      {/* POR CONTINENTE */}
      <div style={s.strip}>
        <div style={{maxWidth:1440,margin:"0 auto"}}>
          <h2 style={{...s.sectionTitle,marginBottom:"1.75rem"}}>🌍 Explore por Continente</h2>
          <div style={s.contGrid}>
            {CONTINENTS.filter(c=>c!=="Todos").map(c=>(
              <div key={c} className="cont-card" onClick={()=>{setContFilter(c);setView("browse")}} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"1.5rem",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:8}}>{CONT_ICONS[c]}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:600}}>{c}</div>
                <div style={{fontSize:".8rem",color:"#4b5563",marginTop:4}}>{DESTS.filter(d=>d.cont===c).length} destinos</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POR QUE DESTINO BARATO */}
      <div style={s.section}>
        <h2 style={{...s.sectionTitle,textAlign:"center",marginBottom:"2rem"}}>Por que usar o DestinoBarato?</h2>
        <div style={s.featureGrid}>
          {[
            {icon:"🤖",t:"Roteiros com IA",d:"Roteiros personalizados gerados por inteligência artificial com informações reais e atualizadas"},
            {icon:"💰",t:"Foco no Custo-Benefício",d:"Opções para todos os bolsos: econômico, médio e luxo com valores estimados por dia"},
            {icon:"👨‍👩‍👧‍👦",t:"Qualquer Perfil",d:"Solo, casal, família com adultos ou família com crianças — cada roteiro adaptado ao seu perfil"},
            {icon:"📱",t:"Compartilhe Fácil",d:"Compartilhe seu roteiro por WhatsApp, email ou link copiável com um único clique"},
            {icon:"🏨",t:"Hotéis Filtrados",d:"Hotéis reais de 3, 4 e 5 estrelas com avaliações, preços por noite e dicas exclusivas"},
            {icon:"💎",t:"Pérolas Escondidas",d:"Lugares especiais que poucos turistas conhecem — diferencial exclusivo do DestinoBarato"},
          ].map(f=>(
            <div key={f.t} style={{...s.card,textAlign:"center"}}>
              <div style={{fontSize:"2.2rem",marginBottom:12}}>{f.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:600,marginBottom:8}}>{f.t}</div>
              <div style={{fontSize:".85rem",color:"#4b5563",lineHeight:1.65}}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BrowsePage = () => (
    <div style={s.section}>
      <h2 style={{...s.sectionTitle,marginBottom:"1.5rem"}}>🌍 Todos os Destinos</h2>
      <div style={s.searchBox}>
        <span>🔍</span>
        <input style={s.searchInput} placeholder="Buscar por destino ou país..." value={search} onChange={e=>setSearch(e.target.value)}/>
        {search && <button style={{...s.backBtn,marginBottom:0,color:"#64748b"}} onClick={()=>setSearch("")}>✕</button>}
      </div>
      <div style={s.filterRow}>
        {CONTINENTS.map(c=>(
          <button key={c} className="filter-btn" style={s.filterBtn(contFilter===c)} onClick={()=>setContFilter(c)}>{c}</button>
        ))}
      </div>
      <p style={{color:"#374151",fontSize:".85rem",marginBottom:"1.5rem"}}>{filtered.length} destinos encontrados</p>
      <div style={s.gridCont}>
        {filtered.map(d=><DestCard key={d.id} d={d} onSelect={selectDest}/>)}
      </div>
    </div>
  );

  const DetailPage = () => {
    if(!dest) return null;
    const hoteisFiltrados = content?.hoteis?.filter(h=>starFilter===0||h.estrelas===starFilter)||[];

    return (
      <div className="anim">
        {/* HERO */}
        <div style={s.detailHero(dest.g)}>
          <div style={s.detailOverlay}/>
          <div style={s.detailContent}>
            <button style={s.backBtn} onClick={()=>setView("browse")}>← Voltar aos destinos</button>
            <div style={{fontSize:"2.2rem",marginBottom:6}}>{dest.flag}</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,6vw,4rem)",fontWeight:700,lineHeight:1.1,marginBottom:4}}>{dest.name}</h1>
            <p style={{color:"rgba(255,255,255,.65)",fontSize:"1rem",marginBottom:10}}>{dest.country} · {dest.cont}</p>
            <Badge>{dest.tag}</Badge>
          </div>
        </div>

        <div style={{maxWidth:1200,margin:"0 auto",padding:"2rem"}}>
          {/* SHARE BAR */}
          <div style={{...s.card,marginBottom:"1.25rem"}}>
            <div style={s.shareBar}>
              <span style={{fontSize:".72rem",color:"#374151",textTransform:"uppercase",letterSpacing:".1em"}}>Compartilhar:</span>
              <button className="share-btn" style={s.shareBtn("#25D366")} onClick={()=>shareWA(dest,days)}>💬 WhatsApp</button>
              <button className="share-btn" style={s.shareBtn("#0078D4")} onClick={()=>shareEmail(dest,days)}>📧 Email</button>
              <button className="share-btn" style={s.shareBtn(copied?"#10b981":"#1e2533")} onClick={handleCopy}>{copied?"✓ Copiado!":"🔗 Copiar Link"}</button>
            </div>
          </div>

          {/* CONTROLS */}
          <div style={s.controls}>
            <div style={s.ctrlRow}>
              <div style={s.ctrlGroup}>
                <span style={s.ctrlLabel}>Perfil do Viajante</span>
                <div style={s.typeRow}>
                  {TRAVELER_TYPES.map(t=>(
                    <button key={t.id} style={s.typeBtn(traveler===t.id)} onClick={()=>setTraveler(t.id)}>
                      <span>{t.icon}</span>{t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{minWidth:200}}>
                <span style={s.ctrlLabel}>Duração da Viagem</span>
                <div style={s.dayRow}>
                  {DURATIONS.map(d=>(
                    <button key={d} style={s.dayBtn(days===d)} onClick={()=>setDays(d)}>{d}d</button>
                  ))}
                </div>
              </div>
              <button style={s.genBtn} onClick={generateContent} disabled={loading}>
                {loading?"⏳ Gerando...":"✨ Gerar Roteiro"}
              </button>
            </div>
          </div>

          {/* LOADING */}
          {loading && <Spinner/>}

          {/* EMPTY STATE */}
          {!content && !loading && (
            <div style={{...s.card,textAlign:"center",padding:"4rem 2rem",marginTop:"1.5rem"}}>
              <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✈️</div>
              <p style={{fontSize:"1.1rem",marginBottom:8,fontFamily:"'Playfair Display',serif"}}>Pronto para explorar {dest.name}?</p>
              <p style={{fontSize:".9rem",color:"#4b5563"}}>Selecione seu perfil e a duração da viagem, depois clique em "Gerar Roteiro"</p>
            </div>
          )}

          {/* CONTENT */}
          {content && !loading && (
            <div className="anim">
              {/* TABS */}
              <div style={s.tabRow}>
                {TABS.map(t=>(
                  <button key={t.id} className="tab-btn" style={s.tab(activeTab===t.id)} onClick={()=>setActiveTab(t.id)}>{t.label}</button>
                ))}
              </div>

              {/* ── ROTEIRO ── */}
              {activeTab==="roteiro" && (
                <div>
                  <div style={{marginBottom:"1.5rem",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                    <Badge color="#f59e0b" bg="rgba(245,158,11,.1)">{days} dias</Badge>
                    <Badge>{TRAVELER_TYPES.find(t=>t.id===traveler)?.desc}</Badge>
                    {content.melhorEpoca && <span style={{fontSize:".82rem",color:"#4b5563"}}>📅 Melhor época: {content.melhorEpoca}</span>}
                  </div>
                  {content.roteiro?.map((day,i)=>(
                    <div key={i} style={s.dayCard}>
                      <div style={s.dayNum}>Dia {day.dia}</div>
                      <div style={s.dayTitle}>{day.titulo}</div>
                      {[["☀️","Manhã",day.manha],["🌤️","Tarde",day.tarde],["🌙","Noite",day.noite]].map(([icon,label,text])=>(
                        <div key={label} style={s.slotRow}>
                          <span style={s.slotLabel}>{icon} {label}</span>
                          <span style={s.slotText}>{text}</span>
                        </div>
                      ))}
                      {day.dica && <div style={s.tipBox}>💡 {day.dica}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* ── HOTEIS ── */}
              {activeTab==="hoteis" && (
                <div>
                  <div style={{display:"flex",gap:8,marginBottom:"1.5rem",flexWrap:"wrap",alignItems:"center"}}>
                    <span style={{fontSize:".75rem",color:"#374151",textTransform:"uppercase",letterSpacing:".08em"}}>Filtrar por estrelas:</span>
                    {[0,3,4,5].map(n=>(
                      <button key={n} style={s.filterBtn(starFilter===n)} className="filter-btn" onClick={()=>setStarFilter(n)}>{n===0?"Todos":`${n}★`}</button>
                    ))}
                  </div>
                  <div style={s.twoCol}>
                    {(starFilter===0?content.hoteis:hoteisFiltrados)?.map((h,i)=>(
                      <div key={i} style={s.hotelCard}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                          <div>
                            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:600,marginBottom:3}}>{h.nome}</div>
                            <Stars n={h.estrelas}/>
                          </div>
                          <div style={s.ratingBadge}>{h.nota} ⭐</div>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                          <span style={{color:"#10b981",fontWeight:700,fontSize:"1rem"}}>{h.preco}</span>
                          <Badge color="#6366f1" bg="rgba(99,102,241,.1)">{h.tipo}</Badge>
                        </div>
                        <div style={{fontSize:".85rem",color:"#4b5563",lineHeight:1.6}}>{h.destaque}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── RESTAURANTES ── */}
              {activeTab==="restaurantes" && (
                <div>
                  <p style={{color:"#4b5563",fontSize:".85rem",marginBottom:"1.5rem"}}>🍽️ Opções para todos os bolsos em {dest.name} — $ econômico · $$ médio · $$$ premium</p>
                  <div style={s.threeCol}>
                    {content.restaurantes?.map((r,i)=>(
                      <div key={i} style={s.restCard}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:600,paddingRight:8}}>{r.nome}</div>
                          <span style={s.priceBadge(r.preco)}>{r.preco}</span>
                        </div>
                        <div style={{fontSize:".78rem",color:"#10b981",marginBottom:6}}>{r.culinaria}</div>
                        <div style={{fontSize:".83rem",color:"#64748b",marginBottom:6}}>⭐ {r.prato}</div>
                        <div style={{fontSize:".78rem",color:"#374151"}}>💡 {r.dica}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── PASSEIOS ── */}
              {activeTab==="passeios" && (
                <div>
                  <p style={{color:"#4b5563",fontSize:".85rem",marginBottom:"1.5rem"}}>🎒 Os melhores passeios e experiências em {dest.name}</p>
                  <div style={s.twoCol}>
                    {content.passeios?.map((p,i)=>(
                      <div key={i} style={s.tourCard}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:600,marginBottom:8}}>{p.nome}</div>
                        <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:".78rem",color:"#f59e0b"}}>⏱️ {p.duracao}</span>
                          <span style={{fontSize:".78rem",color:"#10b981"}}>💵 {p.preco}</span>
                          <span style={{fontSize:".78rem",color:"#64748b"}}>📊 {p.nivel}</span>
                        </div>
                        <div style={{fontSize:".85rem",color:"#64748b",lineHeight:1.6}}>{p.porque}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── PÉROLAS ── */}
              {activeTab==="perolas" && (
                <div>
                  <p style={{color:"#4b5563",fontSize:".85rem",marginBottom:"1.5rem"}}>💎 Lugares especiais que poucos turistas conhecem em {dest.name}</p>
                  {content.perolas?.map((p,i)=>(
                    <div key={i} style={{...s.dayCard,borderLeft:"3px solid #10b981",paddingLeft:"1.25rem"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:600,marginBottom:8}}>💎 {p.nome}</div>
                      <div style={{fontSize:".9rem",color:"#94a3b8",lineHeight:1.65,marginBottom:8}}>{p.descricao}</div>
                      <div style={{fontSize:".82rem",color:"#4b5563"}}>📍 Como chegar: {p.comoIr}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── DICAS ── */}
              {activeTab==="dicas" && (
                <div>
                  {[
                    {title:"🚌 Transporte",items:content.transporte,icon:"🚌"},
                    {title:"🛡️ Segurança",items:content.seguranca,icon:"🛡️"},
                    {title:"📱 Comunicação & Internet",items:content.comunicacao,icon:"📱"},
                  ].map(sec=>(
                    <div key={sec.title} style={{marginBottom:"2rem"}}>
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",marginBottom:"1rem"}}>{sec.title}</h3>
                      {sec.items?.map((t,i)=><TipItem key={i} icon={sec.icon} text={t}/>)}
                    </div>
                  ))}

                  {/* VISTO */}
                  {content.visto && (
                    <div style={{marginBottom:"2rem"}}>
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",marginBottom:"1rem"}}>📋 Visto para Brasileiros</h3>
                      <div style={s.vistoCard}>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:"1rem"}}>
                          {[["📋 Requisito",content.visto.brasileiro],["💵 Custo",content.visto.custo],["📅 Validade",content.visto.validade]].map(([l,v])=>(
                            <div key={l}>
                              <div style={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:".1em",color:"#f59e0b",marginBottom:4}}>{l}</div>
                              <div style={{fontSize:".9rem"}}>{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ORÇAMENTO */}
                  {content.orcamento && (
                    <div style={{marginBottom:"2rem"}}>
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",marginBottom:"1rem"}}>💰 Orçamento Estimado por Dia</h3>
                      <div style={s.budgetGrid}>
                        {[["economico","🌱","Econômico"],["medio","⭐","Médio"],["luxo","💎","Luxo"]].map(([k,icon,label])=>(
                          <div key={k} style={s.budgetCard(k)}>
                            <div style={{fontSize:"1.4rem",marginBottom:6}}>{icon}</div>
                            <div style={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".1em",color:"#374151",marginBottom:4}}>{label}</div>
                            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700}}>{content.orcamento[k]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* COMPARTILHAR DICAS */}
                  <div style={{...s.card,borderColor:"rgba(16,185,129,.15)"}}>
                    <div style={{marginBottom:12,fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:600}}>Gostou das dicas? Compartilhe com quem você vai viajar!</div>
                    <div style={s.shareBar}>
                      <button className="share-btn" style={s.shareBtn("#25D366")} onClick={()=>shareWA(dest,days)}>💬 WhatsApp</button>
                      <button className="share-btn" style={s.shareBtn("#0078D4")} onClick={()=>shareEmail(dest,days)}>📧 Email</button>
                      <button className="share-btn" style={s.shareBtn(copied?"#10b981":"#1e2533")} onClick={handleCopy}>{copied?"✓ Copiado!":"🔗 Link"}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer style={s.footer}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",marginBottom:10,background:"linear-gradient(135deg,#10b981,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>✈ DestinoBarato.com.br</div>
      <p style={{color:"#374151",fontSize:".83rem",marginBottom:8}}>100 destinos · Roteiros com IA · Feito para viajantes brasileiros</p>
      <p style={{color:"#1f2937",fontSize:".72rem"}}>© 2025 DestinoBarato.com.br — Todos os direitos reservados</p>
    </footer>
  );

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#07090f",color:"#eef2f7",minHeight:"100vh"}}>
      <style>{GLOBAL_CSS}</style>
      <NavBar/>
      {view==="home" && <HomePage/>}
      {view==="browse" && <BrowsePage/>}
      {view==="detail" && <DetailPage/>}
      <Footer/>
    </div>
  );
}
