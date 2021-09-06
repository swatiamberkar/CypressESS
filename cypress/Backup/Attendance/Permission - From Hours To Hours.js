
describe('Permission', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')	
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	const calDate = Cypress.moment().format('LL')
	
	var Month1 = 'March'
	var employeeID ='CY43'
	var managerID = 'CY5'
	var managerID2 = 'CY1'
	var empFound = ''
	var PermissionDate = '08/03/2021'
	var PermissionDate1 = 'March 8, 2021'
	var ShiftDay = '8'
	
	var PermiFromHour = '01'
	var PermiFromMin = '00'
	var PermiToHour = '02'
	var PermiToMin = '00'
	var Reason = 'Test'
	
	
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
		

	it('Login into Pocket ESS & Navigate to Permission From Hour To Hour', function() {	
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=PermissionFromHourToHour')

	})
	
	it('Verify Validation Massges - Please Added Values.', function() {
		const { softAssert, softExpect } = chai;
		
		 cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Added Values.');
		 cy.get(".noty_body").click({force: true})
		 cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please select Permission Date.', function() {
		const { softAssert, softExpect } = chai;
			
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please select Permission Date.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please Enter Permission From Hours.', function() {
		const { softAssert, softExpect } = chai;
		cy.log('calDate:' +calDate)
		
		cy.get('#dtPermi').click()
		cy.get('[aria-label="'+PermissionDate1+'"]').eq(0).click()
		
	/*	cy.get('#dtPermi').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(PermissionDate)
		})
	*/
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Permission From Hours.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please Enter Permission To Hours.', function() {
		const { softAssert, softExpect } = chai;
		cy.get('#tmPermiFromHour').click({force: true})
			cy.wait(5000)
		cy.get('#tmPermiFromHour').clear().type(PermiFromHour);
		
		cy.get('#tmPermiFromMin').click({force: true})
		cy.get('#tmPermiFromMin').clear().type(PermiFromMin);
		
		 cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Permission To Hours.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Data saved successfully For Approval!', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#tmPermiToHour').click({force: true})
		cy.get('#tmPermiToHour').clear().type(PermiToHour);
		
		cy.get('#tmPermiToMin').click({force: true})
		cy.get('#tmPermiToMin').clear().type(PermiToMin);
		
		cy.get('#txtReason').click({force: true})
		cy.get('#txtReason').clear().type('Test');
			
		 cy.get('#btnAdd').click({force: true})
		 
		 cy.get('#tblPermiBody>tr:nth-child(2)>td:nth-child(2)').contains(PermissionDate1)
		 cy.get('#tblPermiBody>tr:nth-child(2)>td:nth-child(3)').contains(PermiFromHour +':'+PermiFromMin)
		 cy.get('#tblPermiBody>tr:nth-child(2)>td:nth-child(4)').contains(PermiToHour +':'+PermiToMin)
		 cy.get('#tblPermiBody>tr:nth-child(2)>td:nth-child(5)').contains(Reason)
		 
		 cy.get('#btnSave').click({force: true})
		  cy.wait(3000)	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data saved successfully For Approval!');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it('Verify Permission in Permission Approval pending', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#btnApproval').click({force: true})
		cy.get('.modal-body > div >b:nth-child(1)').contains('Pending')
		cy.get('.container > div  > table > tbody >tr>td:nth-child(2)').eq(0).contains(PermissionDate)
		cy.get('.container > div  > table > tbody >tr>td:nth-child(2)').eq(1).contains(PermiFromHour +':'+PermiFromMin)
		cy.get('.container > div  > table > tbody >tr>td:nth-child(2)').eq(2).contains(PermiToHour +':'+PermiToMin)
		cy.get('.container > div  > table > tbody >tr>td:nth-child(2)').eq(3).contains(Reason)
	})
	
	it.skip('Verify Validation Massges - Date not Allowed. Please Select Date Between 01/01/2021 and 31/01/2021', function() {
		const { softAssert, softExpect } = chai;
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type('3');
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type('0');
		
		 cy.get('#btnAdd').click({force: true})
		  cy.wait(1000)	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Date not Allowed. Please Select Date Between 01/01/2021 and 31/01/2021');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
		
	it.skip('Verify Validation Massges - Shift Schedule Not Found.!', function() {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=permission')
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.wait(3000)	
		cy.get('#dtPermi').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(PermissionDate)
		})
		
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type('3');
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type('0');
		
		 cy.get('#btnAdd').click({force: true})
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Shift Schedule Not Found.!');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it.skip('Add Shift Schedule', function() {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=shift')
		cy.wait(1000)
		 cy.get('#MonthName').select(Month1,{force: true})
		 cy.wait(1000)
		 cy.get('#fromdt').click({force: true})
		cy.get('#fromdt').clear().type(ShiftDay);
		cy.wait(1000)
		cy.get('#tody').click({force: true})
		cy.get('#tody').clear().type(ShiftDay);
		cy.wait(1000)
		 cy.get('#btnProcess').click({force: true})
		cy.wait(5000)
			cy.get('#ShiftName > option:selected').invoke('text').then((text) => {
				
			var shiftName = text.trim()
			
			cy.get('#tblShift > tbody > tr > td:nth-child(1)').eq(0).contains(ShiftDay)
			cy.get('#tblShift > tbody > tr > td:nth-child(2)> select > option:selected').eq(0).invoke('text').then((text) => {
                         softExpect(text.trim()).to.eq(shiftName);
         })	
             
         })	
		 
		  cy.get('#btnSave').click({force: true})
		 cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Entry Saved Successfully!');
		 })
	})
	
	it.skip('Approve Claim Entry at Manager 1 Login', function() {
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
			
			if (ShiftDate.trim() == PermissionDate)
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
	
	it.skip('Verify Validation Massges - Data saved successfully For Approval!', function() {
		const { softAssert, softExpect } = chai;
		
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=PermissionFromHourToHour')
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.wait(3000)	
		cy.get('#dtPermi').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(PermissionDate)
		})
		
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type(PermiFromHour);
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type(PermiFromMin);
		
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type(PermiToHour);
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type(PermiToMin);
		
		cy.get('#txtReason').click({force: true})
		cy.get('#txtReason').clear().type('Test');
			
		 cy.get('#btnAdd').click({force: true})
		 
		 cy.get('#tblPermi >tbody >tr:nth-child(2)>td:nth-child(1)').contains(PermissionDate)
		 cy.get('#tblPermi >tbody >tr:nth-child(2)>td:nth-child(2)').contains(PermiFromHour +':'+PermiFromMin)
		 cy.get('#tblPermi >tbody >tr:nth-child(2)>td:nth-child(2)').contains(PermiToHour +':'+PermiToMin)
		 cy.get('#tblPermi >tbody >tr:nth-child(2)>td:nth-child(3)').contains(Reason)
		 
		 cy.get('#btnSave').click({force: true})
		  cy.wait(3000)	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data saved successfully For Approval!');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
	})
	
	it.skip('Verify Validation Massges - Duplicate Permission Date not Allowed.', function() {
		const { softAssert, softExpect } = chai;

		ccy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=PermissionFromHourToHour')
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.get('#ddMonth').select(Month1,{force: true})
		cy.get('#ddMonth').select(Month1)
		cy.wait(3000)	
		cy.get('#dtPermi').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(PermissionDate)
		})
		
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type(PermiFromHour);
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type(PermiFromMin);
		
		cy.get('#tmPermiHour').click({force: true})
		cy.get('#tmPermiHour').clear().type(PermiToHour);
		
		cy.get('#tmPermiMin').click({force: true})
		cy.get('#tmPermiMin').clear().type(PermiToMin);
		
		cy.get('#txtReason').click({force: true})
		cy.get('#txtReason').clear().type('Test');
			
		 cy.get('#btnAdd').click({force: true})
		 
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Duplicate Permission Date not Allowed.');
		 cy.get(".noty_body").click({force: true})
		  cy.wait(1000)	
		 })
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
			 softExpect(title.trim()).to.contains('Permission');	
			  softExpect(Note.trim()).to.contains('Approval request for Permission Entry - '+employeeID);		
			})
		})
		
	})	

	it('Approve Permission Entry at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=ManagerPermissionFromHourToHour')
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
			
			if (ShiftDate.trim() == PermissionDate)
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

/*	it('Verify Approved shift at Employee Login', function() {
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
*/
	
})
	