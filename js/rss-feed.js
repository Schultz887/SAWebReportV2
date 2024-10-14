// URL of the RSS feed converted to JSON using RSS2JSON
const rssToJsonUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews'; // Update with your desired RSS feed URL

// Function to fetch and display the latest 5 RSS feed items
async function loadRssFeed() {
    try {
        const response = await fetch(rssToJsonUrl);
        const data = await response.json();
        const feedContainer = document.getElementById('rss-feed-container');

        // Check if the RSS feed is valid and contains items
        if (data.items && data.items.length > 0) {
            // Display the latest 5 items
            for (let i = 0; i < Math.min(4, data.items.length); i++) {
                const item = data.items[i];
                const title = item.title;
                const link = item.link;
                const description = item.description;

                // Create an HTML structure for each feed item
                const feedItem = document.createElement('div');
                feedItem.className = 'feed-item';
                feedItem.innerHTML = `
                    <h4><a href="${link}" target="_blank">${title}</a></h4>
                  ${description}  <br><br>
                `;
                feedContainer.appendChild(feedItem);
            }
        } else {
            feedContainer.innerHTML = '<p>No news items found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
        document.getElementById('rss-feed-container').innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

// Load the RSS feed when the page loads
window.addEventListener('DOMContentLoaded', loadRssFeed);
