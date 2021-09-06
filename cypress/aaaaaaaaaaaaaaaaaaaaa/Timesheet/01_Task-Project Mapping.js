
describe('Task - Project Mapping', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	var project = 'PR-1'
	var project1 = 'PR-2'
	var task = 'Development'
	var task1 = 'Testing'


		
	
		
	beforeEach(function(){
        cy.getCookies()
	})
   
	
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Task - Project Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Task-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TaskProjectMapping');
	})
		
	it('Verify Validation - Please select Project name.', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('button[value="Save"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Project name.')	  		  
	})

	it('Verify Validation - Please select at least one Task.', function () {
		cy.get('#drpPrjctCategory').select(project)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select at least one Task.')
	})

	it('Save Task - Project Mapping', function () {
		cy.get('#TaskChk').eq(0).click({ force: true })
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})

	it('Verify Saved Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('contain', project)
		cy.get('[data-search="TaskName"]').should('contain', task)
	})

	it('Update Task - Project Mapping', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project)
		cy.xpath("//input[@id='TaskChk'][2]").click({ force: true })
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Update Successfully')
	})
		
	it('Verify Updated Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('contain', project)
		cy.get('[data-search="TaskName"]').should('contain', task1)
	})

	it('Delete Task - Project Mapping', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project)
		cy.get('[value="Delete"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Deleted Successfully')
	})

	it('Verify Deleted Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('not.contain', project)
	})

	

})
	