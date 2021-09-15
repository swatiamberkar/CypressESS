
describe('Expense Eligibility', function() {
	const { softAssert, softExpect } = chai;

	var amount = '10000'
	var amount1 = '5000'
	var noApprovalAmount = '200'
	var approvalType = 'Monthly'
	
	var businessUnit = 'Category'
	var businessValue1 = 'Staff'
	var busnessValue2 = 'Admin'

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
		
	it('Add Expense Type', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)		
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		//cy.get('#drpParameter').select(businessUnit,{force: true})
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#drpValue').select(businessValue1)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType1);
		cy.get('#createBtn').click({force: true})
		cy.get(".toast-message").should('contain', 'Expense Type Added Successfully')
		cy.wait(2000) 
		
	})

	it('Add Expense Type', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)		
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		//cy.get('#drpParameter').select(businessUnit,{force: true})
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#drpValue').select(businessValue1)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType2);
		cy.get('#createBtn').click({force: true})
		cy.get(".toast-message").should('contain', 'Expense Type Added Successfully')
		cy.wait(2000) 
		
	})
	
	it('Navigate Expense Eligibility', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseEligibility')		
		cy.wait(2000)
	})
		
	it('Verify Validation - Select Buisness Value.', function() {	
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})

		//cy.get('#drpParameter').select(businessUnit,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Select Buisness Value.');
		  })
	})
	
	it('Verify Validation - Select Expense Type.', function() {	
		cy.get('#drpValue').select(businessValue1,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Select Expense Type.');
		  })
	})

	it('Verify Validation Massges - Enter Amount.', function() {	
		cy.get('#claimtype').select(expenseType1,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Enter Amount.');
		  })
	})
	
	it('Add Expense Eligibility', function() {	
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount)
		
		 cy.get('#crtbtn').click({force: true})
		 cy.wait(10000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Eligibility Save Successfully!');
	  })
		 
	})

	it('Verify Add Expense Eligibility details', function() {
		cy.wait(5000)
		  cy.get('#PartialData')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1

	
		    cy.get('[title="Buisness Unit"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Unit: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessUnit);
			 }) 
			 
			 cy.get('[title=" Buisness Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessValue1);
			 })
			 
			 cy.get('[title="Amount"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(amount);
			 })
			 
			 cy.get('[title="Expense Name"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType1);
			 })
			 
			 cy.get('[title="No Approval upto Amount"]').eq(lastField).invoke('text').then((text) => {			
			 softExpect(text.trim()).to.contains('0');
			 })
			 
			 cy.get('[title="Approval Type"]').eq(lastField).invoke('text').then((text) => {			
			 softExpect(text.trim()).to.contains('ClaimWise');
			 })
		  })
	})

	it('Add Expense Eligibility with Employee wise', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.get('#drpParameter').select(businessUnit,{force: true})
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.wait(1000)
		cy.get('#drpValue').select(businessValue1)
		cy.wait(1000)
		cy.get('#claimtype').select(expenseType2,{force: true})
		
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount1)
		
			cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID1)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			
		cy.get('#NoApprovalAmount').click({force: true})
		cy.get('#NoApprovalAmount').clear().type(noApprovalAmount)
		cy.get('#ApprovalType').select(approvalType,{force: true})
		cy.get('#ApprovalType').select(approvalType)
			
				
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Eligibility Save Successfully!');
		  })
	})

	it('Verify added Expense Eligibility with Employee wise', function() {
		 cy.get('#viewbtn').click({force: true})
		 cy.wait(2000)
		 cy.get('[type="search"]').click({force: true})
		cy.get('[type="search"]').clear().type(expenseType2)

		cy.get('#EStableSorter1 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)		
			cy.get('#EStableSorter1 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {	
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID1) {
				
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', expenseType2)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(4)').should('have.text', amount1)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', noApprovalAmount)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', approvalType)
			}
		 
		 
		 })			
		  })
		   cy.xpath("//div[@id='expenseeligibility']//button").click({force: true})
		 cy.wait(2000)
	
	})
	
	it('Add Expense Eligibility', function() {	
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue1,{force: true})
		cy.get('#claimtype').select(expenseType2,{force: true})
		
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount)
		
		 cy.get('#crtbtn').click({force: true})
		 cy.wait(10000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Eligibility Save Successfully!');
		 cy.wait(3000)
		  })
	})	

	it('Verify Delete Functionality', function() {
		cy.wait(5000)	
		cy.get('#PartialData')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Expense Eligibility Deleted Successfully.');
		  })
		})
	
  })
  
  it('Verify Deleted Expense Eligibility details', function() {
	  cy.wait(5000)
	cy.get('#PartialData')
	.find('.media')
	.then(listing => {
	  const listingCount = Cypress.$(listing).length;
	  cy.log(listingCount)
	  var lastField = listingCount-1

	cy.get('[title="Expense Name"]').eq(lastField).should('not.contain', expenseType2)

	})	  
	})
	
	})
	
 
