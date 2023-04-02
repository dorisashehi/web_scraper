const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {
    //initiate the browser 
    const browser = await puppeteer.launch();

    //create a new in headless chrome 
    const page = await browser.newPage();

    //go to target website 
    await page.goto('https://www.ryanair.com/ie/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2023-05-25&dateIn=&isConnectedFlight=false&discount=0&isReturn=false&promoCode=&originIata=MXP&destinationIata=VIE&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=2023-05-25&tpEndDate=&tpDiscount=0&tpPromoCode=&tpOriginIata=MXP&tpDestinationIata=VIE', {
        //wait for content to load 
        waitUntil: 'networkidle0',
    });

    //create an object to save datas.
    const flight_information = {};

    //get informations of the flight and save to flight_information object
    let flight_direction = await page.$eval('.header__title', div => div.textContent);
    let flight_number = await page.$eval('.card-flight-num__content', div => div.textContent);
    let flight_departure_time = await page.$eval('[data-ref= "flight-segment.departure"]', div => div.querySelector('.time__hour').textContent);
    let flight_origin_airport = await page.$eval('[data-ref= "flight-segment.departure"]', div => div.querySelector('.time__city').textContent);
    let flight_duration = await page.$eval('.duration', div => div.textContent);
    let flight_arrival_time = await page.$eval('[data-ref= "flight-segment.arrival"]', div => div.querySelector('.time__hour').textContent);
    let flight_arrival_airport = await page.$eval('[data-ref= "flight-segment.arrival"]', div => div.querySelector('.time__city').textContent);
    let flight_old_price = await page.$eval('.price-old-value', div => div.textContent);
    let flight_discounted_price = await page.$eval('.price-value--discounted', div => div.textContent);
    if (await page.$('.price-fares-left') !== null) {
        let flight_seats_left = await page.$eval('.price-fares-left', div => div.textContent);
        flight_information.SeatsLeft = flight_seats_left;
    }

    flight_information.Flight = flight_direction;
    flight_information.FlightNo = flight_number;
    flight_information.DepartureTime = flight_departure_time;
    flight_information.OriginAirport = flight_origin_airport;
    flight_information.Duration = flight_duration;
    flight_information.ArrivalTime = flight_arrival_time;
    flight_information.ArrivalAirport = flight_arrival_airport;
    flight_information.OldPrice = flight_old_price;
    flight_information.DiscountedPrice = flight_discounted_price;

    //print the informations taken.
    console.log(flight_information);

    //store all the information takes to a json file.
    await fs.writeFile('flight-details.json', JSON.stringify(flight_information));

    //get full page html of www.ryanair.com website
    //const html = await page.content();

    //store html content in the ryanair.html file
    //await fs.writeFile('ryanair.html', html);

    //close headless chrome 
    await browser.close();
})();

