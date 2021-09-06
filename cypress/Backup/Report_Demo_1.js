var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	//var company='ABC INDIA PVT LTD'
	var company='NP'
	var employeeID ='L-002'
	
	
	var current_FilePath = 'D:/CypressESS/cypress/downloads/';	
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
	
	it('successfully loads', function() {
		//cy.visit('https://pockethrmsnext.azurewebsites.net/') 
		cy.visit('https://cloud.pockethrms.com/')
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		//cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'administrator@bhagya.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123123')
		
		
		cy.get('[type="submit"]').click({force: true})
				
	})
		
	it('Change Company', function() {		 
		
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company.trim()){
				expect(text.trim()).to.eq(company.trim()) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').click({force: true})
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company.trim()){
						expect(text).to.eq(company.trim())
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
						cy.wait(2000)
					}	
				})
				})		
			}
		})	 	
	})
	
	it('Navigate to Financial Reports', function() {
	//cy.wait(20000)	
	//	cy.visit('https://pockethrmsnext.azurewebsites.net/identity/Home/Dashboard') 
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#financial_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#financial_detail_tab').click({force: true})
	 
	})	
		
	it('Download PDF Report of Pending Joining Documents', function() {
		const { softAssert, softExpect } = chai;
		const data = [
			"Employee Code",
			"config_sku",
			"simple_sku",
			"fallback_type",
			"field",
			"value",
			"command"
			];
		
		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Pending Joining Documents')]").click({force: true})
		//cy.wait(10000)
		cy.get("#catall").click({force: true})

		cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
		setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
		.should("be.visible")
		.click();
		})
		
		cy.task('convertPDFToJson_CurrentFile',{file:pendingJoiningDocs, fileName:current_FilePath + pendingJoiningDocs +'.pdf'})
		
	/*	cy.task('parseXlsx',{filePath:'D:/CypressESS/cypress/downloads/PendingJoiningDocs.xlsx'}).then(
		//cy.parseXlsx("/Users/Downloads/Greyt56af30a13620210304052628428.xlsx").then(
		jsonData => {
		// finally we write the assertion rule to check if that data matches the data we expected the excel file to have.
		expect(jsonData[0].data[0]).to.eqls(company);
		expect(jsonData[0].data[1]).to.eqls(company);
		}
		);
*/

		})
})