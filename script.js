const TwentyFivePiasters = document.getElementById("TwentyFivePiasters");
const FiftyPiasters = document.getElementById("FiftyPiasters");
const OnePound = document.getElementById("OnePound");
const FivePounds = document.getElementById("FivePounds");
const TenPounds = document.getElementById("TenPounds");
const TwentyPounds = document.getElementById("TwentyPounds");
const FiftyPounds = document.getElementById("FiftyPounds");
const OneHundredPounds = document.getElementById("OneHundredPounds");
const TwoHundredPounds = document.getElementById("TwoHundredPounds");

const txt025 = document.getElementById("txt025");
const txt050 = document.getElementById("txt050");
const txt1 = document.getElementById("txt1");
const txt5 = document.getElementById("txt5");
const txt10 = document.getElementById("txt10");
const txt20 = document.getElementById("txt20");
const txt50 = document.getElementById("txt50");
const txt100 = document.getElementById("txt100");
const txt200 = document.getElementById("txt200");

const FinalSum = document.getElementById("FinalSum");
const FinalSumInWords = document.getElementById("FinalSumInWords");
const ResetButton = document.getElementById("ResetButton");

const cashInputs = [
  TwentyFivePiasters,
  FiftyPiasters,
  OnePound,
  FivePounds,
  TenPounds,
  TwentyPounds,
  FiftyPounds,
  OneHundredPounds,
  TwoHundredPounds,
];
const cashTexts = [
  txt025,
  txt050,
  txt1,
  txt5,
  txt10,
  txt20,
  txt50,
  txt100,
  txt200,
];

const MAX_LIMIT = 1000000000000;
const change = [
  "Twenty-Five Piasters",
  "Fifty Piasters",
  "Seventy-Five Piasters",
];
const oneToNine = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const tenToNineteen = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function cashCalculate(index) {
  const denominations = [0.25, 0.5, 1, 5, 10, 20, 50, 100, 200];
  const rowValue =
    (parseFloat(cashInputs[index].value) || 0) * denominations[index];
  cashTexts[index].textContent = rowValue;
  totalCash();
}

function totalCash() {
  let totalCashValue = 0;
  cashTexts.forEach((text) => {
    totalCashValue += parseFloat(text.textContent) || 0;
  });

  if (totalCashValue > MAX_LIMIT) {
    alert("Warning: The amount exceeds the maximum limit!");
    return;
  }

  const formattedNum = totalCashValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  FinalSum.textContent = "Total Cash: " + formattedNum + " EGP";
  FinalSumInWords.textContent = `Total Cash in Words: ${convertToWords(totalCashValue)}`;
}

function convertToWords(number) {
  if (number === 0) return "Zero Pounds";

  let integerPart = Math.floor(number);
  let decimalPart = Math.round((number % 1) * 100);

  let finalStr = "";

  if (integerPart > 0) {
    finalStr = convertIntegerToWords(integerPart);
    finalStr += integerPart === 1 ? " Pound" : " Pounds";
  }

  if (decimalPart > 0) {
    let piastersText = "";
    if (decimalPart === 25) piastersText = change[0];
    else if (decimalPart === 50) piastersText = change[1];
    else if (decimalPart === 75) piastersText = change[2];

    if (piastersText) {
      finalStr += (integerPart > 0 ? " and " : "") + piastersText;
    }
  }

  return finalStr.trim();
}

function convertIntegerToWords(number) {
  if (number === 0) return "";

  let parts = [];
  const units = [
    { val: 1000000000000, name: "Trillion" },
    { val: 1000000000, name: "Billion" },
    { val: 1000000, name: "Million" },
    { val: 1000, name: "Thousand" },
  ];

  for (let unit of units) {
    let count = Math.floor(number / unit.val);
    if (count > 0) {
      parts.push(processThreeDigits(count) + " " + unit.name);
      number %= unit.val;
    }
  }

  if (number > 0) {
    parts.push(processThreeDigits(number));
  }

  return parts.join(", ");
}

function processThreeDigits(number) {
  let str = "";
  if (Math.floor(number / 100) > 0) {
    str += oneToNine[Math.floor(number / 100)] + " Hundred ";
    number %= 100;
  }

  if (number > 0) {
    if (number >= 20) {
      let t = tens[Math.floor(number / 10)];
      let o = oneToNine[number % 10];
      str += o ? t + "-" + o : t;
    } else if (number >= 10) {
      str += tenToNineteen[number - 10];
    } else {
      str += oneToNine[number];
    }
  }
  return str.trim();
}

function resetData() {
  cashInputs.forEach((input) => {
    input.value = "";
  });

  cashTexts.forEach((text) => {
    text.textContent = "0";
  });

  FinalSum.textContent = "Total Cash: 0.00 EGP";
  FinalSumInWords.textContent = "Total Cash in Words: Zero Pounds";
}

document.addEventListener("DOMContentLoaded", () => {
  cashInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (
        input.value !== "" &&
        (parseFloat(input.value) < 0 || isNaN(input.value))
      ) {
        alert("Error! Enter a Whole Positive Number!");
        input.value = "";
        cashCalculate(index);
        return;
      }
      cashCalculate(index);
    });
  });
});

ResetButton.addEventListener("click", resetData);
