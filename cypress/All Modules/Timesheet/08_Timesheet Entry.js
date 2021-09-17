

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
	var project1 = 'Project Testing'

	
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

	


	/*it('Login into Pocket ESS', function () {
		cy.Login(employeeID, pwd)
		})
		
		it('Navigate to Project Master', function() {	
			cy.visit(Cypress.env('url') +'/Timesheet/Transaction/TimesheetRequest');
			cy.get('#TimeEntry').click();
			cy.wait(3000)
		})
			
		it('Verify Validation Messages - Please Select Project', function() {	
		
			cy.get('#btnAdd').click({ force: true })
			cy.get(".noty_body").should('contain', 'Please Select Project')
			cy.get(".noty_body").click({ force: true })	  		  
		})
	
	it('Verify Validation Messages - Please Select Task', function () {
		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project)
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
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'No')
		})
	
		it('Verify Edit Functionality', function () {
			cy.get("#tblTime").find("tr").its('length').as('intialLength');
			cy.get('.fa-edit').click({ force: true })
	
			cy.get('@intialLength').then(intialLength => {
				cy.get("#tblTime").find("tr").should("have.length", intialLength - 1);
			})
		})
	
	
	it('Verify Delete Functionality', function () {
		cy.reload()
		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.get('input[type="search"]').eq(1).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task)
		cy.get('.select2-results__option--highlighted').click({ force: true })

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
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')
	
			cy.get('#btnConfirm').click()
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
				cy.get(".noty_body").click()
			})
	
			cy.xpath("//table[@id='tblTimeData']//tr/td[1]").should('contain', project)
			cy.xpath("//table[@id='tblTimeData']//tr/td[2]").should('contain', task)
			cy.xpath("//table[@id='tblTimeData']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTimeData']//tr/td[9]").should('contain', 'Worked on ' + project)
			cy.xpath("//table[@id='tblTimeData']//tr/td[10]").should('contain', 'Yes')
			//cy.xpath("//table[@id='tblTimeData']//tr/td[15]").should('contain', 'Approved')
			cy.xpath("//table[@id='tblTimeData']//tr/td[15]").should('contain', 'Pending')
			cy.get(':nth-child(3) > b').should('contain', '8:0')
	
		})
	*/
	
/*		it('Verify Validation - 24 Hours Total Limit Exceed', function () {
			cy.get('.select2-selection__placeholder').click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(project)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(task)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#btnAdd').click({ force: true })

			cy.get('.select2-selection__placeholder').click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(project)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(task)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#btnAdd').click({ force: true })

			cy.get('.select2-selection__placeholder').click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(project)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
			cy.get('input[type="search"]').eq(1).click({ force: true })
			cy.get('input[type="search"]').eq(1).type(task)
			cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#btnAdd').click({ force: true })
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('24 Hours Total Limit Exceed');
				cy.wait(500)
			})
		})
*/
/*	it('Verify Punch In-Out Time', function () {
		cy.get('#punchTime').should('contain', 'Punch not found')
		
	})
*/
/*	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

/*	it('Assign manager 1 for Timesheet module from Approval Matrix', function () {
		const { softAssert, softExpect } = chai;

		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(5000)
		cy.get('[title="Add Approval Matrix Manager"]').click({ force: true })

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#TimesheetEntry').click({ force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			cy.wait(3000)
		})

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
			cy.wait(2000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Timesheet Entry')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

	})
	
	*/

