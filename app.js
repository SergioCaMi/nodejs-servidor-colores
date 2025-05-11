const colors = [
  { variant: "Vermillion", hex: "#2E191B" },
  { variant: "Forest", hex: "#0B6623" },
  { variant: "Navy", hex: "#000080" },
  { variant: "Crimson", hex: "#DC143C" },
  { variant: "Sky Blue", hex: "#87CEEB" },
  { variant: "Lime", hex: "#00FF00" },
  { variant: "Gold", hex: "#FFD700" },
  { variant: "Lavender", hex: "#E6E6FA" },
  { variant: "Tangerine", hex: "#F28500" },
  { variant: "Magenta", hex: "#FF00FF" },
  { variant: "Cyan", hex: "#00FFFF" },
  { variant: "Olive", hex: "#808000" },
  { variant: "Teal", hex: "#008080" },
  { variant: "Maroon", hex: "#800000" },
  { variant: "Coral", hex: "#FF7F50" },
];

const http = require("http");
const url = require("url");
const fs = require('fs');

// req: es un objeto que contiene información  y métodos sobre la petición que se acaba de producir
// res: es un objeto que contiene métodos para realizar una respuesta al cliente
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query; //Hay queryString
  const variant = query.variant; //Valor
  const animals = JSON.parse(fs.readFileSync('./files/animals.json', 'utf-8'));// Leemos el fichero json

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (path == "/") {
    res.write(`
            <h1>Bienvenidos a la base de datos de colores de NetMind!</h1>
            <p>Para obtener un color aleatorio, haz una petición GET al endpoint <strong>/color</strong>.</p>
            <p>Para obtener un color específico, usa el parámetro de consulta <strong>?variant=[color]</strong> (por ejemplo, <strong>?variant=Vermillion</strong>).</p>
            <p>Para obtener la lista de colores disponibles, haz una petición GET al endpoint <strong>/get-colors</strong>.</p>
            <p>Para obtener un animal relacionado con el color, haz una petición GET al endpoint <strong>/get-animal</strong> y usa el parámetro de consulta <strong>?variant=[color]</strong> (por ejemplo, <strong>?variant=Vermillion</strong>).</p>
    `);
    res.end();
  } else if (path == "/color") {
    if (variant) {
      //Si hay queryString
      const colorFound = colors.find((c) => c.variant == variant);

      if (colorFound) {
        res.write(`
          <p style="color: ${colorFound.hex};">El color escogido ha sido el ${variant}.</p>
        `);
      } else {
        res.statusCode = 404;
        res.write("<h1>Color no encontrado</h1>");
      }
    } else {
      //Unicamente /color
      const indexColor = Math.floor(Math.random() * colors.length);
      res.write(`
        <p style="color: ${colors[indexColor].hex};">Este es un párrafo de texto de color ${colors[indexColor].variant}.</p>
      `);
    }
    res.end();
  } else if (path == "/get-colors") {
    res.write(`
      <h2>Lista de colores de NetMind!</h2>
      <ul>
    `);
//res.write(`<li><a href="/color?variant=${element.variant}">${element.variant}</a></li>`);
    colors.forEach((color) => {
      res.write(`<li><a href="/color?variant=${color.variant}">${color.variant}</a></li>`);
    });

    res.write(`
      </ul>
    `);
    res.end();
    

  } else if (path == "/get-animal") {

    if (variant) {
      const animal = animals.find(a => a.variant === variant);
      if (animal){
        res.write(`
          <article>
            <h2>${animal.animalName}</h2>
            <img src="${animal.urlImage}" alt="Imagen de ${animal.animalName}" style="max-width: 300px;">
          </article>
        `);
   
      res.end();
  
      } else {

      }
    }

  } else {
    // estas intentando acceder a un recurso que no existe

    res.statusCode = 404;
    res.write("<h1>Página no encontrada</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  // Función de callback que se ejecuta cuando nuestro servidor empieza a escuchar peticiones de forma efectiva
  console.log("Escuchando peticiones por el puerto 3000");
});

{
  /* <img src="${post.image}" alt="Imagen de ${post.title}" style="max-width: 300px;"> */
}
