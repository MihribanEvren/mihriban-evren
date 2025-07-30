const config = {
  API_URL:
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
  LOCAL_STORAGE_KEY: "carousel-favorites",
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const addLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFavorites = () => {
  return getLocalStorage(config.LOCAL_STORAGE_KEY);
};

const addFavorites = (favorites) => {
  addLocalStorage(config.LOCAL_STORAGE_KEY, favorites);
};

const productOperations = {
  fetchProducts: async () => {
    if (addFavorites()) {
      return addFavorites();
    }
    try {
      const response = await fetch(config.API_URL);
      const products = await response.json();
      addFavorites(products);
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

  getProductCard: (product) => {
    const hasDiscount = product.original_price !== product.price;
    const discountRate = hasDiscount
      ? productOperations.calculateDiscount(
          product.price,
          product.original_price
        )
      : 0;
    return `
    <div class="owl-item ng-tns-c131-3 ng-trigger ng-trigger-autoHeight active ng-star-inserted" style="width: 272.5px; margin-right: 20px;">
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
                    <img alt="Popular" loading="lazy" src="assets/images/yildiz-urun.png" srcset="assets/images/yildiz-urun@2x.png 2x, assets/images/yildiz-urun@3x.png 3x" class="ng-star-inserted">
                  </span>
                </div>
                <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                  <eb-new-product-badge class="mb-3"></eb-new-product-badge>
                </span>
                <cx-media alt="Popular" format="product" id="lnkProduct${product.id}" class="is-initialized">
                  <img class="ng-star-inserted ls-is-cached lazyloaded" alt="${product.name}"
                    data-src="${product.img}"
                    src="${product.img}">
                </cx-media>
                <div class="d-flex ml-4">
                  <div class="product__video-badge ng-star-inserted">
                    <img loading="lazy" src="assets/svg/play-badge.svg" alt="" class="mr-1">
                    <span>VİDEO</span>
                  </div>
                  <div class="product__ar-badge ng-star-inserted">
                    <img loading="lazy" src="assets/svg/ar-icon-white.svg" alt="" class="mr-1">
                    <span>AR</span>
                  </div>
                </div>
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
              </div>
            </a>
          </eb-generic-link>
          <eb-add-to-wish-list>
            <a href="/login" class="ng-star-inserted">
              <div class="heart">
                <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
                <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
              </div>
            </a>
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

  handleFavorite: (productId) => {
    const favorites = getFavorites();
    const isInFavorites = favorites.includes(productId);

    const newFavorites = isInFavorites
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    addFavorites(newFavorites);
  },

  calculateDiscount: (price, original_price) => {
    return Math.round(((original_price - price) / original_price) * 100);
  },
};

(() => {
  if (window.location.pathname !== "/") {
    console.log("Wrong Page");
    return;
  }

  const init = async () => {
    const products = await productOperations.fetchProducts();
    buildHtml(products);
  };

  init();

  const mainCarousel = (products) => {
    const carousel = `<eb-product-carousel>
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
      ></div>
      <div data-recomended-items="[BYP-SH860G001,BAE-70089001,BAE-20030,MT-BB100,XYZ-250DR1B,BAMM-1409,VAR-BIB-698-93-94,24GHLBUMND007001,BAE-70090001,BRM-7556,BYP-9897,CH-C01E,CRCL116,BYT-1511,PAV-SCY90001]">
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
                  BURAYA CAROUSEL ITEMLARI GELECEK
                  </div>
                </div>
              </owl-stage>
            </div>
            <div
              _ngcontent-serverapp-c130=""
              class="owl-nav disabled ng-star-inserted"
            >
              <div _ngcontent-serverapp-c130="" class="owl-prev">
                <i class="icon icon-prev"></i>
              </div>
              <div _ngcontent-serverapp-c130="" class="owl-next">
                <i class="icon icon-next"></i>
              </div>
            </div>
            <div
              _ngcontent-serverapp-c130=""
              class="owl-dots disabled ng-star-inserted"
            ></div>
          </div>
        </owl-carousel-o>
        <button aria-label="back" class="swiper-prev"></button>
        <button aria-label="next" class="swiper-next"></button>
      </div>
    </div>
  </div>
</eb-product-carousel>`;
    return carousel;
  };
})();
