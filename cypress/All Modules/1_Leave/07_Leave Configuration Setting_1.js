
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
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})

	it('(a) Setting for Maximum Leave in Month Eligibility',function() {
		const { softAssert, softExpect } = chai;
		
			cy.navigate_LeaveSetting()
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(2000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').type(leaveSetting.MaximumLeaveInMonth)
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()	
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveSetting.LeaveType){
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			cy.get('.cor-next').click({force: true})
			cy.wait(3000)
			cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='float-right']").eq(i).click()
			cy.wait(3000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear().type(leaveSetting.MaximumLeaveInMonth);
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)	
			}
			
		})
		
			}
		})
		})
		
	})
				
	it('(a) Verify Maximum Leave in Month Eligibility',function(){
	const { softAssert, softExpect } = chai;
		
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)
		 
	cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.ToDate1)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		   cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Leave limit is exceeded,Allowed monthly limit is : '+leaveSetting.MaximumLeaveInMonth);
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })

		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.ToDate)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.MaximumLeaveInMonth);
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(DayType[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
	})
	
	it('(d) Setting for Leave should be allowed on Weekoff / Holiday.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#whSetting').select('should')
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
			cy.navigate_EmployeeLeave()	
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveSetting.LeaveType){
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			cy.get('.cor-next').click({force: true})
			cy.wait(3000)
			cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='float-right']").eq(i).click()
			cy.wait(3000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear().type('20');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)	
			}
			
		})
		
			}
		})
		})
		
			
	})
	
	it('(d) Verify Leave should be allowed on Weekoff.',function(){
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.WeekOff_Date1)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.WeekOff_Date1)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.WeekOff_Date1);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.WeekOff_Date1);
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
	
	it('(d) Verify Leave should be allowed on Holiday.',function(){
	const { softAssert, softExpect } = chai;
		 cy.wait(5000)

			cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(5000)
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.Holiday)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.Holiday)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.Holiday);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(leaveSetting.Holiday);
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

	it('(d) Setting for Leave should not be allowed on Weekoff / Holiday.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#whSetting').select('should not')
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
			
		
			
	})
	
	it('(d) Verify Leave should not be allowed on Weekoff.',function(){
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			//cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(15000)
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.WeekOff_Date1)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.WeekOff_Date1)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('From Date is Weekly Off.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
		  
	})
	
	it('(d) Verify Leave should not be allowed on Holiday.',function(){
	const { softAssert, softExpect } = chai;
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.Holiday)
			})
		cy.get('#drpFromLeaveTyp').select(leaveSetting.FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.Holiday)
			})
		cy.get('#drpToLeaveTyp').select(leaveSetting.ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('From Date is holiday.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
		  
			
	})
	
	it('(h) setting for Previous Date Leave Entry should be ristricted for this leave.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddPreviousDateLeaveEntry').select('should')
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(h) Verify Previous Date Leave Entry should be ristricted for this leave.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			//cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(15000)
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
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
		
		
		cy.get('#btnAdd').click({force: true})
		
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Past Date Leave Entry is not allowed');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
		  
	})
	
	it('(l) setting for Multiple leaves should be allowed on consecutive days.',function() {
		cy.cloudLogin()
	
		cy.changeCompany()
		
		cy.navigate_LeaveSetting()		
			cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			
			cy.get('#ddMultipleLeaves').select('should')
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})		
	})
	
	it('(l) Verify Multiple leaves should be allowed on consecutive days.',function(){
	const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(5000)

			//cy.get('[value="Cancel"]').eq(0).click({force: true})
		cy.wait(15000)
		 
		  cy.get('#drpLeaveType').select(leaveSetting.LeaveType,{force: true})
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
	

})
