require('dotenv').config()
const path = require('path')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');
const apiEndpoint = process.env.PRISMIC_ENDPOINT;
const prismicAccessToken = process.env.PRISMIC_ACCESS_TOKEN;

const handleLinkResolver = (doc) => {

  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid;
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid;
  // }

  return '/';
}

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.getApi(apiEndpoint, {
    accessToken: prismicAccessToken,
    req
  });
}

// -- MIDDLEWARE

// express configuration middewlare
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// prismic middleware
app.use(function(req, res, next) {
  res.locals.links = handleLinkResolver
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

// -- ROUTES
app.get('/', (req, res) => {
    initApi(req).then((api) => {
    api.query(
      // here we request to the prismic api which document data we want
      Prismic.Predicates.any('document.type', ['page_home', 'preloader'])
    ).then((response) => {
      // It response data in documents alfabethical order
      const { results: data } = response
      const pageData = data[0]
      const preloaderData = data[1]
      res.render('pages/home', { document: pageData });
    });
  });
})

app.get('/', (req, res) => {
  res.render('pages/about')
})

app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

app.get('/detail/:skill', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log('Express server initialized')
})
