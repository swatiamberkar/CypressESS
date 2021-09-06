
describe('Approval Matrix- Employee Details', function() {
	const { softAssert, softExpect } = chai;
	//var url = 'https://next.pockethrms.com/'
	var url = Cypress.env('cloudUrl')
	
	
	var managerID = 'CY1'
	var managerName = 'Timesheet Manager'
	var employeeID = 'CY3'
	var employeeName1 = 'Timesheet User1'
	var employeeID2 = 'CY2'
	var employeeName2 = 'Timesheet User2'
	
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
	 
	 
	 


	beforeEach(function () {
		cy.getCookies()
	})

	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()
		cy.changeCompany()
	})
	
/*	it('Set Appraisal Configuration', function() {	
		
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
	
	
	it('Set Grading Matrix 1', function() {	

	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=GradingMatrixV2');
	cy.wait(2000)
	cy.get('#drpValue').select(Value, {force: true});
	cy.get('#viewBtn').click({force: true});
		cy.wait(2000)
	cy.get('#AppraisalV2ContentTitle .fas').click({force: true});
	
	cy.get('#to').click({force: true});
		cy.get('#to').type(GradingTo1);
		
		cy.get('#status').click({force: true});
		cy.get('#status').type(Status1);
		cy.wait(2000)
		cy.get('#details').click({force: true});
		cy.get('#details').type(Details1);
		
		cy.get('#percent').click({force: true});
		cy.get('#percent').type(Percentage1);
		cy.wait(2000)
		cy.get('#createBtn').click({force: true});
		//cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Data Saved Successfully.!')
		cy.wait(3000)
		//})	
	
	})

	it('Set Appraisal Stages 1', function() {	
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
	cy.get('#drpValue').select(Value);
	cy.get('#AppraisalV2ContentTitle .fas').click({force: true});
	cy.get('#stageNames').click({force: true});
		cy.get('#stageNames').type(StageName1);
		cy.get('#startDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDateStage1)
				})
				
				cy.get('#endDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDateStage1)
				})
				
		cy.get('#order').click({force: true});
		cy.get('#order').type(OrderNumber1);
		cy.get('#IsActive').select(IsActive1, {force: true});
		cy.wait(2000)
		cy.get('#crtbtn').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Appriasal Stages Added Successfully.')
		cy.wait(3000)
		})		
	})
	 
	 
	it('Appraisal Stage Settings', function() {
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
cy.wait(2000)		
		
	})

	it('Add Employee Fields Details 1', function() {		
	const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnEmp').click({force: true});
		cy.wait(2000)
		cy.get("#FieldName").click({force: true})
		cy.get("#FieldName").type(EmpFieldName1)
		
		cy.get("#FieldType").select(EmpFieldType1)
		
		cy.get("#FieldSize").click({force: true})
		cy.get("#FieldSize").clear().type(EmpFieldSize1)
		
		cy.get("#HeaderName").click({force: true})
		cy.get("#HeaderName").clear().type(EmpLabelName1)
		
		cy.get("#Level").select(EmpLevel1)
		
		cy.get('#empbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})		
})

	it('Add Appriasal Parameter 1', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter 2', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name1);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks1);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})


	it('Add Appraisal Questions 1', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalKpiV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get("#para").select(QueParameter1)

cy.get('#marks').click({force: true});
cy.get('#marks').type(QueMarks1);

cy.get('#questn').click({force: true});
cy.get('#questn').type(Question1);

cy.get('#addquestn').click({force: true});
cy.wait(2000)
cy.get('#savebtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appraisal Questions 2', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalKpiV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get("#para").select(QueParameter2)

cy.get('#marks').click({force: true});
cy.get('#marks').type(QueMarks2);

cy.get('#questn').click({force: true});
cy.get('#questn').type(Question2);

cy.get('#addquestn').click({force: true});
cy.wait(2000)
cy.get('#savebtn').click({force: true});
cy.wait(2000)
			
	})

	it('Add Appraisal Questions 3', function() {
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalKpiV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get("#para").select(QueParameter4)

cy.get('#marks').click({force: true});
cy.get('#marks').type(QueMarks4);

cy.get('#questn').click({force: true});
cy.get('#questn').type(Question4);

cy.get('#addquestn').click({force: true});
cy.wait(2000)
cy.get('#savebtn').click({force: true});
cy.wait(2000)
		
			
	})

	it('Set Appraisal Access Rights', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalAccessRightsV2');
	cy.wait(2000)		
		
		cy.get("#appraisalScreenRole").select('1')
cy.xpath('//tr[1]//td[3]//input[1]').click({force: true});
cy.xpath('//tr[2]//td[3]//input[1]').click({force: true});
cy.wait(2000)
cy.get('#btnSave').click({force: true});
cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Record Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})	
	})
*/
	it('Assign manager for Appraisal', function () {
		cy.navigate_EmployeeProfile(employeeID)
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(15000)
		cy.get('[title="Add Approval Matrix Manager"]').click({ force: true })

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.xpath("//input[@id='Appraisal Ultimate']").click({ force: true })
		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
			cy.wait(2000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Appraisal Ultimate')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

	})

	})