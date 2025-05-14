const express = require("express");
const app = express();
const lodash = require("lodash");
const port = 3000;
const fs = require("fs");
const animals = JSON.parse(fs.readFileSync("./files/animals.json", "utf-8")); // Leemos el fichero json

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

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a Express</h1>");
});

app.get("/color", (req, res) => {
  let color = "";
  req.query.variant
    ? (color = colors.find((c) => c.variant == req.query.variant))
    : (color = lodash.sample(colors));
  if (color == undefined) color = lodash.sample(colors);
  res.send(
    `<p style="color: ${color.hex};">El color escogido ha sido el ${color.variant}.</p>`
  );
});

app.get("/get-colors", (req, res) => {
  const colores = colors
    .map(
      (color) =>
        `<li><a href="/color?variant=${color.variant}" style="color: ${color.hex};">${color.variant}</a></li>`
    )
    .join("");

  let responseHTML = `
      <h2>Lista de colores de NetMind!</h2>
      <ul>
      ${colores}
      </ul>
    `;
  res.send(responseHTML);
});

app.get("/get-animal", (req, res) => {
  const animal = animals.find((a) => a.variant === req.query.variant);
  req.query.variant
    ? res.send(
        `<article><h2>${animal.animalName}</h2><img src="${animal.urlImage}" alt="Imagen de ${animal.animalName}" style="max-width: 300px;"> </article>`
      )
    : res.send(`<article><h2>Faltan datos</article>`);
});

app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
