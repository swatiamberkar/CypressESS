

describe('10_Team Report', function () {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2 + '/' + Month + '/' + year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year
	var ts = '';

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
	var description = 'Testing of Task-1'
	var estimatedTime = '150'
	var startDate = '01/05/2021'
	var endDate = '31/05/2021'

	var task2 = 'Task-2'
	var description2 = 'Testing of Task-2'
	var estimatedTime2 = '200'
	var startDate2 = '01/06/2021'
	var endDate2 = '31/06/2021'
	var priority = 'High'
	var file = 'VaccineInfo.pdf'

	var downloadPath = 'D:\\CypressESS\\cypress\\downloads\\'
	var fileName = 'ProjectWiseReport'

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login into Pocket ESS', function () {
		cy.EssLogin(managerID, managerID)
	})
		
	it('Navigate to My Report', function() {	
		cy.visit(Cypress.env('url') +'ProjectManagement/Transaction/ProjectManagementTeamReport');
		cy.get('#MyTimesheetReportNew').click();
			cy.wait(3000)
	})

	it('Download Report', function () {
		cy.window().document().then(function (doc) {
			doc.addEventListener('click', () => {
				setTimeout(function () { doc.location.reload() }, 5000)
			})
			cy.get('[value="Download Excel"]')
				.should("be.visible")
				.click();
		})
	})

/*	it('Verify Records', function () {
	

		cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })

		cy.readFile(downloadPath + fileName + '.txt').should('contains', employeeID2)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', employeeName2)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', project1)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', '08:00')

	})

	it('Delete all file from Download folder', function () {
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })
	})
	*/
})
