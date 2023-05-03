const links_list = document.querySelector('.links');
const btn = document.querySelector('.btn_submit')
const input = document.querySelector('input')

const api_url = 'https://fast-link.na4u.ru/'

const getLinks = async () => {
    return (await fetch(`${api_url}links`, {
        method: 'GET'
    })).json();
}

const validation = (value) => {
    const valid_match = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);

    if(value.length < 6) {
        alert('Ссылка слишком маленькая')
        return false
    }
    else if(!value.match(valid_match)) {
        alert('Ввод не соответствует формату ссылки!')
        return false
    }
    else {
        alert('Ссылка отправлена! Для получения укороченного варианта перезагрузите страницу!')
        return true
    }
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

    if(validation(link)) {
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


