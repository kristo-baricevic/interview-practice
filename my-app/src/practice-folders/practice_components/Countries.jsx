//https://restcountries.com/v3.1/all
import React, { useState, useEffect } from "react";

// [{
//   "name": {
//       "common": "Uzbekistan",
//       "official": "Republic of Uzbekistan",
//       "nativeName": {
//           "rus": {
//               "official": "Республика Узбекистан",
//               "common": "Узбекистан"
//           },
//           "uzb": {
//               "official": "O'zbekiston Respublikasi",
//               "common": "O‘zbekiston"
//           }
//       }
//   }
// }],

export function CountriesTable() {
  const [countries, setCountries] = useState([]);

  const flattenObject = (value) => {
    const out = {};

    function walk(v, path) {
      if (Array.isArray(v)) {
        v.forEach((item, i) => {
          walk(item, path ? `${path}.${i}` : String(i));
        });
        return;
      }

      if (v !== null && typeof v === "object") {
        for (const key of Object.keys(v)) {
          walk(v[key], path ? `${path}.${key}` : key);
        }
        return;
      }

      out[path] = v;
    }

    walk(value, "");
    return out;
  };

  
  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all?fields=name";

    const fetchData = async () => {
      const data = await fetch(url);
      const parsedData = await data.json();
      setCountries(parsedData)
    };

    fetchData();
  }, []);

  const rows = countries.map((c) => flattenObject(c));


  return (
    <>
      <h1>Countries</h1>
      {rows.map((row, idx) => (<div key={idx}>
        {row["name.common"]}
      </div>))}
    </>
  );
}
