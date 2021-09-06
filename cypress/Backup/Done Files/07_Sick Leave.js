
describe('Sick Leave', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
		
	var companyCode = ''
	var employeeID ='GT08'
	var managerID = 'GT02'
	var empFound = ''
	
	let LeaveDate =
		[{LeaveType: "SL", FromDate: "12/02/2021", FromDateDay: "FULL DAY", ToDate: "12/02/2021", ToDateDay: "FULL DAY"},//Past Date
		 {LeaveType: "SL", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},//Current Date 
		 {LeaveType: "SL", FromDate: "26/02/2021", FromDateDay: "FULL DAY", ToDate: "26/02/2021", ToDateDay: "FULL DAY"},//Future Date
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
		

/*	it('Login into Pocket ESS', function() {
		cy.EmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest')
		cy.wait(2000)	
		 cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Verify Validation Massges - Leave Opening is 0.',function(){
	const { softAssert, softExpect } = chai;
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
		 	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Leave Opening is 0');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })		

	})
*/	

/*	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
		
	it('Add Leave Opening for Casual Leave', function() {	
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
			cy.get('.cor-next').click({force: true})
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
*/	
/*	it('Login into Pocket HRMS', function() {
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
*/		
	it('Login into Pocket ESS', function() {
		cy.EmployeeLogin()
	})
		
	it('Navigate to Leave Request', function() {	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Apply Sick Leave for Past Date',function(){
	const { softAssert, softExpect } = chai;
		//cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest')
		//cy.wait(2000)	
		 //cy.get('#LeaveDetail').click({force: true})
		 //cy.wait(2000)
	cy.get('#drpLeaveType').select(LeaveDate[0].LeaveType,{force: true})
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
		   
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[0].FromDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[0].FromDateDay);
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[0].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[0].ToDateDay);
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[0].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave Apply successfully");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Apply Sick Leave for current date',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(LeaveDate[0].LeaveType,{force: true})
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
		 
			cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(LeaveDate[1].ToDateDay);
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
		 softExpect(text.trim()).to.eq(LeaveDate[1].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave Apply successfull");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })	
	})
	
	it('Apply Sick Leave for future date',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(LeaveDate[0].LeaveType,{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[3].FromDate)
			})
		cy.get('#drpFromLeaveTyp').select(LeaveDate[2].FromDateDay,{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(LeaveDate[3].ToDate)
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
		 softExpect(text.trim()).to.eq(LeaveDate[2].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})	
		
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave Apply successfull");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })	
	})
	
	it('Verify Validation Massges - Leave is already applied for the same date',function(){
		const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(LeaveDate[0].LeaveType,{force: true})
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

})
	