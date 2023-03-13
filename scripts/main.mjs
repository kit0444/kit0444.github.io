// Helpers
// From https://chrisboakes.com/how-a-javascript-debounce-function-works/
const debounce = (callback, wait) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), wait);
  };
};

const matchingSiblingElement = function (maybeMatchingSiblingElement, selector) {
  return maybeMatchingSiblingElement.matches(selector)
         ? maybeMatchingSiblingElement
         : matchingSiblingElement(maybeMatchingSiblingElement.nextElementSibling, selector);
};

// General
[...document.querySelectorAll('input')].forEach((inputElement) => {
                                    const inputValidationProgressElement = matchingSiblingElement(inputElement.nextElementSibling, '.input__validationProgress');
                                    const inputErrorElement = matchingSiblingElement(inputElement.nextElementSibling, '.input__error');
                                    const inputSubmitButtonElement = matchingSiblingElement(inputElement.nextElementSibling, 'button');
  inputElement.addEventListener('keyup', (e) => {
                                  e.isComposing || e.keyCode === 229 || (() => {
                                    inputElement.classList.remove('input_inputEnded');

                                    inputValidationProgressElement.classList.remove('input_inputEnded__validationProgress');
                                    inputValidationProgressElement.textContent = ' ';

                                    inputErrorElement.classList.remove('input_inputEnded__error');
                                    inputErrorElement.classList.remove('input_inputInvalid__error');

                                    inputSubmitButtonElement.disabled = inputElement.parentElement.querySelector('input:invalid:required');
                                    inputElement.closest('.toy').querySelector('.result').textContent = ' ';

                                    setTimeout(() => {
                                      inputElement.classList.add('input_inputEnded');

                                      inputValidationProgressElement.classList.add('input_inputEnded__validationProgress');
                                    inputValidationProgressElement.textContent = inputElement.checkValidity() ? '✓' : '✗';

                                    inputErrorElement.classList.add('input_inputEnded__error');

                                    inputElement.checkValidity() || (() => {
                                      inputErrorElement.classList.add('input_inputInvalid__error');
                                    })();

                                    }, 500);
                                  })();
                                }
  );
});

// UA
document.querySelector('#UA button')
        .addEventListener('click', () => {
          document.querySelector('#UA .result').textContent = navigator.userAgent;
        });

// BMI
const bmiFormButton = document.querySelector('#BMI > form > button');

bmiFormButton.addEventListener('click', (e) => {
  e.preventDefault();

          document.querySelector('#BMI > form input:invalid:required') || (() => {
            const height = document.querySelector('#BMI_height__input').value;
            const weight = document.querySelector('#BMI_weight__input').value;
            document.querySelector('#BMI .result').textContent = `${weight / ((height / 100) ** 2)}`;
          })();
        });

// bmiFormButton.addEventListener('hover', () => {
//   bmiFormButton.disabled = document.querySelector('#BMI > form input:invalid:required');
// })
