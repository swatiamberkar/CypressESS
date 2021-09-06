
describe('Shift', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var Month1 = 'March'
	var employeeID ='GT04'
	var managerID = 'GT02'
	var managerID2 = 'GT03'
	var empFound = ''
	
	
	it('successfully page  loads', function() {
		cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
	})
	
	beforeEach(function(){
        cy.getCookies()
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
	
		
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
	it('Assign manager for Shift Schedule Entry module', function() {	
		const { softAssert, softExpect } = chai;

		cy.navigate_EmployeeProfile()
	
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)
		
			cy.get('#select2-approvalManager-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID)

			cy.get('.select2-results__option--highlighted').click({force: true})
	
			cy.get('#ShiftScheduleEntry').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');

			})
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
		
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Shift Schedule Entry')
	
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
	
			})
		
		   })
			
	it('Login into Pocket ESS & Navigate to Shift Schedule Entry', function() {	
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=shift')

	})
		
	it('Verify Validation Massges - Please Enter From Day', function() {
		const { softAssert, softExpect } = chai;
		
		 cy.get('#MonthName').select(Month1,{force: true})
		 cy.get('#btnProcess').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter From Day');
		 cy.get(".noty_body").click({force: true})
		 cy.wait(1000)	
		 })
	})
	
	it('Verify Validation Massges - Please Enter To Day', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#fromdt').click({force: true})
		cy.get('#fromdt').clear().type('1');
		
		 cy.get('#btnProcess').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter To Day');
		 cy.get(".noty_body").click({force: true})
		 })
	})
	
	it('Verify Validation Massges - Entry Saved Successfully!', function() {
		const { softAssert, softExpect } = chai;
		
		cy.get('#tody').click({force: true})
		cy.get('#tody').clear().type('1');
		
		 cy.get('#btnProcess').click({force: true})
	
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

	it('Approve Shift Entry at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'/Leave/Transaction/LeaveApproval?Menu=ShiftApproval')
		cy.wait(2000)
			cy.get('#select2-multiEmp-container').click({force: true})
	
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type('gt04')

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
			cy.get('input[type="search"]').type('gt04')

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
	