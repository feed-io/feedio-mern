function showFeedbackForm() {
  document.getElementById("feedbackModal").style.display = "block";
  document.getElementById("review-dialog").style.display = "block";
}

function hideFeedbackForm() {
  document.getElementById("feedbackModal").style.display = "none";
  document.getElementById("review-dialog").style.display = "none";
}

document
  .getElementById("feedback-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
  });

document
  .getElementById("feedbackModal")
  .addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
      hideFeedbackForm();
    }
  });

document.getElementById("cancel-btn").addEventListener("click", function (e) {
  hideFeedbackForm();
});

document.getElementById("submit-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const content = document.getElementById("review").value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

  const data = JSON.stringify({
    name,
    email,
    content,
    rating: parseFloat(rating),
    productId,
  });

  fetch(`https://feedio.lol/api/collection-feedback/createReviewForWidget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      return response.text().then((text) => {
        if (!response.ok) {
          throw new Error(text || "Network response was not ok");
        }
        return JSON.parse(text);
      });
    })
    .then((data) => {
      hideFeedbackForm();
    })
    .catch((error) => {
      console.error(error);
    });
});

document.querySelectorAll(".star").forEach((star, index) => {
  star.addEventListener("mouseover", function () {
    for (let i = 0; i <= index; i++) {
      const starLabel = document.querySelectorAll(".star label")[i];
      starLabel.style.color = "gold";
    }
  });

  star.addEventListener("mouseout", function () {
    const checkedValue = document.querySelector('input[name="rating"]:checked');
    const val = checkedValue ? parseInt(checkedValue.value) : 0;
    for (let i = 0; i <= 4; i++) {
      const starLabel = document.querySelectorAll(".star label")[i];
      if (i < val) {
        starLabel.style.color = "gold";
      } else {
        starLabel.style.color = "#e0e0e0";
      }
    }
  });
});
