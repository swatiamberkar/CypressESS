
describe('Expense Mode', function() {
	const { softAssert, softExpect } = chai;

	
	var businessUnit = 'Category'
	var businessValue1 = 'Staff'
	var busnessValue2 = 'Admin'
	var mode = 'Train'
	var mode1 = 'Bus'

	var managerID = ''
	var employeeID1 = ''
	var employeeID2 = ''
	var expenseType1 = ''
	var expenseType2 = ''
	var expenseType3 = ''

		
	before(function () {
		
		cy.fixture('TestData/Expense').then(this, function (data) {
			this.data = data
			 managerID = this.data.managerID
			 employeeID1 = this.data.employeeID1
			 employeeID2 = this.data.employeeID2
			 expenseType1 = this.data.expenseType1
			 expenseType2 = this.data.expenseType2
			 expenseType3 = this.data.expenseType3

		})
	})
	
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Login into Pocket HRMS & Set Company', function() {
		cy.cloudLogin()
		cy.changeCompany()	 	
	})

	it('Navigate Expense Mode', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseMode')		
		cy.wait(2000)
		
		// cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Please select Business value', function() {	
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		 
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please select Business value');
		  })
	})
	
	it('Verify Validation Massges - Please select Expense Type.', function() {	
		cy.get('#drpValue').select(businessValue1,{force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please select Expense Type.');
		  })
	})
	
	it('Verify Validation Massges - Please Enter mode value.', function() {	
		cy.get('#claimtype').select(expenseType1,{force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please Enter mode value.');
		  })
	})
	
	it('Add Expense Mode', function() {	
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode)
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Mode Added Successfully.');
		 })
	
		})

		it('Verify added Expense Mode details', function() {
			cy.wait(10000)
		  cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1

			cy.get('[title="Expense Type"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType1);
			 })
			 
			 cy.get('[title="Mode"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(mode);
			 })
			 
		  })
	})
	
	it('Verify Validation Massges - Duplicate value found.', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#claimtype').select(expenseType1,{force: true})
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode)
		
		 cy.get('#btnSubmit').click({force: true})
		
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Duplicate value found.');
		 
		  })
	})
		
	it('Add Expense Mode.', function() {	
		//cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#claimtype').select(expenseType1,{force: true})
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode1)
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Mode Added Successfully.');
		  })
	})

	it('Delete Expense Mode', function() {	
		cy.wait(10000)
		cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Mode Deleted Successfully.');
		  })

  })
})

it('Verify Delete Functionality', function() {	
	cy.wait(8000)
	cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
  
	cy.get('[title="Mode"]').eq(lastField).should('not.contain', mode1)
		  
	})
	
})
	})
	
 
	