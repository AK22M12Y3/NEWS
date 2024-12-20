const apiKey = '4a479f0c46ad4af5a7a6af94f8c4d1d1'; // Replace with your NewsAPI key
const newsSection = document.getElementById('news-section');

// Fetch news from NewsAPI
async function fetchNews() {
  try {
    // Fetch news from all over the world, without limiting to the US
    const response = await fetch(`https://newsapi.org/v2/everything?q=water OR river OR ocean OR Aquifer OR Aquatic OR Dehydration OR Desalination OR Drought OR Evaporation OR Filtration OR Flood OR Groundwater OR Hydrology OR Irrigation OR Moisture OR Precipitation OR Purification OR Rainwater OR Reservoir OR Salinity OR Watershed OR Wetland&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.articles) {
      // Filter articles to include only those related to water
      const waterRelatedArticles = data.articles.filter(article =>
        (article.title && article.title.toLowerCase().includes('water')) ||
        (article.description && article.description.toLowerCase().includes('water'))
      );
      if (waterRelatedArticles.length > 0) {
        displayNews(waterRelatedArticles);
      } else {
        newsSection.innerHTML = '<p>No water-related news articles available at the moment.</p>';
      }
    } else {
      newsSection.innerHTML = '<p>No news articles available at the moment.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsSection.innerHTML = '<p>Failed to load news. Please try again later.</p>';
  }
}

// Display news articles in the section
function displayNews(articles) {
  newsSection.innerHTML = articles
    .map(article => `
      <div class="news-item">
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="${article.title}">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `)
    .join('');
}

// Load news on page load
fetchNews();