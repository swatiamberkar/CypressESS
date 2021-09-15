
describe('Expense Purpose', function() {
	const { softAssert, softExpect } = chai;
	var Purpose1 = 'Meeting'
	var Purpose2 = 'Demo'
	
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Login into Pocket HRMS & Set Company', function() {
		cy.cloudLogin()
		cy.changeCompany()	 	
	})

	it('Navigate Expense Purpose', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpensePurpose')		
		cy.wait(2000)
		
		// cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Please Enter Purpose.', function() {	
	
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Purpose.');
		
		  })
	})
	
	it('Add Expense Purpose', function() {	
	
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose1)
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Purpose Added Successfully.');
		 })
		})

		it('Verify added Expense Purpose details', function() {
		  cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	 
			 cy.get('[title="Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(Purpose1);
			 })
			 
		  })
	})
	
	it('Verify Validation Massges - Duplicate value found.', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose1)
		
		 cy.get('#btnSubmit').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Duplicate value found.');
		  })
	})
	
	it('Add Expense Purpose', function() {	
		//cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose2)
		
		 cy.get('#btnSubmit').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Purpose Added Successfully.');
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
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Purpose Deleted Successfully.');
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
	  
		cy.get('[title="Value"]').eq(lastField).should('not.contain', Purpose2)
			  
		})
		
	})
	
	
	})
	
 
	