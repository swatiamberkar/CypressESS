describe("Comp - Off", () => {
	
	var employeeID ='GT13';
	var managerID = 'GT02'
	var lopMonth= 'April';
	var onDutyMonth= 'April';
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		var currentYear = Cypress.env('currentYear')
		var cloudUrl = Cypress.env('cloudUrl')
	
	//let leave ={LeaveType: "LD", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate:tomorrowDate, ToDateDay: "FULL DAY"};
	let leave = [
    {LeaveType: "Paid Leave", FromDate: "06/04/2021", FromDateDay: "FULL DAY", ToDate: "06/04/2021", ToDateDay: "FULL DAY"},
    {LeaveType: "Paid Leave", FromDate: "07/04/2021", FromDateDay: "FULL DAY", ToDate: "07/04/2021", ToDateDay: "FULL DAY"}
        ];

	let onDuty = [
    {EntryDate: "04/04/2021", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "10/04/2021", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "11/04/2021", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},	
	];
	
	let compOff = [
    {EntryDate: "05/04/2021", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "12/04/2021", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "13/04/2021", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},	
	];
	
	compOff[0].EntryDate
	
	Cypress.Commands.add('navigate_EmployeeLOPCreditPage',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('lop credit')
		cy.wait(2000)
		cy.contains('li', 'lop credit').click({force: true})
		cy.wait(3000)
		cy.get('#searchEmpCodeName').click({force: true})		
		cy.get('#searchEmpCodeName').clear()
		cy.get('#searchEmpCodeName').type(employeeID)
		cy.get('#ESbtnSearch').click({force: true})
		cy.wait(1000)
		cy.get('#tempFnF').click({force: true})
	})	
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(4000)
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
	
	Cypress.Commands.add('navigate_EmployeeOnDutyEntry',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_OndutyEntry').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('delete_EmployeesAllLeaves',()=>{
		
		cy.get("i").then(($sp) => {
			var result = $sp.hasClass('text-danger')
			cy.log(result)
		if ($sp.hasClass('text-danger')) {
		
		cy.get('.text-danger').then(listing => {
			var leavelength = Cypress.$(listing).length;
			cy.log("leavelength: "+leavelength)
			
			if(leavelength != 0){		
			cy.get('.text-danger').eq(0).click()
			cy.wait(5000)
			}
			
			if(leavelength != 1)
			{
			cy.delete_EmployeesAllLeaves()
			}		
		})   	
		} 
		else {		
		}
		})	
	})
	
	Cypress.Commands.add('navigate_LeaveConfigurationSetting',()=>{
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('Leave Configuration')
		cy.wait(2000)
		cy.contains('li', 'Leave Configuration').click({force: true})
		cy.wait(3000)
		
	})
	
	Cypress.Commands.add('LeaveopenigforCOFF',()=>{
			cy.wait(2000)
			cy.navigate_EmployeeProfile()
			cy.wait(1000)
			cy.get('#leave_detail_tab').click({force: true})
			cy.wait(1000)
			cy.get('#Leave_LeaveEntry').click({force: true})
			cy.wait(4000)
			cy.get('.col-lg-3:nth-child(3) > .card > .card-body > .float-right > a > .fas').click()
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()		
			cy.get('#LeaveOpen').type('10')
			
			cy.get('#LeaveCredit').click({force: true})
			cy.get('#LeaveCredit').clear()		
			cy.get('#LeaveCredit').type('10')
			cy.get('#CrApp').check({force: true})
			cy.wait(2000)
			cy.get('#saveloader').click({force: true})
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
	
	beforeEach(function(){
        cy.getCookies()
   })

	it('Successfully loads page', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})

/*	it('Assign manager for Leave module from Approval Matrix', function() {	
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
	
	
	it('Leave opening for COFF',function() {
		cy.LeaveopenigforCOFF();
	})

	it('Add Shift Details',function() {
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Shift Schedule"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#ShiftName').select('General',{force: true})
		cy.wait(1000)
		cy.get('#dateRange').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2021 to 30/04/2021')
		})
		
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(2000)
	})
	
	it('Add On Duty Entry',function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeOnDutyEntry()
		for(let i = 0; i < onDuty.length; i++) {
			
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(5000)
		
			cy.get('#dtEntry').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(onDuty[i].EntryDate)
			})
	   
			cy.get('#ddType').select(onDuty[i].Type,{force: true})
						
					if(onDuty[i].Type=="HALFDAY ONDUTY")
					{
						if(onDuty[i].Half=="First")
						{
							cy.xpath("//div[@class='col-sm-12']//input[@id='rdFirst']").click({force: true})
						}
						else
						{
							cy.xpath("//div[@class='col-sm-12']//input[@id='rdSecond']").click({force: true})
						}
					}
					
					
					cy.get('#txtRemarks').click({force: true})
						cy.get('#txtRemarks').clear()
						cy.get('#txtRemarks').type(onDuty[i].Remark)
						
						cy.get('#tmInTimeHour').click({force: true})
						cy.get('#tmInTimeHour').clear()
						cy.get('#tmInTimeHour').type(onDuty[i].InDate_HH)	 
						
						cy.get('#tmInTimeMin').click({force: true})
						cy.get('#tmInTimeMin').clear()
						cy.get('#tmInTimeMin').type(onDuty[i].InDate_MM)	
						
						cy.get('#tmOutTimeHour').click({force: true})
						cy.get('#tmOutTimeHour').clear()
						cy.get('#tmOutTimeHour').type(onDuty[i].OutDate_HH)	
						
						cy.get('#tmOutTimeMin').click({force: true})
						cy.get('#tmOutTimeMin').clear()
						cy.get('#tmOutTimeMin').type(onDuty[i].OutDate_MM)	
						
						cy.get('#btnSaveOnDutyEntry').click({force: true})
						
						cy.get(".toast-message").invoke('text').then((text) => {
						cy.log(text.trim())	
						softExpect(text.trim()).to.eq('Record saved successfully.!');
						//expect(text.trim()).equal('Record saved successfully.!')
						cy.get(".toast-message").click({force: true})
						})
						cy.wait(10000)
	
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-filter']").click({force: true})
			cy.get('#ddMonth1').select(onDutyMonth,{force: true})
			cy.wait(1000)
			cy.get('#txtYear1').click({force: true})
			cy.get('#txtYear1').clear()
			cy.get('#txtYear1').type(currentYear)
			
			cy.xpath("//button[contains(text(),'Search')]").click({force: true})
			cy.wait(5000)
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(1)").eq(i).invoke('text').then((fromDate) => {	
			cy.log("fromDate: "+fromDate)
			softExpect(fromDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(2)").eq(i).invoke('text').then((toDate) => {	
			cy.log("toDate: "+toDate)
			softExpect(toDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(3)").eq(i).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].InDate_HH+":"+onDuty[i].InDate_MM);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(5)").eq(i).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].OutDate_HH+":"+onDuty[i].OutDate_MM);
			})
								
		}
	})
	
	it('Verify Activate Elapse & Elapse Expiry Days within Leave Configuration',function() {	
			cy.navigate_LeaveConfigurationSetting()		
			cy.wait(3000)
			cy.get('#ddLeavType').select('COFF')
			cy.wait(2000)
			cy.get('#btnDelete').click({force:true})
			cy.wait(3000)
			cy.get('#ddLeavType').select('COFF')
			
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.get('#txtMaxDaysMonth').type('5')
			
			cy.wait(1000)
			cy.get('#ddActivateElpase').select('Yes',{force:true})
			
			cy.get('#ddElapsExpiryDays').click({force:true})
			cy.get('#ddElapsExpiryDays').clear()
			cy.get('#ddElapsExpiryDays').type('365')
			cy.wait(1000)
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()
		//cy.delete_EmployeesAllLeaves()
		cy.wait(3000)
	})	
*/	
	it('Apply CompOff Credit',function() {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.visit(cloudUrl+'Settings/Employee/Index?module=attendance&submodule=compoffcredit')
		cy.wait(2000)
		
		cy.get('#leave_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Leave_CompOffCredit').click({force: true})
		cy.wait(2000)
		
		
				cy.get('#select2-multiEmp-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(employeeID)
				cy.wait(3000)
				cy.get('.select2-results__option--highlighted').eq(0) .click({force: true})
		        cy.wait(2000)
		cy.get('#dtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2021')
			})
			
			cy.get('#dtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
			cy.get('#catall').click({force: true})
			
			cy.get('#btnView').click({force: true})
			cy.wait(4000)
			for(let i = 0; i < onDuty.length; i++) {
				
			cy.get("#tablesorter > tbody >tr").each(function(row, k){	
			var num = parseFloat(k+1)
			cy.log("num: "+num)
			
			cy.get("#tablesorter > tbody >tr >td:nth-child(1)").eq(k).invoke('text').then((empID) => {	
			cy.log("empID: "+empID.trim())
				if(empID.trim()==employeeID){
					softExpect(empID.trim()).to.eq(employeeID);
					cy.get("#tablesorter > tbody >tr >td:nth-child(3)").eq(k).invoke('text').then((entryDate) => {	
					cy.log("entryDate: "+entryDate.trim())
					if(entryDate.trim()==onDuty[i].EntryDate){
					softExpect(entryDate.trim()).to.eq(onDuty[i].EntryDate);
					cy.get("#tablesorter > tbody >tr >td:nth-child(6)>input").eq(k).click()
					
				}
							
			})
			
					
				}
							
			})
			
			})
			}
		
		
		 cy.get('select[name=dayType_2]').select('Half Day',{force: true})
		  cy.get('select[name=dayType_3]').select('Half Day',{force: true})
		 
		 cy.wait(2000)
		cy.get('#btnSaveCompOffCredit').click({force: true})
			
	})
	
	
	it('Verify Validation Massage - Comp-Off Date is not Selected.!',function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(2000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		
		cy.get('#btnAdd').click({force: true})
		   
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("Comp-Off Date is not Selected.!");
		 cy.wait(3000)
			cy.get(".noty_body").click({force: true})
			 cy.wait(2000)
		  })	
	})

	it('Add COFF for the Full day',function() {
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()
		cy.wait(2000)	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(2000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[1]/input[1]').click({force: true})
		cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		   
		  cy.wait(2000)
		  cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('COFF');
		})
		
		cy.get('#btnConfirm').click({force: true})
			
	})
	
	
	it('Verify Leave Request Notification at Manager Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains('Requisition of Leave by '+employeeID);	
			
			})
		})
		
	})	

	it('Reject Comp-Off Leave from Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == 'COFF')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(12)>input').click({force: true})
				cy.wait(2000)
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').click({force: true})
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').clear().type('Test')
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
			}
			})
			})
			
		})
	cy.wait(20000)
	})
	
	it('Verify Leave Reject Notification at Employee Login', function() {
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
	
	
	it('Add COFF for the Full day',function() {
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()
		cy.wait(2000)	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(2000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[1]/input[1]').click({force: true})
		cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		   
		  cy.wait(2000)
		  cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('COFF');
		})
		
		cy.get('#btnConfirm').click({force: true})
			
	})
	
	it('Verify Leave Request Notification at Manager Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains('Requisition of Leave by '+employeeID);	
			
			})
		})
		
	})	

	it('Approve Comp-Off Leave from Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == 'COFF')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.wait(2000)
				//cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').click({force: true})
				//cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').clear().type('Test')
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
			}
			})
			})
			
		})
	cy.wait(20000)
	})
	
	
	it('Verify Notification of Leave Approved at Employee Login', function() {
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
	
	it('Verify Approved Status from Employee',function(){
		const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	
	cy.xpath('//table[@class="table table-hover table-mc-light-blue"]').find('tr').should('have.length', 2)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Approved');
	})
	})	
	
	it('Cancel Approved Leave from Employee',function(){
		const { softAssert, softExpect } = chai;
		cy.get('[value="Cancel"]').click({force: true})
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	
	})
	
	
	it('Verify Notification of Leave Cancel at Manager Login', function() {
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

	it('Reject Cancel Leave from Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == 'COFF')
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
	
	
	it('Verify Notification of Reject Cancel Leave at Employee Login', function() {
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
	
	it('Verify Reject Status from Employee',function(){
	
	const { softAssert, softExpect } = chai;
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


	it('Verify Notification of Leave Cancel at Manager Login', function() {
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == 'COFF')
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
	
	
	it('Verify Notification of Approve Cancel Leave at Employee Login', function() {
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
	
	it('Verify Approve Cancel Leave Notification at Employee Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
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
	
	it('Verify Approve Cancel Leave Status from Employee',function(){
	const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains("No Records Found.");
		})
	})
	

	
	it('Add COFF for the Full day',function() {
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()
		cy.wait(2000)	
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.wait(5000)
		
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(2000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("FULL DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[0].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("FULL DAY",{force: true})
		
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[1]/input[1]').click({force: true})
		cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		   
		  cy.wait(2000)
		  cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[0].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FULL DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('1');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('COFF');
		})
		
		cy.get('#btnConfirm').click({force: true})
			
	})
	
	it('Add COFF for the First half day',function() {
		const { softAssert, softExpect } = chai;
			cy.EmployeeLogin()
			cy.wait(2000)
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		
		cy.wait(5000)	
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[1].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("FIRST HALF DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[1].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("FIRST HALF DAY",{force: true})
		
		cy.xpath('//tbody/tr[1]/td[1]/input[1]').click({force: true})
		cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		   
	cy.wait(2000)
		  
		  cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[1].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FIRST HALF DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[1].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("FIRST HALF DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('0.5');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('COFF');
		})
		
		cy.get('#btnConfirm').click({force: true})
			
	})
	
	it('Add COFF for the Second half day',function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
			cy.wait(2000)
		cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
		
		cy.wait(5000)	
		cy.get('#drpLeaveType').select('COFF',{force: true})
		cy.wait(5000)
		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[2].EntryDate)
			})
		cy.get('#drpFromLeaveTyp').select("SECOND HALF DAY",{force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(compOff[2].EntryDate)
			})
		cy.get('#drpToLeaveTyp').select("SECOND HALF DAY",{force: true})
		
		cy.xpath('//tbody/tr[1]/td[1]/input[1]').click({force: true})
		
		cy.get('#btnAdd').click({force: true})
		   

		  
		  cy.get('[data-title="From Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[2].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(0).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("SECOND HALF DAY");
		})
		
		cy.get('[data-title="To Date"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq(compOff[2].EntryDate);
		})
		
		cy.get('[data-title="Half/Full Day"]').eq(1).invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq("SECOND HALF DAY");
		})
		
		cy.get('[class="days"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('0.5');
		})
		
		cy.get('[data-title="Leave Type"]').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('COFF');
		})
		
		cy.get('#btnConfirm').click({force: true})
			
	})
	
	it('Verify Leave Request Notification at Manager Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID+' (Comp Off)');	
			
			})
		})
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID+' (Comp Off)');	
			
			})
		})
		
		cy.get('.feeds-body >h4').eq(2).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(2).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Applied');	
			  softExpect(Note.trim()).to.contains(employeeID+' (Comp Off)');	
			
			})
		})
		
	})	

	it('Approve Comp-Off Leave from Manager',function(){
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
			
			if (EmpCode.trim() == employeeID && LeaveType.trim() == 'COFF')
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.wait(2000)
				//cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').click({force: true})
				//cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(13)>input').clear().type('Test')
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
			}
			})
			})
			
		})
	cy.wait(20000)
	})

	it('Verify Notification of Leave Approved at Employee Login', function() {
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
		
		cy.get('.feeds-body >h4').eq(1).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(1).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Approved');	
			  softExpect(Note.trim()).to.contains('Approval of Leave for '+employeeID);	
			
			})
		})
		
		cy.get('.feeds-body >h4').eq(2).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(2).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Leave Approved');	
			  softExpect(Note.trim()).to.contains('Approval of Leave for '+employeeID);	
			
			})
		})
		
	})	

	it('Verify Approved Status from Employee',function(){
		const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(5000)
	
	cy.xpath('//table[@class="table table-hover table-mc-light-blue"]').find('tr').should('have.length', 4)
	
	cy.get('.tag-success').invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('ApprovedApprovedApproved');
	})
	})	
	
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
	it('Verify display Leave against CompOff date in CompOff Credit Page',function() {
		
		cy.wait(1000)
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=attendance&submodule=compoffcredit')
		cy.wait(2000)
		
		cy.get('#leave_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Leave_CompOffCredit').click({force: true})
		cy.wait(2000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		cy.get('#dtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2021')
			})
			
			cy.get('#dtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
			cy.get('#catall').click({force: true})
			
			cy.get('#btnView').click({force: true})
			
			cy.wait(3000)
			cy.get('#tablesorter').contains('td', onDuty[0].EntryDate).should('be.visible');
			cy.get('#tablesorter').contains('td', '9:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '17:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Full Day').should('be.visible');
			cy.get('#tablesorter').contains('td', compOff[0].EntryDate).should('be.visible');
			
			cy.get('#tablesorter').contains('td', onDuty[1].EntryDate).should('be.visible');
			cy.get('#tablesorter').contains('td', '9:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '13:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Half Day').should('be.visible');
			cy.get('#tablesorter').contains('td', compOff[1].EntryDate).should('be.visible');
			
			cy.get('#tablesorter').contains('td', onDuty[2].EntryDate).should('be.visible');
			cy.get('#tablesorter').contains('td', '13:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '17:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Half Day').should('be.visible');
			cy.get('#tablesorter').contains('td', compOff[2].EntryDate).should('be.visible');
	})
	
		
	
})
