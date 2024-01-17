const bcrypt = require('bcrypt');
const { User, Role } = require('../models');
let  {products}  = require('./catalogController');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // !! Votre code à partir d'ici

            // On récupère user avec le role
            // Est-ce que l'utilisateur existe en BDD ?
            // Sélectionner user avec email et inclure le role, si on ne le trouve pas :
            //      on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
            // Sinon on continue.

            // Le mot de passe est il correct ?
            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur

            // On ajoute user a la session

            // On enlève le mot de passe de la session.

            // !! Ne pas modifier cette ligne

            const user = await User.findOne({

                where: {
                    email: email,
                  },

                  include: [{

                    association: 'role',
    
    
                }]

            });

            if (!user) { 
                res.render('login', {error: 'Utilisateur ou mot de passe incorrect',});
              return;}


              const passwordMatch = await bcrypt.compare(password, user.password);


              if (!passwordMatch) {
                res.render('login', {error: 'Utilisateur ou mot de passe incorrect',});
                return;
              }

              req.session.user = user;
              req.session.user.password = '';

            console.log(user)
            

            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici

        req.session.destroy();

        products = [];

        res.redirect('/');
    },
};

module.exports = sessionController;
