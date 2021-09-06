
describe('Leave Request', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var pass = 'AAAAA1234A'
	var employeeID ='GT06'
	var managerID = 'GT02'
	var empFound = ''
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	
	let DayType =
		[{LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"}, 
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FIRST HALF DAY"},		 
		];	
	
	let OddDayType =
		[{LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "02/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "FIRST HALF DAY", ToDate: "02/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "PL", FromDate: "01/04/"+FinancialYear_From, FromDateDay: "SECOND HALF DAY", ToDate: "02/04/"+FinancialYear_From, ToDateDay: "SECOND HALF DAY"},	 
		];
		
	let WeekOffLeave =
		[{LeaveType: "PL", FromDate: "04/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "04/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "09/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "11/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},	 
		];

	let HolidayLeave =
		[{LeaveType: "PL", FromDate: "14/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "14/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "02/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "14/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		];

	let LeaveDate =
		[{LeaveType: "PL", FromDate: "02/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "01/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},
		 {LeaveType: "PL", FromDate: "12/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "12/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},//before Current Day
		 {LeaveType: "PL", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},//Current Day 
		 {LeaveType: "PL", FromDate: "26/04/"+FinancialYear_From, FromDateDay: "FULL DAY", ToDate: "26/04/"+FinancialYear_From, ToDateDay: "FULL DAY"},//After Current day
		];
		
	beforeEach(function(){
        cy.getCookies()
   })
   
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
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
		cy.EmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		//cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})

	it('Verify Notification without assign Manager', function() {	
		const { softAssert, softExpect } = chai;
	
		 cy.xpath("//div[@id='row3']/div[1]//li[2]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1st Leave Contact\t:');
		 cy.wait(3000)
		  })
		  
		  cy.get('[class="card-body"]>span').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Manager is not assigned for you. Contact HR');
		 cy.wait(3000)
		  })
	})

	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
		
	it('Assign manager for Leave module from Approval Matrix', function() {	
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
		// cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Verify Validation Massges - Select Type Of Leave', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Type Of Leave');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Enter From date', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(DayType[0].LeaveType,{force: true})
		cy.wait(5000)
	
		cy.get("#tdBalance").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Bal');
		 cy.wait(1000)
		  })
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter From date');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Enter To date', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(DayType[0].FromDate)
			})
		cy.wait(2000)
	
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter To date');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Day type should be same.',function(){
	const { softAssert, softExpect } = chai;
	
	cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(DayType[0].ToDate)
			})
			
	for(let j=0; j< DayType.length; j++){
				
		cy.get('#drpFromLeaveTyp').select(DayType[j].FromDateDay,{force: true})
			
		cy.get('#drpToLeaveTyp').select(DayType[j].ToDateDay,{force: true})
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Day type should be same.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })
				 	
		}		

	})
	
	it('Verify Validation Massges - Select full day in to date instead of second half',function(){
	const { softAssert, softExpect } = chai;
	for(let j=0; j< OddDayType.length; j++){
		
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(OddDayType[j].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(OddDayType[j].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(OddDayType[j].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(OddDayType[j].ToDateDay,{force: true})
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select full day in to date instead of second half');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })
				 	
		}		

	})
	
	it('Verify Validation Massges - From Date is Weekly Off.',function(){
	const { softAssert, softExpect } = chai;	
		
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(WeekOffLeave[0].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(WeekOffLeave[0].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(WeekOffLeave[0].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(WeekOffLeave[0].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {		
		 softExpect(text.trim()).to.eq('From Date is Weekly Off.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
		  })		

	})
	
	it('Verify Validation Massges - To Date is Weekly Off.',function(){
	const { softAssert, softExpect } = chai;
	
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(WeekOffLeave[1].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(WeekOffLeave[1].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(WeekOffLeave[1].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(WeekOffLeave[1].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('To Date is Weekly Off.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
				 	

	})
	
	it('Verify Validation Massges - From Date is holiday.',function(){
	const { softAssert, softExpect } = chai;
	
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(HolidayLeave[0].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(HolidayLeave[0].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(HolidayLeave[0].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(HolidayLeave[0].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('From Date is holiday.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })		

	})
	
	it('Verify Validation Massges - To Date is holiday.',function(){
	const { softAssert, softExpect } = chai;
	
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(HolidayLeave[1].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(HolidayLeave[1].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(HolidayLeave[1].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(HolidayLeave[1].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('To Date is holiday.');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
				 			

	})
		
	it('Verify Validation Massges - To date is less than from date',function(){
	const { softAssert, softExpect } = chai;
	
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[0].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[0].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[0].ToDate)
			})
		cy.get('#drpToLeaveTyp').select(LeaveDate[0].ToDateDay,{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('To date is less than from date');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
				 	
			

	})

})
	