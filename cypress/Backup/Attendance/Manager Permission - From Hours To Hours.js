
describe('Manager Permission - From Hours To Hours', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var Month1 = 'March'
	var employeeID ='CY43'
	var managerID = 'CY5'
	var managerID2 = 'CY1'
	var empFound = ''
	
	
	it('successfully page  loads', function() {
		cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
	})
	
	beforeEach(function(){		
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		// Next
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','AI_sentBuffer','AI_buffer','1P_JAR','ARRAffinity','tablesorter-pager','module','dataWizardtblData','FavouriteMenus','XCategory','_ga_68GNHT5CK9','XCompanyId','XName','XUserXpROLE','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		//ESS
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		//https://pockethrmsnext.azurewebsites.net/
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		//cloud.pockethrms.com/
		Cypress.Cookies.preserveOnce('.AspNetCore.Mvc.CookieTempDataProvider','_ga_68GNHT5CK9','.AspNetCore.Session	','XNcompanyName','XNGender','XNESSRole','XNCompanyId','XNEmployeeId','XNSchemaName','XNEmployeeFullName','.AspNetCore.Antiforgery.w5W7x28NAIs','XNPocketToken','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		
   })
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.contains('li', employeeID).click({force: true})
		//cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeLeave',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)
	})

	Cypress.Commands.add('navigate_LeaveSetting',()=>{
    
			cy.wait(1000)
			cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.get('#leave_detail_tab').click({force:true})
			cy.get('#leave_detail_tab').click()
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(3000)
	})
	
	Cypress.Commands.add('set_DefaultLeaveConfiguration',(LeaveType)=>{
		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(8000)
		
		cy.get('#ddLeavType').select(LeaveType)
		cy.wait(2000)
		
		cy.get('#btnDelete').click({force:true})
		cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data deleted successfully.!')		
			})
	})	
	
	Cypress.Commands.add('EmployeeLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		
		cy.get('input[name=companycode]').click({force: true})
		cy.get('input[name=companycode]').clear();
		cy.get('input[name=companycode]').type(comapnaycode)
		
		cy.get('input[name=employeecode]').click({force: true})
		cy.get('input[name=employeecode]').clear();
		cy.get('input[name=employeecode]').type(employeeID)
		
		cy.get('input[name=password]').click({force: true})
		cy.get('input[name=password]').clear();
		cy.get('input[name=password]').type(employeeID)

		cy.xpath("//button[contains(text(),'Login')]").click({force: true})
		})
	})
	})
	
	Cypress.Commands.add('ManagerLogin',()=>{
		cy.visit(Cypress.env('url'))
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		

	
		
		cy.get('input[name=companycode]').click({force: true})
		cy.get('input[name=companycode]').clear();
		cy.get('input[name=companycode]').type(comapnaycode)
		

		cy.get('input[name=employeecode]').click({force: true})
		cy.get('input[name=employeecode]').clear();
		cy.get('input[name=employeecode]').type(managerID)
		

		cy.get('input[name=password]').click({force: true})
		cy.get('input[name=password]').clear();
		cy.get('input[name=password]').type(managerID)

		cy.xpath("//button[contains(text(),'Login')]").click({force: true})

		})
	})
	})
	
	Cypress.Commands.add('Manager2Login',()=>{
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
		cy.get('input[name=employeecode]').type(managerID2)
		
		cy.wait(2000)
		cy.get('input[name=password]').click({force: true})
		cy.get('input[name=password]').clear();
		cy.get('input[name=password]').type(managerID2)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Login')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
		
	it('Login into Pocket ESS & Navigate to Manager Permission - From Hours To Hours', function() {	
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=ManagerPermissionFromHourToHour')

	})
	
	
	it('Verify Validation Massges - Please Select Category.', function() {
		const { softAssert, softExpect } = chai;
		
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Select Category.');
		 cy.get(".noty_body").click({force: true})
		 cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please Select Employee.', function() {
		const { softAssert, softExpect } = chai;
		cy.get('#CategoryId').select('Staff',{force: true})
	
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Select Employee.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please Enter Permission Hours.', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.get('.select2-results__option--highlighted').click({force: true})
			
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Permission Hours.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})

	it('Verify Validation Massges - Date not Allowed. Please Select Date Between 01/01/2021 and 31/01/2021', function() {
		const { softAssert, softExpect } = chai;
		cy.get('#dtPermi').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/03/2021')
		})
		 cy.get('#btnAdd').click({force: true})
		  cy.wait(1000)	
		 cy.get('#btnSave').click({force: true})
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Date not Allowed. Please Select Date Between 01/01/2021 and 31/01/2021');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})

	it('Verify Validation Massges - Entry Saved Successfully!', function() {
		const { softAssert, softExpect } = chai;
		
		
		cy.get('#dtPermi').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/03/2021')
		})
		cy.wait(1000)	
		 cy.get('#btnAdd').click({force: true})
	
			cy.get('#ShiftName > option:selected').invoke('text').then((text) => {
				
			var shiftName = text.trim()
			
			cy.get('#tblShift > tbody > tr > td:nth-child(1)').eq(0).contains('1')
			cy.get('#tblShift > tbody > tr > td:nth-child(2)> select > option:selected').eq(0).invoke('text').then((text) => {
                         softExpect(text.trim()).to.eq(shiftName);
         })	
             
         })	
		 
		  cy.get('#btnSave').click({force: true})
		 cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Entry Saved Successfully!');
		 })
	})
	
	it('Verify shift in Shift Schedule Approval pending', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#btnApproval').click({force: true})
		cy.get('.modal-body > div >b:nth-child(1)').contains('Pending')
		cy.get('.modal-body > div >b:nth-child(3)').contains('Entry Date : '+currentDate)
		cy.get('.modal-body > div >div:nth-child(6) >table>tbody>tr>td:nth-child(1)').contains('General')
		cy.get('.modal-body > div >div:nth-child(6) >table>tbody>tr>td:nth-child(2)').contains('01/03/2021')
	})
	
	it('Verify Notification at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Shift Schedule Entry Submitted');	
			  softExpect(Note.trim()).to.contains('Approval request for Shift Schedule Entry - '+employeeID);	
			
			})
		})
		
	})	

	it('Approve Claim Entry at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'/Leave/Transaction/LeaveApproval?Menu=ShiftApproval')
		cy.wait(2000)
			cy.get('#select2-multiEmp-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type('cy43')

			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.get('#searchbtn').click({force: true})
			
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
		var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((ShiftDate) => {
			cy.log("ShiftDate: "+ShiftDate)
			
			if (ShiftDate.trim() == '01/03/2021')
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)>label>input').click({force: true})
				
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(5)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(5)>input').clear().type('Approve Shift');
				cy.wait(2000)
				cy.get('#btnSave').click({force: true})
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Records saved successfully.!');
				})
				cy.wait(5000)
				cy.get('#select2-multiEmp-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type('cy43')

			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.get('#searchbtn').click({force: true})
				cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').contains('Approved')
			}
			})
			})
	
	})

	it('Verify Approved shift at Employee Login', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=shift')
			
			cy.get('#tableTO > tbody > tr > td:nth-child(1)').eq(0).contains('01/03/2021')
			cy.get('#tableTO > tbody > tr > td:nth-child(2)> select > option:selected').eq(0).invoke('text').then((text) => {
                         softExpect(text.trim()).to.eq('General');
         })	
             
         
	})
	
	it('Cancel Claim Entry at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'/Leave/Transaction/LeaveApproval?Menu=ShiftApproval')
		cy.wait(2000)
			cy.get('#select2-multiEmp-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type('cy43')

			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.get('#searchbtn').click({force: true})
			
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
		var num = parseFloat(i+1)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((ShiftDate) => {
			cy.log("ShiftDate: "+ShiftDate)
			
			if (ShiftDate.trim() == '01/03/2021')
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(4)>label>input').click({force: true})
				
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)>input').clear().type('Cancel Shift');
				cy.wait(2000)
				cy.get('#btnSave').click({force: true})
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Records saved successfully.!');
				})
				cy.wait(5000)
				cy.get('#select2-multiEmp-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type('cy43')

			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.get('#searchbtn').click({force: true})
				cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(4)').contains('Approved')
				cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('Cancel Shift')
			}
			})
			})
	
	})

	
})
	