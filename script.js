document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const backButton = document.getElementById('back-button');
    const resultsContainer = document.getElementById('results-container');
    let allCourses = [];

    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            allCourses = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    backButton.addEventListener('click', () => {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
        backButton.classList.add('hidden');
        searchInput.focus();
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;

        const result = allCourses.find(item => 
            item.technology.toLowerCase() === searchTerm
        );

        if (result) {
            displayResult(result);
            backButton.classList.remove('hidden');
        } else {
            resultsContainer.innerHTML = '<p>No results found. Please try another search term.</p>';
            backButton.classList.add('hidden');
        }
    }

    function displayResult(result) {
        const html = `
            <div class="result-item">
                <h2>${result.technology}</h2>
                <h3>Recommended Courses:</h3>
                <ul>
                    ${result.courses.map(course => `
                        <li>
                            <a href="${course.url}" target="_blank">${course.title}</a>
                            <span class="platform">(${course.platform})</span>
                        </li>
                    `).join('')}
                </ul>
                <h3>Recommended Books:</h3>
                <ul>
                    ${result.recommendedBooks.map(book => `<li>${book}</li>`).join('')}
                </ul>
                <h3>Top YouTube Channels:</h3>
                <ul>
                    ${result.youtubeChannels.map(channel => `
                        <li><a href="${channel.url}" target="_blank">${channel.name}</a></li>
                    `).join('')}
                </ul>
            </div>
        `;
        resultsContainer.innerHTML = html;
    }
});