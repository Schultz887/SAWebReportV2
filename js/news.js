document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '8708500be20e41d2a074a0f669e068fb';
    const endpoint = 'https://api.bing.microsoft.com/v7.0/news/search';
    const query = 'cybersecurity electric grid energy sector';
    const url = `${endpoint}?q=${encodeURIComponent(query)}&count=5&mkt=en-US&setLang=EN`;

    fetch(url, {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        if (data.value && data.value.length > 0) {
            data.value.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <h4>${article.name}</h4>
                    <SPAN STYLE="font-size:16px">${article.description}</span><br>
                    <a href="${article.url}" target="_blank">Read more</a><br><br>
                `;
                newsContainer.appendChild(articleElement);
            });
        } else {
            newsContainer.innerHTML = 'No news articles found.';
        }
    })
    .catch(error => {
        console.error('Error fetching news:', error);
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = 'Error loading news.';
    });
});