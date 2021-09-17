
describe('Maternity Leave', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	var currentYear  = Cypress.env('currentYear')
		
	
	var femaleEmpID ='GT11'
	var maleEmpID = 'GT12'
	var managerID = 'GT02'
	
		
	let months =
		[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];	
		
	
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
   
	Cypress.Commands.add('navigate_FemaleEmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(femaleEmpID)
		cy.wait(2000)
		cy.contains('li', femaleEmpID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_MaleEmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(maleEmpID)
		cy.wait(2000)
		cy.contains('li', maleEmpID).click({force: true})
		cy.wait(3000)
	})
			
	Cypress.Commands.add('FemaleEmployeeLogin',()=>{
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
		cy.get('#EmployeeCode').type(femaleEmpID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(femaleEmpID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('MaleEmployeeLogin',()=>{
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
		cy.get('#EmployeeCode').type(maleEmpID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(maleEmpID)
		
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
	
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
/*	it('Release Paysheet Lock',function(){
		for(let i=0; i< months.length; i++){
		cy.visit(Cypress.env('cloudUrl')+'payroll/transaction/PaysheetLock')	
			cy.wait(2000)
			
			cy.get('#Month1').select(months[i],{force: true})
			cy.wait(1000)
			cy.get('#Year1').click({force: true})
			cy.get('#Year1').clear().type(currentYear)
		
			cy.xpath("//button[contains(text(),'Next')]").click({force: true})
			
			cy.get('#AdminPass').click({force: true})
			cy.get('#AdminPass').clear().type(Cypress.env('userPass'))
		
			cy.wait(2000)
			cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
			cy.xpath("//button[@id='btnRelease']").click({force: true})
			cy.wait(3000)
			}
	})	
	
	it('Delete Payroll Process of Male Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.navigate_MaleEmployeeProfile()
		for(let i=0; i< months.length; i++){
			
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(5000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(5000)
		cy.get('#month').select(months[i], {force: true})
		
		cy.get('#year').click({force: true})
		cy.get('#year').clear().type(currentYear)
		
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(5000)
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())
		//	softExpect(text.trim()).to.eq('Payroll Process Deleted Successfully');	
		//})
		
		}
	})

	it('Delete Payroll Process of Female Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.navigate_FemaleEmployeeProfile()
		for(let i=0; i< months.length; i++){
			
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(5000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(7000)
		cy.get('#month').select(months[i], {force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear().type(currentYear)
		
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(5000)
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())
		//	softExpect(text.trim()).to.eq('Payroll Process Deleted Successfully');	
		//})
		
		}
	})
*/

	it('Assign manager for Leave module from Approval Matrix for Female Employee', function() {	
		const { softAssert, softExpect } = chai;

		cy.navigate_FemaleEmployeeProfile()
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
			cy.get('#Leave').click({force: true})
			cy.get('#approvalmust').select('Yes',{force: true})
			cy.get('#cancelrights').select('Yes',{force: true})
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
			expect(text.trim()).to.contain('Leave')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		
		   })
	
	it('Assign manager for Leave module from Approval Matrix for Male Employee', function() {	
		const { softAssert, softExpect } = chai;

		cy.navigate_MaleEmployeeProfile()
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
			cy.get('#Leave').click({force: true})
			cy.get('#approvalmust').select('Yes',{force: true})
			cy.get('#cancelrights').select('Yes',{force: true})
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
			expect(text.trim()).to.contain('Leave')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		
		   })
	
	it('Login into Pocket ESS', function() {
		cy.MaleEmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Verify Validation Massage - This leave is only applicable for Female Employee',function(){
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 179); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

	var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var after179days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after179days_Date);
cy.wait(2000)

	

	cy.get('#drpLeaveType').select('ML',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after179days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("This leave is only applicable for Female Employee");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massage - Leave should be less than or equal to : 180',function(){
	const { softAssert, softExpect } = chai;
	cy.FemaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 190); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

	var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var after190days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after190days_Date);
cy.wait(2000)

	

	cy.get('#drpLeaveType').select('ML',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after190days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave should be less than or equal to : 180");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massage - Leave should be greater than or equal to : 180',function(){
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 170); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

	var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var after170days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after170days_Date);
cy.wait(2000)
	

	cy.get('#drpLeaveType').select('ML',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after170days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave should be greater than or equal to : 180");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Apply Maternity Leave (180 Days) for Female',function(){
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 179); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

	var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var after179days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after179days_Date);
cy.wait(2000)


	cy.get('#drpLeaveType').select('ML',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after179days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(currentDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(after179days_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('180');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Maternity Leave');
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})
	
/*	it('Reject Maternity Leave from Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)	
		//cy.get('#LeaveDetail').click({force: true})
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((LeaveType) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+LeaveType)
			
			if (EmpCode.trim() == femaleEmpID && LeaveType.trim() == 'ML')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(12)>input').click({force: true})
				cy.wait(2000)
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').click({force: true})
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').clear().type('Test')
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Leave Apply successfull");
				//cy.wait(3000)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	
	})
		
	it('Apply Maternity Leave (180 Days) for Female',function(){
	const { softAssert, softExpect } = chai;
	cy.FemaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 179); //number  of days to add, e.x. 15 days
var dateFormated = someDate.toISOString().substr(0,10);
cy.log(dateFormated);

	var today = new Date(dateFormated);
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var after179days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after179days_Date);
cy.wait(2000)


	cy.get('#drpLeaveType').select('ML',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after179days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(currentDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(after179days_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('180');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Maternity Leave');
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})
*/	
	it('Approve Maternity Leave from Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)	
		//cy.get('#LeaveDetail').click({force: true})
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((LeaveType) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+LeaveType)
			
			if (EmpCode.trim() == femaleEmpID && LeaveType.trim() == 'ML')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.wait(2000)
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Leave Apply successfull");
				//cy.wait(3000)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	
	})

	it('Verify Approve Status from Employee',function(){
		const { softAssert, softExpect } = chai;
	cy.FemaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	
	cy.xpath('//table[@class="table table-hover table-mc-light-blue"]').find('tr').should('have.length', 2)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Approved');
	})
	})	
	
/*	it('Cancel Approved Leave from Employee',function(){
		cy.get('[value="Cancel"]').click({force: true})
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	
	})

	it('Reject Cancel Leave from Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveApproval?Menu=cancelleave')
		cy.wait(2000)	
		//cy.get('#LeaveDetail').click({force: true})
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((EmpCode) => {
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(8)>button').invoke('text').then((LeaveType) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+LeaveType)
			
			if (EmpCode.trim() == femaleEmpID && LeaveType.trim() == 'ML')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.wait(2000)
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Leave Apply successfull");
				//cy.wait(3000)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
	
	it('Verify Reject Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
	cy.FemaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	cy.xpath('//table[@class="table table-hover table-mc-light-blue"]').find('tr').should('have.length', 2)
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Approved');
	})	})

	it('Cancel Approved Leave from Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.get('[value="Cancel"]').click({force: true})
		cy.wait(2000)
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	})

	it('Approve Cancel Leave from Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
		cy.ManagerLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveApproval?Menu=cancelleave')
		cy.wait(2000)	
		//cy.get('#LeaveDetail').click({force: true})
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((EmpCode) => {
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(8)>button').invoke('text').then((LeaveType) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+LeaveType)
			
			if (EmpCode.trim() == femaleEmpID && LeaveType.trim() == 'ML')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(10)>input').click({force: true})
				cy.wait(2000)
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Leave Apply successfull");
				//cy.wait(3000)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
	
	it('Verify Approve Cancel Leave Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
	cy.FemaleEmployeeLogin() 
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	})
*/	
	
})
	