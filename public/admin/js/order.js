//handle btn-change-status
const btnChangeStatus = document.querySelectorAll("[btn-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
if (btnChangeStatus && formChangeStatus) {
  const path = formChangeStatus.getAttribute("data-path");
  btnChangeStatus.forEach((itemBtn) => {
    itemBtn.addEventListener("click", () => {
      const id = itemBtn.getAttribute("data-id");
      const status = itemBtn.getAttribute("data-status");

      const convertStatus = status === "pending" ? "confirmed" : "pending";

      const actionPath = path + `/${convertStatus}/${id}?_method=PATCH`;
      formChangeStatus.action = actionPath;
      formChangeStatus.submit();
    });
  });
}

//handle change-status advance
const form = document.querySelector("#formChangeStatusDetail");
console.log(form);

if (form) {
  const statusSelect = form.querySelector(".form-select");
  form.addEventListener("submit", () => {
    const selectedStatus = statusSelect.value;
    const path = form.getAttribute("data-path");
    const orderId = form.getAttribute("data-id");

    form.action = `${path}/${selectedStatus}/${orderId}?_method=PATCH`;
  });
}
