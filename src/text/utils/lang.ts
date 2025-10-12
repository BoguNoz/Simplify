import en from "../en";

export const languages = { en } ;
export type LangKey = keyof typeof languages;

let current: LangKey = "en";

export function setLanguage(lang: LangKey) {
    current = lang;
}

export function lang() {
    return languages[current];
}

export default lang();
