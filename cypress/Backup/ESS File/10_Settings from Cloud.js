
describe('10_Settings from Cloud', function () {
	// Update emp code in excel import
	// Same Emp & Projects name update in all page of PM
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

	var clientCode1 = ''
	var clientName1 = ''
	var clientCode2 = ''
	var clientName2 = ''
	var clientCode3 = ''
	var clientName3 = ''

	before(function () {
		
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

			 clientCode1 = this.data.clientCode1
			 clientName1 = this.data.clientName1
			 clientCode2 = this.data.clientCode2
			 clientName2 = this.data.clientName2
			 clientCode3 = this.data.clientCode3
			 clientName3 = this.data.clientName3
		})
	})
	
	beforeEach(function(){
        cy.getCookies()
	})

	Cypress.Commands.add('apply_InOutCoreDetailsFilter', () => {
		cy.get('#attendanceContentTitle a:nth-child(2)').click({ force: true })
		cy.wait(2000)

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.wait(5000)
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)

		})

		cy.get('#btnFilterEarningDeduction').click({ force: true })
		cy.wait(5000)
	})

	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()

	})

/*	it('Add Task - Project Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Task-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TaskProjectMapping');
	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project3)
		cy.wait(2000)
		cy.get('#drpPrjctCategory').select(project3)
		cy.get('.col-sm-6>label').each(($e1, index, $list) => {
			const text=$e1.text()
			if(text.includes(task3))
			{
				cy.xpath("//input[@id='TaskChk']["+(index+1)+"]").click({ force: true })				
			}
			if(text.includes(task2))
			{
				cy.xpath("//input[@id='TaskChk']["+(index+1)+"]").click({ force: true })				
			}		
		})
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')

		cy.get('[data-search="ProjectName"]').should('contain', project3)
		cy.get('[data-search="TaskName"]').should('contain', task3)
		cy.get('[data-search="TaskName"]').should('contain', task2)
	})

	it('Add Employee - Project Mapping', function () {
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Employee-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=EmployeeProjectMapping');
	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.contains('li', '['+employeeID1+']').click({ force: true })
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('#drpPrjctCategory').select(project3)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
		cy.get('#PartialEmployees')
		.find('.media')
		.then(listing => {
			const listingCount = Cypress.$(listing).length;
			var lastField = listingCount - 1

			cy.get('[title="Employee Code"]').eq(lastField).should('contain', employeeID1)
			cy.get('[title="Project  Name"]').eq(lastField).should('contain', project3)
		})

		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID2)
		cy.contains('li', '['+employeeID2+']').click({ force: true })
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('#drpPrjctCategory').select(project3)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
		cy.get('#PartialEmployees')
		.find('.media')
		.then(listing => {
			const listingCount = Cypress.$(listing).length;
			var lastField = listingCount - 1

			cy.get('[title="Employee Code"]').eq(lastField).should('contain', employeeID2)
			cy.get('[title="Project  Name"]').eq(lastField).should('contain', project3)
		})
	})

	it('Add Project Client Mapping', function () {
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_ProjectClientMappingScreen').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=Timesheet_EmployeeClient');

		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#ClientName').select(clientName3)
		cy.get('#ProjectName').select(project3)
		cy.get('#btnSubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet client mapped successfully!')
		cy.wait(10000)
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientName3)
				cy.get('[title=" Project Name"]').eq(lastField).should('contain', project3)
			})

			cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#ClientName').select(clientName2)
		cy.get('#ProjectName').select(project3)
		cy.get('#btnSubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet client mapped successfully!')
		cy.wait(10000)
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientName2)
				cy.get('[title=" Project Name"]').eq(lastField).should('contain', project3)
			})
	})

	it('Lock Timesheet for Yasterday Date ', function () {
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetLock').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetLock');

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.contains('li', '['+employeeID1+']').click({ force: true })

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
		cy.get('input[type="search"]').type(employeeID1)
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.contains('li', '['+employeeID1+']').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID1)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'Yes')

	})

	it('Assign manager for Timesheet module', function () {
		
		cy.navigate_EmployeeProfile(employeeID2)
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(15000)
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
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

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

	it('Add Shift Schedule', function () {
		//cy.navigate_EmployeeProfile(employeeID2, employeeName2)
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
			input.val(currentDate + ' to ' + currentDate)
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
*/
	it('Add Punch Details', function () {
		cy.navigate_EmployeeProfile(employeeID2)
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click()
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(15000)
		cy.apply_InOutCoreDetailsFilter()
		cy.wait(5000)
		cy.get('#dLabel1 > .fas').click({ force: true })
		//cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(11)>div>a').click({ force: true })
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

		cy.wait(5000)
		cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(4)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(5)').invoke('text').then((OutTime) => {
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(2)').invoke('text').then((EntryDate) => {
					cy.log("EntryDate: " + EntryDate)
					cy.log("InTime: " + InTime)
					cy.log("OutTime: " + OutTime)

					expect(EntryDate.trim()).equal(currentDate)
					expect(InTime.trim()).equal('09:00')
					expect(OutTime.trim()).equal('18:00')


				})
			})
		})

	})

})
	