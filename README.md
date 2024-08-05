# flexOffice Booking Application

## Table des matières
- [Aperçu](#aperçu)
- [Technologies Utilisées](#technologies-utilisées)
- [Fonctionnalités](#fonctionnalités)
- [Installation et Configuration](#installation-et-configuration)
- [Utilisation](#utilisation)
- [Outils de Développement](#outils-de-développement)

## Aperçu
L'application de réservation de bureaux permet aux utilisateurs de réserver des bureaux dans différentes salles de l'entreprise. Les utilisateurs peuvent sélectionner une date, choisir une salle, puis choisir un bureau spécifique à réserver. L'application affiche également les bureaux déjà réservés en gris.

## Technologies Utilisées
### Frontend
- **[Next.js](https://nextjs.org/)** : Framework React pour le rendu côté serveur et la génération de sites statiques, offrant une performance optimale et une excellente expérience développeur.
- **React** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur dynamiques.
- **Tailwind CSS** : Framework CSS utilitaire pour un développement rapide et responsive.
- **Axios** : Bibliothèque HTTP pour effectuer des requêtes au backend.
- **React Calendar** : Composant de calendrier React pour la sélection de dates.

### Backend
- **[Node.js](https://nodejs.org/)** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework pour créer des applications web et des API avec Node.js.
- **MongoDB** : Base de données NoSQL pour le stockage des données.
- **Mongoose** : Bibliothèque ODM pour MongoDB et Node.js.

## Fonctionnalités
- **Authentification** : Pour ne permettre l'accès que aix personnes autorisées (Personnel Neosoft). L'identifiant sera l'email Neosoft. Le mot de passe, le mot de passe Neosoft (Maquette 1). Avant de s'authentifier, l'utilisateur devra être enregistré par l'administrateur via une page d'identification. Sur cette page d'identification, doit pouvoir être saisi, l'email, le prénom et le nom de l'utilisateur
- **Sélection de la salle, de la date et du créneau ** : Sélection de la salle via une liste déroulante / Choix de la date par saisie ou sélection dans un calendrier / Choix du créneau par radio bouton (Maquette 2)
- **Affichage de la salle et ses bureaux disponibles** : Après sélection de la salle, de la date, du créneau, les bureaus de la salle sont affichés. Les bureaux verts sont disponibles pour la journée, les bureaux rouges sont occupés pour le journée. Les bureaux vert/rouge sont occupés soit pour la matinée soit l'après-midi. Les bureaux entièrement rouge ne sont pas sélectionnable. Pour choisir son bureau l'utilisateur sélectionne le bureau de son choix. Il clique sur ENvoyer pour lancer sa demande. Sur un bureau occupé une bulle affiche le nom de la personne qui a réservé (maquette 3).
- **Menu de l'administrateur** : Il peut réserver une salle / Accès à la page d'identification pour ajouter une personne / l'accès à la gestion des salles / L'accès aux réservations du mois (Maquette 5)
- **L'accès aux salles** : En cliqant sur le menu gestion des salles, l'utilisateur accède à la liste des salles (Maquette 6). Il peut supprimer une salle en cliquant sur la croix rouge de la salle associée. Il peut modifier une salle en cliquant sur crayon de la salle associée ou il peut ajouter une salle en cliquant sur Ajouter
- **Suppression d'une salle** : En supprimant une salle, une pop up s'affiche disant que la salle a été supprimée (Maquette 7)
- **Modification d'une salle** : En cliquant sur le crayon de la salle associée, l'administrateur accède à l'écrand de modification de la salle. Il peut modifier le nom de la salle et spécifier le nombre de postes. En focntion de ce qu'il a saisi, s'affiche une salle avec les postes en question. Sur chque poste il peut spécifier un nom. Il valide en cliqaunt sur Valider (Maquette 8).
- **Ajout de salles et de bureaux** : Au même titre que la modification de salle, l'administrateur peut ajouter une salle. Il spécifie le nom de la salle et le nombre de postes. A la suite de ces saisies, une salle s'affiche avec le nom et les bureaux. Il peut ajouter un nom à chaque bureau. Il valide en cliquant sur valider (Maquette 9)
- **Communication Backend-Frontend** : Utilisation d'Axios pour envoyer des requêtes au serveur backend pour créer et récupérer des réservations.

## Installation et Configuration
### Prérequis
- **Node.js** (version 14 ou supérieure)
- **MongoDB** (local ou via MongoDB Atlas)

### Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/flexOffice.git

## Outils de Développement
- **VSCode**: Éditeur de code utilisé pour le développement du projet.
- **MongoDB** Compass: Outil GUI pour gérer et interagir avec la base de données MongoDB.
   
