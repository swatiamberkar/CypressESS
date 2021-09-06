var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='NP'
	var employeeID = 'ABC003'
	var pwd = '123456'
	
	
	var current_FilePath = 'D:\\CypressESS\\cypress\\downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var gratuity = 'Gratuity'
	var incrementRegisterReport = 'IncrementRegisterReport'
	var unconfirmedStatus ='UnconfirmedStatus'
	var stopPayment = "StopPayment"
	var pendingJoiningDocs = "PendingJoiningDocs"
	
	var uptoGratuity = '01/03/2020'
	var incrementRegisterMonth='2'

	beforeEach(function(){
        cy.getCookies()
	})
	
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		//cy.visit(Cypress.env('url')) 
	})
	
	it('Login into Pocket ESS', function () {
		cy.Login(employeeID, pwd)
	})

	it('Navigate to Project Master', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/MyTimesheetReport?Menu=MyTimesheetReport');
		//cy.get('#FinanceReport').click();
	})


	
		
/*	it('Download PDF Report of Pending Joining Documents', function() {
	
		cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
		setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
		.should("be.visible")
		.click();
		})
	
	})
*/
	it('Verify Download PDF Report of Pending Joining Documents', function () {
	
			
/*		cy.task('readXlsx', { file: 'D:/CypressESS/cypress/downloads/PendingJoiningDocs.xlsx', sheet: "PendingJoiningDocument" }).then((rows) => {
			expect(rows.length).to.equal(217)
			expect(rows[5]).to.eq(11060)		
		})
*/

	/*	cy.task('parseXlsx', { filePath: 'D:/CypressESS/cypress/downloads/PendingJoiningDocs.xlsx' }).then(
			//cy.parseXlsx("/Users/Downloads/Greyt56af30a13620210304052628428.xlsx").then(
			jsonData => {
				// finally we write the assertion rule to check if that data matches the data we expected the excel file to have.
				//expect(jsonData[0].data[0]).to.eqls(company);
			
					const rowLength = Cypress.$(jsonData[0].data).length
					for (let index = 0; index < rowLength; index++) {
						//var jsonData1 = jsonData[index].data
						//cy.log(jsonData1)
						cy.log(jsonData[3][0])
						//cy.log(jsonData[0][1])
						//cy.writeFile("cypress/fixtures/xlsxData.json", { username: jsonData[0][0], password: jsonData[0][1] })
					}
				
				expect(jsonData[0].data[0]).to.eqls(company);
			});
		*/

		/*cy.task('convertExcelToJson_CurrentFile', { file: pendingJoiningDocs, fileName: current_FilePath + pendingJoiningDocs + '.xlsx' })
		cy.readFile('D:/CypressESS/cypress/downloads/pendingJoiningDocs.txt').should('contains', 'A')
		*/
	})
})