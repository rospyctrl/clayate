document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { id: 1, src: "./assets/image1.jpeg" },
    { id: 2, src: "./assets/image2.jpeg" },
    { id: 3, src: "./assets/image3.jpeg" },
    { id: 4, src: "./assets/image4.jpeg" },
    { id: 5, src: "./assets/image5.jpeg" },
  ];

  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("modal");
  const status = document.getElementById("status");
  const spinner = document.getElementById("spinner");

  function cleanLocalStorage() {
    let selectedImages = JSON.parse(localStorage.getItem("selectedImages")) || [
      null,
      null,
      null,
    ];

    // Remove items with URLs starting with 'https://via.placeholder.com'
    selectedImages = selectedImages.filter(
      (image) =>
        image === null || !image.src.startsWith("https://via.placeholder.com")
    );

    // If the array length is less than 3, fill the rest with nulls
    while (selectedImages.length < 3) {
      selectedImages.push(null);
    }

    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
  }

  function updateUI() {
    const selectedImages = JSON.parse(
      localStorage.getItem("selectedImages")
    ) || [null, null, null];

    cards.forEach((card, index) => {
      const image = selectedImages[index];
      if (image) {
        card.innerHTML = `<img src="${image.src}" alt="Selected ${image.id}">`;
      } else {
        card.innerHTML = "<div>?</div>";
      }
    });

    const allSelected = selectedImages.every((image) => image !== null);
    if (allSelected) {
      status.textContent = "Congratulations, you have selected all images!";
      modal.classList.remove("hidden");
    } else {
      status.textContent = "Hey looks like you didn't select all the images.";
    }
  }

  function handleCardClick(event) {
    const card = event.currentTarget;
    const index = parseInt(card.getAttribute("data-index"));

    const selectedImages = JSON.parse(
      localStorage.getItem("selectedImages")
    ) || [null, null, null];

    if (selectedImages[index] !== null || !spinner.classList.contains("hidden"))
      return;

    spinner.classList.remove("hidden");

    setTimeout(() => {
      const availableImages = images.filter(
        (img) => !selectedImages.some((selected) => selected?.id === img.id)
      );
      if (availableImages.length === 0) {
        spinner.classList.add("hidden");
        return;
      }
      const randomImage =
        availableImages[Math.floor(Math.random() * availableImages.length)];
      selectedImages[index] = randomImage;
      localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
      updateUI();
      spinner.classList.add("hidden");
    }, 1000);
  }

  function handleModalClick() {
    modal.classList.add("hidden");
  }

  // Clean up local storage on page load
  cleanLocalStorage();

  cards.forEach((card) => card.addEventListener("click", handleCardClick));
  modal.addEventListener("click", handleModalClick);

  updateUI();
});
