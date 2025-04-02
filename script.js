import { bankDepositRates } from './data.js';

const investedBlock = document.getElementById("investedBlock");
const investedInput = document.getElementById("amount");
const currenciesList = document.getElementById("currenciesList");
const currencyIcon = document.getElementById("currencyIcon");
const ctx = document.getElementById("graph").getContext("2d");
let currenciesListInLetters = "";
let interestRate = 0;
let afterTaxInterestRate = 0;
let taxWithheld = 0.23;
let taxWithheldAmount = 0;
let depositMonth = document.getElementById("depositMonth");
let depositMonthBlock = document.getElementById("monthCount");
let depositMonthInLetters = "";
let clickedItem;
let selectedBank = "privat24";
let chart;
let income = 0;
let maxIncome = 0;
let toggleLang = true;
investedInput.value = 100;
let privat24Income = 1;
let monobankIncome = 2;
let oschadbankIncome = 3;
let raiffeisenIncome = 4;
let pumbIncome = 5;
let otpbankIncome = 6;
let ukrsibIncome = 7;
let ukrgasbankIncome = 8;
let tascombankIncome = 9;
let senseIncome = 10;

// GRAPH // 

function createChart() {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "ПриватБанк", "monobank", "Ощадбанк", "Raiffeisen", "Пумб", "otpbank",
        "ukrsib", "укргазбанк", "ТаскомБанк", "sense"
      ],
      datasets: [
        {
          label: "Income",
          data: [privat24Income, monobankIncome, oschadbankIncome, raiffeisenIncome, pumbIncome, otpbankIncome, ukrsibIncome, ukrgasbankIncome, tascombankIncome, senseIncome],
          backgroundColor: "#1A16F3",
          borderRadius: 100,
          borderSkipped: false,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            font: {
              size: window.innerWidth < 600 ? 10 : 12,
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: window.innerWidth < 600 ? 2 : 10,
            },
          },
        },
      },
      scales: {
      y: {
        beginAtZero: true,
        max: investedInput.value * 2,
        ticks: {
          stepSize: Math.floor(investedInput.value / 4),
          callback: value => `${currenciesList.value}${value.toLocaleString()}`,
        },
        grid: {
          drawBorder: false,
          drawTicks: false,
          color: "rgba(0, 0, 0, 0.07)",
          borderDash: [8, 8],
          borderDashOffset: 0,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 7,
          }
        }
      },
    },
  },
  });
}

// BANKS // 

