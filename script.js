document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Correct field selections
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const queryType = document.querySelector('input[name="query-type"]:checked');
    const consent = document.getElementById("consent");

    // Validate each field
    validateField(firstName, "First Name is required");
    validateField(lastName, "Last Name is required");
    validateField(email, "Email Address is required", isValidEmail);
    validateField(message, "Message is required");
    validateRadioGroup("query-type", "Please select a query type");
    validateCheckbox(consent, "You must provide consent");

    // Check for errors
    const hasError = document.querySelector('.error-message[style="display: block;"]');
    if (!hasError) {
      showSuccessMessage(
        "Message Sent! Thanks for completing the form. We'll be in touch soon!"
      );
      this.reset(); // Reset the form
    }
  });

// Validate field function
function validateField(field, errorMessage, validator = isNotEmpty) {
  if (!field) {
    console.error("Field not found:", field);
    return;
  }

  const parent = field.parentElement;
  if (!parent) {
    console.error("Parent element not found for field:", field);
    return;
  }

  const errorSpan = parent.querySelector(".error-message");
  if (!validator(field.value)) {
    field.classList.add("error");
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
      errorSpan.style.display = "block";
    }
  } else {
    field.classList.remove("error");
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }
}

// Validate radio group
function validateRadioGroup(groupName, errorMessage) {
  const group = document.querySelectorAll(`input[name="${groupName}"]`);
  if (!group || group.length === 0) {
    console.error("Radio group not found:", groupName);
    return;
  }

  const errorSpan = group[0].closest(".radio-group").querySelector(".error-message");
  if (![...group].some((radio) => radio.checked)) {
    group[0].closest(".radio-group").classList.add("error");
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
      errorSpan.style.display = "block";
    }
  } else {
    group[0].closest(".radio-group").classList.remove("error");
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }
}

// Validate checkbox
function validateCheckbox(field, errorMessage) {
  if (!field) {
    console.error("Checkbox field not found:", field);
    return;
  }

  const errorSpan = field.parentElement.querySelector(".error-message");
  if (!field.checked) {
    field.classList.add("error");
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
      errorSpan.style.display = "block";
    }
  } else {
    field.classList.remove("error");
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }
}

// Helper functions
function isNotEmpty(value) {
  return value.trim() !== "";
}

function isValidEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.classList.add("success-message");
  successDiv.textContent = message;

  document.body.prepend(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}
