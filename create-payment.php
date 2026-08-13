<?php
header(
    "Content-Type: application/json"
);


/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
|
| This file runs on the SERVER.
|
| Do NOT put your Areeba secret/API password
| inside HTML or JavaScript.
|
*/


/* =========================================
   RECEIVE DATA
========================================= */

$input =
    json_decode(
        file_get_contents("php://input"),
        true
    );


if (!$input) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid payment request."

    ]);

    exit;

}


/* =========================================
   ORDER DATA
========================================= */

$amount =
    $input["amount"] ?? 0;


$currency =
    $input["currency"] ?? "USD";


$order =
    $input["order"] ?? "";


/* =========================================
   BASIC VALIDATION
========================================= */

if (
    $amount <= 0 ||
    empty($order)
) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid order information."

    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| AREEBA CONNECTION
|--------------------------------------------------------------------------
|
| THIS PART WILL BE CONNECTED TO YOUR
| AREEBA MERCHANT ACCOUNT.
|
| We do NOT invent API credentials or
| endpoints here.
|
*/


/*
 * Example result for now.
 *
 * Once your Areeba Merchant credentials
 * are available, this section will create
 * the real hosted checkout session.
 */


/* =========================================
   TEMPORARY RESPONSE
========================================= */

echo json_encode([

    "success" => false,

    "message" =>
        "Areeba payment gateway is not connected yet."

]);

exit;

?>
