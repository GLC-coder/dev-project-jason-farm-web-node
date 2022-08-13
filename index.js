import fs from "fs";
import http from "http";
import url from "url";
import replaceTemplate from "./modules/replaceTemplate.js";

let port = 8000;

const templateOverviewPage = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempalateCardPage = fs.readFileSync(
  "./templates/template-card.html",
  "utf-8"
);
const templateProductPage = fs.readFileSync(
  "./templates/product.html",
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObject
      .map((item) => replaceTemplate(tempalateCardPage, item))
      .join("");
    const outputTemplateOverview = templateOverviewPage.replace(
      / {%PRODUCT_CARDS%}/g,
      cardsHtml
    );
    res.end(outputTemplateOverview);
    //product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    console.log(query.id);
    const product = dataObject[query.id];
    const outputTemplateProduct = replaceTemplate(templateProductPage, product);
    res.end(outputTemplateProduct);
    //Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h2>Not Found</h2>");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Listening to requests from port ${port}`);
});
