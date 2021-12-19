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

const mapHome = require('./mappers/mapHome')
const mapAbout = require('./mappers/mapAbout')

const handleLinkResolver = (doc) => {

  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid;
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid;
  // }

  return '/';
}

// Initialize the prismic.io api
const initApi = async (req) => {
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
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// prismic middleware
app.use(function(req, res, next) {
  res.locals.links = handleLinkResolver
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

// -- ROUTES
app.get('/', async (req, res) => {
  const api = await initApi(req)
  const homeData = await api.getSingle('page_home')
  const { results: skillsData } = await api.query(Prismic.Predicates.at('document.type', 'entity_skill'))
  const mappedHomeData = mapHome({ homeData, skillsData })
  res.render('pages/home/index', { home: mappedHomeData });
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const aboutData = await api.getSingle('page_about')
  const mappedAboutData = mapAbout(aboutData)

  res.render('pages/about/index', { about: mappedAboutData })
})

app.get('/contact', (req, res) => {
  res.render('pages/contact/index')
})

app.get('/detail/:skill', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log('Express server initialized')
})
