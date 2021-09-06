describe('Approval Matrix- Employee Details', function() {
	
	//var url = 'https://next.pockethrms.com/'
	//var url = Cypress.env('url')
	var urlEss =  'http://192.168.0.142:8089/'
	
	var admin = 'CY4'
	var Manager1 = 'CY5'
	var Manager2 = 'CY11'
	var Manager2Name ='Incometaxpost test(CY11)'
	var EmployeeId = 'CY2'
	var EmployeeId1 = 'CY3'
	
	// Appraisal Configuration
	var BusinessUnit = 'Category'
	var StartDate = '01/01/2020'
	var EndDate = '31/12/2020'
	var completedMonth = '2'
	var setDefaultFinancialYear1 = 'Yes'
	var rating ='Scale'
	
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
	
	
	it('Admin Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit(urlEss)
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(admin)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
               // cy.get('#password').type(pass.trim())
			    cy.get('#password').type(admin.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', urlEss+'Home/Dashboard')
				cy.wait(2000)
               
        })
		
	it('Assign Manager for Employee 1', function() {
		const { softAssert, softExpect } = chai;
	 cy.visit(urlEss+'AppraisalV2/AssignManager_V2')
     cy.wait(2000)
	  cy.get('#btnSelectEmp').click({force: true})

	   cy.xpath("//select[@class='pagesize']").select('200',{force: true})
	cy.wait(8000)
	   cy.get('#EStableSorter > tbody >tr').each(function(row, i){	
			var num = parseFloat(i+1)
			cy.get('#EStableSorter > tbody >tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((empCode) => {		
			cy.log("empCode: "+empCode)
			
			if(empCode.trim() == EmployeeId)
			{
				cy.get('#EStableSorter > tbody >tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
			}	
			
			})
	   })
	   
	   cy.get('#btnSelectMan').click({force: true})
	   
	    cy.wait(8000)
       cy.get('#RsearchEmpCode').click({force: true})
      cy.get('#RsearchEmpCode').type(Manager1)
	  
	  cy.xpath("//div[@id='empModal']//div[@class='modal-dialog modal-lg']//div[@class='modal-content']//div[@class='modal-body']//div//div//input[@name='searchBtn']").click({force: true})
	  cy.wait(5000)
	   cy.xpath("//div[@id='partialEmployeeServiceByRole']//tr[1]//td[6]//button[1]").click()
	   cy.wait(5000)
	  //  cy.get('#insAppStatus').select('Yes',{force: true})
	//	cy.get('#insAppCanRights').select('Yes',{force: true})
	   cy.get('#insPrioNo').clear().type('1')
	   cy.get('#btnSave').click({force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnSelectMan').click({force: true})
	   
	   cy.wait(8000)
       cy.get('#RsearchEmpCode').click({force: true})
      cy.get('#RsearchEmpCode').type(Manager2)
	  
	  cy.xpath("//div[@id='empModal']//div[@class='modal-dialog modal-lg']//div[@class='modal-content']//div[@class='modal-body']//div//div//input[@name='searchBtn']").click({force: true})
	    cy.wait(5000)
	  
	   cy.xpath("//table[@id='ESRtableSorter']//button[@id='tempFnF']").click()
	   cy.wait(5000)
	  //  cy.get('#insAppStatus').select('Yes',{force: true})
		//cy.get('#insAppCanRights').select('Yes',{force: true})
	   cy.get('#insPrioNo').clear().type('2')
	   cy.get('#btnSave').click({force: true})
	   cy.wait(5000)  
	   
})

	it('User Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit(urlEss)
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(EmployeeId)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
               // cy.get('#password').type(pass.trim())
				 cy.get('#password').type(EmployeeId.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', urlEss+'Home/Dashboard')
				cy.wait(2000)               
        })

	it('Submit Rating From User Login', function() {
		cy.visit(urlEss+'AppraisalV2/AppraisalStage')
		cy.wait(2000)
		cy.xpath("//tr[1]//td[3]//button[1]").click({force: true})
		cy.wait(5000)
		cy.xpath("//table[@id='tbl_0']//input[@id='vData_0__Model_Appraisal_Entry_WeightedScore']").click({force: true})
		cy.xpath("//table[@id='tbl_0']//input[@id='vData_0__Model_Appraisal_Entry_WeightedScore']").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_0']//input[@id='vData_1__Model_Appraisal_Entry_WeightedScore']").click({force: true})
		cy.xpath("//table[@id='tbl_0']//input[@id='vData_1__Model_Appraisal_Entry_WeightedScore']").clear().type('4')
		cy.wait(2000)
		cy.xpath("//input[@id='vData_2__Model_Appraisal_Entry_WeightedScore']").click({force: true})
		cy.xpath("//input[@id='vData_2__Model_Appraisal_Entry_WeightedScore']").clear().type('4')
		cy.wait(2000)
		
		cy.xpath("//b[contains(text(),'Grasping Skills')]").click({force: true})
		cy.wait(5000)
		cy.xpath("//table[@id='tbl_1']//input[@id='vData_0__Model_Appraisal_Entry_WeightedScore']").click({force: true})
		cy.xpath("//table[@id='tbl_1']//input[@id='vData_0__Model_Appraisal_Entry_WeightedScore']").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_1']//input[@id='vData_1__Model_Appraisal_Entry_WeightedScore']").click({force: true})
		cy.xpath("//table[@id='tbl_1']//input[@id='vData_1__Model_Appraisal_Entry_WeightedScore']").clear().type('4')
		cy.wait(2000)
		cy.get("#Command1").click({force: true})
		cy.wait(30000)
	})

	it('Manager2 Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit(urlEss)
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(Manager2)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
                //cy.get('#password').type(pass.trim())
				cy.get('#password').type(Manager2.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', urlEss+'Home/Dashboard')
				cy.wait(2000)
               
        })

	it('Submit Rating From Manager2 Login', function() {
		cy.visit(urlEss+'AppraisalV2/ManagerStatus_V2')
		cy.wait(2000)
		cy.xpath("//a[@class='btn btn btn-xs theming-btn waves-effect waves-effect']").click()
		cy.wait(10000)
		cy.xpath("//table[@id='tbl_0']//tr[1]//td[5]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[1]//td[5]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_0']//tr[2]//td[5]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[2]//td[5]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_0']//tr[3]//td[5]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[3]//td[5]//input[14]").clear().type('4')
		cy.wait(2000)
		
		cy.xpath("//b[contains(text(),'Grasping Skills')]").click({force: true})
		cy.wait(5000)
		cy.xpath("//table[@id='tbl_1']//tr[1]//td[5]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_1']//tr[1]//td[5]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_1']//tr[2]//td[5]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_1']//tr[2]//td[5]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.get("#Command1").click({force: true})
		cy.wait(30000)
	})

	it('Manager1 Login into Self Services', function() {
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('company '+ comapnaycode)		
		cy.wait(500)
                
                cy.visit(urlEss)
                cy.wait(2000)
                
                cy.get('#company').click({force: true})
                cy.get('#company').type(comapnaycode.trim())
		})
		})
		
                
                cy.get('#employeecode').click({force: true})
                cy.get('#employeecode').type(Manager1)
              cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Password.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var pass = entry.password	
		cy.log('pass '+ pass)		
		cy.wait(500)  
                cy.get('#password').click({force: true})
               // cy.get('#password').type(pass.trim())
			    cy.get('#password').type(Manager1.trim())
		})
			  })
                cy.wait(2000)
                cy.get('#btnSubmit').click({force: true})
				
				cy.wait(5000)
			cy.url().should('eq', urlEss+'Home/Dashboard')
				cy.wait(2000)
               
        })

	it('Submit Rating From Manager1 Login', function() {
		cy.visit(urlEss+'AppraisalV2/ManagerStatus_V2')
		cy.wait(2000)
		cy.xpath("//a[@class='btn btn btn-xs theming-btn waves-effect waves-effect']").click()
		cy.wait(10000)
		cy.xpath("//table[@id='tbl_0']//tr[1]//td[4]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[1]//td[4]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_0']//tr[2]//td[4]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[2]//td[4]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_0']//tr[3]//td[4]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_0']//tr[3]//td[4]//input[14]").clear().type('4')
		cy.wait(2000)
		
		cy.xpath("//b[contains(text(),'Grasping Skills')]").click({force: true})
		cy.wait(5000)
		cy.xpath("//table[@id='tbl_1']//tr[1]//td[4]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_1']//tr[1]//td[4]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.xpath("//table[@id='tbl_1']//tr[2]//td[4]//input[14]").click({force: true})
		cy.xpath("//table[@id='tbl_1']//tr[2]//td[4]//input[14]").clear().type('4')
		cy.wait(2000)
		cy.get("#Command1").click({force: true})
		cy.wait(30000)
	})

	

})


