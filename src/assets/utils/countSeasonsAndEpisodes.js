function countSeasonsAndEpisodes(episodesJson) {
  // Parseamos el JSON de episodios
  const episodes = JSON.parse(episodesJson);

  // Inicializamos un objeto para almacenar los conteos
  const seasonCounts = {};

  // Iteramos sobre cada episodio para contar las temporadas y episodios
  episodes.forEach((episode) => {
    const seasonNumber = episode.season;

    // Si la temporada no existe en el objeto, la inicializamos con 0 episodios
    if (!seasonCounts[seasonNumber]) {
      seasonCounts[seasonNumber] = 0;
    }

    // Incrementamos el contador de episodios de esa temporada
    seasonCounts[seasonNumber]++;
  });

  // Contamos el número total de temporadas
  const numberOfSeasons = Object.keys(seasonCounts).length;

  // Creamos un array con la cantidad de episodios por temporada
  const numberOfChaptersBySeason = Object.values(seasonCounts);

  // Devolvemos el objeto con los resultados
  return {
    numberOfSeasons: numberOfSeasons,
    numberOfChaptersBySeason: numberOfChaptersBySeason,
  };
}
