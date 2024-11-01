let next_btn = document.querySelector(".next_btn");
let errors_name = document.querySelector(".errors_name");
let errors_email = document.querySelector(".errors_email");
let errors_phone = document.querySelector(".errors_phone");
let name_input = document.getElementById("name_input");
let email_input = document.getElementById("email_input");
let phone_input = document.getElementById("phone_input");
let formule_container_1 = document.querySelector(".formule_container-1");
let formule_container_2 = document.querySelector(".formule_container-2");
let formule_container_3 = document.querySelector(".formule_container-3");
let formule_container_4 = document.querySelector(".formule_container-4");
let only_step = document.querySelectorAll(".only_step");
let price_1 = document.getElementById("price_1");
let price_2 = document.getElementById("price_2");
let price_3 = document.getElementById("price_3");
let price_month_1 = document.querySelector(".price_month_1");
let price_month_2 = document.querySelector(".price_month_2");
let price_month_3 = document.querySelector(".price_month_3");
let errors_service = document.querySelector(".errors-service");
let errors_selecter = document.querySelector(".errors_selecter");
let value_step = 0;
let value_seasone = "monthly";
let value_choice = "Basic"; // Default value if needed
let value_choice_price = "$9/mo"; // Default value if needed

// Regular expressions for validation
const namePattern = /^[a-zA-Z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
let totale_value = [];

// Handle 'Next' button click for the first form
next_btn.addEventListener("click", () => {
  errors_name.innerHTML = "";
  errors_email.innerHTML = "";
  errors_phone.innerHTML = "";

  if (!namePattern.test(name_input.value)) {
    errors_name.innerHTML = "Please enter a valid name";
  } else if (!emailPattern.test(email_input.value)) {
    errors_email.innerHTML = "Please enter a valid email address";
  } else if (!phonePattern.test(phone_input.value)) {
    errors_phone.innerHTML = "Please enter a valid phone number";
  } else {
    formule_container_1.style.display = "none";
    formule_container_2.style.display = "flex";
    value_step++;
    updateSteps();
  }
});

// Update step indicators
const updateSteps = () => {
  only_step.forEach((step, index) => {
    step.querySelector("h1").classList.toggle("Active", index <= value_step);
  });
};

// Plan selection functionality
let select_container = document.querySelectorAll(".only_container");
select_container.forEach((item) => {
  item.addEventListener("click", () => {
    select_container.forEach((el) => el.classList.remove("select_active"));
    item.classList.add("select_active");
    value_choice = item.querySelector("h2").textContent;
    value_choice_price = item.querySelector("p").textContent;
  });
});

let check_btn = document.querySelector(".check_btn");
check_btn.addEventListener("change", () => {
  if (check_btn.checked) {
    price_1.innerHTML = "$90/Yr";
    price_1.dataset.value = 90;
    price_2.innerHTML = "$120/Yr";
    price_2.dataset.value = 120;
    price_3.innerHTML = "$150/Yr";
    price_3.dataset.value = 150;
    price_month_1.innerHTML = "$10/Yr";
    price_month_1.dataset.value = 10;
    price_month_2.innerHTML = "$20/Yr";
    price_month_2.dataset.value = 20;
    price_month_3.innerHTML = "$20/Yr";
    price_month_3.dataset.value = 20;
    value_seasone = "yearly";
  } else {
    price_1.innerHTML = "$9/mo";
    price_1.dataset.value = 9;
    price_2.innerHTML = "$12/mo";
    price_2.dataset.value = 12;
    price_3.innerHTML = "$15/mo";
    price_3.dataset.value = 15;
    price_month_1.innerHTML = "$1/mo";
    price_month_1.dataset.value = 1;
    price_month_2.innerHTML = "$2/mo";
    price_month_2.dataset.value = 2;
    price_month_3.innerHTML = "$2/mo";
    price_month_3.dataset.value = 2;
    value_seasone = "monthly";
  }
});

// Navigation buttons
document.querySelector(".go_back_btn").addEventListener("click", () => {
  formule_container_2.style.display = "none";
  formule_container_1.style.display = "flex";
  value_step--;
  updateSteps();
});

document.querySelector(".next_step_2").addEventListener("click", () => {
  let selectedPlan = document.querySelector(".select_active");
  if (selectedPlan) {
    formule_container_2.style.display = "none";
    formule_container_3.style.display = "flex";
    errors_selecter.textContent = "";
    totale_value.push(Number(selectedPlan.querySelector("p").dataset.value));
    console.log(totale_value);

    value_step++;
    updateSteps();
  } else {
    errors_selecter.textContent = "Please select an option";
  }
});

// Add-ons selection
let check_input = document.querySelectorAll(".check_input");
check_input.forEach((item) => {
  item.addEventListener("change", () => {
    item.closest(".only_service").classList.toggle("active_select_service");
  });
});

let only_service = document.querySelectorAll(".only_service");
let next_btn_3 = document.querySelector(".next_btn_3");
let go_back_btn_2 = document.querySelector(".go_back_btn_2");
go_back_btn_2.addEventListener("click", () => {
  formule_container_3.style.display = "none";
  formule_container_2.style.display = "flex";
  value_step--;
  updateSteps();
});

let value_text_service = [];
let value_price_service = [];
next_btn_3.addEventListener("click", () => {
  let isServiceSelected = Array.from(only_service).some((item) =>
    item.classList.contains("active_select_service")
  );
  if (isServiceSelected) {
    formule_container_3.style.display = "none";
    formule_container_4.style.display = "flex";
    errors_service.innerHTML = "";
    value_text_service = [];
    value_price_service = [];
    only_service.forEach((item) => {
      if (item.classList.contains("active_select_service")) {
        value_text_service.push(item.querySelector("h2").textContent);
        value_price_service.push(
          item.querySelector(".price_service").textContent
        );
        totale_value.push(
          Number(item.querySelector(".price_service").dataset.value)
        );
        console.log(totale_value);
      }
    });
    creatresult();
    value_step++;
    updateSteps();
  } else {
    errors_service.innerHTML = "Please select at least one service";
  }
});

let back_of_result_btn = document.querySelector(".back_of_result_btn");
back_of_result_btn.addEventListener("click", () => {
  formule_container_4.style.display = "none";
  formule_container_3.style.display = "flex";
  value_step--;
  updateSteps();
});

let result_container = document.querySelector(".result_container");
const creatresult = () => {
  result_container.innerHTML = "";

  // Plan result display
  let plan_result = document.createElement("div");
  plan_result.classList.add("plan_result");
  plan_result.innerHTML = `
      <div class="text_result">
        <h2>${value_choice} (${value_seasone})</h2>
        <h5>Change</h5>
      </div>
      <div class="result_number">${value_choice_price}</div>
    `;
  result_container.appendChild(plan_result);

  // Service result display
  value_text_service.forEach((text, index) => {
    let plan_service = document.createElement("div");
    plan_service.classList.add("only_result");
    plan_service.innerHTML = `
        <h2>${text}</h2>
        <div class="result_number">${value_price_service[index]}</div>
      `;
    result_container.appendChild(plan_service);
  });

  let totale_num_value = totale_value.reduce((a, b) => a + b, 0);

  let result_totale_price = document.querySelector(".result_totale_price");
  if (result_totale_price) {
    result_totale_price.innerHTML = `${totale_num_value}$`;
  }
};

let confirme_finel_btn = document.querySelector(".confirme_finel_btn");
let formule_container_5 = document.querySelector(".formule_container-5");
let email_user = document.querySelector(".email_user");
confirme_finel_btn.onclick = () => {
  formule_container_4.style.display = "none";
  formule_container_5.style.display = "flex";
  email_user.innerHTML=email_input.value;
};
