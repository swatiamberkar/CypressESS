
describe('Login Test', function () {
	// Update emp code in excel import
	// Same Emp & Projects name update in Timesheet Json
	// Delete Allure report before running

	const { softAssert, softExpect } = chai;
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var managerID = ''
	var employeeID1 = ''
	var employeeID2 = ''

	var project1 = ''
	var project2 = ''
	var project3 = ''

	var task1 = ''
	var task2 = ''
	var task3 = ''
		
	var filePath = 'EmployeeImport.xlsx'
	var sheetName = 'Timesheet'

/*	before(function () {
		
		cy.fixture('Timesheet').then(this, function (data) {
			this.data = data
			 managerID = this.data.managerID
			 employeeID1 = this.data.employeeID1
			 employeeID2 = this.data.employeeID2

			 project1 = this.data.project1
			 project2 = this.data.project2
			 project3 = this.data.project3

			 task1 = this.data.task1
			 task2 = this.data.task2
			 task3 = this.data.task3
		})
	})
*/
		
	beforeEach(function(){
        cy.getCookies()
	})

	it('Login into Pocket HRMS', function () {

		cy.visit(Cypress.env('url'))
		//cy.readFile('/cypress/fixtures/Login.json').then((text) =>{
			cy.fixture('Login').then((text) =>{
		text.forEach(function(entry) {	
				
   //var field = entry.CompanyCode	
  // cy.log('field '+ field)		
  
		cy.get("body").then($body => {
			if ($body.find('[onclick="return newSinIn()"]').length > 0) {
				cy.get('[onclick="return newSinIn()"]').click({ force: true })
			}
		});
	
				var comapnaycode = entry.comapnaycode
				cy.log('comapnaycode ' + comapnaycode)
	
				cy.get('#CompanyCode').click({ force: true })
				cy.get('#CompanyCode').clear();
				cy.get('#CompanyCode').type(entry.CompanyCode)
	
	
				cy.get('#EmployeeCode').click({ force: true })
				cy.get('#EmployeeCode').clear();
				cy.get('#EmployeeCode').type(entry.EmployeeCode)
	
	
				cy.get('#Password').click({ force: true })
				cy.get('#Password').clear();
				cy.get('#Password').type(entry.Password)
	
	
				cy.xpath("//button[contains(text(),'Log In')]").click({ force: true })
				cy.wait(5000)
				cy.url().then(urlString => {//do whatever)

				softExpect(urlString).to.contains('Home/Dashboard?Menu=DashBoard');
					
				cy.get('.justify-content-between').click();
				cy.get('.fa-user').click()
				cy.get('.dropdown-item:nth-child(4)').click();
				cy.url().should('contains', Cypress.env('url'));
				cy.wait(5000)

	})


			})
		})
	
	})
	

})