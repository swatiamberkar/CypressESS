
describe('Birthday Leave', function() {
	// on WeekOff
	// On Holiday
	// other days
	// on Birthday
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year

	
	var employeeID ='GT10'
	var managerID = 'GT02'
	
	let LeaveDate =
		[{LeaveType: "Birthday Leave", FromDate: "01/04/2021", FromDateDay: "FULL DAY", ToDate: "02/04/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "BirthdayLeave", FromDate: "05/04/2021", FromDateDay: "FULL DAY", ToDate: "05/04/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "BirthdayLeave", FromDate: "01/12/2021", FromDateDay: "FULL DAY", ToDate: "01/12/2021", ToDateDay: "FULL DAY"},
		 {LeaveType: "BL", FromDate: "01/12/2021", FromDateDay: "FULL DAY", ToDate: "01/12/2021", ToDateDay: "FULL DAY"}, 
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
	
	Cypress.Commands.add('navigate_LeaveSetting',()=>{
    
			cy.wait(1000)
			cy.visit(url+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.get('#leave_detail_tab').click({force:true})
			cy.get('#leave_detail_tab').click()
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(3000)
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
		 //cy.get('#LeaveDetail').click({force: true})
		 cy.wait(2000)
	})
	
	it('Verify Validation Massges - For Birthday Leave Only One Day Leave Allowed',function(){
	const { softAssert, softExpect } = chai;
	cy.get('#drpLeaveType').select(LeaveDate[3].LeaveType,{force: true})
		cy.wait(5000)
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
		 softExpect(text.trim()).to.eq('For Birthday Leave Only One Day Leave Allowed');
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
				

	})
	
	it('Verify Validation Massges - Birthday Leave Only Allowed On Employee Date Of Birth',function(){
	const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(LeaveDate[3].LeaveType,{force: true})
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
		 softExpect(text.trim()).to.eq("Birthday Leave Only Allowed On Employee's Date Of Birth");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
	})
	
	it('Apply Birthday Leave',function(){
	const { softAssert, softExpect } = chai;
		cy.get('#drpLeaveType').select(LeaveDate[3].LeaveType,{force: true})
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
		 softExpect(text.trim()).to.eq(LeaveDate[0].LeaveType);
		})
		
		cy.get('#btnConfirm').click({force: true})		

	})
	
	it('Verify Validation Massges - Leave is already applied for the same date',function(){
		const { softAssert, softExpect } = chai;
		
		cy.get('#drpLeaveType').select(LeaveDate[3].LeaveType,{force: true})
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
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Leave is already applied for the same date");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })
			
		 	
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == LeaveDate[3].LeaveType)
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
	
/*	it('Verify Notification at Employee', function() {
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
	*/
	it('Verify Status at Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	
	//cy.xpath('//div[@class="table-responsive-vertical shadow-z-1"]/table/tbody').find('tr').should('have.length', 4)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Approved');
	})
	})	
	
		
		
	
})
	