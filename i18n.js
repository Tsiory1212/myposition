import {getLocales} from "expo-localization";
import { I18n } from 'i18n-js';

const translations = {
    en: {
        latitude: "latitude",
        longitude: "longitude",
        altitude: "altitude",
        addPosition: "Add my position",
        click: "click on the button",
        sharePosition: "Share my position",
        home: "Home",
        rulesTitle: "Privacy rules",
        permission: "access permission has been denied",
        message: "Help! I am stuk at the position indicated by the link below. Click on the link to display my position in google maps and come",
        rules: "This application use your location data for the operation of the application. This data is neither stored nor share by us with "
     },
    fr: { 
        latitude: "latitude",
        longitude: "longitude",
        altitude: "altitude",
        addPosition: "Obtenir ma position",
        click: "Cliquez sur le bouton",
        sharePosition: "Partager ma position",
        home: "Accueil",
        rulesTitle: "Règles de confidentialité",
        permission: "la permission d'accès a été refusée",
        message: "Au secour ! Je suis coincé à la position indiqué par le lien ci dessous. Cliquez sur le lien pour afficher ma position",
        rules: "Cette application utilise vos données de localisation pour le fonctionnement de l'application. Ces données ne sont ni stockées ni partagées"
     },
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;
i18n.enableFallback = true;

export default i18n;