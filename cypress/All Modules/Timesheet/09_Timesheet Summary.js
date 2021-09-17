

describe('Project Master', function () {
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
		cy.Login(employeeID, pwd)
	})
		
		it('Navigate to Project Master', function() {	
			cy.visit(Cypress.env('url') +'/Timesheet/Transaction/TimesheetRequest');
			cy.get('#TimesheetSummary').click();
			cy.wait(3000)
		})
			
/*	it('Verify Validation Messages - Please Select Atleast One Entry!!!', function() {		
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Select Atleast One Entry!!!')
	})
	
	it('Verify Timesheet Entry details', function () {
		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '08:00')	
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		cy.get(':nth-child(6) > b').should('contain', '8 : 0')
	})
	
	it('Approve Timesheet Entry', function () {
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')
	})

	it('Verify Timesheet Entry details', function () {
		cy.get('#btnApproval').click({ force: true })
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.xpath("//table[@id='tableSorter']//tr/td[5]").eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == currentDate) {
					softExpect(text.trim()).to.eq(currentDate);
					cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project)
					cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task)
					cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', client)
					cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project)
					cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', 'Yes')
					cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', '08:00')
					cy.get('.btn-danger').eq(2).click()
				}

				})
		})
	})
	*/

/*	it('Verify Record according Hours setting for less Time', function () {
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

			cy.get('.select2-selection__placeholder').click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(project)
			cy.get('.select2-results__option--highlighted').click({ force: true })
	
			cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(task)
			cy.get('.select2-results__option--highlighted').click({ force: true })
	
			cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(client)
			cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('07')

			cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', client)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', yasterdayDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '07:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')
	
			cy.get('#btnConfirm').click()
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
				cy.get(".noty_body").click()
			})
			

		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '07:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')

		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Hours Setting data not match for this dates :- ' + yasterdayDate)

	})

	it('Verify Record according Hours setting for greater Time', function () {
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(client)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('07')

		cy.get('#isBillableHours').click()
		cy.get('#btnAdd').click({ force: true })

		cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '07:00')
		cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')

		cy.get('#btnConfirm').click()
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
			cy.get(".noty_body").click()
		})


		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '07:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')

		cy.get('#chkApproveAll').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Hours Setting data not match for this dates :- ' + yasterdayDate)

	})
	*/
/*	it('Login into Pocket HRMS', function () {
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
		cy.get('[placeholder="Search"]').clear().type(employeeID)
		cy.get('#allCheck').click({ force: true })
		cy.get('#btnsubmit').click({ force: true })

	})
*/
	

	it('Login into Pocket ESS', function () {
		cy.Login(employeeID, pwd)
	})

	it('Verify setting of Present all day', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimesheetSummary').click();
		cy.wait(3000)
		cy.get('#chkApproveAll').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Fill the Timesheet Entry for this Dates:')

	})

/*	it('Verify Delete Functionality', function () {
		
		cy.xpath('//tbody/tr[1]/td[9]/button[1]/i[1]').click({ force: true })

		cy.get(".noty_body").should('contain', 'Entry Deleted Successfully.')
	})
*/
	it('Verify Edit Functionality', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimesheetSummary').click();
		cy.wait(3000)
		cy.xpath('//tbody/tr[1]/td[9]/a[1]/i[1]').click({ force: true })

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.get('#drpProject').select(project1)
	
		cy.get('#drpTask').select(task1)

		cy.get('#drpclientName').select(client1)

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('08')
		cy.get('#IsBillableEntry').click({ force: true })
		cy.get('#btnConfirm').click({ force: true })

		

		cy.get(".noty_body").should('contain', 'Entry Update Successfully')

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project1)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task1)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', client1)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project1)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '08:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'No')

	})

})