$(document).ready(function () {
  $("#toggleUkraine").click(function () {
    toggleLang = false;
    $(".navLinkNews").html("Новини");
    $(".navLinkDeposit").html("Депозит");
    $(".headDepositText").html("Чому депозит вигідний?");
    $(".textAboutDeposit").html("Депозит – один із найпростіших і надійних способів зберегти та примножити свої гроші. Ось деякі ключові причини, чому депозити варто розглянути:");
    $(".reasonDepositOne").html('<span style="color: #1A16F3;">♦</span> <strong>Гарантований дохід</strong>– На відміну від інвестицій у фондовий ринок чи криптовалюту, депозит забезпечує фіксований прибуток, який ви обов’язково отримаєте в кінці терміну.');
    $(".reasonDepositTwo").html('<span style="color: #1A16F3;">♦</span> <strong>Безпека фонду</strong>- Вклади в банках-учасниках Фонду Гарантування Вкладів захищені на випадок неплатоспроможності банку (до встановленого ліміту).');
    $(".reasonDepositThree").html('<span style="color: #1A16F3;">♦</span> <strong>Пасивний дохід</strong>- Немає потреби в активному управлінні, ризику або моніторингу ринку - просто покладіть свої гроші на депозит і отримуйте прибуток.');
    $(".conclusion").html("Депозит – розумний вибір для тих, хто цінує стабільність, надійність і хоче, щоб гроші працювали на нього.");
    $(".choosingBanksHead").html("Вибір банку");
    $(".depositAmountText").html("Сума депозиту");
    $(".currencyText").html("Валюта");
    $(".termText").html("Термін");
    $(".periodTextOne").html("1 місяць");
    $(".periodTextTwo").html("24 місяці");
    $(".taxesCheckboxText").html("Рахувати з податками");
    $(".interestCheckboxText").html("Додавати відсотки до депозиту");
    $(".investedText").html("Вкладено");
    $(".interestRateText").html("Відсоткова ставка");
    $(".afterTaxInterestRateText").html("Процентна ставка після сплати податків");
    $(".taxWithheldText").html("Утриманий податок");
    updateInvestedBlock();
    ChooseBank();
  });
  $("#toggleEngland").click(function () {
    toggleLang = true;
    $(".navLinkNews").html("News");
    $(".navLinkDeposit").html("Deposit");
    $(".headDepositText").html("Why is deposit benefical?");
    $(".textAboutDeposit").html("A deposit is one of the simplest and most reliable ways to save and grow your money. Here are some key <br>reasons why deposits are worth considering:");
    $(".reasonDepositOne").html('<span style="color: #1A16F3;">♦</span> <strong>Guaranteed Income</strong> - Unlike investments in the stock market  or cryptocurrency, a deposit provides a fixed return that you will definitely receive at the end of the term.');
    $(".reasonDepositTwo").html('<span style="color: #1A16F3;">♦</span> <strong>Fund Security</strong> - Deposits in banks participating in the Deposit Guarantee Fund are protected in case  of bank insolvency (up to a set limit).');
    $(".reasonDepositThree").html('<span style="color: #1A16F3;">♦</span> <strong>Passive Income</strong> - No need for active management, risk-taking, or market monitoring-just place your money in a deposit and earn profit.');
    $(".conclusion").html("A deposit is a smart choice for those who value stability, reliability, and want their money to work for them.");
    $(".choosingBanksHead").html("Choosing bank");
    $(".depositAmountText").html("Deposit amount");
    $(".currencyText").html("Currency");
    $(".termText").html("Term");
    $(".periodTextOne").html("1 month");
    $(".periodTextTwo").html("24 month");
    $(".taxesCheckboxText").html("Calculate with taxes");
    $(".interestCheckboxText").html("Add interest to deposit");
    $(".investedText").html("Invested");
    $(".interestRateText").html("Interest rate");
    $(".afterTaxInterestRateText").html("After-tax interest rate");
    $(".taxWithheldText").html("Tax withheld");
    updateInvestedBlock();
    ChooseBank();
  });
  ChooseBank();
  const bankItems = $(".banks ul li");
  let previousItem = bankItems.first()[0];
  gsap.set(previousItem, { backgroundColor: "#2c2c54" });
  bankItems.click(function () {
    clickedItem = $(this);
    selectedBank = clickedItem.attr("id");
    ChooseBank();
    gsap.to(clickedItem, {
      backgroundColor: "#2c2c54",
      duration: 1,
      ease: "power2.out"
    });
    if (previousItem && previousItem !== clickedItem[0]) {
      gsap.to(previousItem, {
        backgroundColor: "#ffffff",
        duration: 1,
        ease: "power2.out"
      });
    }
    previousItem = clickedItem[0];

  });
  banksIncomes();
});

