
describe('Expense Type', function() {
	const { softAssert, softExpect } = chai;
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	
	var businessValue1 = 'Admin'
	var expenseType1 = 'Local Travelling'

	var businessValue2 = 'Admin'
	var expenseType2 = 'Local Travel'
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
		cy.changeCompany()
	})
		
	it('Navigate Expense Type', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})

	context('Verify Validations', function() {
		
	it.skip('Verify Validation - Select Buisness Unit.', function() {		
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true}) 
		 cy.get('#createBtn').click({force: true})
		cy.get(".toast-message").should('contain', 'Select Buisness Unit.')
	})
	
	it('Verify Validation - Select Buisness Value.', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true}) 
		cy.get('#drpParameter').select(businessUnit,{force: true})
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Select Buisness Value.')
	})
	
	it('Verify Validation - Enter Expense Type', function() {	

		cy.get('#drpValue').select(businessValue,{force: true})
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Enter Expense Type')
		 cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType)
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Record Saved Successfully')
	})	

	it('Verify Validation  - Expense Type Already Exists', function() {	

		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType)
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Expense Type Already Exists')
		cy.xpath("//button[contains(text(),'Close')]").click({force: true})
	})
	
})

context('Verify Save Functionality', function() {
	it('Add Expense Type ', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType1)
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Record Saved Successfully')
	})

	it('Verify Added Expense Type details', function() {	
		 
		cy.wait(5000)	
		  cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1

	cy.get('[title="Buisness Unit"]').eq(lastField).should('contain', businessUnit)
	cy.get('[title="Buisness Value"]').eq(lastField).should('contain', businessValue1)
	cy.get('[title="Buisness Type"]').eq(lastField).should('contain', expenseType)
	cy.get('[title="Approval Rights"]>input').eq(lastField).should('be.checked')
	cy.get('[title="Approval Location"]>input').eq(lastField).should('not.be.checked');
			  
		  })
	})
	
})

context('Verify Update Functionality', function() {

	it('Update Expense Type', function() {	
	
	cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.get('.fa-edit').eq(lastField).click({force: true})
		cy.get('#drpValue').select(businessValue2)
		cy.get('#drpValue').select(businessValue2,{force: true})
		cy.get('#drpValue').select(businessValue2)
		cy.wait(1000)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType2)
		
		cy.get('#rad2').click({force: true})
		cy.get('#actLocId').click({force: true})
		
		 cy.get('#updateBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Record Updated Successfully')
  })
})

  it('Verify Updated Expense Type details', function() {	
	
	cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
		  	cy.wait(5000)
			  cy.get('[title="Buisness Unit"]').eq(lastField).should('contain', businessUnit)
			  cy.get('[title="Buisness Value"]').eq(lastField).should('contain', businessValue2)
			  cy.get('[title="Buisness Type"]').eq(lastField).should('contain', expenseType2) 
			 cy.get('[title="Approval Rights"]>input').eq(lastField).should('not.be.checked')
			 cy.get('[title="Active Location "]>input').eq(0).should('be.checked');

			 
		  })
	})
})	

context('Verify Delete Functionality', function() {

	it('Delete Expense Type', function() {	
		cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-2
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		
		cy.get(".toast-message").should('contain', 'Record Deleted Successfully')
  })  
	
  })
  
  it('Verify Deleted Expense Type details', function() {
	cy.get('#PartialEmployees')
	.find('.media')
	.then(listing => {
	  const listingCount = Cypress.$(listing).length;
	  cy.log(listingCount)
	  var lastField = listingCount-2

	cy.get('[title="Buisness Type"]').eq(lastField).should('contain', expenseType)

	})
			 
		  
	})
	
})
	})
	
 
	