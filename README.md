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
- **Affichage des salles et bureaux disponibles** : La page principale affiche les salles disponibles, et les bureaux associés sont affichés lorsqu'une salle est sélectionnée.
- **Réservation de bureaux** : Les utilisateurs peuvent réserver des bureaux en sélectionnant une date, une salle, un bureau et un créneau horaire (journée complète, matin ou après-midi).*
- **Ajout de salles et de bureaux** : Les administrateurs peuvent ajouter de nouvelles salles et de nouveaux bureaux via des formulaires dédiés.
- **Gestion des réservations** : Les bureaux réservés sont affichés en gris pour indiquer qu'ils ne sont pas disponibles.
- **Formulaire de réservation** : Un formulaire permet de saisir les détails de la réservation (nom, date, créneau horaire).
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
   