function error1() {
  if (!toggleLang) {
    $("#error1").html("<p>Найбільше значення 10м</p>");
  }
  else {
    $("#error1").html("<p>The maximum value is 10M</p>")
  }
  gsap.fromTo("#error1",
    {
      y: "-100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".window", {
          opacity: 0,
          y: "100%",
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
      }
    }
  );
}
function error2() {
  gsap.fromTo("#error2",
    {
      y: "-100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".window", {
          opacity: 0,
          y: "100%",
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
      }
    }
  );
}
function error3() {
  if (!toggleLang) {
    $("#error3 p").html("Помилка");
  }
  else {
    $("#error3 p").html("Error");
  }
  gsap.fromTo("#error3",
    {
      y: "-100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".window", {
          opacity: 0,
          y: "100%",
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
      }
    }
  );
}
function error4() {
  interestRate = "Error";
  if (!toggleLang) {
    document.getElementById("interestRateBlock").textContent = `${interestRate} річних`;
    $("#error4 p").html("Невірний місяць");
  }
  else {
    document.getElementById("interestRateBlock").textContent = `${interestRate} per annum`;
    $("#error4 p").html("Incorrect month");
  }
  gsap.fromTo("#error4",
    {
      y: "-100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".window", {
          opacity: 0,
          y: "100%",
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
      }
    }
  );
}
function error5() {
  interestRate = "Error";
  if (!toggleLang) {
    document.getElementById("interestRateBlock").textContent = `${interestRate} річних`;
    $("#error5 p").html("Невірна валюта")
  }
  else {
    document.getElementById("interestRateBlock").textContent = `${interestRate} per annum`;
    $("#error5 p").html("Incorrect currency");
  }
  gsap.fromTo("#error5",
    {
      y: "-100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".window", {
          opacity: 0,
          y: "100%",
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
      }
    }
  );
}