/*	it('Add Shift Schedule', function () {
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({ force: true })
		cy.wait(5000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#ShiftName').select('General')
		cy.wait(1000)

		cy.get('#dateRange').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate + ' to ' + endDate)
		})


		cy.wait(1000)
		cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
		cy.wait(5000)

		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		cy.wait(5000)
	})

	it('Verify Modified Punch', function () {
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click()
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(15000)
		cy.apply_InOutCoreDetailsFilter()

		cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(11)>div>a').click({ force: true })
		cy.wait(1000)
		cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Modified Punch')]").click({ force: true })
		cy.wait(2000)

		cy.get('#Type').select('FULLDAY PRESENT', { force: true })


		cy.get('#tmInTimeHourModifiedPunch').click({ force: true })
		cy.get('#tmInTimeHourModifiedPunch').clear()
		cy.get('#tmInTimeHourModifiedPunch').type('09')

		cy.get('#tmInTimeMinModifiedPunch').click({ force: true })
		cy.get('#tmInTimeMinModifiedPunch').clear()
		cy.get('#tmInTimeMinModifiedPunch').type('00')

		cy.get('#tmOutTimeHourModifiedPunch').click({ force: true })
		cy.get('#tmOutTimeHourModifiedPunch').clear()
		cy.get('#tmOutTimeHourModifiedPunch').type('18')

		cy.get('#tmOutTimeMinModifiedPunch').click({ force: true })
		cy.get('#tmOutTimeMinModifiedPunch').clear()
		cy.get('#tmOutTimeMinModifiedPunch').type('00')

		cy.get('#btnSave').click({ force: true })


		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Record saved successfully.!')
			cy.get(".toast-message").click({ force: true })
		})


		cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(3)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(4)').invoke('text').then((OutTime) => {
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(2)').invoke('text').then((EntryDate) => {
					cy.log("EntryDate: " + EntryDate)
					cy.log("InTime: " + InTime)
					cy.log("OutTime: " + OutTime)

					expect(EntryDate.trim()).equal(startDate)
					expect(InTime.trim()).equal('09:00')
					expect(OutTime.trim()).equal('18:00')


				})
			})
		})

	})
	*/

/*	it('Navigate to TimeSheet Lock', function () {
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetLock').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetLock');
	})

	it('Lock Timesheet ', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully Locked for Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'Yes')

	})
*/
	it('Login into Pocket ESS', function () {
		cy.Login(employeeID, pwd)
		cy.visit('https://essstaging.azurewebsites.net/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimeEntry').click();
	})

/*	it('Verify Punch In-Out Time', function () {
		cy.get('#txtToDate').click()
		cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="July 1, 2021"]').click({ force: true })
		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.get('#punchTime').should('contain', '09:00 - 18:00')
		cy.get('#totalWorkingTime').should('contain', '09:00')
	})

	it('Verify Validation - TimeSheet Is Lock For This Date!!', function () {
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

		cy.get('#btnAdd').click({ force: true })
		cy.get(".noty_body").should('contain', 'TimeSheet Is Lock For This Date!!')

	})
*/
	it('Verify Records in Previous Records Table', function () {
	/*	cy.reload()
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

		cy.get('#isBillableHours').click()
		cy.get('#btnAdd').click({ force: true })

		cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '08:00')
		cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')

		cy.get('#btnConfirm').click()
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
			cy.get(".noty_body").click()
		})
		*/
		//cy.get('#txtToDate').click()
		//cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="July 1, 2021"]').click({ force: true })

		cy.xpath("//table[@id='tblTimeData']//tr/td[1]").should('contain', project)
		cy.xpath("//table[@id='tblTimeData']//tr/td[2]").should('contain', task)
		cy.xpath("//table[@id='tblTimeData']//tr/td[3]").should('contain', client)
		cy.xpath("//table[@id='tblTimeData']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTimeData']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTimeData']//tr/td[8]").should('contain', '08:00')
		cy.xpath("//table[@id='tblTimeData']//tr/td[9]").should('contain', 'Worked on ' + project)
		cy.xpath("//table[@id='tblTimeData']//tr/td[10]").should('contain', 'Yes')
		cy.xpath("//table[@id='tblTimeData']//tr/td[15]").should('contain', 'Pending')
		cy.get(':nth-child(3) > b').should('contain', '8:0')

	})

	it('Verify Record according Hours setting for less Time', function () {
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(tomorrowDate)
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

		cy.get(".noty_body").should('contain', 'future date entry is not allowed')

	})
	
})