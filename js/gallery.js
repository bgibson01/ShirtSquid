document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector("#gallery .row");
  const modalContainer = document.querySelector("body");
  const itemsPerPage = 12;
  let currentPage = 1;

  if (!galleryContainer) {
    console.error("Gallery container not found!");
    return;
  }

  console.log("Waiting for gallery data...");

  // Wait for the gallery data to be fetched
  fetchGalleryData
    .then(() => {
      console.log("Gallery data ready. Rendering items...");
      renderPage(currentPage);

      // Add navigation arrows
      addPaginationControls();
    })
    .catch((error) => {
      console.error("Failed to render gallery:", error);
    });

  // Function to render a specific page
  function renderPage(page) {
    galleryContainer.innerHTML = ""; // Clear the gallery
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = galleryData.slice(startIndex, endIndex);

    pageItems.forEach((item) => {
      // Add gallery item
      const galleryItem = `
        <div class="col-sm-4 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${item.id}">
            <div class="caption">
              <div class="caption-content">
                <i class="fa fa-search-plus fa-3x"></i>
              </div>
            </div>
            <img alt="${item.caption}" class="img-responsive" src="${item.src}">
          </a>
        </div>
      `;
      galleryContainer.insertAdjacentHTML("beforeend", galleryItem);

      // Add modal
      const modalItem = `
        <div aria-hidden="true" class="portfolio-modal modal fade" id="portfolioModal${item.id}" role="dialog" tabindex="-1">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                  <div class="modal-body">
                    <h2>Shirt Squid</h2>
                    <hr class="star-primary">
                    <img alt="${item.caption}" class="img-responsive img-centered" src="${item.src}">
                    <p>${item.caption}</p>
                    <button class="btn btn-default" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i> Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      modalContainer.insertAdjacentHTML("beforeend", modalItem);
    });
  }

  // Function to add pagination controls
  function addPaginationControls() {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-controls text-center";
    paginationContainer.innerHTML = `
      <button id="prevPage" class="btn btn-primary">&laquo; Previous</button>
      <button id="nextPage" class="btn btn-primary">Next &raquo;</button>
    `;
    galleryContainer.parentElement.appendChild(paginationContainer);

    // Add event listeners for navigation buttons
    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      if (currentPage < Math.ceil(galleryData.length / itemsPerPage)) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }
});