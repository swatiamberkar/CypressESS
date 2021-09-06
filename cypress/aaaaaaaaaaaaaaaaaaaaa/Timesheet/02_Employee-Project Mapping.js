
describe('Employee - Project Mapping', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var managerID = 'ABC001'
	var employeeID = 'ABC003'
	
	var project = 'Pocket HRMS'
	var project1 = 'Automation'
	
		
	beforeEach(function(){
        cy.getCookies()
	})
   
	
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Employee - Project Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Employee-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=EmployeeProjectMapping');
	})
		
	it('Verify Validation - Select Employee Code.', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('button[value="Save"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Select Employee Code.')	  		  
	})

	it('Verify Validation - Select Project name', function () {
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Select Project name')
	})

	it('Save Employee - Project Mapping', function () {
		cy.get('#drpPrjctCategory').select(project)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})

	it('Verify Saved Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Employee Code"]').eq(lastField).should('contain', employeeID)
				cy.get('[title="Project  Name"]').eq(lastField).should('contain', project)
			})
	})

	it('Verify Validation - Duplicate Employee Code And Project Name', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('#drpPrjctCategory').select(project)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate Employee Code And Project Name')
		cy.xpath("//button[contains(text(),'Close')]").click({ force: true })
	})

	it('Update Employee - Project Mapping', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

				cy.get('#select2-multiEmp-container').click({ force: true })
				cy.get('input[type="search"]').click({ force: true })
				cy.get('input[type="search"]').type(managerID)
				cy.get('.select2-results__option--highlighted').click({ force: true })
				cy.wait(500)
				cy.get('#drpPrjctCategory').select(project1)
				cy.get('button[value="Save"]').click({ force: true })
				cy.get(".toast-message").should('contain', 'Record Save Successfully')
			})
	})

	it('Verify Updated Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Employee Code"]').eq(lastField).should('contain', managerID)
				cy.get('[title="Project  Name"]').eq(lastField).should('contain', project1)
			})
	})
		

	it('Delete Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('.text-danger').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'Record Delete sucessfully')
			})
	})

	it('Verify Deleted Employee - Project Mapping', function () {
		cy.wait(10000)
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Employee Code"]').eq(lastField).should('not.contain', managerID)
				cy.get('[title="Project  Name"]').eq(lastField).should('not.contain', project1)
			})
	})

	

})
	