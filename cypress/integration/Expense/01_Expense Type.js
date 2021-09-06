describe('Expense Type', function() {
	const { softAssert, softExpect } = chai;
	
	var businessUnit = 'Category'
	var businessValue1 = 'Staff'
	var businessValue2 = 'Admin'

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

		cy.get('#drpValue').select(businessValue1,{force: true})
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Enter Expense Type')
		 cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType1)
		
		 cy.get('#createBtn').click({force: true})
		 cy.wait(3000)
		 cy.get(".toast-message").should('contain', 'Expense Type Added Successfully')
	})	

	it('Verify Validation  - Expense Type Already Exists', function() {	
		cy.wait(5000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType1)
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Expense Type Already Exists')
		cy.xpath("//button[contains(text(),'Close')]").click({force: true})
	})
	

	it('Add Expense Type ', function() {
		cy.wait(5000)	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType2)
		
		 cy.get('#createBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Expense Type Added Successfully')
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
	cy.get('[title="Expense Type"]').eq(lastField).should('contain', expenseType2)
	cy.get('[title="Approval Rights"]>input').eq(lastField).should('be.checked')
	cy.get('[title="Approval Location"]>input').eq(lastField).should('not.be.checked');
			  
		  })
	})
	


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
		cy.get('#categoryName').clear().type(expenseType3)
		
		cy.get('#rad2').click({force: true})
		cy.get('#actLocId').click({force: true})
		
		 cy.get('#updateBtn').click({force: true})
		 cy.get(".toast-message").should('contain', 'Expense Type Updated Successfully')
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
			  cy.get('[title="Expense Type"]').eq(lastField).should('contain', expenseType3) 
			 cy.get('[title="Approval Rights"]>input').eq(lastField).should('not.be.checked')
			 cy.get('[title="Active Location "]>input').eq(0).should('be.checked');

			 
		  })
	})


	it('Delete Expense Type', function() {	
		cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-2
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		
		cy.get(".toast-message").should('contain', 'Expense Type Deleted Successfully')
  })  
	
  })
  
  it('Verify Deleted Expense Type details', function() {
	 cy.wait(8000) 
	cy.get('#PartialEmployees')
	.find('.media')
	.then(listing => {
	  const listingCount = Cypress.$(listing).length;
	  cy.log(listingCount)
	  var lastField = listingCount-2

	cy.get('[title="Expense Type"]').eq(lastField).should('not.contain', expenseType1)

	})
			 
		  
	})
	

	})
	
 
	