import express from "express"; // importando o express
import path from "path"; // serve para defirnir caminhos padrões

const __dirname = path.resolve(path.dirname("")); // __dirname serve para informar qual é o caminho padrão da minha pasta

const app = express(); // instnciando o express dentro da const app

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // O corpo (body) da requisição
app.use(express.json()); // converter para JSON

app.set("view engine", "ejs"); // faz com que o express reconheça o EJS como motor de visualização
app.use(express.static(path.join(__dirname, "public")));
let message;

const infoPokes = [
  {
    id: 1,
    numero: 1,
    nome: "Bulbasaur",
    tipo: "Planta",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao:
      "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente",
    altura: "0,7 m",
    peso: "6,9 kg",
    categoria: "Semente",
    habilidades: "Folha Navalha, Chicotes de Vinha",
  },
  {
    id: 2,
    numero: 4,
    nome: "Charmander",
    tipo: "Fogo/chama",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda",
    altura: "0,6 m",
    peso: "8,5kg",
    categoria: "Largato",
    habilidades: "Lanças chamas, Brasas",
  },
  {
    id: 3,
    numero: 7,
    nome: "Squirtle",
    tipo: "Água",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.",
    altura: "0,5 m",
    peso: "9,0 kg",
    categoria: "Tartaruba pequena",
    habilidades: "Pulso de Água, Calda D'água",
  },
  {
    id: 4,
    numero: "397",
    nome: "Turtwig",
    tipo: "Planta",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/387.png",
    descricao:
      "A fotossíntese ocorre em todo o seu corpo sob o sol. A concha em suas costas é, na verdade, solo endurecido.",
    altura: "0,4 m",
    peso: "10,2kg",
    categoria: "Folha Minúscula",
    habilidades: "Folhas de Navalia, Síntese",
  },
  {
    id: 5,
    numero: 393,
    nome: "Piplub",
    tipo: "Agua",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/393.png",
    descricao:
      "Não gosta de ser cuidado. É difícil se relacionar com ele, pois não ouve seu treinador.",
    altura: "0,4 m",
    peso: "5,2kg",
    categoria: "Pinguim",
    habilidades: "Bico broca, Bolhas",
  },
  {
    id: 6,
    numero: 390,
    nome: "Chimchar",
    tipo: "Fogo",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/390.png",
    descricao:
      "Sua extremidade traseira ardente é alimentada por gás feito em sua barriga. Nem a chuva pode apagar o fogo.",
    altura: "0,5 m",
    peso: "6,2kg",
    categoria: "Chimpanzé",
    habilidades: "Roda de fogo, Cavar",
  },
];

//Rotas
app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index.ejs", {
    infoPokes,
    message,
  });
});

app.get("/detalhes/:id", (req, res) => {
  let infoPoke = +req.params.id;
  let pokemon = "";
  const poke = infoPokes.filter((e) => {
    if (e.id === infoPoke) {
      pokemon = e;
    }
  });
  res.render("detalhes.ejs", {
    infoPokes,
    pokemon,
    message,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro.ejs", { message });
});

app.post("/cadastro", (req, res) => {
  let i = infoPokes[infoPokes.length - 1].id + 1;
  const {
    nome,
    numero,
    tipo,
    descricao,
    img,
    altura,
    peso,
    habilidades,
    categoria,
  } = req.body;
  infoPokes.push({
    id: i,
    nome,
    numero,
    tipo,
    descricao,
    img,
    altura,
    peso,
    habilidades,
    categoria,
  });
  console.log(infoPokes);
  message = `Pokémon successfully registered !`;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.clear();
  console.log(`Server in http://localhost:${PORT}`);
});
