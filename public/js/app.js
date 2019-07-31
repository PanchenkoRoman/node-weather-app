const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const content = document.querySelector('#content')

async function getData() {
    let response = '';
    try{
        response = await fetch(`/weather?adress=${search.value}`);
    } catch(e) {
        console.log(e)
    }
    const data = await response.json();

    return data;
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getData().then(data => content.innerHTML = `<p>${data.forecast}</p>`);
})