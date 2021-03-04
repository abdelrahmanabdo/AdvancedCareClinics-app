import React from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import moment from "moment";
import i18next from "i18next";
require("moment/locale/tr.js");

const I18N_NAME_SPACE = "translation";

i18n.use(initReactI18next).init({
  resources: {},
  lng: "ar",
  fallbackLng: "ar",
  ns: I18N_NAME_SPACE,
  interpolation: {
    escapeValue: false
  }
});

moment.locale("ar");

i18n.addResources("en", I18N_NAME_SPACE, require("./locales/en.json"));
i18n.addResources("ar", I18N_NAME_SPACE, require("./locales/ar.json"));

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  return {
    getString: (key: string) => t(key),
    changeLanguage: (lang: string) => {
      moment.locale(lang);
      i18n.changeLanguage(lang);
    },
    currentLanguage: () => i18n.language
  };
};
