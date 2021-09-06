
describe('Expense Type', function() {
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	
	var businessValue1 = 'Admin'
	var expenseType1 = 'Local Travel'
	
	
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Pocket HRMS Login', function() {
		cy.cloudLogin()
	})
		
	it('Change Company', function() {	
	
		cy.changeCompany()	 	
	})

	it('Navigate Expense Type', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)
		
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Select Buisness Unit.', function() {	
		const { softAssert, softExpect } = chai;
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		 
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Buisness Unit.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Select Buisness Value.', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#drpParameter').select(businessUnit,{force: true})
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Buisness Value.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Enter Expense Type', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#drpValue').select(businessValue,{force: true})
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Expense Type');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Save Functionality', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType)
		
		 cy.get('#createBtn').click({force: true})
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Please select Ticket Segregation');
		// cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		 
		cy.wait(5000)	
		  cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1

	
		    cy.get('[title="Buisness Unit"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Unit: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessUnit);
			 }) 
			 
			 cy.get('[title="Buisness Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessValue);
			 })
			 
			 cy.get('[title="Expense Type"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType);
			 })
			 
			 cy.get('[title="Approval Rights"]>input').eq(lastField).should('be.checked')
			 cy.get('[title="Approval Location"]>input').eq(lastField).should('not.be.checked');

			 
		  })
	})
	
	it('Verify Validation Massges - Expense Type Already Exists', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType)
		
		 cy.get('#createBtn').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Type Already Exists');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		  
		   cy.xpath("//button[contains(text(),'Close')]").click({force: true})
	})
	
	it('Verify Update Functionality', function() {	
		const { softAssert, softExpect } = chai;
	
	cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.get('.fa-edit').eq(lastField).click({force: true})
		cy.get('#drpValue').select(businessValue1)
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#drpValue').select(businessValue1)
		cy.wait(1000)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType1)
		
		cy.get('#rad2').click({force: true})
		cy.get('#actLocId').click({force: true})
		
		 cy.get('#updateBtn').click({force: true})
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Please select Ticket Segregation');
		// cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		  	cy.wait(5000)
		    cy.get('[title="Buisness Unit"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Unit: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessUnit);
			 }) 
			 
			 cy.get('[title="Buisness Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessValue1);
			 })
			 
			 cy.get('[title="Expense Type"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType1);
			 })
			 
			 cy.get('[title="Approval Rights"]>input').eq(lastField).should('not.be.checked')
			 cy.get('[title="Active Location "]>input').eq(0).should('be.checked');

			 
		  })
	})
		
	it('Verify Delete Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-2
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		cy.wait(2000)
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Data Deleted Sucessfully');
		 cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		  
	
  })
  
  cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('No Records Found.');
		 cy.wait(3000)	
		})
		  
	})
	
	
	})
	
 
	