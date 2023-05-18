fetch('./Assets/json/dados.json')
  .then(response => response.json())
  .then(data => {
    const wallpapers = data.wallpapers;
    const shuffledWallpapers = wallpapers.sort(() => Math.random() - 0.5);
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.category-button');
    const resultsContainer = document.getElementById('results-container');
    const sectionTitle = document.getElementById('section-title'); // Adicionado

    let selectedCategory = null;

    function renderWallpapers(wallpapers) {
      resultsContainer.innerHTML = '';

      wallpapers.forEach(wallpaper => {
        if (!selectedCategory || wallpaper.category.toLowerCase() === selectedCategory) {
          const resultElement = document.createElement('div');
          resultElement.className = 'wallpaper-img';

          const imageElement = document.createElement('img');
          imageElement.src = wallpaper.image_url;
          imageElement.className = 'zoom-image';

          const titleElement = document.createElement('div');
          titleElement.className = 'wallpaper-title';
          titleElement.textContent = wallpaper.title;

          resultElement.appendChild(imageElement);
          resultElement.appendChild(titleElement);

          resultElement.addEventListener('click', function() {
            downloadWallpaper(wallpaper.image_url);
          });

          resultsContainer.appendChild(resultElement);
        }
      });
    }

    function downloadWallpaper(url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      link.click();
    }

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();

      const filteredWallpapers = wallpapers.filter(wallpaper => {
        const tags = wallpaper.tags.toLowerCase();
        return tags.includes(searchTerm);
      });

      renderWallpapers(filteredWallpapers);
    });

    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = button.dataset.category.toLowerCase();

        if (category === selectedCategory) {
          selectedCategory = null;
          button.classList.remove('active');
          document.title = 'Pins wall';
        } else {
          selectedCategory = category;
          button.classList.add('active');
          document.title = 'Pins wall - ' + category; 
        }

        sectionTitle.textContent = category.toUpperCase(); 

        renderWallpapers(wallpapers);
      });
    });

    renderWallpapers(wallpapers);
  })
  .catch(error => {
    console.error('Erro ao carregar o arquivo JSON:', error);
  });
