
// ========================================
// 적당히 마켓 상품 진열 및 카테고리 메뉴
// ========================================

const categoryList = document.getElementById("category-list");

if (typeof products === "undefined" || !Array.isArray(products)) {
  categoryList.textContent = "상품 정보를 불러오지 못했습니다.";
} else {

  // 카테고리 목록 만들기
  const categories = ["전체 상품", ...new Set(products.map(p => p.category))];

  // 쇼핑몰 레이아웃 생성
  categoryList.innerHTML = `
    <div class="shop-layout">

      <aside class="sidebar">
        <h3 class="sidebar-title">CATEGORY</h3>
        <nav class="category-menu" id="category-menu">
          ${categories.map((category, index) => `
            <button
              type="button"
              class="category-link ${index === 0 ? "active" : ""}"
              data-category="${category}"
            >
              <span>${category}</span>
              <span class="category-count">
                ${category === "전체 상품"
                  ? products.length
                  : products.filter(p => p.category === category).length}
              </span>
            </button>
          `).join("")}
        </nav>
      </aside>

      <main class="product-area">
        <div class="product-heading">
          <h2 id="selected-category">전체 상품</h2>
          <p id="product-count">${products.length}개의 상품</p>
        </div>

        <div class="product-list" id="product-list"></div>
      </main>

    </div>
  `;

  const productList = document.getElementById("product-list");
  const selectedCategory = document.getElementById("selected-category");
  const productCount = document.getElementById("product-count");
  const categoryButtons = document.querySelectorAll(".category-link");

  // 상품 카드 출력
  function showProducts(category) {

    const filteredProducts = category === "전체 상품"
      ? products
      : products.filter(p => p.category === category);

    selectedCategory.textContent = category;
    productCount.textContent = `${filteredProducts.length}개의 상품`;

    productList.innerHTML = filteredProducts.map(p => `
      <article class="product">

        <a href="product.html?id=${p.id}" class="product-link">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <h3 class="product-name">${p.name}</h3>
        </a>

        <p class="product-price">
          ${p.price.toLocaleString("ko-KR")}원
        </p>

        <button
          type="button"
          class="buy-btn"
          data-product-id="${p.id}"
        >
          장바구니 담기
        </button>

      </article>
    `).join("");

    // 장바구니 버튼 연결
    document.querySelectorAll(".buy-btn").forEach(button => {
      button.addEventListener("click", () => {

        const id = Number(button.dataset.productId);
        const product = products.find(p => p.id === id);

        if (!product) return;

        const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const existing = cart.find(item => item.id === id);

        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({
            id: product.id,
            quantity: 1
          });
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));

        alert(`${product.name} 1개를 장바구니에 담았습니다!`);
      });
    });
  }

  // 카테고리 클릭 이벤트
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

      categoryButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      showProducts(button.dataset.category);
    });
  });

  // 처음에는 전체 상품 표시
  showProducts("전체 상품");
}
