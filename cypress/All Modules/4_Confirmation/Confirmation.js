
describe('Confirmation', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	//var employeeID ='CY21'
	var employeeID ='GT17'
	var managerID1 = 'GT01'
	var managerID2 = 'GT02'
	var managerID3 = 'GT03'
	var empFound = ''
	
	
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
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('EmployeeLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('input[name=companycode]').click({force: true})
		cy.get('input[name=companycode]').clear();
		cy.get('input[name=companycode]').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('input[name=employeecode]').click({force: true})
		cy.get('input[name=employeecode]').clear();
		cy.get('input[name=employeecode]').type(employeeID)
		
		cy.wait(2000)
		cy.get('input[name=password]').click({force: true})
		cy.get('input[name=password]').clear();
		cy.get('input[name=password]').type(employeeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Login')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager1Login',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID1)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID1)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager2Login',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID2)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID2)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager3Login',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID3)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID3)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
		
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
	it('Assign manager 1 for Confirmation module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;

		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID1)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Confirmation').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			cy.wait(3000)
			})
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID1)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Confirmation')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		
		   })
	
	it('Assign manager 2 for Confirmation module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;
		//cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		//cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click()
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID2)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Priority').click({force: true})
			cy.get('#Priority').clear().type('2')
			
			cy.get('#Confirmation').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID2)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Confirmation')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('2')
			cy.wait(2000) 
			})
		
		   })
	
	it('Assign manager 3 for Confirmation module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;
		//cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		//cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click()
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID3)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Priority').click({force: true})
			cy.get('#Priority').clear().type('3')
			
			cy.get('#Confirmation').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID3)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Confirmation')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('3')
			cy.wait(2000) 
			})
		
		   })
	

	it('Do Confirmation Module Setting ', function() {	
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=ConfirmationSetting')
		cy.wait(5000)	
		cy.get("#DateFieldId").select('CONFIRMATIONDATE',{force: true})
		cy.get('[name="ApprovalRequired"]').eq(0).click({force: true})
		cy.get('[name="ReminderConfig"]').eq(0).click({force: true})
		cy.get('[onclick="addReminder()"]').click({force: true})
		cy.get('#ReminderDate_1').click({force: true})		
		cy.get('#ReminderDate_1').clear().type('15')
		cy.get('#ReminderDate_2').click({force: true})		
		cy.get('#ReminderDate_2').clear().type('10')
		cy.get('#ProbationPeriod').click({force: true})		
		cy.get('#ProbationPeriod').clear().type('30')
		cy.get('[name="FeedbackRequired"]').eq(0).click({force: true})
		cy.get('[name="CustomFormRequired"]').eq(0).click({force: true})
		cy.get('[name="ConfirmationLetterRequired"]').eq(0).click({force: true})
		cy.get('[name="ParallelApprovalRequired"]').eq(0).click({force: true})
		cy.get("#templateId").select('Appointment Letter',{force: true})
		
		cy.xpath("//button[contains(text(),'Save')]").click({force: true})
		
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
		           })
			
	})
 
	
	it('Field Creation - MultiSelect', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'HISTORY'
	var FieldType = 'MultiSelect'
	var FieldValue = 'M1,M2,M3'
	var LabelName = 'Previous Company history'
	var PanelName = 'Previous Company details'
	var Order = '1'
	var IsMandatory = 'True' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	cy.get('#FieldValue').click({force: true})
	cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - Text', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'COMPANYNAME'
	var FieldType = 'Text'
	var FieldValue = ''
	var LabelName = 'COMPANY NAME'
	var PanelName = 'Text'
	var Order = '2'
	var IsMandatory = 'True' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	//cy.get('#FieldValue').click({force: true})
	//cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - DROPDOWN', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'DROPDOWN'
	var FieldType = 'DropDown'
	var FieldValue = 'T1,T2,T3'
	var LabelName = 'Drop'
	var PanelName = 'Text'
	var Order = '3'
	var IsMandatory = 'False' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	cy.get('#FieldValue').click({force: true})
	cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	//cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - CHECK BOX', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'CHECK BOX'
	var FieldType = 'CheckBox'
	var FieldValue = 'C1,C2,C3'
	var LabelName = 'CheckBox'
	var PanelName = 'Text'
	var Order = '4'
	var IsMandatory = 'True' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	cy.get('#FieldValue').click({force: true})
	cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - RADIO BUTTON', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'RADIO BUTTON'
	var FieldType = 'Radio'
	var FieldValue = 'R1,R2,R3'
	var LabelName = 'Radio'
	var PanelName = 'Text'
	var Order = '5'
	var IsMandatory = 'False' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	cy.get('#FieldValue').click({force: true})
	cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	//cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	
	it('Field Creation - TextArea', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'TEXTAREA'
	var FieldType = 'TextArea'
	var FieldValue = ''
	var LabelName = 'TextArea'
	var PanelName = 'TextArea'
	var Order = '9'
	var IsMandatory = 'True' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	//cy.get('#FieldValue').click({force: true})
	//cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - INT', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'INT'
	var FieldType = 'Int'
	//var FieldValue = 'R1,R2,R3'
	var LabelName = 'Number'
	var PanelName = 'Text'
	var Order = '6'
	var IsMandatory = 'False' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	//cy.get('#FieldValue').click({force: true})
	//cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	//cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
		
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - DATE', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'DATE'
	var FieldType = 'Date'
	//var FieldValue = 'R1,R2,R3'
	var LabelName = 'Joining Date'
	var PanelName = 'Joining Date'
	var Order = '7'
	var IsMandatory = 'True' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	//cy.get('#FieldValue').click({force: true})
	//cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	//cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
	
	it('Field Creation - FILE', function() {		
	const { softAssert, softExpect } = chai;
	var fieldName = 'FILE'
	var FieldType = 'File'
	var FieldValue = 'F1,F2'
	var LabelName = 'Joining Document'
	var PanelName = 'Joining Document'
	var Order = '8'
	var IsMandatory = 'False' 
	
	 cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=FieldCreation')
     cy.wait(2000)
	 
	cy.xpath("//div[@id='employeeContentTitle']//a").click({force: true})
    cy.wait(2000)
	cy.xpath("//div[@id='fromrowfull']//select").select('Confirmation', {force: true})
	
	cy.get('#FieldName').click({force: true})
	cy.get('#FieldName').clear().type(fieldName)
	
	cy.get('#FieldType').select(FieldType, {force: true})
	
	cy.get('#FieldValue').click({force: true})
	cy.get('#FieldValue').clear().type(FieldValue)
	
	cy.get('#LabelName').click({force: true})
	cy.get('#LabelName').clear().type(LabelName)
	
	cy.get('#PanelName').click({force: true})
	cy.get('#PanelName').clear().type(PanelName)
	
	cy.get('#Order').click({force: true})
	cy.get('#Order').clear().type(Order)
	
	cy.get('#IsMandatory').click({force: true})
	
	cy.get('#sbtBtn').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save Successfully..');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		   
	cy.get('#Hrmodule')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	
		    cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[1]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(fieldName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[2]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldType);
			 })
			
			 
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[3]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(FieldValue);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[4]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(LabelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[5]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(PanelName);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[6]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(IsMandatory);
			 })
			 
			  cy.xpath("//div[@id='partialFormGrid']//div[@class='media']//span[7]").eq(lastField).invoke('text').then((text) => {
			
			cy.log('fieldName: '+ text.trim())
			 softExpect(text.trim()).to.contains(Order);
			 })
		  }) 
		  
		
	})
			
	it('Login into Pocket ESS & Navigate to Manager Approval', function() {	
		cy.Manager1Login()
		cy.visit(Cypress.env('url')+'Confirmation/Transaction/ConfirmationApproval?Menu=ManagerApproval')
		cy.wait(10000)	
	})
	
	it('Verify Validation Massges - Please fill all required fields', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
					
				cy.get('#btnSubmit').click({force: true})
				//cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Please fill all required fields");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})
			}
			})
			}) 
	})
	
	it('Confirm at Manager 1 Login', function() {	
			const { softAssert, softExpect } = chai;
		
				cy.get('#COMPANYNAME').click({force: true})
				cy.get('#COMPANYNAME').clear().type('Company 1');
				
				cy.get("#DROPDOWN").select('T1',{force: true})
				
				cy.get('[value="C1"]').click({force: true})
				cy.get('[value="R1"]').click({force: true})
				
				cy.get('#INT').click({force: true})
				cy.get('#INT').clear().type('1');
				
				cy.get('#TEXTAREA').click({force: true})
				cy.get('#TEXTAREA').clear().type('Testing 1');
				
				cy.get('#DATE').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/05/2021')
			})
				cy.get('.select2-selection__rendered').click({force: true})

			cy.wait(2000)
			cy.xpath("//ul[@id='select2-HISTORY-results']/li[1]").click({force: true})
			cy.wait(2000)
			
				
				cy.get("#empStatus").select('Confirm',{force: true})
				
				cy.get('#empRemarks').click({force: true})
				cy.get('#empRemarks').clear().type('Confirmation at Manager 1');
					
				cy.get('#btnSubmit').click({force: true})
				//cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Entry Approved successfully");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})		  
	})

	it('Confirm at Manager 2 Login', function() {
		cy.Manager2Login()
		cy.visit(Cypress.env('url')+'Confirmation/Transaction/ConfirmationApproval?Menu=ManagerApproval')
		cy.wait(10000)
			const { softAssert, softExpect } = chai;
		
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				
				cy.get('#COMPANYNAME').click({force: true})
				cy.get('#COMPANYNAME').clear().type('Company 2');
				
				cy.get("#DROPDOWN").select('T2',{force: true})
				
				cy.get('[value="C2"]').click({force: true})
				cy.get('[value="R2"]').click({force: true})
				
				cy.get('#INT').click({force: true})
				cy.get('#INT').clear().type('2');
				
				cy.get('#TEXTAREA').click({force: true})
				cy.get('#TEXTAREA').clear().type('Testing 2');
				
				cy.get('#DATE').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('02/05/2021')
			})
				cy.get('.select2-selection__rendered').click({force: true})

			cy.wait(2000)
			cy.xpath("//ul[@id='select2-HISTORY-results']/li[2]").click({force: true})
			cy.wait(2000)
					
				cy.get("#empStatus").select('Confirm',{force: true})
				
				cy.get('#empRemarks').click({force: true})
				cy.get('#empRemarks').clear().type('Confirmation at Manager 2');
					
				cy.get('#btnSubmit').click({force: true})
				//cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Entry Approved successfully");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})	
			}
			})
		})			
	})

	it('Confirm at Manager 3 Login', function() {
		cy.Manager3Login()
		cy.visit(Cypress.env('url')+'Confirmation/Transaction/ConfirmationApproval?Menu=ManagerApproval')
		cy.wait(10000)
			const { softAssert, softExpect } = chai;
		
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				
				cy.get('#COMPANYNAME').click({force: true})
				cy.get('#COMPANYNAME').clear().type('Company 3');
				
				cy.get("#DROPDOWN").select('T3',{force: true})
				
				cy.get('[value="C3"]').click({force: true})
				cy.get('[value="R3"]').click({force: true})
				
				cy.get('#INT').click({force: true})
				cy.get('#INT').clear().type('3');
				
				cy.get('#TEXTAREA').click({force: true})
				cy.get('#TEXTAREA').clear().type('Testing 3');
				
				cy.get('#DATE').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('03/05/2021')
			})
				cy.get('.select2-selection__rendered').click({force: true})

			cy.wait(2000)
			cy.xpath("//ul[@id='select2-HISTORY-results']/li[3]").click({force: true})
			cy.wait(2000)
					
				cy.get("#empStatus").select('Confirm',{force: true})
				
				cy.get('#empRemarks').click({force: true})
				cy.get('#empRemarks').clear().type('Confirmation at Manager 3');
					
				cy.get('#btnSubmit').click({force: true})
				//cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Entry Approved successfully");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})	
			}
			})
		})			
	})

