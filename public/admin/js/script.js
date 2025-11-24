//handle filterStatus
const filterStatus = document.querySelectorAll("[btn-status]");
if (filterStatus) {
  filterStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("btn-status");
      const url = new URL(window.location.href);
      url.searchParams.delete("page");
      if (status) url.searchParams.set("status", status);
      else url.searchParams.delete("status");
      window.location.href = url.href;
    });
  });
}

//handle search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);

    const keyword = e.target.elements.keyword.value;
    console.log(keyword);

    url.searchParams.delete("page");
    if (keyword) url.searchParams.set("keyword", keyword.trim());
    else url.searchParams.delete("keyword");

    window.location.href = url.href;
  });
}

//handle pagination
const pagination = document.querySelectorAll("[btn-page]");
if (pagination) {
  pagination.forEach((item) => {
    item.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const page = item.getAttribute("btn-page");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

//handle check all (no request URL)
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const checkAll = checkboxMulti.querySelector(
    "input[name='check-change-all']"
  );
  const check = checkboxMulti.querySelectorAll("input[name='check-change']");
  if (checkAll) {
    checkAll.addEventListener("click", () => {
      if (checkAll.checked) {
        check.forEach((itemCheck) => {
          itemCheck.checked = true;
        });
      } else {
        check.forEach((itemCheck) => {
          itemCheck.checked = false;
        });
      }
    });
  }

  if (check) {
    check.forEach((itemCheck) => {
      itemCheck.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll(
          "input[name='check-change']:checked"
        ).length;

        if (countChecked === check.length) {
          checkAll.checked = true;
        } else checkAll.checked = false;
      });
    });
  }
}

//handle form change multi status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const boxChecked = checkboxMulti.querySelectorAll(
      "input[name='check-change']:checked"
    );
    let listId = [];
    boxChecked.forEach((itemCheck) => {
      listId.push(itemCheck.value);
    });
    const input = formChangeMulti.querySelector("input[type='text']");
    console.log(listId.join(", "));

    if (boxChecked.length > 0) {
      input.value = listId.join(", ");
      formChangeMulti.submit();
    } else alert("vui check vao box!");
  });
}
