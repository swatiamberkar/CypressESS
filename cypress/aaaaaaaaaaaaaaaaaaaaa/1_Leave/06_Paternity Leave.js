
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
	
	it('Login into Pocket ESS', function() {
		cy.FemaleEmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Verify Validation Massage - This leave is only applicable for Male Employee',function(){
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 14); //number  of days to add, e.x. 15 days
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

var after14days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after14days_Date);
cy.wait(2000)

	cy.get('#drpLeaveType').select('PaternityLeave',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after14days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("This leave is only applicable for Male Employee");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massage - Leave should be less than or equal to : 15',function(){
	const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 20); //number  of days to add, e.x. 15 days
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
var after20days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after20days_Date);
cy.wait(2000)
	

	cy.get('#drpLeaveType').select('PaternityLeave',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after20days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave should be less than or equal to : 15");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massage - Leave should be greater than or equal to : 15',function(){
	const { softAssert, softExpect } = chai;
	
	var someDate = new Date();
someDate.setDate(someDate.getDate() + 10); //number  of days to add, e.x. 15 days
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

var after10days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after10days_Date);
cy.wait(2000)

	

	cy.get('#drpLeaveType').select('PaternityLeave',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after10days_Date)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave should be greater than or equal to : 15");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})

	it('Apply Paternity Leave (15 Days) for Female',function(){
	const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)
		var someDate = new Date();
someDate.setDate(someDate.getDate() + 14); //number  of days to add, e.x. 15 days
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

var after14days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after14days_Date);
cy.wait(2000)


	cy.get('#drpLeaveType').select('PaternityLeave',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after14days_Date)
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
		 softExpect(text.trim()).to.eq(after14days_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('15');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Paternity Leave');
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})
	
	it('Verify Notification at Manager Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(10000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(maleEmpID+' (Paternity Leave)');	
			
			})
		})
		
	})	

/*	it('Reject Paternity Leave from Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()
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
			
			if (EmpCode.trim() == maleEmpID && LeaveType.trim() == 'PaternityLeave')
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
	cy.wait(20000)
	})
		
	it('Apply Paternity Leave (15 Days) for Female',function(){
	const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)
		
		var someDate = new Date();
someDate.setDate(someDate.getDate() + 14); //number  of days to add, e.x. 15 days
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

var after14days_Date = dd+'/'+mm+'/'+yyyy;
cy.log(after14days_Date);
cy.wait(2000)

	
	
	cy.get('#drpLeaveType').select('PaternityLeave',{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(after14days_Date)
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
		 softExpect(text.trim()).to.eq(after14days_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('15');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Paternity Leave');
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})
*/	
	it('Approve Paternity Leave from Manager',function(){
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
			
			if (EmpCode.trim() == maleEmpID && LeaveType.trim() == 'PaternityLeave')
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
	cy.wait(20000)
	})

	it('Verify Approve Status from Employee',function(){
		const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(10000)
	
	cy.xpath('//table[@class="table table-hover table-mc-light-blue"]').find('tr').should('have.length', 2)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Approved');
	})
	})	
	
/*	it('Cancel Approved Leave from Employee',function(){
		const { softAssert, softExpect } = chai;
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
			
			if (EmpCode.trim() == maleEmpID && LeaveType.trim() == 'PaternityLeave')
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
		cy.wait(20000)
	})
	
	it('Verify Reject Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin()
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
			
			if (EmpCode.trim() == maleEmpID && LeaveType.trim() == 'PaternityLeave')
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
		cy.wait(20000)
	})
	
	it('Verify Approve Cancel Leave Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
	cy.MaleEmployeeLogin() 
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	})
*/	
})
	