/*	it('Confirm at Manager 1 Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.get("#HISTORY").select('Check',{force: true})
				cy.get('#COMPANYNAME').click({force: true})
				cy.get('#COMPANYNAME').clear().type('Greytrix');
				
				cy.get("#DROPDOWN").select('T1',{force: true})
				
				cy.get('[value="C1"]').click({force: true})
				cy.get('[value="R1"]').click({force: true})
				
				cy.get("#empStatus").select('Confirm',{force: true})
				
				cy.get('#empRemarks').click({force: true})
				cy.get('#empRemarks').clear().type('Confirmation at Manager 1');
					
				cy.get('#btnSubmit').click({force: true})
				cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})
			}
			})
			})  		  
	})
	

/*	it('Login into Pocket ESS & Navigate to Manager Approval', function() {	
		cy.Manager2Login()
		cy.visit(Cypress.env('url')+'Confirmation/Transaction/ConfirmationApproval?Menu=ManagerApproval')
		cy.wait(2000)	
	})
	
	it.skip('Verify Validation Massges - Please fill all required fields', function() {	
	})
	
	it('Cancel at Manager 2 Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#DataTables_Table_0 > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.get("#HISTORY").select('Check',{force: true})
				cy.get('#COMPANYNAME').click({force: true})
				cy.get('#COMPANYNAME').clear().type('Greytrix');
				
				cy.get("#DROPDOWN").select('T1',{force: true})
				
				cy.get('[value="C1"]').click({force: true})
				cy.get('[value="R1"]').click({force: true})
				
				cy.get("#empStatus").select('Confirm',{force: true})
				
				cy.get('#empRemarks').click({force: true})
				cy.get('#empRemarks').clear().type('Confirmation at Greytrix');
					
				cy.get('#btnSubmit').click({force: true})
				cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})
			}
			})
			})  		  
	})
	
	*/

})
	