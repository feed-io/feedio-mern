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

  fetch(`http://localhost:8080/api/collection-feedback/createReviewForWidget`, {
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
      console.log(data);
      hideFeedbackForm();
    })
    .catch((error) => {
      console.error(error);
    });
});
