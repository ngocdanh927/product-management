//handle btn-change-status
const btnChangeStatus = document.querySelectorAll("[btn-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
if (btnChangeStatus) {
  const path = formChangeStatus.getAttribute("data-path");
  btnChangeStatus.forEach((itemBtn) => {
    itemBtn.addEventListener("click", () => {
      const id = itemBtn.getAttribute("data-id");
      const status = itemBtn.getAttribute("data-status");
      const convertStatus = status === "In Stock" ? "Low Stock" : "In Stock";

      const actionPath = path + `/${convertStatus}/${id}?_method=PATCH`;
      console.log(actionPath);
      formChangeStatus.action = actionPath;
      formChangeStatus.submit();
    });
  });
}
//handle delete
const btnDelete = document.querySelectorAll("[btn-delete]");
const formDelete = document.querySelector("#form-delete");

if (formDelete && btnDelete) {
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("xac nhan xoa san pham!")) {
        const id = btn.getAttribute("data-id");
        const path = formDelete.getAttribute("data-path");
        formDelete.action = path + `/${id}?_method=DELETE`;
        formDelete.submit();
      }
    });
  });
}
