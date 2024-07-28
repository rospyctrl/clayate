document.addEventListener('DOMContentLoaded', () => {
    const images = [
      { id: 1, src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image1' },
      { id: 2, src: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Image2' },
      { id: 3, src: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image3' },
      { id: 4, src: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Image4' },
      { id: 5, src: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Image5' }
    ];
  
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('modal');
    const status = document.getElementById('status');
    const spinner = document.getElementById('spinner');
  
    let selectedImages = JSON.parse(localStorage.getItem('selectedImages')) || [null, null, null];
  
    function updateUI() {
      cards.forEach((card, index) => {
        const image = selectedImages[index];
        if (image) {
          card.innerHTML = `<img src="${image.src}" alt="Selected ${image.id}">`;
        } else {
          card.innerHTML = '<div>?</div>';
        }
      });
  
      const allSelected = selectedImages.every(image => image !== null);
      if (allSelected) {
        status.textContent = "Congratulations, you have selected all images!";
        modal.classList.remove('hidden');
      } else {
        status.textContent = "Hey looks like you didn't select all the images.";
      }
    }
  
    function handleCardClick(event) {
      const card = event.currentTarget;
      const index = parseInt(card.getAttribute('data-index'));
  
      if (selectedImages[index] !== null || !spinner.classList.contains('hidden')) return;
  
      spinner.classList.remove('hidden');
  
      setTimeout(() => {
        const availableImages = images.filter(img => !selectedImages.some(selected => selected?.id === img.id));
        if (availableImages.length === 0) {
          spinner.classList.add('hidden');
          return;
        }
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        selectedImages[index] = randomImage;
        localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
        updateUI();
        spinner.classList.add('hidden');
      }, 1000);
    }
  
    function handleModalClick() {
      modal.classList.add('hidden');
    }
  
    cards.forEach(card => card.addEventListener('click', handleCardClick));
    modal.addEventListener('click', handleModalClick);
  
    updateUI();
  });
  