// ===== Header search =====
const formSearch = document.querySelector("[form-search]");

if (formSearch) {
  const inputSearch = formSearch.querySelector("input");
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueSearch = inputSearch.value.trim();
    window.location.href = `/search?keyword=${valueSearch}`;
  });
}

//====== Page product -> detail / Add to cart && Buy ======
const btnAddCart = document.querySelector("[btn-add-cart]");
const formAddCart = document.querySelector("[form-add-buy]");

if (btnAddCart) {
  btnAddCart.addEventListener("click", (e) => {
    formAddCart.action = btnAddCart.getAttribute("path");
    formAddCart.submit();
  });
}

const btnBuy = document.querySelector("[btn-buy]");

if (btnBuy) {
  btnBuy.addEventListener("click", (e) => {
    formAddCart.action = btnBuy.getAttribute("path");
    formAddCart.submit();
  });
}

//====== Page Cart / handel update Quantity product in cart ====
function debounce(fn, delay = 500) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const updateQuantity = async (productId, quantity) => {
  try {
    await fetch(`/cart/update/${productId}/${quantity}`, {
      method: "PATCH",
    });
    window.location.reload();
  } catch (error) {
    console.error("Update cart failed", error);
  }
};

const debounceMap = {};

document.querySelectorAll(".quantity-control").forEach((control) => {
  const input = control.querySelector(".quantity-input");
  const btnPlus = control.querySelector(".btn-plus");
  const btnMinus = control.querySelector(".btn-minus");
  const productId = btnPlus.dataset.id;
  console.log(productId);

  // tạo debounce riêng cho từng product
  if (!debounceMap[productId]) {
    debounceMap[productId] = debounce(updateQuantity, 1500);
  }

  btnPlus.addEventListener("click", (e) => {
    // console.log(e);

    let value = Number(input.value);
    const max = Number(input.max);

    if (value < max) {
      value++;
      input.value = value;
      debounceMap[productId](productId, value);
    }
  });

  btnMinus.addEventListener("click", () => {
    let value = Number(input.value);
    const min = Number(input.min);

    if (value > min) {
      value--;
      input.value = value;
      debounceMap[productId](productId, value);
    }
  });
});
