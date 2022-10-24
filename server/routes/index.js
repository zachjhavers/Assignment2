var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/*GET Route for Displaying The Login Page*/
router.get('/login', indexController.displayLoginPage);

/*POST Route For Processing The Login Page*/
router.post('/login', indexController.processLoginPage);

/*GET Route for Displaying The Register Page*/
router.get('/register', indexController.displayRegisterPage);

/*POST Route For Processing The Register Page*/
router.post('/register', indexController.processRegisterPage);

/*GET To Perform logout*/
router.get('/logout', indexController.performLogout);

module.exports = router;
