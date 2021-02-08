#!/usr/bin/env node

const Koa = require("koa");
const views = require("koa-views");
const serve = require("koa-static");
const Router = require("koa-router");
const path = require("path");

const app = new Koa();

app.use(
  views(path.resolve(__dirname, "../examples"), {
    map: {
      html: "underscore",
    },
  })
);
app.use(serve(path.resolve(__dirname, "../dist"), {}));

const router = new Router();

router.get("/", async (ctx) => {
  await ctx.render("default.html", {});
});

app.use(router.middleware());

app.listen(3333);
