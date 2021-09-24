/*
 * Имплементация основана на статье "СПРЯЖЕНИЕ ГЛАГОЛОВ НА ЗАНЯТИЯХ ПО РУССКОМУ ЯЗЫКУ КАК ИНОСТРАННОМУ:
 * КОНЦЕПЦИЯ И МОДЕЛЬ ОБУЧЕНИЯ" Журнал Современные проблемы науки и образования. – 2016. – № 2
 * Дата публикации 12.04.2016 Раздел Педагогические науки (13.00.00) УДК 372.881.161.1
 */

type PersonalPronoun = "я" | "ты" | "он" | "она" | "оно" | "мы" | "вы" | "они";
type ConjugationType = 1 | 2;
type Dictionary = { [key: string]: string };

// Слова-исключения, которые спрягаются не по правилам
const EXCEPTIONS = [
  // [0] 11 глаголов-исключений из I-го спряжения
  ["видеть", "обидеть", "ненавидеть", "зависеть", "терпеть", "смотреть", "вертеть", "дышать", "слышать", "гнать", "держать"],
  // [1] исключения из II-го спряжения
  ["стелить", "брить"],
  // [2] визуально сходные с глаголами II-го спряжения
  ["бить", "пить", "вить", "лить", "шить"],
  // [3] спрягаемые по другой формуле, но визуально сходные со стандартными глаголами на -ать, -ять, -еть, -оть с ударными и безударными личными окончаниями 
  [ "ждать", "рвать", "ткать", "смеяться", "надеяться", "лаять", "сеять", "веять", "таять", "полоть", "бороться", "пороть", "колоть", "брать"],
  // [4] Чередование согласных для глаголов I-го спряжения является скорее исключением, списки таких глаголов малы и наиболее частотные можно предложить выучить
  [ "писать", "слать", "резать", "обязать", "искать", "плакать", "прятать", "колебаться", "дремать"],
  // [5] Глаголы на -ать, -еть, -ять, у которых ударение падает на личные окончания
  ["спать", "сидеть", "лежать", "стоять", "молчать", "дышать", "держать", "болеть"],
  // [6] У семи глаголов без приставок появляется чередование разных гласных с |о|
  ["петь", "крыть", "мыть", "ныть", "выть", "рыть", "звать"],
];

/**
 * Функция возвращет спряжение глагола
 *
 * @param verb Глагол
 */
function getConjugationForm(verb: string): ConjugationType {
  let conjugationType: ConjugationType = 1;

  if (
    EXCEPTIONS[0].includes(verb) ||
    (verb.endsWith("ить") &&
      !EXCEPTIONS[1].includes(verb) &&
      !EXCEPTIONS[2].includes(verb))
  ) {
    conjugationType = 2;
  }

  return conjugationType;
}

/**
 * Функция возвращает окончание личной формы глагола
 * @param clippedVerb Глагол без показателя инфититива
 * @param conjugationType Спряжение глагола
 * @param pronoun Местоимение
 */
function getEnding(
  clippedVerb: string,
  conjugationType: ConjugationType,
  pronoun: PersonalPronoun,
) {
  const lastLetter: string = clippedVerb.slice(-1);

  if (conjugationType === 1) {
    /* У глаголов I-го спряжения – после гласного и -л- следует мягкий вариант -ю/-ют,
       в остальных случаях -у/-ут */
    const isSoftEnding = () => "аоуыэяюиеёль".includes(lastLetter);

    switch (pronoun) {
      case "я":
        return isSoftEnding() ? "ю" : "у";
      case "вы":
        return "ете";
      case "ты":
        return "ешь";
      case "мы":
        return "ем";
      case "он":
      case "она":
      case "оно":
        return "ет";
      default:
        // case 'они':
        return isSoftEnding() ? "ют" : "ут";
    }
  }

  /* У глаголов II-го спряжения всегда окончание -ю и -ят, кроме комбинаций после ж, ш, ч, щ */
  const isSoftEnding = () => "жшчщ".includes(lastLetter);

  switch (pronoun) {
    case "я":
      return isSoftEnding() ? "у" : "ю";
    case "вы":
      return "ите";
    case "ты":
      return "ишь";
    case "мы":
      return "им";
    case "он":
    case "она":
    case "оно":
      return "ит";
    default:
      // case 'они':
      return isSoftEnding() ? "ат" : "ят";
  }
}

/**
 * Функция спрягает глагол по формуле Ф1
 * @param verb Глагол
 * @param pronoun Местоимение
 */
