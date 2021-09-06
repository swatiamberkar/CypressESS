
describe('07_Approval', function () {
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

	var managerID = 'P13'
	var managerName = 'Timesheet Manager'
	var employeeID1 = 'P14'
	var employeeName1 = 'Timesheet User1'
	var employeeID2 = 'P15'
	var employeeName2 = 'Timesheet User2'

	var project = 'Project-27'
	var project1 = 'Project-28'
	var project2 = 'Project-29'

	var task = 'Task-1'
	var task2 = 'Task-2'


	beforeEach(function () {
		cy.getCookies()
	})

	it('Login into Pocket ESS', function () {
		cy.EssLogin(managerID, managerID)
		})
		
	it('Navigate to Approval', function () {	

		cy.visit(Cypress.env('url') + 'ProjectManagement/Transaction/ProjectManagementApproval');
		cy.get('#TimesheetApproval').click();
		})
	
		it('Approve Timesheet Request', function () {
			cy.xpath('//tbody/tr[1]/td[5]/input[1]').click({ force: true })
			cy.xpath("//button[contains(text(),'Save')]").click();
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Data Approved/Rejected successfully!');
				cy.wait(500)
				cy.get(".noty_body").click({ force: true })
			})
			
		})


	

})