(() => {
  const Form = {
    form: document.querySelector('form'),
    inputs: document.querySelectorAll('input'),

    handleSubmit(event) {
      event.preventDefault();
      for (let i = 0; i < [...this.inputs].length; i += 1) {
        let currentInput = this.inputs[i];
        if (!currentInput.checkValidity()) {
          document.getElementById('form-errors').textContent = 'Please fill all inputs correctly before submitting the form.';
          this.handleError(currentInput);
        }
      }

      let data = this.renderFormData();
      document.querySelector('#serialized-form p').textContent = data;
      this.form.reset();
    },

    renderFormData() {
      let attributes = {};
      let ccString = '';
      this.inputs.forEach(input => {
        let name = input.name;
        if (name === 'credit-card') {
          ccString += input.value;
        } else {
          let value = input.value;
          attributes[name] = value;
        }
      });
      attributes['credit-card'] = ccString;

      return this.hashToParamString(attributes);
    },

    hashToParamString(attributes) {
      return Object.keys(attributes)
        .map(attr => `${encodeURIComponent(attr)}=${encodeURIComponent(attributes[attr])}`)
        .join('&');
    },

    handleError(input) {
      input.classList.add('invalid');
      if (input.validity.patternMismatch) {
        this.wrongPattern(input);
      } else if (input.validity.tooShort) {
        this.wrongLength(input);
      } else if (input.validity.valueMissing) {
        this.emptyRequired(input);
      }
    },

    handleBlur(event) {
      let input = event.target;
      if (input.checkValidity()) {
        return;
      }
      this.handleError(input);
    },

    // TODO make this work for CC inputs
    handleFocus(event) {
      let input = event.target;
      if (!input.name === 'credit-card') {
        input.classList.remove('invalid');
        input.nextElementSibling.textContent = '';
      }
    },

    emptyRequired(input) {
      let label = input.labels[0].textContent;
      input.nextElementSibling.textContent = `${label} is a required field.`;
    },

    wrongLength(input) {
      let label = input.labels[0].textContent;
      input.nextElementSibling.textContent = `${label} must be at least 10 characters long.`;
    },

    wrongPattern(input) {
      let label = input.labels[0].textContent;
      input.nextElementSibling.textContent = `Please enter a valid ${label}.`;
    },

    handleNameInputs() {
      let firstNameInput = document.getElementById('first-name');
      let lastNameInput = document.getElementById('last-name');
      this.enforceAlpha(firstNameInput, lastNameInput);
    },

    handleCreditInputs() {
      let creditFieldsContainer = document.getElementById('credit-card-entry');
      this.enforceNumeric(creditFieldsContainer);
      this.tabForwarding();
    },

    handlePhoneInput() {
      this.enforceNumeric(document.getElementById('phone-number'));
    },

    enforceAlpha(...inputs) {
      inputs.forEach(field => {
        field.addEventListener('beforeinput', event => {
          if (/[^a-zA-Z'\s]/.test(event.data)) {
            event.preventDefault();
          }
        });
      });
    },

    enforceNumeric(...inputs) {
      inputs.forEach(input => {
        input.addEventListener('beforeinput', event => {
          let key = event.data;
          if (key !== "" && !key.match(/[-0-9]/)) {
            event.preventDefault();
          }
        });
      });
    },

    tabForwarding() {
      let fields = document.querySelectorAll('[id^="cc"]');
      fields.forEach((field, idx) => {
        field.addEventListener('input', () => {
          if (field.value.length === field.maxLength) {
            fields[idx + 1].focus();
          }
        });
      });
    },

    init() {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.inputs.forEach(input => {
        input.addEventListener('blur', this.handleBlur.bind(this));
        input.addEventListener('focus', this.handleFocus.bind(this));
      });
      this.handleNameInputs();
      this.handleCreditInputs();
      this.handlePhoneInput();
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    Form.init();
  });
})();
