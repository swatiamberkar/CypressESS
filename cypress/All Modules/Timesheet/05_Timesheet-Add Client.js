
describe('Add Client', function() {
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
	var clientcode = 'A01'
	var clientname = 'Client_1'
	var clientstatus = 'Active'

	var clientcode1 = 'A02'
	var clientname1 = 'Client_2'
	var clientstatus1 = 'Dormat'
	var Address1 = 'Mumbai'
	var description1  = 'Testing'

	var project = 'Pocket HRMS'
	var project1 = 'Automation'
	var task = 'RECRUITMENT'
	var task1 = 'ATTENDENCE'
		
		
	
		
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

	it('Navigate to Add Client', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Timesheet-AddClient').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=AddClient');
	})
		
	it('Verify Validation - Enter Code of the Client', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#btnsave').click({force: true})
		cy.get(".toast-message").should('contain', 'Enter Code of the Client')	  		  
	})

	it('Verify Validation - Enter Name of the Client', function () {
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientcode)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Enter Name of the Client')
	})

	it('Verify Validation - Select Status', function () {
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientname)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Select Status')
	})

	it('Save Client', function () {
		cy.get('#clientstat').select(clientstatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet Client Added Successfully.')
		cy.wait(10000)
	})

/*	it('Verify Saved Client', function () {
		
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Code of the Client"]').eq(lastField).should('contain', clientcode)
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientname)
				cy.get('[title="Address"]').eq(lastField).should('contain', '')
				cy.get('[title="Address"]').eq(lastField).should('contain', '')
				cy.get('[title="Address"]').eq(lastField).should('contain', clientstatus)
				
			})

	})
*/
	it('Verify Validation - Duplicate code .Please Enter Another code', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientcode)
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientname)
		cy.get('#clientstat').select(clientstatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate code .Please Enter Another code')
		cy.xpath("//button[contains(text(),'Close')]").click({ force: true })
	})

	it('Update Client', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

				cy.get('#clientcode').click({ force: true })
				cy.get('#clientcode').clear().type(clientcode1)
				cy.get('#clientname').click({ force: true })
				cy.get('#clientname').clear().type(clientname1)
				cy.get('#ClientAdd').click({ force: true })
				cy.get('#ClientAdd').clear().type(Address1)
				cy.get('#clientdesc').click({ force: true })
				cy.get('#clientdesc').clear().type(description1)
				cy.get('#clientstat').select(clientstatus1)
				cy.get('#btnupdate').click({ force: true })

				cy.get(".toast-message").should('contain', 'Timesheet Client Update Successfully.')
			})
		cy.wait(10000)
	})

/*	it('Verify Updated Client', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Code of the Client"]').eq(lastField).should('contain', clientcode1)
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientname1)
				cy.get('[title="Address"]').eq(lastField).should('contain', Address1)
				cy.get('[title="Address"]').eq(lastField).should('contain', description1)
				cy.get('[title="Address"]').eq(lastField).should('contain', clientstatus1)
			})
	})
		
*/
	it('Delete Client', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('.text-danger').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'TimeSheet Client Deleted Successfully.')
			})
		cy.wait(10000)
	})

/*	it('Verify Deleted Client', function () {
		
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Code of the Client"]').eq(lastField).should('not.contain', clientcode1)
				cy.get('[title="Name of the Client"]').eq(lastField).should('not.contain', clientname1)
				cy.get('[title="Address"]').eq(lastField).should('not.contain', Address1)
				cy.get('[title="Address"]').eq(lastField).should('not.contain', description1)
				cy.get('[title="Address"]').eq(lastField).should('not.contain', clientstatus1)
			})
	})

	*/

})
	