const form = document.getElementById('form');
const amountInput = document.getElementById('amount');
const resultatDiv = document.getElementById('resultat'); 
const url = " https://v6.exchangerate-api.com/v6/39006265cb1ce51335d8eb73/pair" 
const selects = document.querySelectorAll('select');
const switchButton = document.getElementById('switch');

const devises = {
  "usd": {
    "name": "United States Dollar",
    "symbol": "$"
  },
  "eur": {
    "name": "Euro",
    "symbol": "€"
  },
  "jpy": {
    "name": "Japanese Yen",
    "symbol": "¥"
  }
}

// ------- EVENTS ------- //
amountInput.addEventListener('input', () => submitForm());

selects.forEach(select => {
  select.addEventListener('change', () => submitForm());
})

switchButton.addEventListener('click', () => switchDevises());

// ------- FUNCTIONS ------- //
async function submitForm() {
  const formData = new FormData(form);
  const { amount, from, to } = Object.fromEntries(formData.entries())

  if (Number(amount) === 0 || amount === "") {
    resultatDiv.textContent = "";
    document.getElementById("error").textContent = "Please enter a valid amount";
    return;
  }

  document.getElementById("error").textContent = "";

  try {
    const response = await fetch(`${url}/${from}/${to}`)
    
    if (!response.ok) {
      resultatDiv.textContent = "";
      document.getElementById("error").textContent = "Something went wrong";
      return;      
    }

    const { conversion_rate } = await response.json();
    const result = amount * conversion_rate;

    resultatDiv.textContent = `${amount} ${devises[from].symbol} = ${result} ${devises[to].symbol}`;
    
  } catch (error) {
    resultatDiv.textContent = "";
    document.getElementById("error").textContent = "Something went wrong";
    return;
  }
}

function switchDevises() {
  const formData = new FormData(form);
  const { from, to } = Object.fromEntries(formData.entries())

  form.querySelector('select[name="from"]').value = to;
  form.querySelector('select[name="to"]').value = from;

  submitForm();
}
