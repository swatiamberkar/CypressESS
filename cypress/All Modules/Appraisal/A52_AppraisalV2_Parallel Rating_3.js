
describe('Approval Matrix- Employee Details', function() {
	
	//var url = 'https://next.pockethrms.com/'
	var url = Cypress.env('url')
	
	
	var admin = 'CY1'
	var Manager1 = 'CY5'
	var Manager2 = 'CY11'
	var EmployeeId = 'CY2'
	
	// Appraisal Configuration
	var BusinessUnit = 'Category'
	var StartDate = '01/01/2020'
	var EndDate = '31/12/2020'
	var completedMonth = '2'
	var setDefaultFinancialYear1 = 'Yes'
	var rating ='Weightage'
	
	var StartDate1 = '01/06/2020'
	var EndDate1 = '30/06/2020'
	var setDefaultFinancialYear = 'No'
	var rating1 ='Weightage'
	
	// Grading Matrix
	 var Value = 'Staff'
	 var Value1 = 'Admin'
	 var Value2 = 'Manager'
	 
	 var GradingTo1 = '40'
	 var Status1 = 'Poor'
	 var Details1 ='Poor'
	 var Percentage1 = '40'
	 
	  var GradingTo2 = '90'
	 var Status2 = 'Good'
	 var Details2 ='Good'
	 var Percentage2 = '90'
	 
	  var GradingTo3 = '100'
	 var Status3 = 'Genius'
	 var Details3 ='Genius'
	 var Percentage3 = '100'
	
	 
	 // Appraisal Stage
	 var StageName1 = 'Goals'
	 var StartDateStage1 = '01/01/2020'
	 var EndDateStage1 = '31/03/2020'
	 var OrderNumber1 = '1'
	 var IsActive1 = 'Yes'
	 
	 var StageName2 = 'Mid Year'
	 var StartDateStage2 = '01/04/2020'
	 var EndDateStage2 = '30/09/2020'
	 var OrderNumber2 = '2'
	 var IsActive2 = 'No'
	 
	 var StageName3 = 'Final'
	 var StartDateStage3 = '01/10/2020'
	 var EndDateStage3 = '31/12/2020'
	 var OrderNumber3 = '3'
	 var IsActive3 = 'No'
	 
	
	 
	 //Appraisal Stage Settings
	 var EmpFieldName1 = 'Target' 
	 var EmpFieldType1 = 'Text'
	 var EmpFieldSize1 = '0'
	 var EmpLabelName1 = 'Targets'
	 var EmpLevel1 = 'Question'
	 
	 var EmpFieldName2 = 'STAGE1' 
	 var EmpFieldType2 = 'TextArea'
	 var EmpFieldSize2 = '100'
	 var EmpLabelName2 = 'STAGE1'
	 var EmpLevel2 = 'Stage'
	
	 var MgrFieldName1 = 'ACHIEVEMENT' 
	 var MgrFieldType1 = 'Text'
	 var MgrFieldSize1 = '100'
	 var MgrLabelName1 = 'ACHIEVEMENTs'
	 var MgrLevel1 = 'Question'
	 
	 var MgrFieldName2 = 'Bigremarks' 
	 var MgrFieldType2 = 'Text'
	 var MgrFieldSize2 = '0'
	 var MgrLabelName2 = 'Bigremarks'
	 var MgrLevel2 = 'Question'
	 
	 var MgrFieldName3 = 'FORMULA1' 
	 var MgrFieldType3 = 'Formula'
	 var MgrFieldSize3 = '100'
	 var MgrLabelName3 = 'FORMULA1'
	 var MgrLevel3 = 'Question'
	  
	 //Appraisal Parameter
	 var Name = 'Intelligence'
	 var Marks = '20'
	 
	 var Name1 = 'Grasping Skills'
	 var Marks1 = '20'
	 
	 
	 //  Appraisal Questions
	 var QueParameter1 = 'Intelligence'
	 var Question1 = 'Planning Skills'
	 var QueMarks1 = '30'
	 
	 var QueParameter2 = 'Intelligence'
	 var Question2 = 'Decision Making Skills'
	 var QueMarks2 = '30'
	 
	 var QueParameter3 = 'Intelligence'
	 var Question3 = 'Problem Solving Skills'
	 var QueMarks3 = '40'
	 
	 var QueParameter4 = 'Grasping Skills'
	 var Question4 = 'Problem grasping skills'
	 var QueMarks4 = '50'
	 
	 var QueParameter5 = 'Grasping Skills'
	 var Question5 = 'Problem grasping skills'
	 var QueMarks5 = '50'
	 
	 // Appraisal Popup Data
	 var Component = 'FORMULA1'
	 var PopupValue = '10'
	 
	 
	 

	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(url) 
	})
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		// Next
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
		//ESS
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		cy.wait(2000)
		//https://pockethrmsnext.azurewebsites.net/
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		cy.wait(2000)
		//cloud.pockethrms.com/
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		
   })
	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
	
	it('Change Company', function() {	
	
		cy.changeCompany()	 
	})
	
	it('Set Appraisal Configuration with Parallel Setting', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2')
		
		cy.get('#AppraisalV2ContentTitle .fas').click({force:true})
		cy.wait(2000)
		cy.get('#drpParameter').select(BusinessUnit, {force: true});
		cy.wait(1000)
		
		cy.get('#fromdate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
				
		cy.get('#todate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})	
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(completedMonth)
		
		cy.get('#drpDefault').select(setDefaultFinancialYear1,{force: true})
		
		cy.get('#drpRating').select(rating, {force: true});
	//	cy.get('#txtEndScale').click({force: true})		
	//	cy.get('#txtEndScale').type('5');
		cy.get('#AvgAllManager').click({force: true})	
		cy.get('#IsParallelApprovalTrue').click({force: true})
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
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(setDefaultFinancialYear1);	
		})
  })
			
	})	

	it('Verify Notification with changing Parallel Setting', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2')
		
		cy.get('#AppraisalV2ContentTitle .fas').click({force:true})
		cy.wait(2000)
		cy.get('#drpParameter').select(BusinessUnit, {force: true});
		cy.wait(1000)
		
		cy.get('#fromdate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
				
		cy.get('#todate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})	
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(completedMonth)
		
		cy.get('#drpDefault').select(setDefaultFinancialYear1,{force: true})
		
		cy.get('#drpRating').select(rating, {force: true});
	//	cy.get('#txtEndScale').click({force: true})		
	//	cy.get('#txtEndScale').type('5');
		cy.get('#AvgAllManager').click({force: true})	
	//	cy.get('#IsParallelApprovalTrue').click({force: true})
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
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(setDefaultFinancialYear1);	
		})
  })
			
	})	

	it('Set Appraisal Process', function() {
		
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalProcessV2')
		cy.wait(2000)
		cy.get('#A_180').click({force:true})
		cy.get('#createBtn').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Saved successfully')
		})
		
	})
	
	it('Verify Notification with doing other setting', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2')
		
		cy.get('#AppraisalV2ContentTitle .fas').click({force:true})
		cy.wait(2000)
		cy.get('#drpParameter').select(BusinessUnit, {force: true});
		cy.wait(1000)
		
		cy.get('#fromdate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
				
		cy.get('#todate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})	
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(completedMonth)
		
		cy.get('#drpDefault').select(setDefaultFinancialYear1,{force: true})
		
		cy.get('#drpRating').select(rating, {force: true});
	//	cy.get('#txtEndScale').click({force: true})		
	//	cy.get('#txtEndScale').type('5');
		cy.get('#AvgAllManager').click({force: true})	
	//	cy.get('#IsParallelApprovalTrue').click({force: true})
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
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(setDefaultFinancialYear1);	
		})
  })
			
	})	

	})