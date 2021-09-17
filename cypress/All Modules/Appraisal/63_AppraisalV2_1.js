
describe('Approval V2', function () {

	const { softAssert, softExpect } = chai;
	
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var FinancialYear_To = Cypress.env('FinancialYear_To')
	
	// Appraisal Configuration
	var BusinessUnit = 'EMPLOYEEWISE'
	var StartDate = '01/04/'+FinancialYear_From
	var EndDate = '31/03/' + FinancialYear_To
	var SetDefaultFinancialYear = 'Yes'
	var CompletedMonth = '12'
	var Rating = 'Weightage'

	// Grading Matrix
	var Value1 = 'CY4'
	var Value2 = 'CY2'
	var Value3 = 'CY6'
	var Value4 = 'CY5'
	var Value5 = 'CY11'

	var GradingTo1 = '40'
	var Status1 = 'Poor'
	var Details1 = 'Poor'
	var Percentage1 = '40'

	var GradingTo2 = '90'
	var Status2 = 'Good'
	var Details2 = 'Good'
	var Percentage2 = '90'

	var GradingTo3 = '100'
	var Status3 = 'Genius'
	var Details3 = 'Genius'
	var Percentage3 = '100'

	// Appraisal Stage
	var StageName1 = 'Mid Year'
	var StartDateStage1 = '01/04/' + FinancialYear_From
	var EndDateStage1 = '30/09/' + FinancialYear_From
	var OrderNumber1 = '1'
	var IsActive1 = 'Yes'

	var StageName2 = 'Final'
	var StartDateStage2 = '01/10/' + FinancialYear_From
	var EndDateStage2 = '31/12/' + FinancialYear_From
	var OrderNumber2 = '2'
	var IsActive2 = 'No'


	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()
		cy.changeCompany()
	})
	
	it('Appraisal Configuration', function() {	
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2');
		cy.wait(2000)
		cy.get('#AppraisalV2ContentTitle .fas').click({ force: true })
		cy.wait(2000)
		cy.get('#drpParameter').select(BusinessUnit, { force: true });
		cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
	cy.get('#todate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(CompletedMonth)
		cy.get('#drpDefault').select(SetDefaultFinancialYear, { force: true })
		
		cy.get('#drpRating').select(Rating, {force: true});
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
			cy.wait(2000)
		cy.get('#AppraisalV2body')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']/label").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StartDate+' - '+EndDate);	
		})
			
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+Rating);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(SetDefaultFinancialYear);	
		})
  })
			
	})	


	it('Appraisal Process', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalProcessV2')
		cy.wait(2000)
		cy.get('#A_180').click({ force: true })
		cy.get('#createBtn').click({ force: true })
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Saved successfully')
		})
		cy.get('#A_180').should('be.checked')
	})


	

/*	it('Set Appraisal Stages 1 for CY4', function () {
		cy.visit(url + 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
		cy.wait(2000)
		cy.get('#drpValue').select(Value1);
		cy.get('#AppraisalV2ContentTitle .fas').click({ force: true });
		cy.get('#stageNames').click({ force: true });
		cy.get('#stageNames').type(StageName1);
		cy.get('#startDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(StartDateStage1)
		})

		cy.get('#endDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(EndDateStage1)
		})

		cy.get('#order').click({ force: true });
		cy.get('#order').type(OrderNumber1);
		cy.get('#IsActive').select(IsActive1, { force: true });
		cy.wait(2000)
		cy.get('#crtbtn').click({ force: true });
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Appriasal Stages Added Successfully.')
			cy.wait(3000)
		})
	})

	it('Set Appraisal Stages 2 for CY4', function () {
		cy.visit(url + 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
		cy.wait(2000)
		cy.get('#drpValue').select(Value1);
		cy.get('#AppraisalV2ContentTitle .fas').click({ force: true });
		cy.get('#stageNames').click({ force: true });
		cy.get('#stageNames').type(StageName2);
		cy.get('#startDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(StartDateStage2)
		})

		cy.get('#endDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(EndDateStage2)
		})

		cy.get('#order').click({ force: true });
		cy.get('#order').type(OrderNumber2);
		cy.get('#IsActive').select(IsActive2, { force: true });
		cy.wait(2000)
		cy.get('#crtbtn').click({ force: true });
		cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Appriasal Stages Added Successfully.')
		//cy.wait(3000)
		//})	
	})
	*/




	})