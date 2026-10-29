// Une date « AAAA-MM-JJ » est un jour du calendrier : lue en heure locale pour ne pas
// basculer sur la veille chez un visiteur d'un fuseau à l'ouest de UTC
export const parseDay = (day: string) => new Date(`${day}T00:00:00`);

export const longDateFormat = (locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" });
