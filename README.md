# web_scraper
Scrap data from https://www.ryanair.com/

To run that code, execute into terminal that command:
node flights.js

The script gets content from website https://www.ryanair.com/ 
and selects content based on classes puted to the DOM. 
We can see these classes on that website with inspect element.

The datas taken from website can be seen on terminal and is shown in that format:

{
  Flight: ' Milan Malpensa to Vienna  ',
  FlightNo: ' FR 215 ',
  DepartureTime: ' 16:00 ',
  OriginAirport: ' Milan Malpensa ',
  Duration: ' Duration 1h 30m ',
  ArrivalTime: ' 17:30 ',
  ArrivalAirport: ' Vienna ',
  OldPrice: '€18.99\n',
  DiscountedPrice: '€16.72\n'
}
