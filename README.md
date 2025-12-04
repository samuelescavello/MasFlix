# MasFlix - Movie App

Un'applicazione React per esplorare film utilizzando l'API di TheMovieDB.

## 🚀 Funzionalità

- **Home Page**: Film popolari
- **Trending**: Film in tendenza questa settimana
- **Top Rated**: Film con le valutazioni più alte
- **Ricerca**: Cerca film per titolo
- **Responsive Design**: Funziona su desktop e mobile

## 📋 Prerequisiti

- Node.js (versione 14 o superiore)
- Un account su [TheMovieDB](https://www.themoviedb.org/)

## ⚙️ Installazione

1. **Installa le dipendenze**

   ```bash
   npm install
   ```

2. **Configura l'API Key**

   - Vai su [TheMovieDB API Settings](https://www.themoviedb.org/settings/api)
   - Crea un account se non ce l'hai già
   - Ottieni la tua API key
   - Crea un file `.env` nella root del progetto:

   ```
   VITE_TMDB_API_KEY=la_tua_api_key_qui
   ```

3. **Avvia l'applicazione**

   ```bash
   npm run dev
   ```

4. **Apri il browser**
   - L'app sarà disponibile su `http://localhost:5173`

## 🛠️ Tecnologie Utilizzate

- **React** - Libreria UI
- **React Router** - Navigazione
- **Vite** - Build tool
- **CSS3** - Styling (nessun framework CSS esterno)
- **TheMovieDB API** - Dati sui film

## 📝 Come Ottenere l'API Key

1. Vai su [themoviedb.org](https://www.themoviedb.org/)
2. Registrati per un account gratuito
3. Vai nelle **Impostazioni** > **API**
4. Richiedi una nuova API Key (scegli "Developer")
5. Compila il form con i dettagli del progetto
6. Copia l'API Key nel tuo file `.env`
