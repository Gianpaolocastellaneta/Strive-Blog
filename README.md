# MERN BLOG PROJECT

Questo progetto è un'applicazione web full-stack per un blog, sviluppata utilizzando lo stack MERN (MongoDB, Express, React, Node.js). L'applicazione offre funzionalità di creazione, lettura, aggiornamento e cancellazione (CRUD) oltre a un sistema di autenticazione e autorizzazione degli utenti.

## Caratteristiche principali
- Autenticazione: Sistema di login e registrazione degli utenti, con supporto per l'autenticazione tramite Google OAuth.
- Gestione dei post: Gli utenti autenticati possono creare, modificare ed eliminare i propri post.
- Commenti: Possibilità di aggiungere commenti ai post.
- Ricerca: Funzionalità di ricerca per trovare post specifici.
- Responsive Design: Layout adattivo per qualsiasi dispositivo.


## Tecnologie utilizzate
### Frontend
- React
- React Router per la navigazione
- Bootstrap e CSS per lo styling


### Backend
- Node.js con Express
- MongoDB con Mongoose per la gestione del database
- JWT per l'autenticazione
- Passport.js per l'autenticazione OAuth
- Multer e Cloudinary per la gestione dei file
- Nodemailer e Mailtrap per invio mail alla creazione del post.


### Struttura del progetto
- **frontend**: Contiene l'applicazione React
- **backend**: Contiene il server Express e la logica

### Configurazione e Avvio
- **frontend**: cd frontend && npm run dev
- **backend**: cd backend && npm start

### Deploy
- **frontend**: Vercel
- **backend**: Render
https://strive-blog-sigma.vercel.app/

### Test
- Email test : gianpaolo@castellaneta.com
- Password test : gianpaolo


