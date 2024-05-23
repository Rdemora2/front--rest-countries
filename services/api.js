import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

const languageTranslations = {
  "eng": "Inglês",
  "fra": "Francês",
  "spa": "Espanhol",
  "por": "Português",
  "deu": "Alemão",
  "ita": "Italiano",
  "jpn": "Japonês",
  "rus": "Russo",
  "zho": "Chinês",
  "abk": "Abcázio",
  "ace": "Acehnês",
  "ach": "Acoli",
  "ada": "Adangme",
  "ady": "Adigue",
  "aar": "Afar",
  "afh": "Afrihili",
  "afr": "Africâner",
  "afa": "Línguas afro-asiáticas",
  "aka": "Akan",
  "akk": "Acadiano",
  "alb": "Albanês",
  "ale": "Aleúte",
  "alg": "Línguas algonquinas",
  "tut": "Línguas altaicas",
  "amh": "Amárico",
  "ang": "Inglês antigo",
  "anp": "Angika",
  "apa": "Línguas apache",
  "ara": "Árabe",
  "arc": "Araméico",
  "arp": "Arapaho",
  "arw": "Arawak",
  "hye": "Armênio",
  "rup": "Aromeno",
  "art": "Línguas artificiais",
  "asm": "Assamês",
  "ast": "Asturiano",
  "ath": "Línguas atabascanas",
  "aus": "Línguas australianas",
  "ava": "Avar",
  "ave": "Avaric",
  "awa": "Awadhi",
  "aym": "Aimará",
  "aze": "Azerbaijano",
  "ban": "Balinese",
  "bat": "Línguas bálticas",
  "bal": "Baluchi",
  "bam": "Bambara",
  "bai": "Línguas Bamileke",
  "bad": "Banda",
  "bnt": "Banto",
  "bas": "Basa",
  "bak": "Bashkir",
  "eus": "Basco",
  "btk": "Línguas bataques",
  "bej": "Beja",
  "bel": "Bielorrusso",
  "bem": "Bemba",
  "ben": "Bengali",
  "ber": "Línguas berberes",
  "bho": "Bhojpuri",
  "bih": "Bihari",
  "bik": "Bicolano",
  "byn": "Bilin",
  "bis": "Bislamá",
  "zbl": "Blissymbols",
  "nob": "Norueguês bokmål",
  "bsn": "Barasana-Eduria",
  "bra": "Braj",
  "bre": "Bretão",
  "bug": "Buginese",
  "bgx": "Balkan Gagauz Turkish",
  "bua": "Buriat",
  "mya": "Birmanês",
  "cad": "Caddo",
  "cai": "Línguas indígenas da América Central",
  "car": "Caribe",
  "cau": "Línguas caucasianas",
  "ceb": "Cebuano",
  "cel": "Línguas celtas",
  "cmc": "Línguas chámicas",
  "chv": "Chuvash",
  "cmn": "Mandarim",
  "cha": "Chamorro",
  "che": "Checheno",
  "chr": "Cherokee",
  "chy": "Cheyenne",
  "chb": "Chibcha",
  "nya": "Chichewa",
  "chp": "Chipewyan",
  "cho": "Choctaw",
  "chk": "Chuukês",
  "shn": "Shan",
  "cic": "Chickasaw",
  "cgg": "Chiga",
  "chn": "Chinook Jargon",
  "chp": "Chipewyan",
  "cho": "Choctaw",
  "chr": "Cherokee",
  "cek": "Chechen",
  "chv": "Chuvash",
  "chy": "Cheyenne",
  "nyo": "Nyoro",
  "zho": "Chinês",
  "zha": "Zhuang",
  "chb": "Chibcha",
  "chp": "Chipewyan",
  "chk": "Chuukese",
  "shn": "Shan",
  "cil": "Cimbrian",
  "cpf": "Creoles and pidgins, French-based",
  "cpp": "Creoles and pidgins, Portuguese-based",
  "cmc": "Chamic languages",
  "cnr": "Montenegrin",
  "cop": "Coptic",
  "cor": "Córnico",
  "cos": "Córsico",
  "cre": "Cree",
  "cpe": "Creoles and pidgins, English-based",
  "crh": "Crimean Turkish",
  "crp": "Creoles and pidgins",
  "cpe": "Crioulos e pidgins baseados no inglês",
  "cpf": "Crioulos e pidgins baseados no francês",
  "cpp": "Crioulos e pidgins baseados no português",
  "crh": "Turco da Crimeia",
  "scr": "Croata",
  "csb": "Cachubiano",
  "cus": "Línguas cusitas",
  "cub": "Cubeo",
  "cup": "Cupeño",
  "kbd": "Kabardiano",
  "kab": "Kabyle",
  "kac": "Kachin",
  "kal": "Kalaallisut",
  "kam": "Kamba",
  "kan": "Canarês",
  "kaa": "Caraicalaque",
  "kaa": "Karakalpak",
  "krc": "Karachay-Balkar",
  "krl": "Carélio",
  "kar": "Carataca",
  "kat": "Georgiano",
  "kat": "Katachán",
  "kaw": "Kawi",
  "kaz": "Cazaque",
  "kha": "Cassio",
  "khi": "Línguas khoisan",
  "khm": "Khmer",
  "kho": "Khotanês",
  "kik": "Kikuyu",
  "kmb": "Quimbundo",
  "kin": "Quiruanda",
  "kir": "Quirguiz",
  "tlh": "Klingon",
  "kom": "Komi",
  "kon": "Concani",
  "kok": "Konkani",
  "kos": "Kosraean",
  "kpe": "Kpelle",
  "kro": "Kru",
  "kru": "Kurukh",
  "kua": "Kuanyama",
  "kum": "Kumyk",
  "kur": "Curdo",
  "kut": "Kutenai",
  "lad": "Ladino",
  "lah": "Lahnda",
  "lam": "Lamba",
  "lao": "Laosiano",
  "lat": "Latim",
  "lav": "Letão",
  "lez": "Lezgiano",
  "lim": "Limburguês",
  "lin": "Lingala",
  "lit": "Lituano",
  "jbo": "Lojban",
  "nds": "Baixo-alemão",
  "nds": "Baixo-saxão",
  "loh": "Loma",
  "lol": "Mongo",
  "loz": "Lozi",
  "ltz": "Luxemburguês",
  "lua": "Luba-Lulua",
  "lub": "Luba-katanga",
  "lug": "Luganda",
  "lui": "Luiseno",
  "lun": "Lunda",
  "luo": "Luo",
  "lus": "Lushai",
  "lav": "Letão",
  "mad": "Madurês",
  "mag": "Magahi",
  "mah": "Marshalês",
  "mai": "Maithili",
  "mak": "Makasar",
  "mlg": "Malaiala",
  "mal": "Malaiala",
  "mlt": "Maltês",
  "mnc": "Manchu",
  "mdr": "Mandar",
  "man": "Mandinga",
  "mni": "Manipuri",
  "mno": "Línguas manobo",
  "glv": "Manx",
  "mao": "Maori",
  "mri": "Maori",
  "mar": "Marata",
  "chm": "Mari",
  "mah": "Marshallês",
  "mwr": "Marwari",
  "mas": "Maa",
  "myn": "Línguas maias",
  "men": "Mende",
  "mic": "Micmac",
  "min": "Minangkabau",
  "mis": "Línguas diversas",
  "mwl": "Mirandês",
  "moh": "Mohawk",
  "mdf": "Moksha",
  "mol": "Moldávio",
  "mon": "Mongol",
  "mos": "Mossi",
  "mul": "Múltiplos idiomas",
  "mun": "Línguas munda",
  "nqo": "N'ko",
  "nah": "Náuatle",
  "nap": "Napolitano",
  "naur": "Nauruano",
  "nav": "Navajo",
  "nbl": "Ndebele do Sul",
  "nde": "Ndebele do Norte",
  "ndo": "Ndonga",
  "nap": "Napolitano",
  "nep": "Nepalês",
  "new": "Newari",
  "nia": "Nias",
  "nic": "Línguas nígero-congolesas",
  "ssa": "Línguas nilo-saarianas",
  "niu": "Niueano",
  "non": "Nórdico antigo",
  "nor": "Norueguês",
  "nno": "Norueguês nynorsk",
  "nob": "Norueguês bokmål",
  "nub": "Línguas núbias",
  "nwc": "Newari clássico",
  "nym": "Nyamwezi",
  "nyn": "Nyankole",
  "nyo": "Nyoro",
  "nzi": "Nzima",
  "oci": "Occitano",
  "oji": "Ojíbua",
  "ori": "Oriá",
  "orm": "Oromo",
  "osa": "Osage",
  "oss": "Ossético",
  "oto": "Línguas otomanas",
  "pag": "Pangasinan",
  "pal": "Páli",
  "pau": "Palauano",
  "pli": "Pali",
  "pam": "Pampango",
  "pan": "Panjabi",
  "pap": "Papiamento",
  "paa": "Línguas papuásias",
  "paa": "Línguas papuanas",
  "paa": "Línguas papuásias",
  "pau": "Palauano",
  "pal": "Páli",
  "pag": "Pangasinan",
  "oto": "Línguas otomanas",
  "oss": "Ossético",
  "osa": "Osage",
  "orm": "Oromo",
  "ori": "Oriá",
  "oji": "Ojíbua",
  "oci": "Occitano",
  "nzi": "Nzima",
  "nyo": "Nyoro",
  "nyn": "Nyankole",
  "nym": "Nyamwezi",
  "nwc": "Newari clássico",
  "nub": "Línguas núbias",
  "nno": "Norueguês nynorsk",
  "nob": "Norueguês bokmål",
  "nor": "Norueguês",
  "non": "Nórdico antigo",
  "niu": "Niueano",
  "ssa": "Línguas nilo-saarianas",
  "nic": "Línguas nígero-congolesas",
  "nia": "Nias",
  "new": "Newari",
  "nep": "Nepalês",
  "nap": "Napolitano",
  "ndo": "Ndonga",
  "nde": "Ndebele do Norte",
  "nbl": "Ndebele do Sul",
  "nav": "Navajo",
  "naur": "Nauruano",
  "nap": "Napolitano",
  "nah": "Náuatle",
  "nqo": "N'ko",
  "mun": "Línguas munda",
  "mul": "Múltiplos idiomas",
  "mos": "Mossi",
  "mon": "Mongol",
  "mol": "Moldávio",
  "mdf": "Moksha",
  "moh": "Mohawk",
  "mwl": "Mirandês",
  "mis": "Línguas diversas",
  "min": "Minangkabau",
  "mic": "Micmac",
  "men": "Mende",
  "myn": "Línguas maias",
  "mas": "Maa",
  "mwr": "Marwari",
  "mah": "Marshallês",
  "mri": "Maori",
  "mao": "Maori",
  "glv": "Manx",
  "mno": "Línguas manobo",
  "mni": "Manipuri",
  "man": "Mandinga",
  "mdr": "Mandar",
  "mnc": "Manchu",
  "mlt": "Maltês",
  "mal": "Malaiala",
  "mlg": "Malaiala",
  "mak": "Makasar",
  "mai": "Maithili",
  "mah": "Marshalês",
  "mag": "Magahi",
  "mad": "Madurês",
  "lav": "Letão",
  "lus": "Lushai",
  "luo": "Luo",
  "lun": "Lunda",
  "lui": "Luiseno",
  "lub": "Luba-katanga",
  "lua": "Luba-Lulua",
  "ltz": "Luxemburguês",
  "loz": "Lozi",
  "lol": "Mongo",
  "loh": "Loma",
  "nds": "Baixo-alemão",
  "nds": "Baixo-saxão",
  "jbo": "Lojban",
  "lit": "Lituano",
  "lin": "Lingala",
  "lim": "Limburguês",
  "lez": "Lezgiano",
  "lav": "Letão",
  "lah": "Lahnda",
  "lad": "Ladino",
  "kut": "Kutenai",
  "kur": "Curdo",
  "kum": "Kumyk",
  "kua": "Kuanyama",
  "kru": "Kurukh",
  "kro": "Kru",
  "kpe": "Kpelle",
  "kos": "Kosraean",
  "kok": "Konkani",
  "kon": "Concani",
  "kom": "Komi",
  "tlh": "Klingon",
  "kin": "Quiruanda",
  "kmb": "Quimbundo",
  "kik": "Kikuyu",
  "kho": "Khotanês",
  "khm": "Khmer",
  "khi": "Línguas khoisan",
  "kha": "Cassio",
  "kaz": "Cazaque",
  "kaw": "Kawi",
  "kat": "Katachán",
  "kat": "Georgiano",
  "kar": "Carataca",
  "krl": "Carélio",
  "krc": "Karachay-Balkar",
  "kaa": "Karakalpak",
  "kaa": "Caraicalaque",
  "kan": "Canarês",
  "kam": "Kamba",
  "kal": "Kalaallisut",
  "kac": "Kachin",
  "kab": "Kabyle",
  "kbd": "Kabardiano",
  "cup": "Cupeño",
  "cub": "Cubeo",
  "cus": "Línguas cusitas",
  "csb": "Cachubiano",
  "scr": "Croata",
  "crp": "Creoles and pidgins",
  "crh": "Turco da Crimeia",
  "cpp": "Crioulos e pidgins baseados no português",
  "cpf": "Crioulos e pidgins baseados no francês",
  "cpe": "Crioulos e pidgins baseados no inglês",
  "cil": "Cimbrian",
  "chk": "Chuukese",
  "chp": "Chipewyan",
  "chn": "Chinook Jargon",
  "cgg": "Chiga",
  "cic": "Chickasaw",
  "shn": "Shan",
  "chn": "Chinês",
  "chy": "Cheyenne",
  "chv": "Chuvash",
  "chk": "Chuukês",
  "chp": "Chipewyan",
  "chr": "Cherokee",
  "cho": "Choctaw",
  "deu": "Alemão",
  "eng": "Inglês",
  "fra": "Francês",
  "ita": "Italiano",
  "spa": "Espanhol",
  "por": "Português",
  "rus": "Russo",
  "cmn": "Mandarim",
  "hin": "Hindi",
  "ben": "Bengali",
  "jpn": "Japonês",
  "kor": "Coreano",
  "ind": "Indonésio",
  "tur": "Turco"
}

export const searchCountry = async (query) => {
  try {
    const response = await api.get(`/name/${query}`);
    return response.data.map(country => ({
      name: country.translations.por.common,
      officialName: country.translations.por.official,
      languages: Object.keys(country.languages).reduce((acc, lang) => {
        acc[lang] = languageTranslations[lang] || country.languages[lang];
        return acc;
      }, {}),
      cca3: country.cca3
    }));
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};

export const searchCountriesByLanguage = async (language) => {
  try {
    const response = await api.get(`/lang/${language}`);
    return response.data.map(country => ({
      name: country.translations.por.common,
      cca3: country.cca3
    }));
  } catch (error) {
    console.error("Error fetching countries by language:", error);
    return [];
  }
};
