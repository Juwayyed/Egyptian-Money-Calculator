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
const oneToNine = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']; // 0-9
const tenToNineteen = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']; // 10-19
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']; // 20-90
////////////////////////////////////////////////////////////////////////

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
    FinalSum.textContent = "Total Cash: " + parseFloat(totalCashValue);
    FinalSumInWords.textContent = `Total Cash in Words: ${convertToWords(totalCashValue)}`;
}

// Sum in Words (Logic OK - But Needs Refactoring)
function convertToWords (number) {
    
    if(number === 0) {
        return 'Zero';
    }

    let words = '';
    let numb = Math.floor(number);

    //Trillions
    if(Math.floor(number / 1000000000000) > 0) {
        words += convertToWords(Math.floor(number / 1000000000000)) + ' Trillion ';
        number %= 1000000000000;
    }

    //Billions
    if(Math.floor(number / 1000000000) > 0) {
        words += convertToWords(Math.floor(number / 1000000000)) + ' Billion ';
        number %= 1000000000;
    }

    //Millions
    if(Math.floor(number / 1000000) > 0) {
        words += convertToWords(Math.floor(number / 1000000)) + ' Million ';
        number %= 1000000;
    }

    //Thousands
    if(Math.floor(number / 1000) > 0) {
        words += convertToWords(Math.floor(number / 1000)) + ' Thousand ';
        number %= 1000;
    }

    //Hundreds
    if(Math.floor(number / 100) > 0) {
        words += convertToWords(Math.floor(number / 100)) + ' Hundred '; // Value 1
        number %= 100;
    }

    //20 - 99
    if(number >= 20 && number < 100) {
        // To split the value into two..ex: 25 => 20 + 5
        words += tens[Math.floor(number / 10)];
        if(number % 10 > 0) {
            words += ' ' + oneToNine[numb % 10];
        }
    }

    //10 - 19
    if(number >= 10 && number < 20) {
        words += tenToNineteen[number - 10]; // ex: 15 - 10 => 5 ... tenToNineteen[5]
    }

    //1 - 9
    if(number >= 1 && number <= 9) {
        words += oneToNine[numb];
    }
        //Fractions
        if((number % 1) === 0.25) {
            words += " " + change[0]; 
        } else if((number % 1) === 0.50) {
            words += " " + change[1];
        } else if((number % 1) === 0.75) {
            words += " " + change[2];
        }

        return words.trim();
    }

// Reset Data Functionality
function resetData() {
    cashInputs.forEach((input) => {
        input.value = "";
    });

    cashTexts.forEach((text) => {
        text.textContent = 0;
    });

    FinalSum.textContent = "Total Cash: 0";
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
        if (input.value === "" || input.value === "-") { //checks for written (-) before parseFloat /*Important*/
            input.value = ""; //To clear the invalid input
            return; // Exit early to avoid triggering the alert
        }
        
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) { //First condition we use input.value to escape the parsefloat effect which will return NaN Always
            input.value = "";
            alert("Error! Enter a Whole Positive Number with no fractions!");
        }
    })
})

ResetButton.addEventListener('click', resetData);