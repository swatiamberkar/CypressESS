

describe('06_Timesheet Summary', function () {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Cypress.moment().subtract(1, "days").format("DD/MM/YYYY");
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
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Navigate to Project Master', function() {	
		cy.visit(Cypress.env('url') + 'ProjectManagement/Transaction/ProjectManagementRequest');
		cy.get('#TimesheetSummaryNew').click();
		cy.wait(3000)
	})

	it('Verify Edit Functionality', function () {
		
		cy.get('#Edit > .fa').click({ force: true })

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#drpProject').select(project2)
		cy.get('#drpTask').select(task2)
		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('07')

		cy.get('#txtTotalMin').click({ force: true })
		cy.get('#txtTotalMin').clear().type('00')
		cy.get('#IsBillableEntry').click({ force: true })
		cy.get('#Description').click({ force: true })
		cy.get('#Description').clear().type('Testing')
		cy.get('#btnConfirm').click({ force: true })

		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Entry Update Successfully');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
		})
		cy.get('.sorting_1').should('contain', project2)
		cy.get('.odd > :nth-child(2)').should('contain', task2)
		cy.get('.odd > :nth-child(3)').should('contain', currentDate)
		cy.get('.odd > :nth-child(4)').should('contain', yasterdayDate)
		cy.get('.odd > :nth-child(5)').should('contain', 'Testing')
		cy.get('.odd > :nth-child(6)').should('contain', '07:00')
		cy.get('.odd > :nth-child(7)').should('contain', 'No')
		cy.get('[style="width: 14%;"] > b').should('contain', ' 7 : 0 ')

	})

		it('Verify Delete Functionality', function () {
			cy.get('.fa-trash').click({ force: true })
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Entry Deleted Successfully.');
				cy.wait(500)
				cy.get(".noty_body").click({ force: true })
			})
			cy.get('.alert').should('contain', 'No Records Found.')
			
		})
	

	it('Add Timeshhet Entry', function () {
		cy.get('#TimesheetEntryNew').click();
	
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

	it('Verify Timeshhet Entry in Summary page', function () {
		cy.get('#TimesheetSummaryNew').click();

		cy.get('.sorting_1').should('contain', project1)
		cy.get('.odd > :nth-child(2)').should('contain', task)
		cy.get('.odd > :nth-child(3)').should('contain', currentDate)
		cy.get('.odd > :nth-child(4)').should('contain', currentDate)
		cy.get('.odd > :nth-child(5)').should('contain', 'Worked on ' + project1)
		cy.get('.odd > :nth-child(6)').should('contain', '08:00')
		cy.get('.odd > :nth-child(7)').should('contain', 'Yes')
		cy.get('[style="width: 14%;"] > b').should('contain', ' 8 : 0 ')

	})

	it('Verify Validation Messages - Please Select Atleast One Entry!!!', function () {

		cy.get('#approvbtn').click({ force: true })
		cy.get('.noty_body').should('contain', 'Please Select Atleast One Entry!!!')
		
	})

	it('Approve Timesheet Entry', function () {
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')
	})

	it('Verify Timesheet Entry details', function () {
		cy.get('#btnApproval').click({ force: true })
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.xpath("//table[@id='tableSorter']//tr/td[4]").eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == currentDate) {
					softExpect(text.trim()).to.eq(currentDate);
					cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project1)
					cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task)
					cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', 'Worked on ' + project1)
					cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Yes')
					cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '08:00')
					cy.get('.btn-danger').eq(2).click()
				}

			})
		})
	})

	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Hours Setting', function () {
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_HoursSetting').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=HoursSetting');
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.wait(5000)
		cy.get('[placeholder="Search"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(employeeID2)
		cy.get('#allCheck').click({ force: true })
		cy.get('#btnsubmit').click({ force: true })

	})

/*	it('Verify Validation Messages - Please Select Atleast One Entry!!!', function () {
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Select Atleast One Entry!!!');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
			cy.wait(500)
		})
	})
	*/

})