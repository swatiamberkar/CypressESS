
describe('01_Settings from Cloud', function () {
	// Update emp code in excel import
	// Same Emp & Projects name update in all page of PM
	// Delete Allure report before running

	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Cypress.moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var managerID = 'P13'
	var managerName = 'Timesheet Manager'
	var employeeID1 = 'P14'
	var employeeName1 = 'Timesheet User1'
	var employeeID2 = 'P15'
	var employeeName2 = 'Timesheet User2'

	var project = 'Project-27'
	var project1 = 'Project-28'
	var project2 = 'Project-29'

	var task = 'Task-1'
	var task2 = 'Task-2'
		
	var filePath = 'EmployeeImport.xlsx'
	var sheetName = 'Project'
		
	beforeEach(function(){
        cy.getCookies()
	})

	Cypress.Commands.add('apply_InOutCoreDetailsFilter', () => {
		cy.get('#attendanceContentTitle a:nth-child(2)').click({ force: true })
		cy.wait(2000)

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.wait(5000)
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)

		})

		cy.get('#btnFilterEarningDeduction').click({ force: true })
		cy.wait(5000)
	})

	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()

	})

/*	it('Save setting for Ess Employee Import', function () {
		var startingRow = '2'
		var endingRow = '4'
		var EmpCode = 'A'
		var EmpName = 'B'
		var DOB = 'C'
		var DOJ = 'D'
		var ESIDispensary = 'E'
		var ESILocation = 'F'
		var Gender = 'G'
		var ITAXRegime = 'O'
		var LastName = 'H'
		var Metro = 'I'
		var PTLocation = 'J'
		var FIXEDBASIC = 'K'
		var MasterProjectAllowance = 'L'
		var PANNO = 'K'

	

		cy.visit(Cypress.env('cloudUrl') + 'Employee/Employee/EmployeeImport?import=1')
		cy.wait(2000)
		//cy.get('#excelImport').select('EmployeeImport Import',{force: true})
		cy.wait(2000)
		cy.get('#categoryMaster').select('Staff', { force: true })
		cy.get('#categoryMaster').select('Staff')
		cy.get('#categoryMaster').select('Staff', { force: true })
		cy.wait(2000)
		cy.get('button[onclick="showNewMasterSetting()"]').click({ force: true })
		cy.wait(5000)
		cy.get('#MasterSettingNameNew').type('EssEmployeeimport')
		cy.wait(1000)
		cy.get("input[name='name']").click({ force: true })

		cy.wait(2000)
		cy.get('#MStartingRow').clear()
		cy.get('#MStartingRow').type(startingRow)
		cy.get('#MEndingRow').clear()
		cy.get('#MEndingRow').type(endingRow)

		//cy.xpath("//a[@id='j1_1_anchor']").click()
		//cy.wait(1000)
		//cy.xpath("//a[@id='j1_46_anchor']//span[@id='M|20|PANNO']").click()
		//cy.wait(1000)
		//cy.get('#PANNO').select(PANNO)
		//cy.wait(1000)

		cy.get('#MEmployeeCodeRow').select(EmpCode)
		cy.get('#EmployeeNameRow').select(EmpName)
		cy.get('#DATEOFBIRTH').select(DOB)
		cy.get('#DATEOFJOINING').select(DOJ)
		cy.get('#ESIDISPENSARY').select(ESIDispensary)
		cy.get('#ESILOCATION').select(ESILocation)
		cy.get('#GENDER').select(Gender)
		cy.get('#LNAME').select(LastName)
		cy.get('#METRO').select(Metro)
		cy.get('#PTLOCATION').select(PTLocation)
		cy.get('#REGIMETYPE').select(ITAXRegime)
		cy.wait(2000)


		cy.get('#savesettingMaster').click()
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Setting Saved Successfully')
			cy.get(".toast-message").click()
		})
	})
	*/
	it('Upload Excel for Ess Employee Import', function () {
		
		cy.visit(Cypress.env('cloudUrl') + 'Employee/Employee/EmployeeImport?import=1')
		cy.wait(8000)
		cy.get('#ddlEmployeeImportNameList').select('Employee Master Import', { force: true })
		cy.wait(2000)
		cy.get('#categoryMaster').select('Staff', { force: true })

		cy.wait(2000)
		cy.get('#MasterSettingName').select('EssEmployeeimport', { force: true })
		cy.wait(2000)

		cy.fixture(filePath, 'binary')
			.then(Cypress.Blob.binaryStringToBlob)
			.then(fileContent => {
				cy.get('#file').upload({
					fileContent,
					fileName: filePath,
					mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					encoding: 'utf8'
				})
			})
		cy.wait(2000)

		cy.get('#ExcelSheetName').select(sheetName)
		//cy.get('#chkdPan').click({force: true})

		cy.get('#uploadsetting').click()
		cy.wait(3000)
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})


		cy.wait(15000)
	})


	it('Set Self Service Role - Manager', function () {
		cy.navigate_EmployeeProfile(managerID, managerName)
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({ force: true })
		cy.wait(2000)

		cy.route('POST', Cypress.env('url') + 'Employee/Employee/SelfServiceRole').as('selfservicerole')
		cy.get('select[name=SelfServiceRole]').select('Manager', { force: true })
		cy.wait(2000)
		cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
		cy.wait(2000)
	})

		
	it('Set Self Service Role - User', function () {
		cy.navigate_EmployeeProfile(employeeID1, employeeName1)
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({ force: true })
		cy.wait(2000)

		cy.route('POST', Cypress.env('url') + 'Employee/Employee/SelfServiceRole').as('selfservicerole')
		cy.get('select[name=SelfServiceRole]').select('User', { force: true })
		cy.wait(2000)
		cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
		cy.wait(5000)

		cy.navigate_EmployeeProfile(employeeID2, employeeName2)
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({ force: true })
		cy.wait(2000)

		cy.route('POST', Cypress.env('url') + 'Employee/Employee/SelfServiceRole').as('selfservicerole')
		cy.get('select[name=SelfServiceRole]').select('User', { force: true })
		cy.wait(2000)
		cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
		cy.wait(5000)
	})

	it('Assign manager for Timesheet module', function () {
		const { softAssert, softExpect } = chai;

		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(15000)
		cy.get('[title="Add Approval Matrix Manager"]').click({ force: true })

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#TimesheetEntry').click({ force: true })
		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
			cy.wait(2000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Timesheet Entry')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

	})

	it('Add Shift Schedule', function () {
		//cy.navigate_EmployeeProfile(employeeID2, employeeName2)
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({ force: true })
		cy.wait(5000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#ShiftName').select('General')
		cy.wait(1000)

		cy.get('#dateRange').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate + ' to ' + currentDate)
		})


		cy.wait(1000)
		cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
		cy.wait(5000)

		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		cy.wait(5000)
	})

	it('Add Punch Details', function () {
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click()
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(15000)
		cy.apply_InOutCoreDetailsFilter()

		cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(11)>div>a').click({ force: true })
		cy.wait(1000)
		cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Modified Punch')]").click({ force: true })
		cy.wait(2000)

		cy.get('#Type').select('FULLDAY PRESENT', { force: true })


		cy.get('#tmInTimeHourModifiedPunch').click({ force: true })
		cy.get('#tmInTimeHourModifiedPunch').clear()
		cy.get('#tmInTimeHourModifiedPunch').type('09')

		cy.get('#tmInTimeMinModifiedPunch').click({ force: true })
		cy.get('#tmInTimeMinModifiedPunch').clear()
		cy.get('#tmInTimeMinModifiedPunch').type('00')

		cy.get('#tmOutTimeHourModifiedPunch').click({ force: true })
		cy.get('#tmOutTimeHourModifiedPunch').clear()
		cy.get('#tmOutTimeHourModifiedPunch').type('18')

		cy.get('#tmOutTimeMinModifiedPunch').click({ force: true })
		cy.get('#tmOutTimeMinModifiedPunch').clear()
		cy.get('#tmOutTimeMinModifiedPunch').type('00')

		cy.get('#btnSave').click({ force: true })


		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Record saved successfully.!')
			cy.get(".toast-message").click({ force: true })
		})


		cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(3)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(4)').invoke('text').then((OutTime) => {
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child(1)>td:nth-child(2)').invoke('text').then((EntryDate) => {
					cy.log("EntryDate: " + EntryDate)
					cy.log("InTime: " + InTime)
					cy.log("OutTime: " + OutTime)

					expect(EntryDate.trim()).equal(currentDate)
					expect(InTime.trim()).equal('09:00')
					expect(OutTime.trim()).equal('18:00')


				})
			})
		})

	})

	it('GeneratePassword ', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
		cy.wait(2000)
		cy.server()
		cy.route('POST', Cypress.env('url') + 'Employee/Employee/GeneratePassword').as('generatepassword')
		cy.get("#catall").click({ force: true })
		cy.wait(2000)
		cy.get('#OverWriteRad').check('Yes', { force: true })
		cy.wait(2000)
		cy.get('[type="radio"]').check('3', { force: true })
		cy.wait(1000)
		cy.get("#savesetting").click({ force: true })
		cy.wait(20000)

	})

/*	it('Set Roll Allocation for Manager ', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')
		
		cy.get("#drpModule").select('Project')
		cy.get("#drpRole").select('Manager')
		cy.xpath("//button[contains(text(),'Search')]").click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get('.jstree > :nth-child(2) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
	})
	
	it('Set Roll Allocation for User ', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')

		cy.get("#drpModule").select('Project')
		cy.get("#drpRole").select('User')
		cy.xpath("//button[contains(text(),'Search')]").click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(1) > :nth-child(1) > .list-group > :nth-child(1) > .form-inline > .chk').click({ force: true })
		cy.wait(1000)
		cy.get('.jstree > :nth-child(2) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .chk').click({ force: true })
		cy.wait(1000)
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Setting Save successfully')
		})
	})
*/
	it('Lock Timesheet for Yasterday Date ', function () {
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetLock').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetLock');

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully Locked for Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', employeeID1)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'Yes')

	})


})
	