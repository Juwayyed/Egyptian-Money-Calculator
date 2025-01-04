//Selectors
const TwentyFivePiasters = document.getElementById('TwentyFivePiasters');
const FiftyPiasters = document.getElementById('FiftyPiasters');
const OnePound = document.getElementById('OnePound');
const FivePounds = document.getElementById('FivePounds');
const TenPounds = document.getElementById('TenPounds');
const TwentyPounds = document.getElementById('TwentyPounds');
const FiftyPounds = document.getElementById('FiftyPounds');
const OneHundredPounds = document.getElementById('OneHundredPounds');
const TwoHundredPounds = document.getElementById('TwoHundredPounds');

const txt025 = document.getElementById('txt025');
const txt050 = document.getElementById('txt050');
const txt1 = document.getElementById('txt1');
const txt5 = document.getElementById('txt5');
const txt10 = document.getElementById('txt10');
const txt20 = document.getElementById('txt20');
const txt50 = document.getElementById('txt50');
const txt100 = document.getElementById('txt100');
const txt200 = document.getElementById('txt200');

const FinalSum = document.getElementById('FinalSum');
const FinalSumInWords = document.getElementById('FinalSumInWords');
const ResetButton = document.getElementById('ResetButton');

const cashInputs = [TwentyFivePiasters, FiftyPiasters, OnePound, FivePounds, TenPounds, TwentyPounds, FiftyPounds, OneHundredPounds, TwoHundredPounds];
const cashTexts = [txt025, txt050, txt1, txt5, txt10, txt20, txt50, txt100, txt200];

const change = ['Twenty-Five Piasters', 'Fifty Piasters', 'Seventy-Five Piasters'];
const oneToNine = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const tenToNineteen = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

/* Functions */
// The Calculator
function cashCalculate(index) {
    const denominations = [0.25, 0.50, 1, 5, 10, 20, 50, 100, 200];
    const rowValue = cashInputs[index].value * denominations[index];
    cashTexts[index].textContent = rowValue;
    totalCash();
}

// The Sum in Numbers
function totalCash() {
    let totalCashValue = 0;
    cashTexts.forEach((text) => {
        totalCashValue += +(text.textContent);
    })
    FinalSum.textContent = "Total Cash: " + parseFloat(totalCashValue).toFixed(2) + " EGP";
    FinalSumInWords.textContent = `Total Cash in Words: ${convertToWords(totalCashValue)}`;
}

// Sum in Words (Logic OK - But Needs Refactoring)
function convertToWords(number) {
    if (number === 0) {
        return 'Zero';
    }
    let words = '';
    let integerPart = Math.floor(number);
    let decimalPart = (number % 1);

    words += convertIntegerToWords(integerPart);

    if (decimalPart > 0) {
         if(decimalPart === 0.25) {
            words += " " + change[0];
        } else if (decimalPart === 0.50) {
            words += " " + change[1];
        } else if (decimalPart === 0.75) {
           words += " " + change[2];
        }
    }

    return words.trim();
}

function convertIntegerToWords(number) {
    if (number === 0) {
        return '';
    }
    let words = '';

    //Trillions
    if (Math.floor(number / 1000000000000) > 0) {
        words += convertIntegerToWords(Math.floor(number / 1000000000000)) + ' Trillion ';
        number %= 1000000000000;
    }

    //Billions
    if (Math.floor(number / 1000000000) > 0) {
        words += convertIntegerToWords(Math.floor(number / 1000000000)) + ' Billion ';
        number %= 1000000000;
    }

    //Millions
    if (Math.floor(number / 1000000) > 0) {
        words += convertIntegerToWords(Math.floor(number / 1000000)) + ' Million ';
        number %= 1000000;
    }

    //Thousands
    if (Math.floor(number / 1000) > 0) {
        words += convertIntegerToWords(Math.floor(number / 1000)) + ' Thousand ';
        number %= 1000;
    }

    //Hundreds
    if (Math.floor(number / 100) > 0) {
        words += convertIntegerToWords(Math.floor(number / 100)) + ' Hundred ';
        number %= 100;
    }

    //20 - 99
    if (number >= 20 && number < 100) {
        words += tens[Math.floor(number / 10)];
        if (number % 10 > 0) {
            words += ' ' + oneToNine[number % 10];
        }
         return words;
    }

    //10 - 19
    if (number >= 10 && number < 20) {
        words += tenToNineteen[number - 10];
         return words;
    }

    //1 - 9
    if (number >= 1 && number <= 9) {
        words += oneToNine[number];
    }
    return words;
}


// Reset Data Functionality
function resetData() {
    cashInputs.forEach((input) => {
        input.value = "";
    });

    cashTexts.forEach((text) => {
        text.textContent = 0;
    });

    FinalSum.textContent = "Total Cash: 0 EGP";
    FinalSumInWords.textContent = "Total Cash: Zero";
}

/////////////////////////////////////////

//Whenever we update the input field, it automatically listens to the event
document.addEventListener("DOMContentLoaded", () => {
    cashInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            cashCalculate(index);
        })
    });    
})

// Wrong Numbers Check Functionality
cashInputs.forEach(input => {
    input.addEventListener("input", () => {
        if (input.value === "" || input.value === "-") {
            input.value = "";
            return;
        }
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            input.value = "";
            alert("Error! Enter a Whole Positive Number with no fractions!");
        }
    })
})

ResetButton.addEventListener('click', resetData);