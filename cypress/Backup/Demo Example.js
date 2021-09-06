var fs = require('fs');
var Crypto = require('crypto-js')

 describe("Dynamically Generated Tests", () => {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	//var company='ABC INDIA PVT LTD'
	var company='NP'
	var employeeID ='L-002'
	
	
	var current_FilePath = 'D:/CypressESS/cypress/downloads/';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var gratuity = 'Gratuity'
	var incrementRegisterReport = 'IncrementRegisterReport'
	var unconfirmedStatus ='UnconfirmedStatus'
	var stopPayment = "StopPayment"
	var pendingJoiningDocs = "PendingJoiningDocs"
	
	var uptoGratuity = '01/03/2020'
	var incrementRegisterMonth='2'

	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Verify Closest time ', function() {
	const addTen = Cypress.moment().add(10, 'minutes').calendar()
	cy.log(addTen)
	var addTenMinutesTime = addTen.slice(8);
	cy.log(addTenMinutesTime)
	
	const subtractTen = Cypress.moment().subtract(10, 'minutes').calendar()
	cy.log(subtractTen)
	var subtractTenMinutesTime = subtractTen.slice(8);
	cy.log(subtractTenMinutesTime)

	const currentTime = Cypress.moment().format('DD MMM yyyy')
	cy.log(currentTime)

	var beforeTenMinutes = currentTime + " "+subtractTenMinutesTime
	cy.log("beforeTenMinutes: "+beforeTenMinutes)
	
	var afterTenMinutes = currentTime + " "+addTenMinutesTime
	cy.log("afterTenMinutes: "+afterTenMinutes)

	
	// the time in the element should be between 3pm and 5pm
	const start = Cypress.moment(beforeTenMinutes)
	const end = Cypress.moment(afterTenMinutes)

	//cy.get('.utility-moment .badge')
	//.should(($el) => {
    // parse American time like "3:38 PM"
   // const m = Cypress.moment($el.text().trim(), 'LT')
	  const m = Cypress.moment('02 Apr 2021 2:15 PM')

    // display hours + minutes + AM|PM
    const f = 'DD MMM yyyy hh:mm A'

    expect(m.isBetween(start, end),
		 //`${m} should be between ${start} and ${end}`).to.be.true
      `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
 // })
	 
	
	
 })

 })



