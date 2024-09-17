const form = document.getElementById('form');
const url = " https://v6.exchangerate-api.com/v6/39006265cb1ce51335d8eb73/pair"

form.addEventListener('submit', submitForm);

async function submitForm(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { amount, from, to } = Object.fromEntries(formData.entries())
  console.log(amount, from, to);
  
  if (from === to) {
    alert('Please select different currencies');
  }

  if (amount === '' || amount === 0) {
    alert('Please enter a valid amount');
  }

  try {
    const response = await fetch(`${url}/${from}/${to}`)
    
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const { conversion_rate } = await response.json();
    const result = amount * conversion_rate;

    console.log(result);
    
  } catch (error) {
    return new Error(error);
  }

}