/**
 * @fileoverview
 * This file, builds a product carousel component.
 * It fetches product data, caches it in localStorage, manages user favorites.
 */

/**
 * @property {string} API_URL - the url to fetch product data.
 * @property {string} LOCAL_STORAGE_KEY - the key used to store carousel data.
 */
const config = {
  API_URL:
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
  LOCAL_STORAGE_KEY: "carousel",
};

/**
 * @description provider for localStorage operations.
 */
const storageOperations = {
  /**
   * @description gets data from localStorage.
   * @param {string} key - the key to get data.
   * @returns {*} parsed value from localStorage or null.
   */
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  /**
   * @description saves data to localStorage.
   * @param {string} key - the key to save data.
   * @param {Object} value - the data to save.
   */
  save: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },
};

/**
 * @description provider for favorite operations.
 */
const favoritesOperations = {
  /**
   * @description gets list of product ids marked as favorites.
   * @returns {number[]} the list of product ids marked as favorites.
   */
  get: () => {
    try {
      return (
        storageOperations.get(`${config.LOCAL_STORAGE_KEY}:favorites`) || []
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /**
   * @description saves list of product ids as favorites.
   * @param {number[]} favorites - the list of product ids to save as favorites.
   */
  save: (favorites) => {
    try {
      storageOperations.save(
        `${config.LOCAL_STORAGE_KEY}:favorites`,
        favorites
      );
    } catch (error) {
      console.error(error);
    }
  },
};

/**
 * @description provider for product operations.
 */
const productOperations = {
  /**
   * @description gets products from the API and caches them in localStorage.
   * @returns {Promise<Object[]>} list of products.
   */
  fetchProducts: async () => {
    try {
      if (storageOperations.get(`${config.LOCAL_STORAGE_KEY}:products`)) {
        return storageOperations.get(`${config.LOCAL_STORAGE_KEY}:products`);
      }
      const response = await fetch(config.API_URL);
      const products = await response.json();
      storageOperations.save(`${config.LOCAL_STORAGE_KEY}:products`, products);
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /*const Product = {
  id: 1,
  brand: "HelloBaby",
  name: " Yenidoğan 6lı Ağız Mendili 24x24cm Unisex ",
  url: "https://www.e-bebek.com/hellobaby-yenidogan-6li-agiz-mendili-24x24cm-unisex-p-24ghlbumnd007001",
  img: "https://cdn05.e-bebek.com/mnresize/300/300/media/p/organik-6li-agiz-mendili-24x24-cm_8682766103779_01.jpg",
  price: 89.99,
  original_price: 89.99,
};
*/

  /**
   * @description builds an HTML card for a product.
   * @param {Object} product - product data.
   * @returns {string} HTML markup for the product card.
   */
  getProductCard: (product) => {
    const hasDiscount = product.original_price !== product.price;
    const discountRate = hasDiscount
      ? productOperations.calculateDiscount(
          product.price,
          product.original_price
        )
      : 0;
    const isFavorite = favoritesOperations.get().includes(product.id);
    return `
    <div class="owl-item ng-tns-c131-3 ng-trigger ng-trigger-autoHeight active ng-star-inserted responsive-carousel-item" style="margin-right: 20px;">
  <div class="ins-web-smart-recommender-box-item ng-star-inserted">
    <div event-collection="true" class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${product.id}">
      <eb-carousel-product-item>
        <div class="product-item">
          <eb-generic-link class="product-item-anchor" event-collection="true">
            <a class="product-item-anchor ng-star-inserted" href="${product.url}" target="_blank">
              <figure class="product-item__img without-ar ng-star-inserted">
                <div class="product-item__multiple-badge" style="z-index: 1;">
                  <span class="d-flex flex-column">
                    <img alt="Popular" loading="lazy" src="assets/images/cok-satan.png" srcset="assets/images/cok-satan@2x.png 2x, assets/images/cok-satan@3x.png 3x" class="ng-star-inserted">
                  </span>
                </div>
                <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                  <eb-new-product-badge class="mb-3"></eb-new-product-badge>
                </span>
                <cx-media alt="Popular" format="product" id="lnkProduct${product.id}" class="is-initialized">
                  <img class="ng-star-inserted ls-is-cached lazyloaded" alt="${product.name}"
                    data-src="${product.img}"
                    src="${product.img}"
                    draggable="false">
                </cx-media>
                
              </figure>
              <div class="product-item-content ng-star-inserted">
                <eb-generic-link class="product-item-anchor">
                  <a class="product-item-anchor ng-star-inserted" href="${product.url}" target="_blank">
                    <h2 class="product-item__brand ng-star-inserted">
                      <b>${product.brand} - </b>
                      <span>${product.name}</span>
                    </h2>
                    <div class="d-flex mb-2 stars-wrapper align-items-center ng-star-inserted">
                      <cx-star-rating disabled="true" style="--star-fill: 5;">
                        <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                        <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                        <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                        <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                        <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      </cx-star-rating>
                      <p class="review-count ng-star-inserted">(333)</p>
                    </div>
                  </a>
                </eb-generic-link>
                <div class="product-item__price">
                  ${
                    hasDiscount
                      ? `
                  <div class="d-flex align-items-center ng-star-inserted">
                  <span class="product-item__old-price ng-star-inserted">${product.original_price} TL</span>
                  <span class="product-item__percent carousel-product-price-percent ml-2 ng-star-inserted">%${discountRate} <i class="icon icon-decrease"></i></span>
                </div>
                <span class="product-item__new-price discount-product ng-star-inserted">${product.price} TL</span>
                `
                      : `
                  <div class="d-flex align-items-center ng-star-inserted"></div>
                  <span class="product-item__new-price ng-star-inserted">${product.price} TL</span>
                `
                  }
                </div>
                <div class="product-list-promo ng-star-inserted"></div>
              </div>
            </a>
          </eb-generic-link>
          <eb-add-to-wish-list>
            <div class="heart ng-star-inserted" data-product-id="${product.id}">
              ${
                isFavorite
                  ? `<img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
                     <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">`
                  : `<img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
                     <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">`
              }
            </div>
          </eb-add-to-wish-list>
          <div class="product-item-content">
            <div class="product-item__price">
              <div class="ins-add-to-cart-wrapper" ins-product-id="${product.id}">
                <eb-add-to-cart buttonclass="close-btn">
                  <form novalidate class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                    <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">
                      Sepete Ekle
                    </button>
                  </form>
                </eb-add-to-cart>
              </div>
            </div>
          </div>
        </div>
      </eb-carousel-product-item>
    </div>
  </div>
</div>
`;
  },

  /**
   * @description toggles the favorite status of a product.
   * @param {number} productId - product id to change favorite status.
   */
  handleFavorite: (productId) => {
    const favorites = favoritesOperations.get();
    const isInFavorites = favorites.includes(productId);

    const newFavorites = isInFavorites
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    favoritesOperations.save(newFavorites);
  },

  /**
   * @description calculates the discount percentage between original and sale price.
   * @param {number} price - sale price.
   * @param {number} original_price - original price.
   * @returns {number} discount percentage.
   */
  calculateDiscount: (price, original_price) => {
    return Math.round(((original_price - price) / original_price) * 100);
  },
};

/**
 * @description initializes and renders a product carousel.
 */
(() => {
  if (window.location.pathname !== "/") {
    console.log("Wrong Page");
    return;
  }

  /**
   * @description initializes the product carousel by fetching data and rendering UI components.
   */
  const init = async () => {
    const products = await productOperations.fetchProducts();
    buildHTML(products);
    buildCSS();
    initCarouselSlider();
    setFavoritesEvents();
  };

  setTimeout(() => {
    init();
  }, 1000);

  /**
   * @description builds the HTML markup for the product carousel.
   * @param {Object[]} products - the list of product data.
   * @returns {string} HTML markup for the product carousel.
   */
  const mainCarousel = (products) => {
    const carousel = `
    <eb-product-carousel class="recommended-products">
  <div class="banner">
    <div class="container">
      <eb-carousel-header class="ng-star-inserted">
        <div class="banner__titles">
          <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
        </div>
      </eb-carousel-header>
      <div
        ebvisibilityobserver=""
        class="banner__wrapper ins-preview-wrapper-10167 ng-star-inserted"
        >
        <div data-recomended-items="[BYT-S03,MOL-5064001,BAE-70089001,BAE-20030,BYP-SH860G001,BYT-1511,XYZ-M250DS,JOI-S1706DA001,BYP-MULT002,BYT-ST-004,24GHLBUBDY002003,HIP-4201,SIV-098808,BYP-244004,BYT-8625]">
        <owl-carousel-o
          class="product-list__best-products"
          _nghost-serverapp-c130=""
        >
          <div
            _ngcontent-serverapp-c130=""
            class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag"
          >
            <div
              _ngcontent-serverapp-c130=""
              class="owl-stage-outer ng-star-inserted"
            >
              <owl-stage
                _ngcontent-serverapp-c130=""
                class="ng-tns-c131-3 ng-star-inserted"
              >
                <div class="ng-tns-c131-3">
                  <div
                    class="owl-stage ng-tns-c131-3"
                    style="width: 4388px; transform: translate3d(0px, 0px, 0px); transition: all;"
                  >
                  ${products.map((product) => productOperations.getProductCard(product)).join("")}
                  </div>
                </div>
              </owl-stage>
            </div>
          </div>
        </owl-carousel-o>
        <button aria-label="back" class="swiper-prev"></button>
        <button aria-label="next" class="swiper-next"></button>
      </div>
      </div>
    </div>
  </div>
</eb-product-carousel>`;
    return carousel;
  };

  /**
   * @description renders the product carousel in the page layout.
   * @param {string} html - the HTML content for the product carousel.
   */
  const renderCarousel = (html) => {
    const pageLayout = document.querySelector(
      "cx-page-layout.EbebekHomepageTemplate"
    );

    let section1A = pageLayout.querySelector(
      'cx-page-slot[position="Section1A"]'
    );
    if (!section1A) {
      section1A = document.createElement("cx-page-slot");
      section1A.setAttribute("position", "Section1A");
      section1A.setAttribute("class", "Section1A has-components");
    }

    section1A.innerHTML = html;

    const section2A = document.querySelector(
      'cx-page-slot[position="Section2A"]'
    );

    if (section2A && !section1A.parentNode) {
      console.debug("Section2A found, inserting Section1A before it");
      section2A.parentNode.insertBefore(section1A, section2A);
    } else if (!section1A.parentNode) {
      console.debug("Section2A not found, appending Section1A to page layout");
      pageLayout.appendChild(section1A);
    }
  };

  /**
   * @description builds the HTML markup for the product carousel.
   * @param {Object[]} products - the list of product data.
   */
  const buildHTML = (products) => {
    const html = mainCarousel(products);
    renderCarousel(html);
  };

  /**
   * @description builds the CSS for the product carousel.
   */
  const buildCSS = () => {
    const css = `
      .recommended-products {
        margin-top: 20px;
      }   

      .container {
        position: relative;
      }

      .responsive-carousel-item {
        width: 225px;
      }

      @media (min-width: 580px) {
        .responsive-carousel-item {
          width: 225px;
        }
      }

      @media (min-width: 765px) {
        .responsive-carousel-item {
          width: 315px;
        }
      }

      @media (min-width: 990px) {
        .responsive-carousel-item {
          width: 283.333px;
        }
      }

      @media (min-width: 1280px) {
        .responsive-carousel-item {
          width: 262.5px;
        }
      }

      @media (min-width: 1480px) {
        .responsive-carousel-item {
          width: 229.2px;
        }
      }

      @media (min-width: 1580px) {
        .responsive-carousel-item {
          width: 234px;
        }
      }

      .swiper-prev,
      .swiper-next {
      background-color: #fff;
        border: 1px solid #f28e00;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        top: auto;
        cursor: pointer;
        pointer-events: auto;
        display: block !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }


      .swiper-prev:hover,
      .swiper-next:hover {
        background-color: #f5f5f5;
      }

      .owl-stage {
        transition: transform 0.3s ease;
        cursor: default;
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  };

  /**
   * @description initializes the carousel slider.
   */
  const initCarouselSlider = () => {
    const carouselContainer = document.querySelector(".owl-carousel");
    if (!carouselContainer) {
      return;
    }

    const carousel = carouselContainer.querySelector(".owl-stage");
    const carouselItems = carouselContainer.querySelectorAll(".owl-item");
    const prevButton = document.querySelector(".swiper-prev");
    const nextButton = document.querySelector(".swiper-next");

    const margin = 20;
    const itemWidth = carouselItems[0].offsetWidth + margin;
    const carouselContainerWidth = carouselContainer.offsetWidth;
    const visibleItemCount = Math.floor(carouselContainerWidth / itemWidth);
    const maxScroll = Math.max(0, carouselItems.length - visibleItemCount);

    let currentPosition = 0;

    // SWIPE
    const updateButtons = () => {
      prevButton.disabled = currentPosition <= 0;
      nextButton.disabled = currentPosition >= maxScroll;
    };

    const moveToPosition = (position) => {
      currentPosition = Math.max(0, Math.min(position, maxScroll));
      carousel.style.transition = "transform 0.3s ease";
      carousel.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
      updateButtons();
    };

    const goToNext = () => {
      if (currentPosition < maxScroll) {
        moveToPosition(currentPosition + 1);
      }
    };

    const goToPrevious = () => {
      if (currentPosition > 0) {
        moveToPosition(currentPosition - 1);
      }
    };

    prevButton.addEventListener("click", goToPrevious);
    nextButton.addEventListener("click", goToNext);

    updateButtons();

    // DRAG
    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;

    const mousedown = (e) => {
      e.preventDefault();
      isDragging = true;
      dragStartX = e.pageX;
      carousel.style.transition = "none";
      carousel.style.cursor = "grabbing";
    };

    const mousemove = (e) => {
      if (!isDragging) return;

      dragCurrentX = e.pageX;
      const dragOffset = dragCurrentX - dragStartX;
      const currentTransform = -(currentPosition * itemWidth);

      carousel.style.transform = `translateX(${currentTransform + dragOffset}px)`;
    };

    const mouseup = () => {
      if (!isDragging) return;

      isDragging = false;
      carousel.style.cursor = "grab";

      const dragDistance = dragCurrentX - dragStartX;
      const threshold = 50;

      if (dragDistance < -threshold && currentPosition < maxScroll) {
        moveToPosition(currentPosition + 1);
      } else if (dragDistance > threshold && currentPosition > 0) {
        moveToPosition(currentPosition - 1);
      } else {
        moveToPosition(currentPosition);
      }
    };

    carousel.addEventListener("mousedown", mousedown);
    carousel.addEventListener("mousemove", mousemove);
    carousel.addEventListener("mouseup", mouseup);
    carousel.addEventListener("mouseleave", mouseup);
  };

  /**
   * @description sets up click event listeners for favorite heart icons.
   */
  const setFavoritesEvents = () => {
    document.querySelectorAll(".heart").forEach((heart) => {
      heart.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productId = parseInt(heart.dataset.productId);
        let favorites = favoritesOperations.get();
        const isFavorite = favorites.includes(productId);

        if (isFavorite) {
          favorites = favorites.filter((id) => id !== productId);
          heart.innerHTML = `
            <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
            <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
          `;
        } else {
          favorites.push(productId);
          heart.innerHTML = `
            <img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
            <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">
          `;
        }
        favoritesOperations.save(favorites);
      });
    });
  };
})();
