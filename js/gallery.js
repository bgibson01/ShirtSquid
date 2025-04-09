document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector("#gallery .row");
  const modalContainer = document.querySelector("body");

  if (!galleryContainer) {
    console.error("Gallery container not found!");
    return;
  }

  console.log("Gallery container found. Rendering items...");

  galleryData.forEach((item) => {
    console.log(`Processing item: ${item.src}`);

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
    console.log(`Gallery item added: ${item.src}`);

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
    console.log(`Modal added for item: ${item.src}`);
  });
});