
describe('Project Client Mapping', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	

	var clientcode = 'A01'
	var clientname = 'Client_1'
	var clientstatus = 'Active'

	var clientcode1 = 'A02'
	var clientname1 = 'Client_2'
	var clientstatus1 = 'Active'

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

	it('Add Client 1', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientcode)
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientname)
		cy.get('#clientstat').select(clientstatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet Client Added Successfully.')
		cy.wait(10000)
	})

	it('Add Client 2', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientcode1)
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientname1)
		cy.get('#clientstat').select(clientstatus1)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet Client Added Successfully.')
		cy.wait(10000)
	})

	it('Navigate to Project Client Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_ProjectClientMappingScreen').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=Timesheet_EmployeeClient');
	})
		
	it('Verify Validation - Select Client Name', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#btnSubmit').click({force: true})
		cy.get(".toast-message").should('contain', 'Select Client Name')	  		  
	})

	it('Verify Validation -Select Project Name', function () {
		cy.get('#ClientName').select(clientname)
		cy.get('#btnSubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Select Project Name')
	})

	it('Save Project Client Mapping', function () {
		cy.get('#ProjectName').select(project)
		cy.get('#btnSubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet client mapped successfully!')
		cy.wait(10000)
	})

	it('Verify Saved Project Client Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientname)
				cy.get('[title=" Project Name"]').eq(lastField).should('contain', project)
			})
	})

	it('Verify Validation - Duplicate Client Name And Project Name', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#ClientName').select(clientname)
		cy.get('#ProjectName').select(project)
		cy.get('#btnSubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate Client Name And Project Name')
		cy.xpath("//button[contains(text(),'Close')]").click({ force: true })
	})

	it('Update Project Client Mapping', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })
				cy.get('#ClientName').select(clientname1)
				cy.get('#ProjectName').select(project1)

				cy.get('#btnupdate').click({ force: true })
				cy.get(".toast-message").should('contain', 'Timesheet Client Update Successfully.')
			})
		cy.wait(10000)
	})

	it('Verify Updated Project Client Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientname1)
				cy.get('[title=" Project Name"]').eq(lastField).should('contain', project1)
			})
	})
		

	it('Delete Project Client Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Delete Record"]').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'Timesheet client deleted successfully!')
			})
		cy.wait(10000)
	})

	it('Verify Deleted Project Client Mapping', function () {
	
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Name of the Client"]').eq(lastField).should('not.contain', clientname1)
				cy.get('[title=" Project Name"]').eq(lastField).should('not.contain', project1)
			})
	})


})
	