const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const resultDisplay = document.getElementById("result");

const units = {
  length: ["mm", "cm", "meter", "km", "mil", "fot"],
  weight: ["mg", "gram", "hg", "kg", "pund", "oz"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

const conversions = {
  length: {
   mm: 0.001, 
   cm: 0.01, 
   meter: 1,
   km: 1000,
   mil: 1609.344,
   fot: 0.3048
  },
  weight: {
   mg: 0.001, 
   gram: 1,
   hg: 100,
   kg: 1000,
   pund: 453.592,
   oz: 28.3495
  }
};

function populateUnitSelectors(category) {
  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";
  units[category].forEach(unit => {
   const option1 = document.createElement("option");
   option1.value = unit;
   option1.textContent = unit;

   const option2 = option1.cloneNode(true);

   fromUnitSelect.appendChild(option1);
   toUnitSelect.appendChild(option2);

// Lar siden starte med dei mest typiske enhetene istede for at begge selectorene starter med første verdien på listen 
   if (category === "temperature") {
      fromUnitSelect.value = "celsius";
      toUnitSelect.value = "fahrenheit";
     } else if (category === "length") {
      fromUnitSelect.value = "km";
      toUnitSelect.value = "meter";
     } else {
      fromUnitSelect.value = "kg";
      toUnitSelect.value = "gram";
     }
  });
}

function convert() {
  const category = categorySelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const value = parseFloat(inputValue.value);

  let result;

  if (category === "temperature") {
   result = convertTemperature(value, from, to);
  } else {
   const inBase = value * conversions[category][from];
   result = inBase / conversions[category][to];
  }

  //Bruker toFixed for å kunne sette ein max på siffer som kan vises, og bruker parseFloat for å bli kvitt unnødvendige "trailing zero's".
  resultDisplay.textContent = parseFloat(result);
}

function convertTemperature(value, from, to) {
  let tempInCelsius;

  if (from === "celsius") {
   tempInCelsius = value;
  } else if (from === "fahrenheit") {
   tempInCelsius = (value - 32) * 5 / 9;
  } else if (from === "kelvin") {
   tempInCelsius = value - 273.15;
  }
// innen "normal" fysikk kan ikkje temperaturer gå under 0 kelvin, så gjir tilbake NaN som ein slags feilmelding for det
  if (tempInCelsius < -273.15) return tempInCelsius = NaN
  if (to === "celsius") return tempInCelsius;
  if (to === "fahrenheit") return tempInCelsius * 9 / 5 + 32;
  if (to === "kelvin") return tempInCelsius + 273.15;
}

categorySelect.addEventListener("change", () => {
  populateUnitSelectors(categorySelect.value);
  convert();
});

inputValue.addEventListener("input", convert);
fromUnitSelect.addEventListener("change", convert);
toUnitSelect.addEventListener("change", convert);

// Initialize
populateUnitSelectors("length");
convert();