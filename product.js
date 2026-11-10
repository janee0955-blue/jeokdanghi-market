
// ========================================
// 적당히 마켓 상품 상세페이지
// ========================================

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);

const detail = document.getElementById("detail");
const notFound = document.getElementById("not-found");

if (!product) {
  detail.hidden = true;
  notFound.hidden = false;
} else {
  document.title = `${product.name} - 적당히 마켓`;

  // 상품 정보 표시
  const image = document.getElementById("p-image");
  image.src = product.image;
  image.alt = product.name;

  document.getElementById("p-category").textContent = product.category;
  document.getElementById("p-name").textContent = product.name;

  document.getElementById("p-price").textContent =
    product.price.toLocaleString("ko-KR") + "원";

  document.getElementById("p-desc").textContent = product.description;

  // 수량 및 합계
  let quantity = 1;

  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");

  function updateTotal() {
    countEl.textContent = quantity;
    totalEl.textContent =
      (product.price * quantity).toLocaleString("ko-KR") + "원";
  }

  document.getElementById("minus").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateTotal();
    }
  });

  document.getElementById("plus").addEventListener("click", () => {
    quantity++;
    updateTotal();
  });

  // 장바구니 저장
  document.getElementById("cart-btn").addEventListener("click", () => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        quantity: quantity
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} ${quantity}개를 장바구니에 담았습니다!`);
  });

  updateTotal();
}
