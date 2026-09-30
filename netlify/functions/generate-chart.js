exports.handler = async (event, context) => {
  // 1. En-têtes CORS (Obligatoires pour autoriser les requêtes venant de Make.com)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gestion des requêtes de vérification préalable (Preflight OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Vérifier que la requête est bien un POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée. Utilisez POST.' })
    };
  }

  try {
    // 2. Extraire les données de naissance envoyées par le Webhook Make
    const data = JSON.parse(event.body || '{}');
    const { birth_date, birth_time, birth_location } = data;

    if (!birth_date || !birth_time) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Les paramètres birth_date et birth_time sont requis.' })
      };
    }

    // 3. Logique de calcul du Design Humain
    // Note : Si vous utilisez déjà une librairie/algorithme sur votre site React/JS,
    // importez vos fonctions de calcul ici pour déterminer le Type, Profil, Centres et SVG.

    const computedData = {
      human_design_type: "Generator",
      strategy: "To Respond",
      authority: "Emotional",
      profile: "1/3",
      definition: "Single Definition",
      signature: "Satisfaction",
      not_self_theme: "Frustration",
      incarnation_cross: "Right Angle Cross of the Sphinx (2/1 | 13/7)",
      
      // Centres (Exemple de dynamique Défini / Non-Défini)
      center_head_status: "Non-Défini",
      center_ajna_status: "Défini",
      center_throat_status: "Défini",
      center_g_status: "Défini",
      center_ego_status: "Non-Défini",
      center_sacral_status: "Défini",
      center_spleen_status: "Non-Défini",
      center_solar_status: "Défini",
      center_root_status: "Non-Défini",

      // Code SVG de la carte à injecter directement dans la couverture
      bodygraph_svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
        <!-- Arrière-plan SVG ou Schéma vectoriel des centres -->
        <rect width="100%" height="100%" fill="none"/>
        <g stroke="#111" stroke-width="1.5" fill="none">
          <!-- Exemple de visuel temporaire vectoriel -->
          <polygon points="200,40 240,90 160,90" fill="#E2D9F3" /> <!-- Tête -->
          <polygon points="160,100 240,100 200,150" fill="#D8F3DC" /> <!-- Ajna -->
          <rect x="160" y="170" width="80" height="50" rx="5" fill="#FCD5CE" /> <!-- Gorge -->
        </g>
        <text x="200" y="470" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#555">
          Carte générée pour ${birth_date} ${birth_time}
        </text>
      </svg>`
    };

    // 4. Renvoi du résultat en JSON à Make.com
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(computedData)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors du traitement de la carte', details: error.message })
    };
  }
};
