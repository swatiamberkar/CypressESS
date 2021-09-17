

describe('03_Timesheet Entry without Manager', function () {
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

	Cypress.Commands.add('apply_InOutCoreDetailsFilter', () => {
		cy.get('#attendanceContentTitle a:nth-child(2)').click({ force: true })
		cy.wait(2000)

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})

		cy.wait(5000)
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})

		cy.get('#btnFilterEarningDeduction').click({ force: true })
		cy.wait(5000)
	})

	Cypress.Commands.add('navigate_EmployeeProfile', () => {
		cy.wait(1000)
		cy.get('#globalSearch').click({ force: true })
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({ force: true })
		cy.wait(3000)
	})
	

	it('Login into Pocket ESS', function () {
		cy.EssLogin(employeeID1, employeeID1)
		})
		
		it('Navigate to Project Master', function() {	
			cy.visit(Cypress.env('url')+'ProjectManagement/Transaction/ProjectManagementRequest');
			cy.get('#TimesheetEntryNew').click();
		})
			
		it('Verify Validation Messages - Please Select Project', function() {	
		
			cy.get('#btnAdd').click({force: true})
			 cy.get(".noty_body").invoke('text').then((text) => {
				 softExpect(text.trim()).to.eq('Please Select Project');
			 cy.wait(500)
				 cy.get(".noty_body").click({ force: true })
				 cy.wait(500)
			  })	  		  
		})
	
	it('Verify Validation Messages - Please Select Task', function () {
		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(project1)
		cy.get('.select2-results__option--highlighted').click({ force: true })


			cy.get('#btnAdd').click({ force: true })
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Please Select Task');
				cy.wait(500)
				cy.get(".noty_body").click({ force: true })
			})
		})
	
	it('Verify Records in Table', function () {
		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project1)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[7]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', 'Worked on ' + project1)
			cy.xpath("//table[@id='tblTime']//tr/td[13]").should('contain', 'No')
		})
	
		it('Verify Edit Functionality', function () {
			cy.get("#tblTime").find("tr").its('length').as('intialLength');
			cy.get('.fa-edit').click({ force: true })
	
			cy.get('@intialLength').then(intialLength => {
				cy.get("#tblTime").find("tr").should("have.length", intialLength - 1);
			})
		})
	
	
		it('Verify Delete Functionality', function () {
			cy.get('#btnAdd').click({ force: true })
			cy.get("#tblTime").find("tr").its('length').as('intialLength');
			cy.get('.fa-trash').click({ force: true })
	
			cy.get('@intialLength').then(intialLength => {
				cy.get("#tblTime").find("tr").should("have.length", intialLength - 1);
			})
		})
	
		it('Verify Records in Previous Records Table', function () {
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
			cy.xpath("//table[@id='tblTimeData']//tr/td[14]").should('contain', 'Approved')
	
		})
	
	
	it('Verify Validation - 24 Hours Total Limit Exceed', function () {
		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(project1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#btnAdd').click({ force: true })

		
		cy.get('#btnAdd').click({ force: true })


		cy.get('#btnAdd').click({ force: true })

			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('24 Hours Total Limit Exceed');

			})
		})
	
	it('Verify Punch In-Out Time', function () {
		cy.get('#punchTime').should('contain', 'Punch not found')
	})

	it('Verify Validation Messages - future date entry is not allowed', function () {
		cy.reload()
		const tomorrow = Cypress.moment().add(1, "days").format('MMMM D, YYYY');
		cy.get('#txtToDate').click()
		cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + tomorrow + '"]').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(project1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		
		cy.get('#btnAdd').click({ force: true })
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('future date entry is not allowed');
		})
	})

	it('Verify Validation Messages - TimeSheet Is Lock For This Date!!', function () {
		cy.reload()
		const yasterday = Cypress.moment().subtract(1, "days").format('MMMM D, YYYY');
		cy.get('#txtToDate').click()
		cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + yasterday+'"]').click({ force: true })
	

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(project1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#btnAdd').click({ force: true })
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('TimeSheet Is Lock For This Date!!');
		})
	})
	
	

})