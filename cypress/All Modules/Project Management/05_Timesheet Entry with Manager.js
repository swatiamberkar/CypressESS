

describe('05_Timesheet Entry with Manager', function () {
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
		cy.EssLogin(employeeID2, employeeID2)
		})

	it('Navigate to Project Master', function () {
		cy.visit(Cypress.env('url') + 'ProjectManagement/Transaction/ProjectManagementRequest');
		cy.get('#TimesheetEntryNew').click();
	}) 
	it('Verify Punch In-Out Time', function () {
		cy.get('#punchTime').should('contain', '09:00 - 18:00')
		cy.get('#totalWorkingTime').should('contain', '09:00')
	})

		


	it('Verify Records in Previous Records Table', function () {
		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(project1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project1)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[7]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', 'Worked on ' + project1)
			cy.xpath("//table[@id='tblTime']//tr/td[13]").should('contain', 'Yes')
	
			cy.get('#btnConfirm').click()
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
				cy.get(".noty_body").click()
			})
	
			cy.xpath("//table[@id='tblTimeData']//tr/td[1]").should('contain', project1)
			cy.xpath("//table[@id='tblTimeData']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTimeData']//tr/td[3]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[7]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTimeData']//tr/td[8]").should('contain', 'Worked on ' + project1)
			cy.xpath("//table[@id='tblTimeData']//tr/td[9]").should('contain', 'Yes')
		cy.xpath("//table[@id='tblTimeData']//tr/td[14]").should('contain', 'Pending')
		cy.get(':nth-child(3) > b').should('contain', '8:0')
	
		})
	

})