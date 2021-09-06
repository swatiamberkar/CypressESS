
describe('Causal Leave_Leave Configuration Setting', function() {

	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	var filePath= 'demo.xlsx'
	
	var employeeID ='GT06'
	var managerID = 'GT02'

	
	let DayType =
		[{LeaveType: "CL", FromDate: "01/02/2021", FromDateDay: "FULL DAY", ToDate: "01/02/2021", ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "CasualLeave", FromDate: "01/02/2021", FromDateDay: "FULL DAY", ToDate: "01/02/2021", ToDateDay: "SECOND HALF DAY"}, 
		 {LeaveType: "Casual Leave", FromDate: "01/02/2021", FromDateDay: "FIRST HALF DAY", ToDate: "01/02/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "CL", FromDate: "01/02/2021", FromDateDay: "FIRST HALF DAY", ToDate: "01/02/2021", ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "CL", FromDate: "01/02/2021", FromDateDay: "SECOND HALF DAY", ToDate: "01/02/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "CL", FromDate: "01/02/2021", FromDateDay: "SECOND HALF DAY", ToDate: "01/02/2021", ToDateDay: "FIRST HALF DAY"},		 
		];		
	
	let leaveSetting ={LeaveType: "CL", MaximumLeaveInMonth: "4", 
	FromDate: "05/04/2021", FromDateDay: "FULL DAY", ToDate: "08/04/2021", ToDateDay: "FULL DAY", ToDate1: "09/04/2021", 
	WeekOff_Date1: "04/04/2021", WeekOff_Date2: "11/04/2021", Holiday: "14/04/2021",
	previous_Date: "13/04/2021" };
	
	let holiday_LeaveSetting ={LeaveType: "CL", 
	FromDateBeforeHoliday: "13/04/2021", FromDateDay: "FULL DAY", ToDateAfterHoliday: "15/04/2021", ToDateDay: "FULL DAY", 
	Remark: "Holiday Leave Setting", totalUsedLeave:3};
	
	let weekOff_LeaveSetting ={LeaveType: "CL", 
	FromDateBeforeWeekOff: "16/04/2021", FromDateDay: "FULL DAY", ToDateAfterWeekOff: "19/04/2021", ToDateDay: "FULL DAY", 
	Remark: "WeekOff Leave Setting", totalUsedLeave:4};
	
	
	
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
	

	it('(f) Setting for Attach Document Feature is required and it is not mandatory',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#DocumentFSetting').select('required')
			cy.get('#DocumentFSettingMandetory').select('not mandatory')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(f) Verify Attach Document Feature is required and it is not mandatory',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			cy.get('[value="Cancel"]').eq(0).click({force: true})
			cy.wait(5000)
			cy.get('[value="Cancel"]').eq(0).click({force: true})
			cy.wait(5000)
		
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.previous_Date)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.previous_Date)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		 cy.get('#attachDoc').should('be.visible');
		 
		cy.get('#btnAdd').click({force: true})
		
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.previous_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.previous_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
		  
	})
	
	it('(f) Setting for Attach Document Feature is required and it is mandatory',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#DocumentFSetting').select('required')
			cy.get('#DocumentFSettingMandetory').select('mandatory')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(f) Verify Attach Document Feature is required and it is mandatory',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		//cy.get(".alert-warning").invoke('text').then((text) => {
		//softExpect(text.trim()).to.contains("No Records Found.");
		//})
	
			cy.wait(15000)
		
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.previous_Date)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.previous_Date)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		 cy.get('#attachDoc').should('be.visible');
		 
		cy.get('#btnAdd').click({force: true})
		
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please select document file.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
		  
		  cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#attachDoc').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#btnAdd').click({force: true})
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.previous_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.previous_Date);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('[data-title="Attachment Name"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(filePath);
		})
		
		
		cy.get('#btnConfirm').click({force: true})	
		
		  
	})
	
	it('(e) Setting for This Leave must be applied before 3 days.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#leavCrCalBeforeDays').click({force:true})
			cy.get('#leavCrCalBeforeDays').type(3)
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(e) Verify Leave must be applied before 3 days.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		//cy.get(".alert-warning").invoke('text').then((text) => {
		//softExpect(text.trim()).to.contains("No Records Found.");
		//})
	
			cy.wait(15000)
		
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		 
		cy.get('#btnAdd').click({force: true})
		
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Leave should be applied before 3 days');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })  
	})
	
	it('(c) Setting for System should consider intervening holidays as leave.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddInterHolidays').select('should')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(c) Verify System should consider intervening holidays as leave.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			cy.get('#drpLeaveType').select(holiday_LeaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday_LeaveSetting.FromDateBeforeHoliday)
			})
		cy.get('#drpFromLeaveTyp').select(holiday_LeaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday_LeaveSetting.ToDateAfterHoliday)
			})
		cy.get('#drpToLeaveTyp').select(holiday_LeaveSetting.ToDateDay,{force: true})
				 
		cy.get('#btnAdd').click({force: true})
		
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.FromDateBeforeHoliday);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.ToDateAfterHoliday);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('3');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
			
		cy.get('#btnConfirm').click({force: true})	
	})
	
	it('(c) Setting for System should not consider intervening holidays as leave.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddInterHolidays').select('should not')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(c) Verify System should not consider intervening holidays as leave.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)
		cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		
			cy.get('#drpLeaveType').select(holiday_LeaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday_LeaveSetting.FromDateBeforeHoliday)
			})
		cy.get('#drpFromLeaveTyp').select(holiday_LeaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday_LeaveSetting.ToDateAfterHoliday)
			})
		cy.get('#drpToLeaveTyp').select(holiday_LeaveSetting.ToDateDay,{force: true})
				 
		cy.get('#btnAdd').click({force: true})
		
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.FromDateBeforeHoliday);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.ToDateAfterHoliday);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(holiday_LeaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('2');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
			
		cy.get('#btnConfirm').click({force: true})	
	})

	it('(i) Setting for Intervening Week off should be considered as Leave.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddInterWeekOff').select('should')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(i) Verify Intervening Week off should be considered as Leave.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)
		cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		
			cy.get('#drpLeaveType').select(weekOff_LeaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(weekOff_LeaveSetting.FromDateBeforeWeekOff)
			})
		cy.get('#drpFromLeaveTyp').select(weekOff_LeaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(weekOff_LeaveSetting.ToDateAfterWeekOff)
			})
		cy.get('#drpToLeaveTyp').select(weekOff_LeaveSetting.ToDateDay,{force: true})
				 
		cy.get('#btnAdd').click({force: true})
		
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.FromDateBeforeWeekOff);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.ToDateAfterWeekOff);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('4');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
			
		cy.get('#btnConfirm').click({force: true})	
	})
	
	it('(i) Setting for Intervening Week off should not be considered as Leave.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddInterWeekOff').select('should not')
			
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(i) Verify Intervening Week off should not be considered as Leave.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)
		cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		
			cy.get('#drpLeaveType').select(weekOff_LeaveSetting.LeaveType,{force: true})
		   cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(weekOff_LeaveSetting.FromDateBeforeWeekOff)
			})
		cy.get('#drpFromLeaveTyp').select(weekOff_LeaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(weekOff_LeaveSetting.ToDateAfterWeekOff)
			})
		cy.get('#drpToLeaveTyp').select(weekOff_LeaveSetting.ToDateDay,{force: true})
				 
		cy.get('#btnAdd').click({force: true})
		
		cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.FromDateBeforeWeekOff);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.ToDateAfterWeekOff);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(weekOff_LeaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('2');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
			
		cy.get('#btnConfirm').click({force: true})	
	})
	
})