function type1(verb: string, pronoun: PersonalPronoun): string {
  let clippedVerb = verb.replace(/ть$/, "");

  if (EXCEPTIONS[4].includes(verb)) {
    clippedVerb = clippedVerb.replace(/[аоуыэяюиеё]$/, "");
    const lastLetter: string = clippedVerb.slice(-1);
    const dict: Dictionary = { г: "ж", з: "ж", х: "ш", с: "ш", т: "ч", к: "ч" };

    clippedVerb = clippedVerb.replace(new RegExp(`${lastLetter}$`), dict[lastLetter]);
  }

  return clippedVerb + getEnding(clippedVerb, 1, pronoun);
}

/**
 * Функция спрягает глагол по формуле Ф2
 * @param verb Глагол
 * @param pronoun Местоимение
 */
function type2(verb: string, pronoun: PersonalPronoun): string {
  let clippedVerb = verb.replace(/ть$/, "");
  let conjugationType: ConjugationType = 2;

  switch (true) {
    case verb.endsWith("авать"):
      clippedVerb = clippedVerb.replace(/(ва$)/, "");
      conjugationType = 1;
      break;
    case verb.endsWith("нуть"):
      clippedVerb = clippedVerb.replace(/(у$)/, "");
      conjugationType = 1;
      break;
    case verb.match(/[аоя]ть$/) && EXCEPTIONS[3].includes(verb):
      clippedVerb = clippedVerb.replace(/([аоя]$)/, "");
      conjugationType = 1;
      break;
  }

  return clippedVerb + getEnding(clippedVerb, conjugationType, pronoun);
}

/**
 * Функция спрягает глагол по формуле Ф2a
 * @param verb Глагол
 * @param pronoun Местоимение
 */
function type2a(verb: string, pronoun: PersonalPronoun): string {
  let clippedVerb = verb.replace(/[аоуыэяюиеё]ть$/, "");
  let conjugationType: ConjugationType = 2;
  const lastLetter: string = clippedVerb.slice(-1);

  switch (true) {
    case EXCEPTIONS[1].includes(verb):
      clippedVerb += verb === "брить" ? "е" : "";
      conjugationType = 1;
      break;
    case EXCEPTIONS[2].includes(verb):
      clippedVerb += "ь";
      conjugationType = 1;
      break;
    case EXCEPTIONS[6].includes(verb):
      clippedVerb += "о";
      conjugationType = 1;
      break;
    case verb.endsWith("овать"):
      clippedVerb = clippedVerb.replace(/(ов$)/, "у");
      conjugationType = 1;
      break;
    case verb.endsWith("ить") && pronoun === "я" && "бпвфм".includes(lastLetter):
      clippedVerb += "л";
      break;
    case verb.endsWith("ить") && pronoun === "я" && "дтзск".includes(lastLetter):
      const dict: Dictionary = { д: "ж", з: "ж", с: "ш", т: "ч", к: "ч" };
      clippedVerb = clippedVerb.replace(lastLetter, dict[lastLetter]);
      break;
    case /(тер|мер|пер)[аоуыэяюиеё]ть$/.test(verb):
      clippedVerb = clippedVerb.replace("е", "");
      conjugationType = 1;
      break;
  }

  return clippedVerb + getEnding(clippedVerb, conjugationType, pronoun);
}

/**
 * Функция преобразует глагол из неопределенной формы в личную
 *
 * @param {string} verb - глагол в неопределенной форме
 * @param {PersonalPronoun} pronoun - местоимение для образования личной формы
 * @return {string} глагол в личной форме
 */
export function conjugate(verb: string, pronoun: PersonalPronoun): string {
  const conjugationForm = getConjugationForm(verb);
  verb = verb.toLowerCase();

  if (
    EXCEPTIONS[0].includes(verb) ||
    EXCEPTIONS[1].includes(verb) ||
    EXCEPTIONS[2].includes(verb) ||
    EXCEPTIONS[5].includes(verb) ||
    EXCEPTIONS[6].includes(verb) ||
    /(тер|мер|пер)[аоуыэяюиеё]ть$/.test(verb) ||
    verb.endsWith("овать") ||
    (verb.endsWith("ить") && "бпвфмдтзст".includes(verb.charAt(verb.length - 4)))
  ) {
    return type2a(verb, pronoun);
  }

  if (
    conjugationForm === 2 ||
    EXCEPTIONS[3].includes(verb) ||
    verb.endsWith("авать") ||
    verb.endsWith("нуть")
  ) {
    return type2(verb, pronoun);
  }
  return type1(verb, pronoun);
}