function ChooseBank() {
  if (selectedBank == "privat24") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["privat24"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["privat24"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["privat24"]["UAH"]["interestRatesMonths"]["twentyforthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  if (selectedBank == "monobank") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["monobank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["monobank"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["fifteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["monobank"]["UAH"]["interestRatesMonths"]["twentyforthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  if (selectedBank == "oschadbank") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["oschadbank"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["oschadbank"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["oschadbank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["oschadbank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["oschadbank"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["oschadbank"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["oschadbank"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["oschadbank"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["oschadbank"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["oschadbank"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["oschadbank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["oschadbank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  if (selectedBank == "raiffeisen") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["raiffeisen"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["raiffeisen"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["eleventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["raiffeisen"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
  }
  if (selectedBank == "pumb") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["pumb"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["pumb"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["pumb"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["pumb"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["pumb"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["pumb"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["pumb"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["pumb"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["pumb"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["pumb"]["EUR"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["firstMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["pumb"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
  }
  if (selectedBank == "otpbank") {
    if (currenciesList.value == "$") {
      error5();
    }
    if (currenciesList.value == "€") {
      error5();
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          error4();
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          error4();
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["otpbank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
  }
  if (selectedBank == "ukrsib") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["ukrsib"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["ukrsib"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["ukrsib"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["ukrsib"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["ukrsib"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["ukrsib"]["EUR"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["ukrsib"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  if (selectedBank == "ukrgasbank") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["secondMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 3:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["ukrgasbank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["secondMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 3:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["ukrgasbank"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["secondMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 3:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["forthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 5:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["fifthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 6:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["seventhMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 8:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["eighthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 9:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["tenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 11:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 12:
          interestRate = bankDepositRates["ukrgasbank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          error4();
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          error4();
          break;
      }
    }
  }
  if (selectedBank == "tascombank") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["tascombank"]["EUR"]["interestRatesMonths"]["twentyforthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["firstMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["ninthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["tascombank"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  if (selectedBank == "sense") {
    if (currenciesList.value == "$") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["sense"]["USD"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["sense"]["USD"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["tascombank"]["USD"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "€") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          error4();
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["sense"]["EUR"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["sense"]["EUR"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["sense"]["EUR"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["sense"]["EUR"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["sense"]["EUR"]["interestRatesMonths"]["twentyforthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
    if (currenciesList.value == "₴") {
      switch (parseFloat(depositMonth.value)) {
        case 1:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["firstMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 2:
          error4();
          break;
        case 3:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["thirdMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 4:
          error4();
          break;
        case 5:
          error4();
          break;
        case 6:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["sixthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 7:
          error4();
          break;
        case 8:
          error4();
          break;
        case 9:
          error4();
          break;
        case 10:
          error4();
          break;
        case 11:
          error4();
          break;
        case 12:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["twelfthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 13:
          error4();
          break;
        case 14:
          error4();
          break;
        case 15:
          error4();
          break;
        case 16:
          error4();
          break;
        case 17:
          error4();
          break;
        case 18:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
        case 19:
          error4();
          break;
        case 20:
          error4();
          break;
        case 21:
          error4();
          break;
        case 22:
          error4();
          break;
        case 23:
          error4();
          break;
        case 24:
          interestRate = bankDepositRates["sense"]["UAH"]["interestRatesMonths"]["eighteenthMonth"];
          if (!toggleLang) {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % річних`;
          }
          else {
            document.getElementById("interestRateBlock").textContent = `${Math.round(interestRate * 100 * 100) / 100} % per annum`;
          }
          break;
      }
    }
  }
  afterTaxInterestRate = interestRate * (1 - taxWithheld);
  document.getElementById("afterTaxInterestRateBlock").textContent = `${Math.round(afterTaxInterestRate * 100 * 100) / 100} %`
  income = Math.round((investedInput.value * (1 + (interestRate / 12)) ** depositMonth.value) * 100) / 100;
  console.log(`${selectedBank} : ${income}${currenciesList.value}`);
  taxWithheldAmount = Math.round(((((investedInput.value * interestRate) - (investedInput.value * afterTaxInterestRate)) / 12) * depositMonth.value) * 100) / 100;
  document.getElementById("taxWithheldBlock").textContent = `${taxWithheldAmount} ${currenciesList.value}`;
  banksIncomes();
  maxIncome = Math.max(
    privat24Income, monobankIncome, oschadbankIncome, raiffeisenIncome,
    pumbIncome, otpbankIncome, ukrsibIncome, ukrgasbankIncome,
    tascombankIncome, senseIncome
  );
  if (isNaN(maxIncome) || maxIncome === undefined || maxIncome == 0) {
    chart.options.scales.y.ticks.callback = value => `${currenciesList.value}${value.toLocaleString()}`;
    chart.options.scales.y.max = 100;
    chart.options.scales.y.ticks.stepSize = Math.floor(Math.round((100 / 5) * 100) / 100);
    chart.data.datasets[0].data = [];
    if (!toggleLang) {
      chart.data.datasets[0].label = "Дохід";
    }
    else {
      chart.data.datasets[0].label = "Income";
    }
    chart.update();
  }
  else {
    chart.options.scales.y.ticks.callback = value => `${currenciesList.value}${value.toLocaleString()}`;
    chart.options.scales.y.max = maxIncome.toFixed(2);
    chart.options.scales.y.ticks.stepSize = Math.floor(Math.round((maxIncome / 5) * 100) / 100);
    chart.data.datasets[0].data = [privat24Income, monobankIncome, oschadbankIncome, raiffeisenIncome, pumbIncome, otpbankIncome, ukrsibIncome, ukrgasbankIncome, tascombankIncome, senseIncome];
    if (!toggleLang) {
      chart.data.datasets[0].label = "Дохід";
    }
    else {
      chart.data.datasets[0].label = "Income";
    }
    chart.update();
  }
}

function banksIncomes() {
  switch (parseInt(depositMonth.value)) {
    case 1:
      depositMonthInLetters = "firstMonth";
      break;
    case 2:
      depositMonthInLetters = "secondMonth";
      break;
    case 3:
      depositMonthInLetters = "thirdMonth";
      break;
    case 4:
      depositMonthInLetters = "forthMonth";
      break;
    case 5:
      depositMonthInLetters = "fifthMonth";
      break;
    case 6:
      depositMonthInLetters = "sixthMonth";
      break;
    case 7:
      depositMonthInLetters = "seventhMonth";
      break;
    case 8:
      depositMonthInLetters = "eighthMonth";
      break;
    case 9:
      depositMonthInLetters = "ninthMonth";
      break;
    case 10:
      depositMonthInLetters = "tenthMonth";
      break;
    case 11:
      depositMonthInLetters = "eleventhMonth";
      break;
    case 12:
      depositMonthInLetters = "twelfthMonth";
      break;
    case 13:
      depositMonthInLetters = "thirteenthMonth";
      break;
    case 14:
      depositMonthInLetters = "fourteenthMonth";
      break;
    case 15:
      depositMonthInLetters = "fifteenthMonth";
      break;
    case 16:
      depositMonthInLetters = "sixteenthMonth";
      break;
    case 17:
      depositMonthInLetters = "seventeenthMonth";
      break;
    case 18:
      depositMonthInLetters = "eighteenthMonth";
      break;
    case 19:
      depositMonthInLetters = "ninetenth";
      break;
    case 20:
      depositMonthInLetters = "twentyth";
      break;
    case 21:
      depositMonthInLetters = "twentyfirstMonth";
      break;
    case 22:
      depositMonthInLetters = "twentysecondMonth";
      break;
    case 23:
      depositMonthInLetters = "twentythirdMonth";
      break;
    case 24:
      depositMonthInLetters = "twentyforthMonth";
      break;
  }
  switch (currenciesList.value) {
    case "$":
      currenciesListInLetters = "USD";
      break;
    case "€":
      currenciesListInLetters = "EUR";
      break;
    case "₴":
      currenciesListInLetters = "UAH";
      break;
  }
  if (document.getElementById("taxesCheckbox").checked == false && document.getElementById("interestCheckbox").checked == false) {
    privat24Income = bankDepositRates["privat24"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["privat24"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    monobankIncome = bankDepositRates["monobank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["monobank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    oschadbankIncome = bankDepositRates["oschadbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["oschadbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    raiffeisenIncome = bankDepositRates["raiffeisen"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["raiffeisen"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    pumbIncome = bankDepositRates["pumb"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["pumb"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    otpbankIncome = bankDepositRates["otpbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["otpbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    ukrsibIncome = bankDepositRates["ukrsib"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["ukrsib"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    ukrgasbankIncome = bankDepositRates["ukrgasbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["ukrgasbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    tascombankIncome = bankDepositRates["tascombank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["tascombank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    senseIncome = bankDepositRates["sense"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * bankDepositRates["sense"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters]) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
  }
  else if (document.getElementById("taxesCheckbox").checked == true && document.getElementById("interestCheckbox").checked == false) {
    privat24Income = bankDepositRates["privat24"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["privat24"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    monobankIncome = bankDepositRates["monobank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["monobank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    oschadbankIncome = bankDepositRates["oschadbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["oschadbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    raiffeisenIncome = bankDepositRates["raiffeisen"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["raiffeisen"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    pumbIncome = bankDepositRates["pumb"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["pumb"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    otpbankIncome = bankDepositRates["otpbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["otpbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    ukrsibIncome = bankDepositRates["ukrsib"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["ukrsib"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    ukrgasbankIncome = bankDepositRates["ukrgasbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["ukrgasbank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    tascombankIncome = bankDepositRates["tascombank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["tascombank"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
    senseIncome = bankDepositRates["sense"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.round(((investedInput.value * (bankDepositRates["sense"][currenciesListInLetters]['interestRatesMonths'][depositMonthInLetters] * (1 - taxWithheld))) / 12 * depositMonth.value + parseFloat(investedInput.value)) * 100) / 100 : 0;
  }
  else if (document.getElementById("taxesCheckbox").checked == false && document.getElementById("interestCheckbox").checked == true) {
    privat24Income = bankDepositRates["privat24"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["privat24"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    monobankIncome = bankDepositRates["monobank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["monobank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    oschadbankIncome = bankDepositRates["oschadbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["oschadbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    raiffeisenIncome = bankDepositRates["raiffeisen"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["raiffeisen"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    pumbIncome = bankDepositRates["pumb"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["pumb"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    otpbankIncome = bankDepositRates["otpbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["otpbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    ukrsibIncome = bankDepositRates["ukrsib"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["ukrsib"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    ukrgasbankIncome = bankDepositRates["ukrgasbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["ukrgasbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    tascombankIncome = bankDepositRates["tascombank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["tascombank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    senseIncome = bankDepositRates["sense"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + (bankDepositRates["sense"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
  }
  else if (document.getElementById("taxesCheckbox").checked == true && document.getElementById("interestCheckbox").checked == true) {
    privat24Income = bankDepositRates["privat24"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["privat24"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    monobankIncome = bankDepositRates["monobank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["monobank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    oschadbankIncome = bankDepositRates["oschadbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["oschadbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    raiffeisenIncome = bankDepositRates["raiffeisen"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["raiffeisen"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    pumbIncome = bankDepositRates["pumb"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["pumb"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    otpbankIncome = bankDepositRates["otpbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["otpbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    ukrsibIncome = bankDepositRates["ukrsib"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["ukrsib"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    ukrgasbankIncome = bankDepositRates["ukrgasbank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["ukrgasbank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    tascombankIncome = bankDepositRates["tascombank"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["tascombank"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
    senseIncome = bankDepositRates["sense"]?.[currenciesListInLetters]?.['interestRatesMonths']?.[depositMonthInLetters] ? Math.floor((investedInput.value * Math.pow(1 + ((bankDepositRates["sense"][currenciesListInLetters]["interestRatesMonths"][depositMonthInLetters] * (1 - taxWithheld)) / 12), 12 * (depositMonth.value / 12))) * 100) / 100 : 0;
  }
  else {
    error3();
  }
}

// CHANGES // 

function updateInvestedBlock() {
  let amount = parseFloat(investedInput.value);
  let minAmount = currenciesList.value === "₴" ? 1000 : 100;
  if (isNaN(amount)) {
    amount = 0;
    error3();
  } else if (amount > 10000000) {
    amount = 10000000;
    error1();
  } else if (amount < minAmount) {
    if (!toggleLang) {
      $("#error2 p").text(`Найменше значення ${minAmount}`);
    }
    else {
      $("#error2 p").text(`The minimum value is ${minAmount}`);
    }
    error2();
  };
  investedInput.value = amount;
  investedBlock.textContent = `${investedInput.value} ${currenciesList.value}`;
  currencyIcon.textContent = currenciesList.value;
  if (!toggleLang) {
    switch (parseFloat(depositMonth.value)) {
      case 1:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяць`;
        break;
      case 2:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
      case 3:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
      case 4:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
      case 5:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 6:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 7:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 8:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 9:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 10:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 11:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 12:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 13:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 14:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 15:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 16:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 17:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 18:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 19:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 20:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяців`;
        break;
      case 21:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяць`;
        break;
      case 22:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
      case 23:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
      case 24:
        depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} місяці`;
        break;
    }
  }
  else {
    depositMonthBlock.textContent = `${parseFloat(depositMonth.value)} mounth`;
  }
  ChooseBank();
}
document.addEventListener("DOMContentLoaded", () => {
  chart = createChart();
  updateInvestedBlock();
});
depositMonth.addEventListener("input", updateInvestedBlock);
investedInput.addEventListener("input", updateInvestedBlock);
currenciesList.addEventListener("change", updateInvestedBlock);
document.getElementById("taxesCheckbox").addEventListener("input", updateInvestedBlock);
document.getElementById("interestCheckbox").addEventListener("input", updateInvestedBlock);
window.addEventListener("resize", () => {
  chart.update();
});

// ANIMATIONS //

let gsapDiscordAnimation, gsapGitHubAnimation;

document.querySelector("#discord").addEventListener("mouseenter", () => {
  gsapDiscordAnimation = gsap.to("#discord", {
    duration: 2.5,
    ease: "none",
    rotation: "360deg",
    repeat: -1,
  });
});

document.querySelector("#discord").addEventListener("mouseleave", () => {
  if (gsapDiscordAnimation) {
    gsapDiscordAnimation.kill();
  }
  gsap.to("#discord", {
    duration: 1,
    ease: "none",
    rotation: "0deg",
  });
});

document.querySelector("#github").addEventListener("mouseenter", () => {
  gsapGitHubAnimation = gsap.to("#github", {
    duration: 1,
    ease: "none",
    scale: 1.25,
    repeat: -1,
    yoyo: true,
  });
});

document.querySelector("#github").addEventListener("mouseleave", () => {
  if (gsapGitHubAnimation) {
    gsapGitHubAnimation.kill();
  }
  gsap.to("#github", {
    duration: 1,
    ease: "none",
    scale: 1,
  });
});