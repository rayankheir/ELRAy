
window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});



/* ==================================================
   OUR STORY SCROLL ANIMATION
================================================== */

const storyElements =
    document.querySelectorAll(".story-reveal");


const storyObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "story-visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );



/* ==================================================
   START OBSERVING
================================================== */

storyElements.forEach(function (element) {

    storyObserver.observe(element);

});
const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

    const button = card.querySelector(".product-toggle");

    button.addEventListener("click", function () {

        card.classList.toggle("active");

    });

});

function showPage(page) {

    const contactPages =
        document.getElementById("contactPages");

    if (!contactPages) return;


    /* Remove old states */

    contactPages.classList.remove(
        "show-get",
        "show-talk",
        "show-payment"
    );


    /* Show selected page */

    if (page === "get") {

        contactPages.classList.add(
            "show-get"
        );

    }

    else if (page === "talk") {

        contactPages.classList.add(
            "show-talk"
        );

    }

    else if (page === "payment") {

        contactPages.classList.add(
            "show-payment"
        );

    }

}

const payButton =
    document.getElementById("payButton");

const paymentMessage =
    document.getElementById("paymentMessage");


payButton.addEventListener(
    "click",
    startPayment
);


async function startPayment() {

    payButton.disabled = true;

    payButton.textContent =
        "CONNECTING...";


    paymentMessage.textContent = "";


    try {

        /*
         * PHP will communicate with
         * the payment gateway.
         */

        const response =
            await fetch(
                "payment/create-payment.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        amount: 5.50,

                        currency: "USD",

                        order: "EL-RAY-ORDER-001"

                    })

                }
            );


        const data =
            await response.json();


        if (
            data.success &&
            data.checkoutUrl
        ) {

            /*
             * Redirect customer to
             * the secure payment page.
             */

            window.location.href =
                data.checkoutUrl;

        }

        else {

            throw new Error(
                data.message ||
                "Payment could not be started."
            );

        }


    }

    catch (error) {

        console.error(error);


        paymentMessage.textContent =
            "Unable to start payment. Please try again.";


        payButton.disabled = false;

        payButton.textContent =
            "PAY WITH CARD";

    }

}


/* =========================================
   BACK
========================================= */

function goBack() {

    window.history.back();

}

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData(form);

    try {

        const response = await fetch("contact.php", {
            method: "POST",
            body: formData
        });

        const result = await response.text();

        if (result.includes("Message sent successfully!")) {

            form.style.display = "none";
            successMessage.style.display = "block";

        } else {

            alert(result);

        }

    } catch (error) {

        alert("Something went wrong. Please try again.");

    }

});
