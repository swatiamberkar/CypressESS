
describe('Auto Document Number Setting', function() {
	const { softAssert, softExpect } = chai;
	
	var Character = 'TC'
	var TrailingZero = '00'
	var StartingNumber = '01'
	
	
	beforeEach(function(){
        cy.getCookies()	 
	})
	
	it('Pocket HRMS Login', function() {
		cy.cloudLogin()
		cy.changeCompany()	
	})
		
	it('Navigate Auto Document Number Setting', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Leave&submodule=DocumentNumberSetting')		
		cy.wait(2000)
		
		 cy.get('#ExpenseEss_tab').click({force: true})
		 cy.wait(2000)
		 cy.get('#Expense_AutoDocumentNumberSetting').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Enter Characters !!', function() {		 
		 cy.get('#SaveBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Characters !!');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Enter Valid Characters !!', function() {	
		cy.get('#char').click({force: true})
		cy.get('#char').clear().type(Character)
		
		 cy.get('#SaveBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Valid Characters !!');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Enter Starting Number', function() {	
	
		cy.get('#TrailingZero').click({force: true})
		cy.get('#TrailingZero').clear().type(TrailingZero)
		
		 cy.get('#SaveBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Starting Number');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Save Functionality', function() {	
	
		cy.get('#StartingNumber').click({force: true})
		cy.get('#StartingNumber').clear().type(StartingNumber)
		
		 cy.get('#SaveBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Setting Saved Successfully.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		 
		    cy.get('#min').invoke('text').then((text) => {			
			 softExpect(text.trim()).to.eq(Character+TrailingZero+StartingNumber);
			 }) 
			 
	})
		
	it('Verify Delete Functionality', function() {	
		cy.get('#delBtn').click({force: true})
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Setting Deleted Successfully.');
		 cy.wait(3000)
			
		  })

  })
  
	})
	
 
	