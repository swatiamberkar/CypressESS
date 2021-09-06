
describe('Timesheet Project DeadLine', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	var ts='';
	
	var managerID = 'ABC001'
	var employeeID = 'ABC003'
	var employeeID1 = 'S04'
	
	var project = 'Pocket HRMS'
	var project1 = 'Automation'
	var task = 'RECRUITMENT'
	var task1 = 'ATTENDENCE'
		
	var description = 'Testing of Task-1'
	var estimatedTime = '150'
	var startDate = '01/05/2021'
	var endDate = '31/05/2021'
	
	
	var description2 = 'Testing of Task-2'
	var estimatedTime2 = '200'
	var startDate2 = '01/06/2021'
	var endDate2 = '31/06/2021'
	var priority = 'High'
	var file = 'VaccineInfo.pdf'	
	
		
	beforeEach(function(){
        cy.getCookies()
	})
   
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Timesheet Project DeadLine', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetProjectDeadLine').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetProjectDeadLine');
	})
		
	it('Verify Validation - Please select Project Name', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#btnSave').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Project Name')	  		  
	})

	it('Save Timesheet Project DeadLine', function () {
		cy.get('#drpProject').select(project)
		cy.get('#btnSave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})

	it('Verify Saved Timesheet Project DeadLine', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Project Name"]').eq(lastField).should('contain', project)
			})
	})

/*	it('Verify Validation - Duplicate', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpProject').select(project)
		cy.get('#btnSave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})
*/
	it('Update Timesheet Project DeadLine', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

				cy.get('#drpProject').select(project1)
				cy.get('#dtEnd').click({ force: true }).then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(currentDate)
				})
				cy.get('#btnSave').click({ force: true })
				cy.get(".toast-message").should('contain', 'Record Save Successfully')
			})
	})

	it('Verify Updated Timesheet Project DeadLine', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Project Name"]').eq(lastField).should('contain', project1)
				cy.get('[title="Project End Date"]').eq(lastField).should('contain', currentDate)
			})
	})
		

	it('Delete Timesheet Project DeadLine', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('.text-danger').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'Delete Record Successfully')
			})
	})

	it('Verify Deleted Timesheet Project DeadLine', function () {
		cy.wait(10000)
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 
				cy.get('[title="Project Name"]').eq(lastField).should('not.contain', project1)
			})
	})


})
	