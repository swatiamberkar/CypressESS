
describe('Employee Transfer', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const firstDate = '01'+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	var employeeID ='GT16'
	var managerID = 'GT02'
	var transferSetting = 'ESS Transfer'
	var newLineManager = 'GT03'
	var HrID = 'GT04'
		

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
		cy.get('#EmployeeCode').type(employeeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('ManagerLogin',()=>{
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
		cy.get('#EmployeeCode').type(managerID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('NewLineManagerLogin',()=>{
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
		cy.get('#EmployeeCode').type(newLineManager)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(newLineManager)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('HrLogin',()=>{
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
		cy.get('#EmployeeCode').type(HrID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(HrID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	
	it('Login into Cloud', function() {
		cy.cloudLogin()
		cy.changeCompany()
	})	
	
	it('Add Configuration Fields - Cost Centre', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=customfields')
		cy.wait(1000)
		 cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').type('COSTCENTRE')
		
		cy.get('#labelName').click({force: true})
		cy.get('#labelName').type('Cost Centre')
		
		cy.get("select[name='CellType']").select('Pop-Up',{force: true})
		cy.get('#Order').click({force: true})
		cy.get('#Order').clear().type('33')
		
		cy.xpath("//input[@name='FieldSize']").click({force: true})
		cy.xpath("//input[@name='FieldSize']").clear().type('30')
		
		cy.xpath("//select[@name='Panel']").select('Employee',{force: true})
		
		cy.get('#Filter').click({force: true})
		cy.get('#chkTimeline').click({force: true})
		
		cy.get('#sbtBtn').click({force: true})
		
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		}) 
		
	})
	
	it('Add Pop-Up Detail for Cost Centre', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=popup')
		cy.wait(3000)
		cy.get("#metadatatable").select('Cost Centre',{force: true})
		cy.wait(1000)
		 cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({force: true})
	
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Mumbai')
		
		cy.get('#sbtBtn').click({force: true})
		
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		}) 
		
		cy.get("#metadatatable").select('Cost Centre',{force: true})
		cy.wait(1000)
		 cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({force: true})
		
		
		
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Pune')
		
		cy.get('#sbtBtn').click({force: true})
		
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		}) 
		
		
	})

	it('Set HR Letter', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=HRLetter#')
		cy.wait(5000)
		 cy.xpath("//span[contains(text(),'HR - Letter')]").click({force: true})	
		 cy.wait(5000)
		cy.xpath("//div[@id='employeeContentTitle']//a").click({force:true})
                cy.wait(2000)
		 cy.get('#TemplateId').click({force: true})		
		 cy.get('#TemplateId').clear().type('Change in Cost Center')
		 
		 cy.get('[name="Subject"]').click({force: true})		
		 cy.get('[name="Subject"]').clear().type('Change in Cost Center')
			
		cy.get("iframe").then( $iframe => {

    const $doc = $iframe.contents();
    cy.wrap( $doc.find("#tinymce") ).eq(0).type(' Transfer Letter This is to inform you that you are being transferred from your current business [COSTCENTRE|TRANSFERFROM] to [COSTCENTRE|TRANSFER] channel as a [DESIGNATION|TRANSFER]. The transfer will be effective from [EffectiveDate|TRANSFER]. You will report to [LineManagerName|TRANSFER] upon joining for duties. All other terms and conditions governing your employment, as set out in the Letter of Appointment dated [GRDOJ|MASTER] will remain unchanged. Wishing you all the very best in your new assignment. Authorized Signatory ');


});
	
                 cy.xpath("//button[contains(text(),'Save Template')]").click({ force: true });
                 cy.wait(2000)
              
                
	})	 
	
	it('Assign manager for Transfer module from Approval Matrix', function() {	
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
			cy.get('input[type="search"]').type(managerID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Transfer').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Transfer')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		
		   })

	it('Set Transfer fields', function() {
	cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#employeeTab').click({force:true})
                cy.wait(2000)
						
                 cy.get('#DESIGNATION').select('EMPLOYEE',{force: true})
                 cy.wait(2000)
				 cy.get('#DEPARTMENT').select('HR',{force: true})
                 cy.wait(2000)
				  cy.get('#COSTCENTRE').select('Mumbai',{force: true})
                 cy.wait(2000)
                 cy.get('#empProfileSave').click({force: true})
				 cy.wait(5000)
                
	})	 
		
	it('Do Transfer Setting', function() {	
		cy.visit(Cypress.env('cloudUrl')+'/Settings/Employee/Index?module=hr&submodule=TransferSetting#')
		cy.wait(20000)	
		 cy.get('[onclick="showNewSetting()"]').click({force: true})
		 cy.wait(2000)
		 cy.get('#SettingNameNew').click({force: true})		
		cy.get('#SettingNameNew').clear().type(transferSetting)
		cy.get('[value="Add"]').click({force: true})	
		cy.get('#intracompany').click({force: true})	
		cy.get('#templateId').select('Change in Cost Center',{force: true})	
		cy.get('[name="DeptFieldNames"]').eq(0).click({force: true})
		cy.get('[name="DeptFieldNames"]').eq(1).click({force: true})
		cy.get('#DEPARTMENT').click({force: true})
		cy.get('#DESIGNATION').click({force: true})
		cy.get('#COSTCENTRE').click({force: true})
		
		cy.get('#savesetting').click({force: true})
		cy.wait(2000)
		
	})

	it('Request for Employee Transfer from Manager', function() {
	cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Request?Menu=EmployeeTransfer')
		cy.wait(2000)	
			
		cy.get('#SettingName').select(transferSetting,{force: true})
		
		cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').eq(1).click({force: true})
			cy.get('input[type="search"]').eq(1).type(employeeID)	
			
			//cy.get('input[type="search"]').click({force: true})
			//cy.get('input[type="search"]').type(employeeID)	
			
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			
			
			cy.get('#select2-multiEmpManger-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').eq(1).click({force: true})
			cy.get('input[type="search"]').eq(1).type(newLineManager)	
			
			//cy.get('input[type="search"]').click({force: true})
			//cy.get('input[type="search"]').type(newLineManager)	
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			
			cy.wait(1000)
			cy.get('#dtTransfer').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(firstDate)
			})
			
			cy.xpath("//button[contains(text(),'Transfer')]").click({force: true})
			
			cy.get('#EStableSorter')
			.find('tbody > tr')
			.then(listing => {
			const listingCount = Cypress.$(listing).length;
			cy.log(listingCount)
			var lastField = listingCount - 1
			
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[3]").eq(lastField).should('have.text', firstDate)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[4]").eq(lastField).should('have.text', newLineManager)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[6]").eq(lastField).contains('Pending')
	
		    })
	})
		
	it('Verify Transfer Entry Notification from HR ', function() {
		const { softAssert, softExpect } = chai;
		cy.HrLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Employee Transfer Entry Submitted');	
			  softExpect(Note.trim()).to.contains('Employee Transfer Entry Submitted By '+employeeID);	
			
			})
		})
		
	})	
	
	it('Submit Transfer details from HR ', function() {	
	
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Approval?Menu=HRTransferApproval')
		cy.wait(2000)	
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.wait(2000)
				cy.get('[name="DEPARTMENT"]').select('IT',{force: true})
				cy.get('[name="DESIGNATION"]').select('MANAGER',{force: true})
				cy.get('[name="COSTCENTRE"]').select('Pune',{force: true})
				
				cy.get('#btnSave').click({force: true})
				cy.wait(5000)	
			}
			})
			})
			
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[1]").eq(0).should('have.text', employeeID)
		})

	it('Verify Transfer Entry Notification from New Line Manager Login', function() {
		const { softAssert, softExpect } = chai;
		cy.NewLineManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(1).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('HR Multi Transfer Approved');	
			  softExpect(Note.trim()).to.contains('Transfer Data Approval For - '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Transfer Data Approval Notification from New Line Manager Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.HrLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('HR Multi Transfer Approved');	
			  softExpect(Note.trim()).to.contains('Transfer Data Approval For - '+employeeID);	
			
			})
		})
		
	})	
	
	it('Approve Transfer request from New Line Manager ', function() {	
	
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Approval?Menu=LineManagerApproval')
		cy.wait(2000)	
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.wait(2000)
				cy.get('#txtReason').click({force: true})
				cy.get('#txtReason').clear().type('Test');
				
				cy.xpath("//button[contains(text(),'Approve')]").click({force: true})
				cy.wait(5000)	
			}
			})
			})
			cy.get('#EStableSorter1')
			.find('tbody > tr')
			.then(listing => {
			const listingCount = Cypress.$(listing).length;
			cy.log(listingCount)
			var lastField = listingCount - 1
			
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[4]").eq(lastField).should('have.text', currentDate)
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[5]").eq(lastField).should('have.text', firstDate)
			
			})
	
		})

	it('Verify Approved Status from Manager Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Request?Menu=EmployeeTransfer')
		cy.wait(2000)
		
		cy.get('#EStableSorter')
		.find('tbody > tr')
		.then(listing => {
		const listingCount = Cypress.$(listing).length;
		cy.log(listingCount)
		var lastField = listingCount-1
	
		cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)	
		cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[6]").eq(lastField).contains('Approved')
		 
		})
	})
	
	it('Verify Transfer Approved Notification from Employee Login', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(1).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Employee Transfer Entry Submitted');	
			  softExpect(Note.trim()).to.contains('Employee Transfer Entry Submitted By '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Transfer Acknowledgement from Employee Login', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Approval?Menu=TransferAcknowledgement')
		cy.wait(2000)
		cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[1]").eq(0).should('have.text', employeeID)	
		   })
	
	it('Verify Transfer Letter from Employee Login', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.visit(Cypress.env('url')+'Employee/Profile/OtherDetails?Menu=employeedoc')
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter1']/tbody/tr/td[1]").eq(0).contains('Change in Cost Center')

		   })
		
	it('Verify Transfer Letter from Employee in Cloud', function() {	
		const { softAssert, softExpect } = chai;
		  cy.wait(1000)
		  cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
		
		cy.get('#Profile_EmployeeDocument').click({force:true})
		cy.wait(5000)
			
		cy.xpath("//h6[@class='text-truncate']").contains('Change in Cost Center')
			
		   })
	
	it('Verify Transfer fields', function() {
	const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('#employeeTab').click({force:true})
                cy.wait(5000)
				cy.get('#DESIGNATION > option:selected').invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('MANAGER');				
		})
		
		cy.get('#DEPARTMENT > option:selected').invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('IT');				
		})
	})	
	
	it('Request for Employee Transfer from Manager', function() {
	cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Request?Menu=EmployeeTransfer')
		cy.wait(2000)	
			
		cy.get('#SettingName').select(transferSetting,{force: true})
		
		cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)	
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			
			
			cy.get('#select2-multiEmpManger-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(newLineManager)	
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			
			cy.wait(1000)
			cy.get('#dtTransfer').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
			})
			
			cy.xpath("//button[contains(text(),'Transfer')]").click({force: true})
			
			cy.get('#EStableSorter')
			.find('tbody > tr')
			.then(listing => {
			const listingCount = Cypress.$(listing).length;
			cy.log(listingCount)
			var lastField = listingCount - 1
			
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[3]").eq(lastField).should('have.text', currentDate)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[4]").eq(lastField).should('have.text', newLineManager)
			cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[6]").eq(lastField).contains('Pending')
	
		    })
	})
	
	it('Submit Transfer details from HR ', function() {	
		cy.HrLogin()
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Approval?Menu=HRTransferApproval')
		cy.wait(2000)	
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.wait(2000)
				cy.get('[name="DEPARTMENT"]').select('IT',{force: true})
				cy.get('[name="DESIGNATION"]').select('MANAGER',{force: true})
				
				cy.get('#btnSave').click({force: true})
				cy.wait(5000)	
			}
			})
			})
			
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[1]").eq(0).should('have.text', employeeID)
		})
	
	it('Reject Transfer request from New Line Manager ', function() {	
	cy.NewLineManagerLogin()
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Approval?Menu=LineManagerApproval')
		cy.wait(2000)	
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>button').click({force: true})
				cy.wait(2000)
				cy.get('#txtReason').click({force: true})
				cy.get('#txtReason').clear().type('Test');
				
				cy.xpath("//button[contains(text(),'Reject')]").click({force: true})
				cy.wait(5000)	
			}
			})
			})
			cy.get('#EStableSorter1')
			.find('tbody > tr')
			.then(listing => {
			const listingCount = Cypress.$(listing).length;
			cy.log(listingCount)
			var lastField = listingCount - 1
			
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[4]").eq(lastField).should('have.text', currentDate)
			cy.xpath("//table[@id='EStableSorter1']/tbody/tr/td[5]").eq(lastField).should('have.text', firstDate)
			
			})
	
		})
	
	it('Verify Rejected Status from Manager Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Transfer/Transaction/Request?Menu=EmployeeTransfer')
		cy.wait(2000)
		
		cy.get('#EStableSorter')
		.find('tbody > tr')
		.then(listing => {
		const listingCount = Cypress.$(listing).length;
		cy.log(listingCount)
		var lastField = listingCount-1
	
		cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[1]").eq(lastField).should('have.text', employeeID)	
		cy.xpath("//table[@id='EStableSorter']/tbody/tr/td[6]").eq(lastField).contains('Rejected')
		 
		})
	})
	
	it('Verify Transfer Rejected Notification from Employee Login', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(1).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Employee Transfer Entry Rejected');	
			  softExpect(Note.trim()).to.contains('Employee Transfer Entry Rejected By '+employeeID);	
			
			})
		})
		
	})	
	
})
	