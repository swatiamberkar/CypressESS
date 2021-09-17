
describe('Hours Setting', function() {
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

	it('Navigate to Hours Setting', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_HoursSetting').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=HoursSetting');
	})
		
	it('Verify Validation - Select atleast one category', function() {	
		cy.get('[value="View"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Select atleast one category')	  		  
	})

	it('Update Hours', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').clear().type('7:00')
		cy.get('#btnsubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully!!')
	})

	it('Verify Updated Hours', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').should('have.value', '7:00')
	})

	it('Update Present all Days', function () {
		//cy.get('#catall').click({ force: true })
		//cy.get('[value="View"]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').click({ force: true })
		cy.get('#btnsubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully!!')
	})

	it('Verify Updated Hours', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').should('not.be.checked');
	})

})
	