## Description

## Description du projet

**Portail B2C – Gestion d’abonnements mobiles**

Ce projet est le fontend de notre plateforme web destinée aux clients finaux, leur permettant de gérer facilement leurs services mobiles :  
- **Inscription et authentification** : création de compte, login/logout et gestion des rôles (`USER`, `ADMIN`).  
- **Souscription et gestion d’offres** : parcours de souscription à des packs voix, data ou SMS, avec suivi du statut (`ACTIVE`, `EXPIRED`, `CANCELED`) et des quotas restants.  
- **Portefeuille virtuel** : wallet relié à chaque utilisateur, avec suivi du solde et des rechargements cumulés.  
- **Facturation** : génération mensuelle de factures simulées, stockage des lignes de facturation en JSON et possibilité de télécharger un PDF.  
- **Surveillance de numéros** : ajout et aliasing de numéros tiers (ex : numéro d’enfant), avec historique de création et statut de chaque numéro (`UNASSIGNED`, `ACTIVE`, `SUSPENDED`).  
- **Architecture technique** :  
  - Backend : NestJS / TypeScript  
  - Base de données : PostgreSQL orchestré via Prisma ORM  
  - Modèles clés : `User`, `Wallet`, `PhoneNumber`, `Offer`, `Subscription`, `Invoice`, `MonitoredNumber`  
  - Sécurité : gestion des rôles, hachage des mots de passe et JWT pour l’accès aux API  
- **Points forts** :  
  - Modélisation claire des relations entité–relation  
  - Migrations reproductibles avec Prisma (`migrate deploy`)  
  - Serveur statique pour diffuser le schéma ERD  
  - Documentation interactive via Swagger UI

Cette solution offre une expérience utilisateur fluide pour la gestion complète de l’abonnement mobile, tout en garantissant la cohérence des données et la simplicité de déploiement pour les développeurs.  


## Prérequis

1. **Node.js**  
   - Version LTS (>16.x)  , ma version: v22.15.1
  

2. **npm** (ou yarn)  
   - version : 11.4.0


   4. **Fichier d’exemple `.env.local`**  
   
   - Dupliquez le env.example :  
     ```bash
     cp env.example .env.local
     ```
   - Éditez `.env.local` pour renseigner au minimum :
     ```dotenv
    API_URL=http://localhost:3005
     ```

## Project setup

```bash
# 1. Installer les dépendances

$ npm install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
