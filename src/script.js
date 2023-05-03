const form = document.querySelector('.form')
const app = document.querySelector('.app')
const links_list = document.querySelector('.links');
const btn = document.querySelector('.btn_submit')
const input = document.querySelector('input')

const getLinks = async () => {
    return (await fetch('http://localhost:3000/links', {
        method: 'GET'
    })).json();
}

const renderLinks = (el, links) => {
    for (let link of links) {
        const original_link = document.createElement("p");
        const sort_link = document.createElement("a");
        original_link.classList.add('link')
        original_link.innerText = link.url + ' : short_link - ';

        sort_link.innerText = link?.short_url;
        sort_link.setAttribute('href', link?.short_url)
        el.append(original_link);
        original_link.append(sort_link)
    }
}


btn.addEventListener('click', async () => {
    const link = input.value;
    await fetch('http://localhost:3000/link', {
        method: 'POST',
        body: JSON.stringify({
            link
        })
    })
})


getLinks().then(res => {
    renderLinks(links_list, res)
})


