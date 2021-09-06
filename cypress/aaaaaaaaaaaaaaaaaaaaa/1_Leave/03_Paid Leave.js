
describe('Paid Leave', function() {
	// apply leave for payroll
	// Consecutive days
	// IF entry not found in manger login
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var pass = 'AAAAA1234A'	
	var companyCode = ''
	var employeeID ='GT07'
	var managerID = 'GT02'
	var empFound = ''
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	
	let DayType =
		[{LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "PaidLeave", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"}, 
		 {LeaveType: "Paid Leave", FromDate: "01/04"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "CL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "CL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "CL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY"},		 
		];
	
	let LeaveDate =
		[{LeaveType: "PL", FromDate: "02/04/2021", FromDateDay: "FULL DAY", ToDate: "01/04/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "12/04/2021", FromDateDay: "FULL DAY", ToDate: "12/04/2021", ToDateDay: "FULL DAY"},//before Current Day
		 {LeaveType: "PL", FromDate: "02/04/2021", FromDateDay: "FULL DAY", ToDate: "02/04/2021", ToDateDay: "FULL DAY"},//Current Day 
		 {LeaveType: "PL", FromDate: "26/04/2021", FromDateDay: "FULL DAY", ToDate: "26/04/2021", ToDateDay: "FULL DAY"},//After Current day
		];	
	
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
	
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
		
	it('Add Leave Opening for Paid Leave', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeLeave()	
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==DayType[2].LeaveType){
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			//cy.get('.cor-next').click({force: true})
			cy.wait(3000)
			cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='float-right']").eq(i).click()
			cy.wait(3000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear().type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)	
			}
			
		})
		
			}
		})
		})
	})
	
	it('Assign manager for Leave module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;

		//cy.navigate_EmployeeProfile()
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
		cy.EmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Apply Paid Leave for Past Date',function(){
	const { softAssert, softExpect } = chai;
		//cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest')
		//cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 //cy.wait(2000)
	cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[1].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[1].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].FromDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
		
	})
	
	it('Apply Paid Leave for future date',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[3].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[3].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[3].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[3].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[3].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[3].ToDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[3].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[3].ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
			
	})
	
	it('Verify Validation Massges - Leave is already applied for the same date',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[1].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[1].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 
			cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave is already applied for the same date");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })	
	})
	
	it('Verify Cancel Leave',function(){
		const { softAssert, softExpect } = chai;
		cy.get('[value="Cancel"]').eq(0).click()
		cy.wait(5000)
		cy.get('[value="Cancel"]').eq(0).click()
		cy.wait(5000)
		
	
	})
	
	
	it('1. Leave Request -> Leave Approval',function(){
	})	
	
	it('Apply Leave',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[2].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[2].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[2].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[2].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[2].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[2].ToDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[2].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[2].ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
			
	})
	
	it('Verify Notification at Manager ', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		
		const addTen = Cypress.moment().add(10, 'minutes').calendar()
		var addTenMinutesTime = addTen.slice(8);
		
		const subtractTen = Cypress.moment().subtract(10, 'minutes').calendar()
		var subtractTenMinutesTime = subtractTen.slice(8);

		const currentTime = Cypress.moment().format('DD MMM yyyy')

		var beforeTenMinutes = currentTime + " "+subtractTenMinutesTime
	
		var afterTenMinutes = currentTime + " "+addTenMinutesTime

	const start = Cypress.moment(beforeTenMinutes)
	const end = Cypress.moment(afterTenMinutes)
	 // display hours + minutes + AM|PM
    const f = 'DD MMM yyyy hh:mm A'

		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
		cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			 softExpect(Note.trim()).to.contains(employeeID);	
		
		cy.get('.feeds-body >h4 >small').eq(0).should(($el) => {
		const m = Cypress.moment($el.text().trim())	  
		expect(m.isBetween(start, end),
		`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
		})
		
		})
		})
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID);	
			
		cy.get('.feeds-body >h4 >small').eq(0).should(($el) => {
		const m = Cypress.moment($el.text().trim())	  
		expect(m.isBetween(start, end),
		`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
		})	
			})
		})
		
		cy.get('.feeds-body >h4').eq(2).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(2).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID);	
			
		cy.get('.feeds-body >h4 >small').eq(0).should(($el) => {
		const m = Cypress.moment($el.text().trim())	  
		expect(m.isBetween(start, end),
		`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
		})	
			})
		})
		
		cy.get('.feeds-body >h4').eq(3).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(3).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID);	
		
		cy.get('.feeds-body >h4 >small').eq(0).should(($el) => {
		const m = Cypress.moment($el.text().trim())	  
		expect(m.isBetween(start, end),
		`${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
		})
			})
		})
		
	})	

	it('Approve Leave at Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == DayType[0].LeaveType)
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
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
	
	it('Verify Notification at Employee', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Approved');	
			  softExpect(Note.trim()).to.contains('Approval of Leave for '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Status at Employee',function(){
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	
	//cy.xpath('//div[@class="table-responsive-vertical shadow-z-1"]/table/tbody').find('tr').should('have.length', 4)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Approved');
	})
	})	
	
	
/*	it('2. Cancel Approved Leave -> Reject Leave',function(){
	})	
	
	it('Cancel Leave at Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		//cy.get(".alert-warning").invoke('text').then((text) => {
		//softExpect(text.trim()).to.contains("No Records Found.");
		//})
	
	})
	
	it('Verify Notification at Manager', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Cancelled');	
			  softExpect(Note.trim()).to.contains('Leave Cancel By '+employeeID);	
			
			})
		})
		
	})

	it('Reject Leave at Manager',function(){
		const { softAssert, softExpect } = chai;
		//cy.logout()
		//cy.ManagerLogin()
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == DayType[0].LeaveType)
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
		
	it('Verify Notification at Employee', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Cancellation');	
			  softExpect(Note.trim()).to.contains('Cancellation of Leave for '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	//cy.xpath('//div[@class="table-responsive-vertical shadow-z-1"]/table/tbody').find('tr').should('have.length', 4)
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Approved');
	})	})


	it('3. Cancel Approved Leave -> Approve Leave',function(){
	})	
	
	it('Cancel Leave at Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(2000)
		
	})

	it('Verify Notification at Manager', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Cancelled');	
			  softExpect(Note.trim()).to.contains('Leave Cancel By '+employeeID);	
			
			})
		})
		
	})

	it('Approve Leave at Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == DayType[0].LeaveType)
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
		
	it('Verify Notification at Employee', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Cancellation');	
			  softExpect(Note.trim()).to.contains('Cancellation of Leave for '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Status at Employee',function(){
	const { softAssert, softExpect } = chai;
	//cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("No Records Found.");
		})
		
	})
	
	
	it('4. Leave Request -> Reject Leave',function(){
	})
	
	it('Apply Leave',function(){
	const { softAssert, softExpect } = chai;
		//cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest')
		//cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 //cy.wait(2000)
	cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[1].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[1].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[1].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].FromDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})

	it('Reject Leave at Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == DayType[0].LeaveType)
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
		cy.wait(25000)	
	})
	
	it('Verify Notification at Employee', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Cancellation');	
			  softExpect(Note.trim()).to.contains('Cancellation of Leave for '+employeeID);	
			
			})
		})
		
	})	
	
	it('Verify Status at Employee',function(){
	const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("No Records Found.");
		})
		
	})
	
	*/
	
})
	