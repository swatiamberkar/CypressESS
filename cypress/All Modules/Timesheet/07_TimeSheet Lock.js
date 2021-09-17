
describe('TimeSheet Lock', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year

	var employeeID = 'ABC003'
	
	beforeEach(function(){
        cy.getCookies()
	})
   
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to TimeSheet Lock', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetLock').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetLock');
	})
		
	it('Verify Validation (View button)  - Please select Employee or Business unit!', function() {	
		cy.get('#btnView').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')	  		  
	})

	it('Verify Validation (View button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnView').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (View button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('View Timesheet Lock', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'No')
		
	})

	it('Verify Validation (Lock button)  - Please select Employee or Business unit!', function () {
		cy.reload()
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')
	})

	it('Verify Validation (Lock button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (Lock button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('Lock Timesheet ', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully Locked for Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'Yes')

	})

	it('Verify Validation (Delete button)  - Please select Employee or Business unit!', function () {
		cy.reload()
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')
	})

	it('Verify Validation (Delete button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (Delete button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('Delete Timesheet ', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully UnLocked For Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'No')

	})


})
	