

describe('Timesheet Approval', function () {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2 + '/' + Month + '/' + year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year
	var ts = '';

	var managerID = 'ABC001'
	var employeeID = 'ABC004'
	var pwd = '123456'
	var employeeID1 = 'S04'


	var project = 'PR-4'
	var task = 'Testing Script'
	var client = 'simens'
	var project1 = 'PR-2'
	var task1 = 'ATTENDENCE'
	var client1 = 'Automation'

	
	var description = 'Testing of Task-1'
	var estimatedTime = '150'
	var startDate = '01/05/2021'
	var endDate = '31/05/2021'

	var task2 = 'Task-2'
	var description2 = 'Testing of Task-2'
	var estimatedTime2 = '200'
	var startDate2 = '01/06/2021'
	var endDate2 = '31/06/2021'
	var priority = 'High'
	var file = 'VaccineInfo.pdf'


	beforeEach(function () {
		cy.getCookies()
	})

	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var startDate = '01/07/' + FinancialYear_From
	var endDate = '13/07/' + FinancialYear_From




	it('Login into Pocket ESS', function () {
		cy.Login(managerID, pwd)
	})
		
		it('Navigate to Project Master', function() {	
			cy.visit(Cypress.env('url') +'Timesheet/Transaction/TimesheetApproval');
			cy.get('#FinanceReport').click();
			cy.wait(3000)
		})
			
	it('Verify Validation Messages - Please Select Accept or Reject Action!!!', function() {
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Select Accept or Reject Action!!!')
	})
	

})