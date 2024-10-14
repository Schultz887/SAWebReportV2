const apiKey = 'AIzaSyDTKbLkOcVxYo_-WvVMPs5dSgdMmC8In8U'; // Replace with your actual API key
const searchEngineId = '11915aebd98854ad8'; // Replace with your actual Search Engine ID
const query = 'cybersecurity OR "cyber security" OR "cybersecurity energy sector"';
const numResults = 5; // Number of news items to retrieve

async function fetchNews() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=${numResults}&dateRestrict=d7`
        );
        const data = await response.json();
        displayNews(data.items);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}



function displayNews(newsItems) {
    const newsContainer = document.getElementById('news');
    newsItems.forEach(item => {
        const newsDiv = document.createElement('div');
        newsDiv.className = 'news-item';
        newsDiv.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
        `;
        newsContainer.appendChild(newsDiv);
    });
}

// Fetch news when the page loads
window.onload = fetchNews;
