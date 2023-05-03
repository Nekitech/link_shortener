const links_list = document.querySelector('.links');
const btn = document.querySelector('.btn_submit')
const input = document.querySelector('input')

const api_url = 'http://fast-link.na4u.ru/'

const getLinks = async () => {
    return (await fetch(`${api_url}links`, {
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
    const valid_match = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);
    const link = input.value;
    if(link.length < 6) {
        alert('Ссылка слишком маленькая')
    }
    else if(!link.match(valid_match)) {
        alert('Ввод не соответствует формату ссылки!')
    }
    else {
        alert('Ссылка отправлена! Для получения укороченного варианта перезагрузите страницу!')
        await fetch(`${api_url}link`, {
            method: 'POST',
            body: JSON.stringify({
                link
            })
        });
    }
})


getLinks().then(res => {
    renderLinks(links_list, res)
})


